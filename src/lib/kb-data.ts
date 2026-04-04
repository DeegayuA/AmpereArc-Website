export interface KBArticle {
  id: string;
  slug: string;
  title: string;
  category: "Solar Basics" | "Hardware" | "Financials" | "Installation" | "Company";
  excerpt: string;
  content: string; // Markdown supported
  tags: string[];
  lastUpdated: string;
  readTime: string;
}

export const kbArticles: KBArticle[] = [
  {
    id: "kb-001",
    slug: "how-net-metering-works",
    title: "How Net Metering Works in Sri Lanka",
    category: "Solar Basics",
    excerpt: "Understand the differences between Net Metering, Net Accounting, and Net Plus schemes.",
    content: `
# Understanding Net Metering in Sri Lanka

Solar energy in Sri Lanka is governed by three primary schemes. Choosing the right one depends on your consumption and investment goals.

## 1. Net Metering
In this scheme, you are only billed for the "Net" energy you consume. If your system produces 400 units and you use 350, you carry forward 50 units to the next month as credit. No payment is made by the utility to you.

## 2. Net Accounting
If your generation exceeds your consumption, the utility (CEB/LECO) pays you for the excess units at a fixed rate (currently around 37 LKR per unit for the first 20 years).

## 3. Net Plus
In Net Plus, the total generation of the solar system is fed directly to the grid. You are paid for every unit generated, and your home consumption is billed separately. This is ideal for investors with large roof spaces.

**Pro Tip:** For most residential users, **Net Accounting** offers the best balance of savings and income.
    `,
    tags: ["net-metering", "savings", "legal"],
    lastUpdated: "2024-03-20",
    readTime: "5 min"
  },
  {
    id: "kb-002",
    slug: "battery-safety-maintenance",
    title: "Solar Battery Safety & Maintenance",
    category: "Hardware",
    excerpt: "Best practices for ensuring your LFP battery life and safe operation.",
    content: `
# Solar Battery Maintenance Guide

AmpereArc uses Lithium Iron Phosphate (LiFePO4) technology, which is the safest and longest-lasting chemistry available. Here's how to maximize its life.

## Temperature Control
Batteries perform best between 20°C and 30°C. Ensure your battery room has adequate ventilation. Avoid placing batteries in direct sunlight or sealed enclosures without airflow.

## Depth of Discharge (DoD)
While AmpereArc batteries can handle 90% DoD, setting your inverter to a conservative **80% DoD** can extend the lifecycle from 6,000 to nearly 8,000 cycles.

## Visual Checks
Once every 6 months, check the terminal connections for any signs of oxidation or loosening. Ensure the monitoring lights are solid green.

**Warning:** Never attempt to open the battery casing. Always contact an AmpereArc certified technician for internal maintenance.
    `,
    tags: ["battery", "safety", "maintenance"],
    lastUpdated: "2024-03-25",
    readTime: "4 min"
  },
  {
    id: "kb-003",
    slug: "calculating-solar-roi",
    title: "Calculating Your Solar ROI",
    category: "Financials",
    excerpt: "A step-by-step guide to calculating the payback period of your solar investment.",
    content: `
# The Math of Solar: Calculating ROI

A common question is: "How fast will this system pay for itself?" In Sri Lanka, the average ROI is currently between **3 to 5 years**.

## The Formula
1. **Total System Cost** (e.g., 1,500,000 LKR)
2. **Monthly Savings** (e.g., 35,000 LKR saving on electricity bill)
3. **Annual Savings** = 35,000 * 12 = 420,000 LKR
4. **Payback Period** = 1,500,000 / 420,000 = **3.57 Years**

## Factors to Consider
- **Efficiency Degradation:** Panels lose about 0.5% efficiency per year.
- **Electricity Price Hikes:** As utility rates go up, your ROI actually builds faster because your avoided cost is higher.
- **Maintenance Cost:** Usually negligible for the first 10 years if using high-quality components.
    `,
    tags: ["roi", "finance", "investment"],
    lastUpdated: "2024-04-01",
    readTime: "6 min"
  },
  {
    id: "kb-004",
    slug: "inverter-error-codes",
    title: "Common Inverter Error Codes",
    category: "Hardware",
    excerpt: "Quick troubleshooting guide for your AmpereArc hybrid inverter.",
    content: `
# Inverter Troubleshooting

If your inverter shows a red light or an error code on the LCD, don't panic. Most issues are external to the device.

## Code F01: DC Overvoltage
The panels are producing more voltage than the inverter can handle. This usually happens in very cold, bright weather. The system will automatically resume when voltage drops.

## Code F08: Grid Out of Range
The utility grid voltage is too high or too low. The inverter disconnects to protect your home. It will reconnect once the grid stabilizes for 60 seconds.

## Code F13: Battery Communication Lost
The BMS cable between the battery and inverter might be loose. Check the RJ45 cable and ensure it's clicked in place.

**Need Help?** Use the WhatsApp button in the Portal to send a photo of the error code to our support team.
    `,
    tags: ["inverter", "troubleshooting", "error-codes"],
    lastUpdated: "2024-04-02",
    readTime: "3 min"
  },
  {
    id: "kb-005",
    slug: "three-phase-vs-single-phase",
    title: "Three Phase vs Single Phase Systems",
    category: "Solar Basics",
    excerpt: "Which electrical supply does your home need for a solar installation?",
    content: `
# Phase Selection: 1 vs 3

Understanding your existing electrical supply is crucial for selecting the right hardware.

## Single Phase (1-Phase)
Most small to medium homes use single-phase power. Our **5kW Hybrid Inverter** is optimized for this. It's cost-effective and simple to install.

## Three Phase (3-Phase)
Large homes with multiple A/C units, pools, or elevators require three-phase power to balance the load. For these, we recommend our **10kW or 15kW Commercial series**.

## Can I Upgrade?
Yes, you can upgrade your home from single to three-phase through your utility provider. This is recommended if you plan to install a large car charger (above 7kW) or a system larger than 5kWp.
    `,
    tags: ["phases", "electrical", "inverter"],
    lastUpdated: "2024-04-03",
    readTime: "4 min"
  }
];
