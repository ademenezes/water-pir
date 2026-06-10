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
  targets?: SectorTarget[];
  monitoring?: MonitoringIndicator[];
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

// Sector targets & ambitions: a typed KPI layer, distinct from the de-jure
// mandate map. Captures what a country (or its regulator, a ministry, or an
// endorsed assessment) has committed to, including the honest cases where no
// quantified target exists. Drives the "Targets & ambitions" panel on the
// country dashboard. Optional on CountryProfile.
export type TargetDomain =
  | "water_access"
  | "sanitation"
  | "performance"
  | "financing"
  | "wrm";

// How real the target is. Picks up the coverage mental model: a firm quantified
// target reads like a strength, an absent one like a gap.
export type TargetStatus =
  | "set" // quantified target with a horizon
  | "slipping" // target exists but the deadline has been pushed back
  | "qualitative" // stated ambition, no number
  | "to_be_determined" // placeholder, value not yet fixed
  | "not_set"; // no national target exists

export interface SectorTarget {
  domain: TargetDomain;
  level?: GovernmentLevel; // national | state | local | basin; omitted reads as national
  indicator: string; // what is measured, e.g. "Urban wastewater treatment plants"
  baseline?: string; // baseline value (+ year) where known
  target_value: string; // the target, or "No quantified target" / "To be determined"
  target_year?: string; // e.g. "2026", "2030"
  status: TargetStatus;
  issuing_body: string; // who set it (or "No national target")
  source: MandateLegalBasis; // reuses short + article + faolex_url / national_url
  note?: string;
}

// Sector monitoring / evidence base: a typed observability layer, distinct from
// SectorTarget (which records commitments / ambitions). Captures what a country
// actually measures today, who measures it, the current value/baseline, and where
// the monitoring blind spots are. Targets answer "what does it aim for?"; this
// answers "can it even see its own sector?". Drives the "Monitoring & evidence
// base" panel on the country dashboard. Optional on CountryProfile.
export type MonitoringDomain =
  | "water_access"
  | "sanitation"
  | "performance" // NRW, metering, service continuity
  | "resource" // hydromet, abstraction, water quality
  | "financing";

// Monitoring quality. Mapped onto the coverage palette in the panel, no new
// colour tokens: measured ≈ green, partial / stale ≈ yellow, not_measured ≈ red,
// unmapped ≈ gray. Distinguished from CoverageStatus because the signal is
// observability (is it measured, and how fresh), not legal coverage.
export type MonitoringStatus =
  | "measured" // regularly produced and current
  | "partial" // measured but incomplete coverage / proxy only
  | "stale" // exists but one-off or out of date (e.g. a 2020 survey, never refreshed)
  | "not_measured" // acknowledged blind spot, no system in place
  | "unmapped"; // not yet assessed here

export interface MonitoringIndicator {
  domain: MonitoringDomain;
  level?: GovernmentLevel; // omitted reads as national
  indicator: string; // what is measured, e.g. "Population with an improved water source"
  current_value: string; // the value, or "Not monitored" / "No system in place"
  as_of_year?: string; // freshness signal, e.g. "2020"
  producer: string; // who measures it, e.g. "GEOSTAT", or "No designated producer"
  status: MonitoringStatus;
  source: MandateLegalBasis; // reuses short + article + faolex_url / national_url
  gap_note?: string; // the blind-spot / divergence note
}
