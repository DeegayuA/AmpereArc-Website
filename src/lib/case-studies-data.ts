import { Building2, Home, Globe } from "lucide-react";

export interface CaseStudy {
  id: string;
  title: string;
  location: string;
  type: "Commercial" | "Residential" | "Industrial";
  icon: any;
  image: string;
  impact: string;
  desc: string;
  slug: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "p1",
    slug: "solar-max-manchester",
    title: "Project Solar-Max",
    location: "Manchester, UK",
    type: "Commercial",
    icon: Building2,
    image: "https://images.unsplash.com/photo-1508514177221-18d14037b7b2?q=80&w=1000&auto=format&fit=crop",
    impact: "65% Grid Independence",
    desc: "Implementing a multi-MW BESS for a distribution center to optimize energy usage during peak shipping seasons."
  },
  {
    id: "p2",
    slug: "eco-village-alpha",
    title: "Eco-Village Alpha",
    location: "Berlin, DE",
    type: "Residential",
    icon: Home,
    image: "https://images.unsplash.com/photo-1594818821917-3105aef25abc?q=80&w=1000&auto=format&fit=crop",
    impact: "Net-Zero Status",
    desc: "A cluster of 15 designer homes interconnected with a shared AmpereArc energy grid for maximum communal autonomy."
  },
  {
    id: "p3",
    slug: "grid-edge-enterprise",
    title: "Grid-Edge Enterprise",
    location: "Sri Lanka",
    type: "Industrial",
    icon: Globe,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?q=80&w=1000&auto=format&fit=crop",
    impact: "Uninterrupted Uptime",
    desc: "Securing a critical data center facility with 2.5MWh of AmpereArc storage for seamless islanded operation."
  }
];
