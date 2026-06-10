import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountry } from "../../data";
import { WSIP_COUNTRIES } from "../../data/countries-meta";
import { LESSONS } from "../../data/lessons";
import { PIR_DIMENSIONS, SUBSECTOR_LABELS, WSIP_SOLUTIONS } from "../framework";
import { Matrix, type MatrixCellTarget } from "../components/Matrix/Matrix";
import { MatrixCellPanel } from "../components/Matrix/MatrixCellPanel";
import { KeyInsightsSection } from "../components/KeyInsightsSection";
import { TargetsPanel } from "../components/TargetsPanel";
import { MonitoringPanel } from "../components/MonitoringPanel";
import { MandateSwimLanes, type SwimLaneLabels } from "../components/MandateSwimLanes";
import { Flag } from "../components/Flag";
import type { CoverageStatus, PirDimension } from "../types";

const STATUS_BAR_COLOR: Record<CoverageStatus, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  red: "bg-rose-500",
  gray: "bg-brand-rule",
};

const STATUS_LABEL: Record<CoverageStatus, string> = {
  green: "Strong",
  yellow: "Partial",
  red: "Gap",
  gray: "Not mapped",
};

// Per-country swim-lane label overrides. The component defaults to Brazil's
// federal labels and constitutional blurbs; unitary Georgia overrides them so
// "Federal" / CF-1988 references do not render on a country they do not apply to.
const SWIMLANE_OVERRIDES: Record<string, SwimLaneLabels> = {
  GEO: {
    heading: "National, Adjara, municipal and basin, across the value chain.",
    levelLabels: {
      national: "National",
      state: "Adjara A.R.",
      local: "Municipal",
      basin: "Basin",
    },
    levelBlurbs: {
      national: "Central government: MEPA, MRDI, GNERC, EMA",
      state: "Autonomous Republic of Adjara operators",
      local: "Municipalities and Water Users Organisations",
      basin: "River-basin districts (operative from 2026)",
    },
    sourceNote:
      "All citations verified against the canonical text indexed in documents/georgia/manifest.json. Level labels reflect display names; underlying values are national / state / local / basin.",
  },
};

export function CountryDashboard() {
  const { code } = useParams();
  const country = getCountry(code ?? "");
  const meta = code ? WSIP_COUNTRIES.find((c) => c.code === code.toUpperCase()) : undefined;
  const [panelTarget, setPanelTarget] = useState<MatrixCellTarget | null>(null);

  const lessons = useMemo(
    () =>
      country
        ? LESSONS.filter((l) => l.country_code === country.code)
        : [],
    [country]
  );

  const dimStats = useMemo(() => {
    if (!country) return [];
    return PIR_DIMENSIONS.map((d) => {
      const counts: Record<CoverageStatus, number> = {
        green: 0,
        yellow: 0,
        red: 0,
        gray: 0,
      };
      for (const sub of country.subsectors) {
        const cell = sub.cells.find((c) => c.pir_dimension === d.key);
        if (cell) counts[cell.coverage_status] += 1;
        else counts.gray += 1;
      }
      const total = country.subsectors.length || 1;
      return { dim: d.key as PirDimension, label: d.label, counts, total };
    });
  }, [country]);

  if (!country) {
    return (
      <div className="grid grid-cols-12 gap-8 pt-12">
        <div className="col-span-12 md:col-span-9">
          <div className="eyebrow text-brand-amber">Country not found</div>
          <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            No live data for &quot;{code}&quot;.
          </h1>
          <p className="prose-editorial mt-4 max-w-[42rem] text-[17px]">
            This country may be pipelined or planned, but the curated dataset
            isn't ready yet.
          </p>
          <Link
            to="/countries"
            className="link-editorial mt-6 inline-block font-display text-[15px] font-semibold tracking-[0.02em]"
          >
            Browse the cohort&nbsp;→
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ── Country header / chapter cover ──────────────────────────────── */}
      <header className="mx-auto max-w-[88rem] px-8 pt-12 pb-10">
        <div className="grid grid-cols-12 items-end gap-8">
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow text-brand-deep">
              {country.code}
              {meta?.region ? ` · ${meta.region}` : ""}
              {meta?.compact !== false ? (
                <>&nbsp;·&nbsp;WSIP Water Compact</>
              ) : null}
              &nbsp;·&nbsp;Updated&nbsp;
              <span className="tabular-nums">{country.last_updated}</span>
            </div>
            <h1 className="mt-4 flex items-center gap-5 font-display text-[clamp(48px,8vw,108px)] font-black leading-[0.95] tracking-tightest text-brand-ink uppercase">
              <Flag
                emoji={country.flag_emoji}
                title={country.name}
                sizeEm={0.62}
                className="rounded-[3px]"
              />
              <span>{country.name}</span>
            </h1>
          </div>

          <div className="col-span-12 md:col-span-4">
            <p className="prose-editorial text-[17px] leading-[1.6] text-brand-ink/85">
              {country.intro}
            </p>
          </div>
        </div>
      </header>

      {/* ── Stat strip ───────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[88rem] px-8 pb-10">
        <div className="border-y border-brand-rule py-6">
          <div className="eyebrow">Coverage by PIR dimension</div>
          <dl className="mt-5 grid grid-cols-2 md:grid-cols-6 gap-x-6 gap-y-6">
            {dimStats.map((s) => (
              <div key={s.dim}>
                <dt className="eyebrow-ink text-brand-ink/65">{s.label}</dt>
                <dd className="mt-2 flex items-baseline gap-2">
                  <span className="font-display text-[28px] font-extrabold leading-none tabular-nums text-brand-deep">
                    {s.counts.green}
                  </span>
                  <span className="font-sans text-[12px] text-brand-ink/55">
                    / {s.total} strong
                  </span>
                </dd>
                <dd className="mt-2 flex h-2 overflow-hidden bg-brand-rule">
                  {(
                    ["green", "yellow", "red", "gray"] as CoverageStatus[]
                  ).map((st) => {
                    const pct = (s.counts[st] / s.total) * 100;
                    if (pct === 0) return null;
                    return (
                      <span
                        key={st}
                        className={STATUS_BAR_COLOR[st]}
                        style={{ width: `${pct}%` }}
                        title={`${s.counts[st]} ${STATUS_LABEL[st]}`}
                      />
                    );
                  })}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── Key insights ─────────────────────────────────────────────────── */}
      {country.key_insights && country.key_insights.length > 0 && (
        <section className="mx-auto max-w-[88rem] px-8 pb-16">
          <KeyInsightsSection insights={country.key_insights} />
        </section>
      )}

      {/* ── Targets & ambitions ──────────────────────────────────────────── */}
      {country.targets && country.targets.length > 0 && (
        <section className="mx-auto max-w-[88rem] px-8 pb-16">
          <div className="border-t border-brand-rule pt-12">
            <TargetsPanel targets={country.targets} />
          </div>
        </section>
      )}

      {/* ── Monitoring & evidence base ───────────────────────────────────── */}
      {country.monitoring && country.monitoring.length > 0 && (
        <section className="mx-auto max-w-[88rem] px-8 pb-16">
          <div className="border-t border-brand-rule pt-12">
            <MonitoringPanel indicators={country.monitoring} />
          </div>
        </section>
      )}

      {/* ── Body: matrix + marginalia ────────────────────────────────────── */}
      <section className="mx-auto max-w-[88rem] px-8 pb-16">
        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 lg:col-span-9">
            <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
              <div className="eyebrow">The matrix · {country.name}</div>
              <Link
                to={`/wsip-matrix?country=${country.code}`}
                className="link-editorial font-sans text-[12px] tracking-[0.04em]"
              >
                Open in matrix tab&nbsp;→
              </Link>
            </div>
            <Matrix country={country} onCellOpen={setPanelTarget} />
            <p className="mt-5 max-w-[42rem] font-serif text-[14px] leading-[1.55] text-brand-ink/65">
              <strong className="font-semibold text-brand-ink">
                How to read.
              </strong>{" "}
              The droplet indicates coverage: filled = strong, half = partial,
              outline = gap, dotted = not mapped. Click any cell for the full
              mandate, instruments, and de&#8209;jure / de&#8209;facto note.
            </p>
          </div>

          {/* Marginalia */}
          <aside className="col-span-12 lg:col-span-3">
            <div className="space-y-8 lg:sticky lg:top-8">
              {meta?.blurb && (
                <section>
                  <div className="eyebrow">Sector note</div>
                  <p className="mt-2 font-serif text-[14px] leading-[1.55] text-brand-ink/80">
                    {meta.blurb}
                  </p>
                </section>
              )}

              {lessons.length > 0 && (
                <section>
                  <div className="eyebrow">Reform lessons</div>
                  <ul className="mt-2 divide-y divide-brand-rule">
                    {lessons.map((l) => (
                      <li key={l.key} className="py-3">
                        <p className="font-serif text-[14px] leading-[1.45] text-brand-ink">
                          {l.title}.
                        </p>
                        <div className="mt-1 eyebrow-ink text-brand-ink/55">
                          {l.source}
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              )}

              <section>
                <div className="eyebrow">Curated</div>
                <p className="mt-2 font-serif text-[14px] leading-[1.55] text-brand-ink/65">
                  <span className="tabular-nums">{country.subsectors.length}</span>{" "}
                  sub-sectors mapped&nbsp;·&nbsp;Last updated&nbsp;
                  <span className="tabular-nums">{country.last_updated}</span>.
                </p>
              </section>
            </div>
          </aside>
        </div>
      </section>

      {/* ── Mandate swim-lane ────────────────────────────────────────────── */}
      {country.mandate_records && country.mandate_records.length > 0 && (
        <section className="mx-auto max-w-[88rem] px-8 pb-16">
          <div className="border-t border-brand-rule pt-12">
            <MandateSwimLanes
              records={country.mandate_records}
              labels={SWIMLANE_OVERRIDES[country.code]}
            />
          </div>
        </section>
      )}

      {/* ── Sub-sector drill-in ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-[88rem] px-8 pb-24">
        <div className="border-t border-brand-rule pt-10">
          <div className="eyebrow">Drill into a sub-sector</div>
          <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            {country.subsectors.length}&nbsp;sub-sectors mapped for {country.name}.
          </h2>
          <ul className="mt-8 grid grid-cols-12 gap-x-8 gap-y-10">
            {country.subsectors.map((s) => {
              const wsipPillars = new Set(
                s.wsip_solutions
                  .map((id) => WSIP_SOLUTIONS.find((x) => x.id === id)?.pillar)
                  .filter((p): p is "people" | "food" | "planet" => !!p)
              );
              return (
                <li key={s.key} className="col-span-12 md:col-span-6 lg:col-span-4 border-t border-brand-rule pt-5">
                  <Link
                    to={`/country/${country.code}/subsector/${s.key}`}
                    className="group block"
                  >
                    <div className="flex items-baseline gap-2">
                      {Array.from(wsipPillars).map((p) => (
                        <span
                          key={p}
                          className={[
                            "h-2 w-6",
                            p === "people"
                              ? "bg-pillar-people"
                              : p === "food"
                              ? "bg-pillar-food"
                              : "bg-pillar-planet",
                          ].join(" ")}
                          aria-hidden
                        />
                      ))}
                    </div>
                    <h3 className="mt-3 font-display text-[20px] font-extrabold leading-tight tracking-tightest text-brand-ink group-hover:text-brand-deep">
                      {SUBSECTOR_LABELS[s.key] ?? s.label}
                    </h3>
                    {s.headline && (
                      <p className="mt-2 font-serif text-[14px] leading-[1.5] text-brand-ink/75 line-clamp-4">
                        {s.headline}
                      </p>
                    )}
                    <div className="mt-3 eyebrow-ink text-brand-ink/55">
                      WSIP&nbsp;·&nbsp;
                      {s.wsip_solutions.map((id) => `#${id}`).join(" · ")}
                    </div>
                    <div className="mt-3 link-editorial font-sans text-[12px] tracking-[0.04em]">
                      Open deep-dive&nbsp;→
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <MatrixCellPanel target={panelTarget} onClose={() => setPanelTarget(null)} />
    </div>
  );
}
