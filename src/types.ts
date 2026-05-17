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
  mandate_records?: MandateRecord[];
  key_insights?: KeyInsight[];
}

// Distinct from InstitutionRole (which describes WHAT a body is, regulator, asset owner, etc.).
// MandateFunction describes the FUNCTION an actor performs in the water-sector value chain,
// for the swim-lane mandate diagram on the country dashboard.
export type MandateFunction =
  | "policy"
  | "norm_setting"
  | "regulation"
  | "planning"
  | "service_delivery"
  | "financing";

export interface MandateLegalBasis {
  short: string; // e.g., "Law 14.026/2020"
  article: string; // e.g., "Art. 4-A"
  faolex_url?: string;
  national_url?: string;
  verbatim_short?: string; // <= 15-word paraphrase from the verified PDF/HTML text
}

export interface MandateRecord {
  actor: string;
  acronym?: string;
  level: GovernmentLevel; // reuses existing values: national | state | local | basin
  function: MandateFunction;
  legal_basis: MandateLegalBasis;
  de_facto_note?: string;
}

export interface KeyInsight {
  title: string; // <= 12 words
  body: string; // <= 50 words
  legal_basis: MandateLegalBasis;
  pir_dimension?: PirDimension;
  wsip_solution_id?: WsipSolutionId;
  severity: "tension" | "gap" | "strength";
}
