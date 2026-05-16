import type { CountryProfile } from "../src/types";
import { BRAZIL_MANDATES } from "./brazil-mandates";
import { BRAZIL_INSIGHTS } from "./brazil-insights";

// Brazil — water sector PIR snapshot
// Sources: FAOLEX (https://www.fao.org/faolex/) where indexed; Planalto
// (https://www.planalto.gov.br/) is the canonical Brazilian government source for
// federal law and is used where FAOLEX coverage is absent. Local copies of the
// canonical HTML for the ~10 core federal instruments live under documents/brazil/
// (see manifest.json); article references have been verified against those copies.
// Coverage status legend: green = law + regulator + practice broadly aligned;
// yellow = law exists but implementation/regulation partial; red = significant gap.
// All entries carry last_verified_date; reviewers should re-check sources annually.

const today = "2026-05-16";

export const BRAZIL: CountryProfile = {
  code: "BRA",
  name: "Brazil",
  flag_emoji: "🇧🇷",
  intro:
    "Brazil's water sector is shaped by the 1988 Federal Constitution (which distributes water domain between the Union and the States and assigns municipalities as titular holders of local sanitation services), the 1997 National Water Resources Policy (PNRH, Law 9.433), the 2000 law creating the National Water Agency (ANA, Law 9.984), the 2007 National Basic Sanitation Policy (Law 11.445) and the transformational 2020 New Sanitation Legal Framework (Marco Legal, Law 14.026), which expanded ANA's mandate to issue reference norms for sanitation regulation and set universal-access targets for 2033.",
  last_updated: today,
  subsectors: [
    // -----------------------------------------------------------------------
    // 1. URBAN WATER SUPPLY & SANITATION
    // -----------------------------------------------------------------------
    {
      key: "wss_urban",
      label: "Urban Water Supply & Sanitation",
      wsip_solutions: [1, 2],
      headline:
        "The 2020 Marco Legal (Law 14.026) is the single biggest reform of Brazil's sanitation framework in a generation. It expanded ANA's mandate to issue national reference norms, mandated regionalization, set universal access targets for 2033 (99% water, 90% sanitation), and ended direct (non-bid) contracts with state sanitation companies.",
      reform_lessons: [
        "Legal reform alone is insufficient: 14.026 mandated regionalization but implementation lags in several states.",
        "ANA's reference norms (NRs) only bind state regulators that adhere — adoption is voluntary and uneven.",
        "Transparent tariff methodology under ANA NRs has improved investor confidence and crowded in private capital (cited as a Solution 1 lesson in WSIP Annex III).",
      ],
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "National Basic Sanitation Policy",
              short: "Law 11.445/2007",
              year: 2007,
              type: "framework_law",
              faolex_id: "LEX-FAOC074469",
              faolex_url:
                "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC074469",
              articles_cited: "Art. 2 (principles), Art. 9 (titular holder), Art. 22 (regulation)",
            },
            {
              title: "New Sanitation Legal Framework (Marco Legal)",
              short: "Law 14.026/2020",
              year: 2020,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2020/lei/l14026.htm",
              articles_cited:
                "Art. 8B (ANA reference norms), Art. 11B (regionalization), Art. 11A (universal targets)",
              note: "Pending FAOLEX indexing confirmation; verified against Diário Oficial.",
            },
            {
              title: "National Basic Sanitation Plan (PLANSAB)",
              short: "PLANSAB",
              year: 2013,
              type: "plan",
              faolex_id: null,
              faolex_url: null,
              note: "10-year planning instrument under Law 11.445; revised periodically.",
            },
          ],
          responsible_institutions: [
            {
              name: "Ministry of Cities",
              acronym: "MCidades",
              role: "policy_maker",
              level: "national",
              url: "https://www.gov.br/cidades/",
            },
          ],
          mandate_text:
            "Federal policy sets the principles, targets and planning instruments for urban WSS; municipalities, as constitutional titular holders, formulate municipal sanitation plans that must be consistent with federal policy and PLANSAB.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "Federal Constitution",
              short: "CF/1988",
              year: 1988,
              type: "constitution",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.planalto.gov.br/ccivil_03/constituicao/constituicao.htm",
              articles_cited: "Art. 30 (municipal local interest), Art. 175 (concessions)",
            },
            {
              title: "Marco Legal do Saneamento",
              short: "Law 14.026/2020",
              year: 2020,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              articles_cited: "Art. 10 (contracts), Art. 11 (bidding requirement)",
            },
          ],
          responsible_institutions: [
            {
              name: "Municipalities (titular holders)",
              role: "policy_maker",
              level: "local",
            },
            {
              name: "State Sanitation Companies (CESBs) — Sabesp, Copasa, Cedae, Sanepar, Embasa, etc.",
              role: "service_provider",
              level: "state",
            },
            {
              name: "Municipal sanitation operators (autarquias and SAAEs)",
              role: "service_provider",
              level: "local",
            },
            {
              name: "Private operators (concessionaires under Law 14.026 competitive bids)",
              role: "service_provider",
              level: "local",
            },
          ],
          mandate_text:
            "Municipalities own the service; service provision is delegated by contract, which since Law 14.026 must be awarded through a competitive process (ending the historical pattern of direct contracts with state companies). Regionalization is mandatory under Art. 11B for grouping municipalities to achieve economic-financial viability.",
          de_facto_note:
            "Regionalization implementation lags in several states; some state CESBs (e.g., Sabesp privatization 2024) have shifted toward private capital while others retain public control.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "Federal Constitution",
              short: "CF/1988",
              year: 1988,
              type: "constitution",
              faolex_id: null,
              faolex_url: null,
              articles_cited: "Art. 23, IX (concurrent competence for housing and sanitation)",
            },
            {
              title: "Marco Legal — Regionalization provisions",
              short: "Law 14.026/2020, Art. 8-B and 11-B",
              year: 2020,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
            },
          ],
          responsible_institutions: [
            {
              name: "União (Federal Government)",
              role: "policy_maker",
              level: "national",
            },
            {
              name: "States (regionalization design)",
              role: "policy_maker",
              level: "state",
            },
            {
              name: "Municipalities (titular holders)",
              role: "policy_maker",
              level: "local",
            },
          ],
          mandate_text:
            "Three-tier responsibility: federal sets policy & reference norms (post-14.026 via ANA); states design regional service structures (microrregiões or blocos); municipalities hold concession authority and sign delegation contracts.",
          de_facto_note:
            "Tension between municipal autonomy (constitutional) and state-led regionalization (14.026) has produced litigation in several states; STF has generally upheld 14.026's regionalization model.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "Marco Legal — financing and capital structure",
              short: "Law 14.026/2020",
              year: 2020,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              articles_cited: "Art. 50 (federal funding conditionalities)",
            },
            {
              title: "Law 11.445/2007 — tariff principles",
              short: "Law 11.445/2007",
              year: 2007,
              type: "framework_law",
              faolex_id: "LEX-FAOC074469",
              faolex_url:
                "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC074469",
              articles_cited: "Art. 29 (economic-financial sustainability), Art. 30 (tariff structure)",
            },
          ],
          responsible_institutions: [
            { name: "BNDES (Brazilian Development Bank)", role: "policy_maker", level: "national" },
            { name: "Caixa Econômica Federal", role: "policy_maker", level: "national" },
            { name: "Ministry of Cities (FNHIS/FUNASA legacy programs)", role: "policy_maker", level: "national" },
            { name: "ANA (reference norms on tariffs and economic regulation)", role: "regulator", level: "national" },
          ],
          mandate_text:
            "Tariffs must cover economic and financial sustainability (Law 11.445 Art. 29); federal grants and BNDES/CAIXA lending conditioned on legal compliance with 14.026 (universal-access trajectory, competitive contracting). Domestic debt markets and infrastructure debentures have been mobilized for water/sanitation (Brazil cited in WSIP Figure 15 for domestic debt finance).",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "Law 9.984/2000 (as amended by 14.026) — ANA mandate",
              short: "Law 9.984/2000",
              year: 2000,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.planalto.gov.br/ccivil_03/leis/l9984.htm",
              articles_cited: "Art. 4-A (sanitation reference norms)",
            },
            {
              title: "ANA Reference Norms (NRs)",
              short: "ANA NRs",
              year: 2022,
              type: "regulation",
              faolex_id: null,
              faolex_url: null,
              national_url: "https://www.gov.br/ana/pt-br/assuntos/saneamento-basico/normas-de-referencia",
              note: "Series of norms on tariffs, service quality, transparency, and indicators issued from 2021 onwards.",
            },
          ],
          responsible_institutions: [
            { name: "ANA — National Water and Basic Sanitation Agency", acronym: "ANA", role: "regulator", level: "national", url: "https://www.gov.br/ana/" },
            { name: "ARSESP (São Paulo state regulator)", role: "regulator", level: "state" },
            { name: "ARSAE-MG (Minas Gerais state regulator)", role: "regulator", level: "state" },
            { name: "AGENERSA (Rio de Janeiro state regulator)", role: "regulator", level: "state" },
          ],
          mandate_text:
            "Post-2020, ANA issues national reference norms (NRs) on tariff methodology, service quality and indicators; state and regional regulators retain tariff-setting authority but must adopt NRs to remain eligible for federal funds.",
          de_facto_note:
            "Adoption of ANA NRs by state regulators is uneven; some are fully harmonized, others still operate legacy methodologies. State regulator capacity varies considerably.",
          last_verified_date: today,
        },
        {
          pir_dimension: "resilience",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "Law 12.608/2012 — National Civil Protection and Defense Policy",
              short: "Law 12.608/2012",
              year: 2012,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
            },
            {
              title: "ANA NR on Contingency and Emergency Plans (operators)",
              short: "ANA NR — Contingency",
              year: 2023,
              type: "regulation",
              faolex_id: null,
              faolex_url: null,
            },
          ],
          responsible_institutions: [
            { name: "ANA (norms for operator contingency)", role: "regulator", level: "national" },
            { name: "Service providers (must hold contingency plans)", role: "service_provider", level: "local" },
            { name: "Civil Defense (national + state)", role: "policy_maker", level: "national" },
          ],
          mandate_text:
            "Operators must hold contingency plans for water-supply emergencies. Climate-resilience requirements are emerging through ANA NRs and through the 2024-2027 PLANSAB update, but a single integrated climate-resilience regulation for urban WSS is not yet in force.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 2. RURAL WATER SUPPLY & SANITATION
    // -----------------------------------------------------------------------
    {
      key: "wss_rural",
      label: "Rural Water Supply & Sanitation",
      wsip_solutions: [3],
      headline:
        "Rural WSS is covered by the same Law 11.445/2007 and Law 14.026/2020 framework as urban, but with specific programs (PNSR — National Rural Sanitation Program) and weaker regulatory uptake.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "Law 11.445/2007 — Basic Sanitation (covers rural)",
              short: "Law 11.445/2007",
              year: 2007,
              type: "framework_law",
              faolex_id: "LEX-FAOC074469",
              faolex_url:
                "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC074469",
            },
            {
              title: "National Rural Sanitation Program (PNSR)",
              short: "PNSR",
              year: 2019,
              type: "plan",
              faolex_id: null,
              faolex_url: null,
              note: "Coordinated by FUNASA / Ministry of Health and Ministry of Cities.",
            },
          ],
          responsible_institutions: [
            { name: "Ministry of Cities", role: "policy_maker", level: "national" },
            { name: "FUNASA (Fundação Nacional de Saúde — rural water historically)", role: "policy_maker", level: "national" },
          ],
          mandate_text:
            "Federal policy includes rural WSS within the basic sanitation framework; PNSR sets specific implementation guidelines. Municipalities remain titular holders for rural areas within their jurisdiction.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "red",
          legal_instruments: [
            {
              title: "Law 11.445/2007",
              short: "Law 11.445/2007",
              year: 2007,
              type: "framework_law",
              faolex_id: "LEX-FAOC074469",
              faolex_url:
                "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC074469",
            },
          ],
          responsible_institutions: [
            { name: "Community-based operators (informal / SISAR-type)", role: "service_provider", level: "local" },
            { name: "Municipalities", role: "service_provider", level: "local" },
            { name: "FUNASA (technical support)", role: "policy_maker", level: "national" },
          ],
          mandate_text:
            "Institutional architecture for rural WSS is fragmented: community-based associations (e.g., SISAR networks in Ceará and other Northeast states) coexist with municipal direct provision; many small communities lack any formal operator.",
          de_facto_note:
            "Legal mandate for rural service is present but operationalization is patchy; SISAR models are well-documented success cases but not replicated nationally.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "PPA (Plano Plurianual) appropriations to FUNASA / PNSR",
              short: "PPA / PNSR",
              year: 2024,
              type: "plan",
              faolex_id: null,
              faolex_url: null,
            },
          ],
          responsible_institutions: [
            { name: "FUNASA / Ministry of Health", role: "policy_maker", level: "national" },
            { name: "Ministry of Cities", role: "policy_maker", level: "national" },
          ],
          mandate_text:
            "Rural WSS financing relies heavily on federal grants (FUNASA/PNSR), with limited tariff revenue and weak access to private capital.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "red",
          legal_instruments: [],
          responsible_institutions: [
            { name: "ANA (NRs apply formally but rural compliance limited)", role: "regulator", level: "national" },
          ],
          mandate_text:
            "Formal regulation of rural WSS is weak; ANA NRs apply but small/community operators are largely outside the regulated perimeter.",
          de_facto_note:
            "Significant de jure–de facto gap: rural services are legally within the regulatory framework but in practice operate informally.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 3. WASTEWATER, REUSE & DESALINATION
    // -----------------------------------------------------------------------
    {
      key: "wastewater_reuse_desal",
      label: "Wastewater, Reuse & Desalination",
      wsip_solutions: [2],
      headline:
        "Wastewater is covered by both the sanitation framework (Law 11.445 / 14.026) and the environmental framework (CONAMA Resolutions on effluent standards). Reuse is governed by CONAMA Resolution 54/2005 and CNRH Resolution 121/2010.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "Law 11.445/2007 (sanitation includes sewage)",
              short: "Law 11.445/2007",
              year: 2007,
              type: "framework_law",
              faolex_id: "LEX-FAOC074469",
              faolex_url:
                "https://www.fao.org/faolex/results/details/en/c/LEX-FAOC074469",
            },
            {
              title: "Marco Legal — universal targets including 90% sewage treatment by 2033",
              short: "Law 14.026/2020",
              year: 2020,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
            },
            {
              title: "CONAMA Resolution 430/2011 — effluent discharge standards",
              short: "CONAMA 430/2011",
              year: 2011,
              type: "resolution",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.gov.br/mma/pt-br/assuntos/ecossistemas-1/conservacao-1/conselho-nacional-do-meio-ambiente-conama",
            },
          ],
          responsible_institutions: [
            { name: "Ministry of Cities (sanitation policy)", role: "policy_maker", level: "national" },
            { name: "CONAMA (environmental standards)", role: "policy_maker", level: "national" },
            { name: "CNRH (water reuse policy)", role: "policy_maker", level: "national" },
          ],
          mandate_text:
            "Policy framework treats sewage as part of basic sanitation and effluent quality as part of environmental policy; reuse is recognized as a water-resource management tool (CNRH Res. 121/2010).",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "CONAMA 430/2011",
              short: "CONAMA 430/2011",
              year: 2011,
              type: "resolution",
              faolex_id: null,
              faolex_url: null,
            },
            {
              title: "ANA NR — sewage service indicators",
              short: "ANA NR sewage",
              year: 2022,
              type: "regulation",
              faolex_id: null,
              faolex_url: null,
            },
          ],
          responsible_institutions: [
            { name: "Environmental agencies (state, e.g. CETESB, INEA, IGAM)", role: "regulator", level: "state" },
            { name: "ANA (sanitation service indicators)", role: "regulator", level: "national" },
            { name: "State sanitation regulators", role: "regulator", level: "state" },
          ],
          mandate_text:
            "Effluent quality is regulated by state environmental agencies under CONAMA standards; service-level performance (collection, treatment coverage) is regulated under ANA NRs and state sanitation regulators.",
          de_facto_note:
            "Only ~50% of collected sewage is treated nationally (SNIS data); enforcement is uneven across states.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "Marco Legal — bankability provisions",
              short: "Law 14.026/2020",
              year: 2020,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
            },
          ],
          responsible_institutions: [
            { name: "BNDES (PPP project preparation)", role: "policy_maker", level: "national" },
            { name: "Private operators / SPVs", role: "service_provider", level: "local" },
          ],
          mandate_text:
            "Wastewater treatment PPPs and concessions have been a major financing channel since 2020; large-scale auctions (e.g., Cedae-RJ, Sabesp privatization 2024) have mobilized billions in private capital.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 4. WATER RESOURCES MANAGEMENT (BASIN / SURFACE)
    // -----------------------------------------------------------------------
    {
      key: "wrm_basin",
      label: "Water Resources Management (Basin / Surface)",
      wsip_solutions: [7],
      headline:
        "Brazil's WRM is governed by the 1997 PNRH (Law 9.433), one of the most modern water laws globally: water as a public good with economic value, decentralized basin-level management, multiple uses, and instruments including water rights (outorga), water charging, and basin plans.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "National Water Resources Policy (PNRH)",
              short: "Law 9.433/1997",
              year: 1997,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.planalto.gov.br/ccivil_03/leis/l9433.htm",
              articles_cited:
                "Art. 1 (fundamentals), Art. 5 (instruments: plans, outorga, charging, classification, info system, enforcement)",
              note: "Pending FAOLEX index confirmation; full text available via Planalto.",
            },
            {
              title: "Federal Constitution",
              short: "CF/1988",
              year: 1988,
              type: "constitution",
              faolex_id: null,
              faolex_url: null,
              articles_cited:
                "Art. 21 XIX (federal water resource policy), Art. 26 I (state waters)",
            },
          ],
          responsible_institutions: [
            { name: "Ministry of Environment and Climate Change", role: "policy_maker", level: "national" },
            { name: "CNRH — National Water Resources Council", role: "policy_maker", level: "national" },
          ],
          mandate_text:
            "PNRH establishes a decentralized, participatory model with basin as the management unit; basin plans, water rights (outorga), water-use charging, classification, and the national water resources information system are the legal instruments.",
          last_verified_date: today,
        },
        {
          pir_dimension: "institutions",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "Law 9.984/2000 — ANA",
              short: "Law 9.984/2000",
              year: 2000,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.planalto.gov.br/ccivil_03/leis/l9984.htm",
            },
            {
              title: "PNRH — SINGREH structure",
              short: "Law 9.433/1997",
              year: 1997,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              articles_cited: "Art. 33 (SINGREH composition)",
            },
          ],
          responsible_institutions: [
            { name: "ANA — federal waters regulator", role: "regulator", level: "national" },
            { name: "CNRH", role: "policy_maker", level: "national" },
            { name: "State Water Resources Councils", role: "policy_maker", level: "state" },
            { name: "Basin Committees (Comitês de Bacia)", role: "user_rep", level: "basin" },
            { name: "Basin Agencies (e.g., AGEVAP, ABHA, ADASA-DF)", role: "basin_org", level: "basin" },
            { name: "State water-resource agencies (e.g., DAEE-SP, IGAM-MG, INEMA-BA)", role: "regulator", level: "state" },
          ],
          mandate_text:
            "SINGREH (National Water Resources Management System) is a multi-level, participatory structure: CNRH at federal level, state councils, basin committees and basin agencies for operational management; ANA regulates federal-domain waters.",
          last_verified_date: today,
        },
        {
          pir_dimension: "igc",
          coverage_status: "green",
          legal_instruments: [
            {
              title: "Federal Constitution — water domain",
              short: "CF/1988",
              year: 1988,
              type: "constitution",
              faolex_id: null,
              faolex_url: null,
              articles_cited: "Art. 20 III, Art. 26 I",
            },
          ],
          responsible_institutions: [
            { name: "União (federal waters: transboundary, interstate)", role: "asset_owner", level: "national" },
            { name: "States (state waters: within a single state)", role: "asset_owner", level: "state" },
          ],
          mandate_text:
            "Constitution distinguishes federal waters (interstate/transboundary, federal lakes, ground-water-of-federal-interest) from state waters; ANA regulates the former, state agencies the latter.",
          last_verified_date: today,
        },
        {
          pir_dimension: "financing",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "PNRH — water-use charging",
              short: "Law 9.433/1997",
              year: 1997,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              articles_cited: "Art. 19-22 (cobrança pelo uso da água)",
            },
          ],
          responsible_institutions: [
            { name: "Basin Committees (set charging values)", role: "user_rep", level: "basin" },
            { name: "Basin Agencies (collect and re-invest)", role: "basin_org", level: "basin" },
            { name: "ANA (federal basins)", role: "regulator", level: "national" },
          ],
          mandate_text:
            "Water-use charging is mandatory in principle and revenue is earmarked for basin investments; in practice, charging is operational in only a subset of basins (PCJ, Paraíba do Sul, Doce, São Francisco, federal Paraíba and a handful of state basins).",
          de_facto_note:
            "De jure–de facto gap: charging is universally provided for by law but unevenly implemented across basins, reflecting political-economy difficulties in setting values.",
          last_verified_date: today,
        },
      ],
    },

    // -----------------------------------------------------------------------
    // 5. FLOOD & DROUGHT
    // -----------------------------------------------------------------------
    {
      key: "flood_drought",
      label: "Flood & Drought Risk Management",
      wsip_solutions: [6],
      headline:
        "Flood and drought management sits at the intersection of civil defense (Law 12.608/2012), water resources policy (PNRH), and dam safety (Law 12.334/2010). WSIP Figure 9 cites Brazil's Ministry of National Integration as a drought-monitoring success case.",
      cells: [
        {
          pir_dimension: "policy",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "National Civil Protection and Defense Policy",
              short: "Law 12.608/2012",
              year: 2012,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.planalto.gov.br/ccivil_03/_ato2011-2014/2012/lei/l12608.htm",
            },
            {
              title: "National Dam Safety Policy",
              short: "Law 12.334/2010",
              year: 2010,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
              national_url:
                "https://www.planalto.gov.br/ccivil_03/_ato2007-2010/2010/lei/l12334.htm",
            },
          ],
          responsible_institutions: [
            { name: "Ministry of Regional Integration & Development", role: "policy_maker", level: "national" },
            { name: "Ministry of Environment and Climate Change", role: "policy_maker", level: "national" },
            { name: "ANA (dam safety for water-resource dams)", role: "regulator", level: "national" },
          ],
          mandate_text:
            "Civil-defense framework covers disaster risk reduction broadly; PNRH covers droughts as a water-resource issue; dam safety has its own dedicated law and regulator (ANA for water-resource dams, ANEEL for hydropower dams, DNPM for mining dams).",
          de_facto_note:
            "Mariana (2015) and Brumadinho (2019) tailings-dam disasters revealed regulatory and enforcement gaps that prompted Law 14.066/2020 strengthening dam safety.",
          last_verified_date: today,
        },
        {
          pir_dimension: "regulation",
          coverage_status: "yellow",
          legal_instruments: [
            {
              title: "Law 14.066/2020 — strengthens National Dam Safety Policy",
              short: "Law 14.066/2020",
              year: 2020,
              type: "framework_law",
              faolex_id: null,
              faolex_url: null,
            },
          ],
          responsible_institutions: [
            { name: "ANA (water-resource dams)", role: "regulator", level: "national" },
            { name: "ANEEL (hydropower dams)", role: "regulator", level: "national" },
            { name: "ANM (mining tailings dams)", role: "regulator", level: "national" },
          ],
          mandate_text:
            "Dam safety is regulated by sector — water resources (ANA), hydropower (ANEEL), and mining (ANM). Operators must register, classify risk, hold safety plans and emergency action plans.",
          last_verified_date: today,
        },
      ],
    },
  ],
  mandate_records: BRAZIL_MANDATES,
  key_insights: BRAZIL_INSIGHTS,
};
