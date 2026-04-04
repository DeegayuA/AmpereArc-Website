import tariffData from './tariffs.json';
import type { Product } from './data';

export interface TariffCountry {
  name: string;
  currency: string;
  tariff_usd: number;
  export_rate_usd: number;
  fuel_price_usd: number; // Added
  seasonal: boolean;
  installation_multiplier: number;
  bos_multiplier: number;
  monthly_peak_sun_hours: number[];
}

export type TariffDB = Record<string, TariffCountry>;
const tariffs = tariffData as TariffDB;

export const MONTHS_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// 78% system efficiency (inverter + wiring + temp + soiling losses)
const SYSTEM_EFFICIENCY = 0.78;
const DEFAULT_DOD = 0.8; // depth of discharge for batteries

export const PANEL_SPECS = {
  Home:       { wp: 500, area_m2: 2.10 }, // AmpereArc 500W AI panel
  Commercial: { wp: 720, area_m2: 2.55 }, // AmpereArc 720W AI bifacial panel
};

export function getAvailableCountries() {
  return Object.entries(tariffs).map(([code, d]) => ({ code, name: d.name }));
}

export function getTariff(code: string): TariffCountry | null {
  return tariffs[code.toUpperCase()] ?? null;
}

export interface SystemInputs {
  monthlyUsageKwh: number;
  isCommercial: boolean;
  isThreePhase: boolean;
  needsBackup: boolean;
  backupHours: number;        // 8, 12, 24, 72, 168
  goalMaxIncome: boolean;
  offGrid: boolean;           // full off-grid – no grid connection
  needsEV: boolean;
  evChargingKw: number;
  evKmPerDay?: number;        // New: Daily driving distance for fuel savings
  countryCode: string;
  roofAreaM2: number | null;  // null = auto-calculate
  instantPeakKw?: number;     // New: Max simultaneous peak demand
}

export interface ProductSelection {
  product: Product;
  count: number;
  unitPriceUsd: number;
  discountedUnitPriceUsd: number;
  totalUsd: number;
  discountedTotalUsd: number;
}

export interface MonthlyData {
  month: string;
  generationKwh: number;
  savingsUsd: number;
  peakSunHours: number;
}

export interface SystemDesign {
  panels: ProductSelection;
  inverters: ProductSelection;
  batteries: ProductSelection | null;
  evCharger: ProductSelection | null;
  roofAreaRequiredM2: number;
  roofAreaActualM2: number;
  panelCount: number;
  systemKwp: number;
  offGrid: boolean;
  monthly: MonthlyData[];
  annualGenerationKwh: number;
  annualSavingsUsd: number;
  evFuelSavingsUsd: number; // New
  costBreakdown: {
    components: number;
    discountedComponents: number;
    installation: number;
    bos: number;
    total: number;
    discountedTotal: number;
  };
  breakEvenYears: number;
  lifetimeSavings25Yr: number;
  country: TariffCountry;
}

/** Score a product for recommendation — prefer AmpereArc visible products */
function productScore(p: Product): number {
  let s = 0;
  if (p.visible !== false) s += 100;        // visible (our own branded) preferred
  if (!p.brand || p.brand === "AmpereArc") s += 50; // AmpereArc brand preferred
  return s;
}

function makeSelection(product: Product, count: number): ProductSelection {
  const unit = product.basePrice;
  const disc = product.basePrice * (1 - product.discountPercentage / 100);
  return { product, count, unitPriceUsd: unit, discountedUnitPriceUsd: disc,
    totalUsd: unit * count, discountedTotalUsd: disc * count };
}

export function calculateSystem(inputs: SystemInputs, allProducts: Product[]): SystemDesign | null {
  const tariff = getTariff(inputs.countryCode);
  if (!tariff) return null;

  const cat = inputs.isCommercial ? 'Commercial' : 'Home';
  const pSpec = PANEL_SPECS[cat];
  const offGrid = inputs.offGrid;

  // Average PSH for panel sizing
  const avgPSH = tariff.monthly_peak_sun_hours.reduce((a, b) => a + b, 0) / 12;
  const dailyUsageKwh = inputs.monthlyUsageKwh / 30;

  // ── BATTERY SIZING ──────────────────────────────────────────────
  const needsBattery = offGrid || inputs.needsBackup;
  const battPool = allProducts
    .filter(p => p.subCategory === 'BESS (Battery Energy Storage)' && p.category === cat)
    .sort((a, b) => productScore(b) - productScore(a) || (b.metadata.kwh ?? 0) - (a.metadata.kwh ?? 0));

  let batteries: ProductSelection | null = null;
  if (needsBattery && battPool.length) {
    const batt = battPool[0];
    const dod = batt.metadata.dod ?? DEFAULT_DOD;
    let batteryKwhNeeded: number;
    if (offGrid) {
      const autonomyDays = inputs.backupHours / 24;
      batteryKwhNeeded = dailyUsageKwh * autonomyDays / dod;
    } else {
      batteryKwhNeeded = dailyUsageKwh * (inputs.backupHours / 24) / dod;
    }
    const cnt = Math.max(1, Math.ceil(batteryKwhNeeded / (batt.metadata.kwh ?? 10)));
    batteries = makeSelection(batt, cnt);
  }

  // ── PANEL SIZING ─────────────────────────────────────────────────
  const panelWp = pSpec.wp;
  const panelDailyKwh = (panelWp / 1000) * avgPSH * SYSTEM_EFFICIENCY;
  const offGridExtraFactor = offGrid ? 1.3 : 1.0;
  let panelCount = Math.ceil((dailyUsageKwh * offGridExtraFactor) / panelDailyKwh);

  // Roof constraint
  const freeRoof = inputs.roofAreaM2 === null;
  const reqRoof = panelCount * pSpec.area_m2;
  let actualRoof = freeRoof ? reqRoof : inputs.roofAreaM2!;
  if (!freeRoof && inputs.roofAreaM2! < reqRoof) {
    panelCount = Math.max(1, Math.floor(inputs.roofAreaM2! / pSpec.area_m2));
    actualRoof = inputs.roofAreaM2!;
  }

  // ── INVERTER SELECTION ──────────────────────────────────────────
  const homePhases = inputs.isThreePhase ? 3 : 1;
  const invPool = allProducts
    .filter(p => {
      if (p.subCategory !== 'Inverters' || p.category !== cat) return false;
      if (offGrid) return p.metadata.offGridCapable === true;
      return !p.metadata.offGridCapable && (p.metadata.phases ?? homePhases) === homePhases;
    })
    .sort((a, b) => productScore(b) - productScore(a) || (b.metadata.kw ?? 0) - (a.metadata.kw ?? 0));

  const invFallback = allProducts
    .filter(p => p.subCategory === 'Inverters' && p.category === cat && !p.metadata.offGridCapable)
    .sort((a, b) => productScore(b) - productScore(a) || (b.metadata.kw ?? 0) - (a.metadata.kw ?? 0));

  const finalInvPool = invPool.length ? invPool : (offGrid
    ? allProducts.filter(p => p.subCategory === 'Inverters' && p.category === cat && p.metadata.offGridCapable).sort((a,b)=>productScore(b)-productScore(a))
    : invFallback);

  if (!finalInvPool.length) return null;
  const bestInverter = finalInvPool[0];
  const inverterKw = bestInverter.metadata.kw ?? 10;

  if (inputs.goalMaxIncome && !offGrid) {
    const fittable = freeRoof ? Infinity : Math.floor(actualRoof / pSpec.area_m2);
    panelCount = Math.min(Math.ceil(panelCount * 1.2), fittable);
    actualRoof = freeRoof ? panelCount * pSpec.area_m2 : actualRoof;
  }

  const systemKwp = Math.round((panelCount * panelWp) / 100) / 10;
  // A standard solar inverter can handle up to 1.5x its rating in solar panels (DC/AC Oversizing ratio)
  const inverterKwNeededForPanels = systemKwp / 1.5;
  const requiredInverterKw = Math.max(inverterKwNeededForPanels, inputs.instantPeakKw ?? 0);
  const inverterCount = Math.max(1, Math.ceil(requiredInverterKw / inverterKw));

  // ── PANEL PRODUCT SELECTION ──────────────────────────────────────
  const panelPool = allProducts
    .filter(p => p.subCategory === 'Solar Panels' && p.category === cat)
    .sort((a, b) => productScore(b) - productScore(a));
  if (!panelPool.length) return null;
  const panelProd = panelPool[0];

  // ── EV CHARGER ──────────────────────────────────────────────────
  const homePhases2 = inputs.isThreePhase ? 3 : 1;
  let evCharger: ProductSelection | null = null;
  if (inputs.needsEV && inputs.evChargingKw > 0) {
    const evPool = allProducts
      .filter(p => {
        if (p.subCategory !== 'EV Chargers') return false;
        const minReq = p.metadata.minHomePhasesRequired ?? p.metadata.phases ?? 1;
        return minReq <= homePhases2;
      })
      .sort((a, b) => {
        const da = Math.abs((a.metadata.chargingKw ?? 0) - inputs.evChargingKw);
        const db = Math.abs((b.metadata.chargingKw ?? 0) - inputs.evChargingKw);
        return da !== db ? da - db : productScore(b) - productScore(a);
      });
    if (evPool.length) evCharger = makeSelection(evPool[0], 1);
  }

  // ── MONTHLY CALCULATIONS ─────────────────────────────────────────
  const monthly: MonthlyData[] = tariff.monthly_peak_sun_hours.map((psh, i) => {
    const gen = Math.round(systemKwp * psh * 30 * SYSTEM_EFFICIENCY);
    const selfUsed = Math.min(gen, inputs.monthlyUsageKwh);
    const exported = offGrid ? 0 : Math.max(0, gen - inputs.monthlyUsageKwh);
    const savings = (selfUsed * tariff.tariff_usd) + (exported * tariff.export_rate_usd);
    return { month: MONTHS_SHORT[i], generationKwh: gen,
      savingsUsd: Math.round(savings * 100) / 100, peakSunHours: psh };
  });

  const annualGenKwh = monthly.reduce((s, m) => s + m.generationKwh, 0);
  const annualSavings = monthly.reduce((s, m) => s + m.savingsUsd, 0);

  // EV Fuel Savings Calculation
  let evFuelSavingsUsd = 0;
  if (inputs.needsEV && inputs.evKmPerDay) {
    const annualKm = inputs.evKmPerDay * 365;
    const iceEfficiency = 10; // 10 km/L
    const evEfficiency = 6;  // 6 km/kWh
    const annualIceCost = (annualKm / iceEfficiency) * tariff.fuel_price_usd;
    const annualEvEnergyCost = (annualKm / evEfficiency) * tariff.tariff_usd;
    evFuelSavingsUsd = Math.max(0, annualIceCost - annualEvEnergyCost);
  }

  // ── COSTS ────────────────────────────────────────────────────────
  const panelSel = makeSelection(panelProd, panelCount);
  const invSel = makeSelection(bestInverter, inverterCount);

  const components = panelSel.totalUsd + invSel.totalUsd
    + (batteries?.totalUsd ?? 0) + (evCharger?.totalUsd ?? 0);
  const discComps = panelSel.discountedTotalUsd + invSel.discountedTotalUsd
    + (batteries?.discountedTotalUsd ?? 0) + (evCharger?.discountedTotalUsd ?? 0);

  const install = Math.round(discComps * tariff.installation_multiplier);
  const bos = Math.round(discComps * tariff.bos_multiplier);
  const total = components + install + bos;
  const discTotal = discComps + install + bos;

  const totalAnnualBenefit = annualSavings + evFuelSavingsUsd;
  const breakEven = totalAnnualBenefit > 0
    ? Math.round((discTotal / totalAnnualBenefit) * 10) / 10 : 99;
  const lifetimeSavings = Math.round(totalAnnualBenefit * 25 - discTotal);

  return {
    panels: panelSel, inverters: invSel, batteries, evCharger,
    roofAreaRequiredM2: Math.ceil(panelCount * pSpec.area_m2),
    roofAreaActualM2: Math.ceil(actualRoof),
    panelCount, systemKwp, offGrid,
    monthly, annualGenerationKwh: Math.round(annualGenKwh),
    annualSavingsUsd: Math.round(annualSavings * 100) / 100,
    evFuelSavingsUsd: Math.round(evFuelSavingsUsd),
    costBreakdown: { components, discountedComponents: discComps,
      installation: install, bos, total, discountedTotal: discTotal },
    breakEvenYears: breakEven,
    lifetimeSavings25Yr: lifetimeSavings,
    country: tariff,
  };
}
