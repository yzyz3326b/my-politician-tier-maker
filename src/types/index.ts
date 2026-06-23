export type CoalitionKey = "PH" | "BN" | "PN" | "GPS" | "GRS" | "MUDA" | "IND" | "VET";

export interface Party {
  id: string;
  name: string;
  shortName: string;
  coalition: CoalitionKey;
  color: string;
  textColor: string;
}

export interface Politician {
  id: string;
  name: string;
  party: string;
  coalition: CoalitionKey;
  role: string;
  state: string;
  photoUrl: string;
  wikiUrl?: string;
}

export interface TierConfig {
  id: string;
  label: string;
  color: string;
  rowColor: string;
}

export interface TierState {
  tiers: TierConfig[];
  items: Record<string, string[]>;
}

export const DEFAULT_TIERS: TierConfig[] = [
  { id: "S", label: "S", color: "#FF4D4D", rowColor: "rgba(255,77,77,0.15)" },
  { id: "A", label: "A", color: "#FF9F4D", rowColor: "rgba(255,159,77,0.15)" },
  { id: "B", label: "B", color: "#FFDF4D", rowColor: "rgba(255,223,77,0.15)" },
  { id: "C", label: "C", color: "#4DFF91", rowColor: "rgba(77,255,145,0.12)" },
  { id: "D", label: "D", color: "#4D9FFF", rowColor: "rgba(77,159,255,0.15)" },
  { id: "F", label: "F", color: "#C84DFF", rowColor: "rgba(200,77,255,0.15)" },
];

export const POOL_ID = "pool";
