// Core types for the Water PIR Tool data model
// Anchored to the WSIP framework (P165586, Figure 4) and the PIR framework (BOSIB, Figure 1.2)

export type WsipPillar = "people" | "food" | "planet";

export type WsipSolutionId = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface WsipSolution {
  id: WsipSolutionId;
  shortName: string;
  fullName: string;
  pillar: WsipPillar;
  description: string;
  traditionalSubsectors: string[];
}

export type PirDimension =
  | "policy"
  | "institutions"
  | "igc"
  | "financing"
  | "regulation"
  | "resilience";

export interface PirDimensionDef {
  key: PirDimension;
  label: string;
  blurb: string;
}

export type InstrumentType =
  | "constitution"
  | "framework_law"
  | "sectoral_law"
  | "decree"
  | "regulation"
  | "resolution"
  | "policy"
  | "plan";

export interface LegalInstrument {
  title: string;
  short: string;
  year: number;
  type: InstrumentType;
  faolex_id: string | null;
  faolex_url: string | null;
  national_url?: string;
  articles_cited?: string;
  note?: string;
}

export type InstitutionRole =
  | "policy_maker"
  | "asset_owner"
  | "service_provider"
  | "regulator"
  | "user_rep"
  | "basin_org";

export type GovernmentLevel = "national" | "state" | "local" | "basin";

export interface Institution {
  name: string;
  acronym?: string;
  role: InstitutionRole;
  level: GovernmentLevel;
  url?: string;
}

export type CoverageStatus = "green" | "yellow" | "red" | "gray";

export interface SubsectorPirCell {
  pir_dimension: PirDimension;
  coverage_status: CoverageStatus;
  legal_instruments: LegalInstrument[];
  responsible_institutions: Institution[];
  mandate_text: string;
  de_facto_note?: string;
  last_verified_date: string;
}

export interface SubsectorEntry {
  key: string;
  label: string;
  wsip_solutions: WsipSolutionId[];
  cells: SubsectorPirCell[];
  headline?: string;
  reform_lessons?: string[];
}

export interface CountryProfile {
  code: string;
  name: string;
  flag_emoji?: string;
  intro: string;
  last_updated: string;
  subsectors: SubsectorEntry[];
}
