import { Link, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import { WSIP_COUNTRIES } from "../../data/countries-meta";
import type { CountryStatus, CountryMeta } from "../../data/countries-meta";
import { listCountries } from "../../data";
import { Droplet } from "../components/brand/Droplet";
import { Flag } from "../components/Flag";

type Filter = "all" | "live" | "pipeline" | "planned";

const STATUS_LABEL: Record<CountryStatus, string> = {
  live: "Live",
  pipeline: "Pipeline",
  planned: "Planned",
};

export function CountriesPage() {
  const live = useMemo(() => {
    const map: Record<string, ReturnType<typeof listCountries>[number]> = {};
    listCountries().forEach((c) => {
      map[c.code] = c;
    });
    return map;
  }, []);

  const [filter, setFilter] = useState<Filter>("all");
  const [region, setRegion] = useState<string>("all");

  // The "27" framing, status tallies, and cohort glyphs describe the WSIP Water
  // Compact cohort only. Non-Compact live case studies (e.g. Georgia, compact:
  // false) render in a separate block below so the cohort numbers stay true.
  const compactCountries = useMemo(
    () => WSIP_COUNTRIES.filter((c) => c.compact !== false),
    []
  );
  const caseStudies = useMemo(
    () => WSIP_COUNTRIES.filter((c) => c.compact === false),
    []
  );

  const regions = useMemo(
    () => Array.from(new Set(WSIP_COUNTRIES.map((c) => c.region))).sort(),
    []
  );

  const matchesFilters = (c: CountryMeta) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (region !== "all" && c.region !== region) return false;
    return true;
  };

  const cohortFiltered = compactCountries.filter(matchesFilters);
  const caseStudyFiltered = caseStudies.filter(matchesFilters);

  const counts = {
    all: compactCountries.length,
    live: compactCountries.filter((c) => c.status === "live").length,
    pipeline: compactCountries.filter((c) => c.status === "pipeline").length,
    planned: compactCountries.filter((c) => c.status === "planned").length,
  };

  return (
    <div className="space-y-12">
      <header className="pt-8">
        <div className="eyebrow">Cohort</div>
        <h1 className="mt-4 font-display text-[clamp(40px,5.6vw,80px)] font-extrabold leading-[1.02] tracking-tightest text-brand-ink">
          Countries.
        </h1>
        <p className="prose-editorial mt-7 max-w-[52rem] text-[21px] italic text-brand-ink/80">
          The 27 WSIP Water Compact priority countries identified by the World
          Bank Group. Brazil is the live pilot. The rest of the cohort is
          pipelined. Each row links to the country's matrix and dashboard when
          data is available.
        </p>
      </header>

      {/* ── Small-multiples coverage glyph row ───────────────────────────── */}
      <CohortGlyphs />

      {/* ── Filters ───────────────────────────────────────────────────────── */}
      <section className="border-y border-brand-rule py-5">
        <div className="flex flex-wrap items-baseline justify-between gap-6">
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <span className="eyebrow text-brand-ink/60">Status</span>
            {(["all", "live", "pipeline", "planned"] as Filter[]).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={[
                  "font-serif text-[15px] transition-colors",
                  filter === f
                    ? "text-brand-ink underline decoration-brand-deep decoration-2 underline-offset-[6px]"
                    : "text-brand-ink/55 hover:text-brand-ink",
                ].join(" ")}
              >
                {f === "all"
                  ? `All (${counts.all})`
                  : `${STATUS_LABEL[f]} (${counts[f]})`}
              </button>
            ))}
          </div>
          <div className="flex items-baseline gap-2">
            <span className="eyebrow text-brand-ink/60">Region</span>
            <span className="relative">
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="appearance-none bg-transparent pr-5 font-serif text-[15px] text-brand-ink underline decoration-brand-rule decoration-1 underline-offset-[6px] hover:decoration-brand-deep focus:outline-none"
              >
                <option value="all">All regions</option>
                {regions.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-ink/45">
                ▾
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* ── Directory listing ─────────────────────────────────────────────── */}
      <section>
        <ul className="divide-y divide-brand-rule">
          {cohortFiltered.map((c) => (
            <CountryRow key={c.code} c={c} liveProfile={live[c.code]} />
          ))}
        </ul>

        {/* Non-Compact live case studies, kept visually distinct from the 27. */}
        {caseStudyFiltered.length > 0 && (
          <div className="mt-12 border-t-2 border-brand-ink/15 pt-8">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <div className="eyebrow">Beyond the Water Compact</div>
              <div className="eyebrow-ink text-brand-ink/55">
                Live case study, outside the 27-country cohort
              </div>
            </div>
            <ul className="mt-3 divide-y divide-brand-rule">
              {caseStudyFiltered.map((c) => (
                <CountryRow key={c.code} c={c} liveProfile={live[c.code]} />
              ))}
            </ul>
          </div>
        )}

        {cohortFiltered.length === 0 && caseStudyFiltered.length === 0 && (
          <div className="py-12 text-center font-serif italic text-brand-ink/55">
            No countries match this filter.
          </div>
        )}
      </section>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function CountryRow({
  c,
  liveProfile,
}: {
  c: CountryMeta;
  liveProfile?: ReturnType<typeof listCountries>[number];
}) {
  const navigate = useNavigate();
  const clickable = c.status === "live";
  const opacity =
    c.status === "live"
      ? "opacity-100"
      : c.status === "pipeline"
      ? "opacity-65"
      : "opacity-40";

  const inner = (
    <div className="grid grid-cols-12 items-start gap-4 py-6 group">
      <div className="col-span-12 md:col-span-1 flex items-start">
        <span className="text-[32px] leading-none">
          <Flag emoji={c.flag} title={c.name} className="rounded-[3px]" />
        </span>
      </div>

      <div className="col-span-12 md:col-span-5">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-display text-[22px] font-extrabold leading-tight tracking-tightest text-brand-ink">
            {c.name}
          </span>
          {c.compact === false && (
            <span className="border border-brand-rule px-1.5 py-0.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-brand-ink/50">
              Non-compact
            </span>
          )}
        </div>
        <div className="mt-1 eyebrow-ink text-brand-ink/55">
          {c.code}&nbsp;·&nbsp;{c.region}
        </div>
        {c.blurb && (
          <p className="mt-3 font-serif text-[14px] leading-[1.55] text-brand-ink/75 max-w-[36rem]">
            {c.blurb}
          </p>
        )}
      </div>

      <div className="col-span-6 md:col-span-2">
        <div className="eyebrow text-brand-ink/55">Status</div>
        <div className="mt-1 flex items-center gap-2 font-serif text-[15px] text-brand-ink">
          <Droplet
            variant={
              c.status === "live"
                ? "filled"
                : c.status === "pipeline"
                ? "outline"
                : "dotted"
            }
            color={
              c.status === "live"
                ? "#0FAACB"
                : c.status === "pipeline"
                ? "#0F2A44"
                : "#9ca3af"
            }
            size={18}
          />
          {STATUS_LABEL[c.status]}
        </div>
      </div>

      <div className="col-span-6 md:col-span-2">
        {liveProfile ? (
          <>
            <div className="eyebrow text-brand-ink/55">Sub-sectors</div>
            <div className="mt-1 font-display text-[20px] font-extrabold tabular-nums leading-none text-brand-deep">
              {liveProfile.subsectors.length}
            </div>
            <div className="mt-1 eyebrow-ink text-brand-ink/55">
              Updated&nbsp;
              <span className="tabular-nums">{liveProfile.last_updated}</span>
            </div>
          </>
        ) : (
          <div className="font-serif italic text-[13px] text-brand-ink/45">
            {c.status === "pipeline" ? "Data forthcoming" : "Not yet planned"}
          </div>
        )}
      </div>

      <div className="col-span-12 md:col-span-2 md:text-right">
        {clickable ? (
          <div className="flex flex-col items-start gap-1 md:items-end">
            <Link
              to={`/country/${c.code}`}
              onClick={(e) => e.stopPropagation()}
              className="link-editorial font-display text-[14px] font-semibold tracking-[0.02em]"
            >
              Open dashboard&nbsp;→
            </Link>
            <Link
              to={`/wsip-matrix?country=${c.code}`}
              onClick={(e) => e.stopPropagation()}
              className="font-sans text-[12px] uppercase tracking-[0.18em] text-brand-ink/55 hover:text-brand-deep"
            >
              Matrix
            </Link>
          </div>
        ) : (
          <div className="eyebrow-ink text-brand-ink/45">
            {c.status === "pipeline" ? "Pipeline" : "Planned"}
          </div>
        )}
      </div>
    </div>
  );

  if (clickable) {
    return (
      <li className={`relative ${opacity}`}>
        <span
          aria-hidden
          className="absolute left-0 top-0 h-full w-[3px] bg-brand-deep"
        />
        <div
          role="link"
          tabIndex={0}
          onClick={() => navigate(`/country/${c.code}`)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              navigate(`/country/${c.code}`);
            }
          }}
          className="block cursor-pointer pl-4 transition-colors hover:bg-brand-sand/40 focus-visible:outline-none focus-visible:bg-brand-sand/40"
          aria-label={`Open ${c.name} dashboard`}
        >
          {inner}
        </div>
      </li>
    );
  }

  return (
    <li className={`pl-4 ${opacity}`}>
      <div className="border-l border-dashed border-brand-rule -ml-4 pl-4">
        {inner}
      </div>
    </li>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

/**
 * Tiny coverage glyph per cohort country, rendered as a strip, gives a quick
 * sense of where the curation pipeline is. Live = filled brand-deep droplet,
 * pipeline = outline, planned = dotted.
 */
function CohortGlyphs() {
  const cohort = WSIP_COUNTRIES.filter((c) => c.compact !== false);
  return (
    <section className="border-y border-brand-rule py-5">
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <div className="eyebrow">Cohort progress · WSIP Water Compact</div>
        <div className="eyebrow-ink text-brand-ink/55">
          <span className="tabular-nums">
            {cohort.filter((c) => c.status === "live").length}
          </span>{" "}
          live&nbsp;·&nbsp;
          <span className="tabular-nums">
            {cohort.filter((c) => c.status === "pipeline").length}
          </span>{" "}
          pipelined&nbsp;·&nbsp;
          <span className="tabular-nums">
            {cohort.filter((c) => c.status === "planned").length}
          </span>{" "}
          planned
        </div>
      </div>
      <div className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
        {cohort.map((c) => (
          <span
            key={c.code}
            className="inline-flex flex-col items-center gap-1"
            title={`${c.name} · ${STATUS_LABEL[c.status]}`}
          >
            <Droplet
              variant={
                c.status === "live"
                  ? "filled"
                  : c.status === "pipeline"
                  ? "outline"
                  : "dotted"
              }
              color={
                c.status === "live"
                  ? "#0FAACB"
                  : c.status === "pipeline"
                  ? "#0F2A44"
                  : "#9ca3af"
              }
              size={22}
            />
            <span className="font-sans text-[11px] uppercase tracking-[0.12em] text-brand-ink/65">
              {c.code}
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
