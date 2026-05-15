import { Link, useParams } from "react-router-dom";
import { getCountry } from "../../data";
import {
  WSIP_SOLUTIONS,
  PILLAR_LABELS,
  PIR_DIMENSIONS,
  SUBSECTOR_LABELS,
} from "../framework";
import { CoverageDot, CoverageLegend } from "../components/CoverageDot";
import type { CoverageStatus, WsipSolutionId } from "../types";

function dominantStatus(statuses: CoverageStatus[]): CoverageStatus {
  if (statuses.length === 0) return "gray";
  if (statuses.includes("red")) return "red";
  if (statuses.includes("yellow")) return "yellow";
  if (statuses.every((s) => s === "green")) return "green";
  return "gray";
}

export function CountryDashboard() {
  const { code } = useParams();
  const country = getCountry(code ?? "");

  if (!country) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-900">
        <h2 className="font-semibold">Country not found</h2>
        <p className="mt-1 text-sm">
          We don't have data for "{code}". <Link to="/" className="underline">Back to country list</Link>.
        </p>
      </div>
    );
  }

  // Coverage per WSIP solution: aggregate across mapped subsectors and PIR cells.
  const c = country; // narrow for inner closures
  function solutionCoverage(solutionId: WsipSolutionId): {
    status: CoverageStatus;
    subsectors: typeof c.subsectors;
  } {
    const subs = c.subsectors.filter((s) =>
      s.wsip_solutions.includes(solutionId)
    );
    const statuses = subs.flatMap((s) =>
      s.cells.map((c2) => c2.coverage_status)
    );
    return { status: dominantStatus(statuses), subsectors: subs };
  }

  return (
    <div className="space-y-8">
      <section>
        <div className="flex items-baseline gap-3">
          <span className="text-4xl">{country.flag_emoji}</span>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900">
            {country.name}
          </h1>
          <span className="text-xs text-slate-400">
            last updated {country.last_updated}
          </span>
        </div>
        <p className="mt-3 max-w-4xl text-slate-700">{country.intro}</p>
      </section>

      {/* WSIP at a Glance — Brazil edition */}
      <section>
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              WSIP at a Glance — {country.name}
            </h2>
            <p className="text-xs text-slate-500">
              Click any of the seven scalable solutions to drill down into the
              relevant laws, regulators and mandates.
            </p>
          </div>
          <CoverageLegend />
        </div>

        <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
          <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
            {(["people", "food", "planet"] as const).map((pillar) => (
              <div
                key={pillar}
                className={`rounded-md p-3 ${
                  pillar === "people"
                    ? "bg-pillar-people/10"
                    : pillar === "food"
                    ? "bg-pillar-food/10"
                    : "bg-pillar-planet/10"
                }`}
              >
                <div
                  className={`mb-2 text-xs font-bold uppercase tracking-wider ${
                    pillar === "people"
                      ? "text-sky-900"
                      : pillar === "food"
                      ? "text-emerald-900"
                      : "text-amber-900"
                  }`}
                >
                  {PILLAR_LABELS[pillar]}
                </div>
                <div className="space-y-2">
                  {WSIP_SOLUTIONS.filter((s) => s.pillar === pillar).map((s) => {
                    const cov = solutionCoverage(s.id);
                    const targetSubsector = cov.subsectors[0];
                    return (
                      <Link
                        key={s.id}
                        to={
                          targetSubsector
                            ? `/country/${country.code}/subsector/${targetSubsector.key}`
                            : `/country/${country.code}`
                        }
                        className="group block rounded border border-white bg-white p-3 shadow-sm hover:border-slate-400 hover:shadow"
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                              pillar === "people"
                                ? "bg-pillar-people"
                                : pillar === "food"
                                ? "bg-pillar-food"
                                : "bg-pillar-planet"
                            }`}
                          >
                            {s.id}
                          </span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                              {s.shortName}
                              <CoverageDot status={cov.status} />
                            </div>
                            <div className="mt-0.5 text-[11px] text-slate-500 line-clamp-2">
                              {cov.subsectors.length > 0
                                ? `${cov.subsectors.length} sub-sector(s) mapped`
                                : "Not yet mapped"}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 grid grid-cols-1 gap-2 rounded border border-slate-200 bg-slate-50 p-3 md:grid-cols-3">
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Enabler 2
              </div>
              <div className="text-xs font-medium text-slate-700">
                Knowledge framework — policies & regulations
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Enabler 3
              </div>
              <div className="text-xs font-medium text-slate-700">
                Programmatic approaches & Country Water Compacts
              </div>
            </div>
            <div>
              <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Pillars × Solutions
              </div>
              <div className="text-xs font-medium text-slate-700">
                3 pillars · 7 solutions · {PIR_DIMENSIONS.length} PIR dimensions
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sub-sector list */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Sub-sectors mapped for {country.name}
        </h2>
        <p className="text-xs text-slate-500">
          Each card lists the linked WSIP solutions and PIR dimension coverage.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          {country.subsectors.map((s) => {
            const statuses = s.cells.map((c) => c.coverage_status);
            const overall = dominantStatus(statuses);
            return (
              <Link
                key={s.key}
                to={`/country/${country.code}/subsector/${s.key}`}
                className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-400 hover:shadow"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-base font-semibold text-slate-900">
                      {SUBSECTOR_LABELS[s.key] ?? s.label}
                      <CoverageDot status={overall} size="md" />
                    </div>
                    <div className="mt-1 flex flex-wrap gap-1.5">
                      {s.wsip_solutions.map((id) => {
                        const sol = WSIP_SOLUTIONS.find((x) => x.id === id);
                        if (!sol) return null;
                        return (
                          <span
                            key={id}
                            className={`pill ${
                              sol.pillar === "people"
                                ? "pill-people"
                                : sol.pillar === "food"
                                ? "pill-food"
                                : "pill-planet"
                            }`}
                          >
                            WSIP #{id} · {sol.shortName}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                  <span className="text-slate-400 group-hover:translate-x-1 group-hover:text-slate-700 transition">
                    →
                  </span>
                </div>
                {s.headline && (
                  <p className="mt-2 text-sm text-slate-600 line-clamp-3">
                    {s.headline}
                  </p>
                )}
                <div className="mt-2 flex flex-wrap gap-2 text-[11px]">
                  {PIR_DIMENSIONS.map((d) => {
                    const cell = s.cells.find((c) => c.pir_dimension === d.key);
                    return (
                      <span
                        key={d.key}
                        className="inline-flex items-center gap-1 rounded border border-slate-200 px-1.5 py-0.5"
                        title={`${d.label}: ${
                          cell?.coverage_status ?? "not assessed"
                        }`}
                      >
                        <CoverageDot status={cell?.coverage_status ?? "gray"} />
                        <span className="text-slate-600">{d.label}</span>
                      </span>
                    );
                  })}
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
