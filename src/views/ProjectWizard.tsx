import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { PROJECT_TYPES, getProjectType } from "../../data/project-types";
import { listCountries } from "../../data";
import {
  PIR_DIMENSIONS,
  SUBSECTOR_LABELS,
  WSIP_SOLUTIONS,
} from "../framework";
import { CoverageDot, CELL_BG } from "../components/CoverageDot";
import type { CoverageStatus } from "../types";

const STATUS_LABEL: Record<CoverageStatus, string> = {
  green: "Strong",
  yellow: "Partial",
  red: "Gap",
  gray: "Not mapped",
};

export function ProjectWizard() {
  const [params, setParams] = useSearchParams();
  const projectKey = params.get("project");
  const countryCode = params.get("country") ?? "BRA";

  const project = projectKey ? getProjectType(projectKey) : undefined;
  const liveCountries = listCountries();
  const country = liveCountries.find((c) => c.code === countryCode);

  if (!project) {
    return <ProjectPicker />;
  }

  if (!country) {
    return (
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-amber-900">
        No live data for the selected country yet.
      </div>
    );
  }

  // Find the matched sub-sectors for this country
  const matchedSubsectors = country.subsectors.filter((s) =>
    project.subsector_keys.includes(s.key)
  );

  // Aggregate coverage of critical dimensions across the matched sub-sectors
  const critical = project.critical_dimensions.map((dim) => {
    const cells = matchedSubsectors
      .map((s) => ({ sub: s, cell: s.cells.find((c) => c.pir_dimension === dim) }))
      .filter((x) => x.cell);
    const best = cells.reduce(
      (acc, c) => {
        const rank = (s: CoverageStatus) =>
          s === "green" ? 4 : s === "yellow" ? 3 : s === "red" ? 2 : 1;
        return rank(c.cell!.coverage_status) > rank(acc.status as CoverageStatus)
          ? { status: c.cell!.coverage_status, cell: c.cell!, sub: c.sub }
          : acc;
      },
      { status: "gray" as CoverageStatus, cell: undefined as any, sub: undefined as any }
    );
    return { dim, best };
  });

  return (
    <div className="space-y-6">
      <section>
        <div className="text-xs text-slate-500">
          <Link to="/wizard" className="hover:underline">
            ← Choose a different project type
          </Link>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {project.label}
        </h1>
        <p className="mt-2 max-w-3xl text-sm text-slate-600">
          {project.short_desc}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {project.wsip_solutions.map((id) => {
            const sol = WSIP_SOLUTIONS.find((s) => s.id === id);
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
          {project.subsector_keys.map((k) => (
            <span
              key={k}
              className="pill bg-slate-100 text-slate-700"
            >
              {SUBSECTOR_LABELS[k] ?? k}
            </span>
          ))}
        </div>
      </section>

      <section className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Country
        </label>
        <select
          value={countryCode}
          onChange={(e) => {
            const next = new URLSearchParams(params);
            next.set("country", e.target.value);
            setParams(next);
          }}
          className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm focus:border-slate-500 focus:outline-none"
        >
          {liveCountries.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag_emoji} {c.name}
            </option>
          ))}
        </select>
        {matchedSubsectors.length === 0 && (
          <span className="text-xs text-rose-700">
            None of this project's sub-sectors are mapped for {country.name} yet.
          </span>
        )}
      </section>

      {matchedSubsectors.length > 0 && (
        <>
          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Reform readiness — critical PIR dimensions
            </h2>
            <p className="text-xs text-slate-500">
              The dimensions below most affect this project type. Each cell
              shows the strongest coverage across the relevant sub-sectors in{" "}
              {country.name}.
            </p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {critical.map(({ dim, best }) => {
                const dimDef = PIR_DIMENSIONS.find((d) => d.key === dim);
                return (
                  <div
                    key={dim}
                    className={`rounded-lg p-3 ring-1 ring-inset ${CELL_BG[best.status]}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold uppercase tracking-wide text-slate-700">
                        {dimDef?.label}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <CoverageDot status={best.status} size="md" />
                        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-700">
                          {STATUS_LABEL[best.status]}
                        </span>
                      </div>
                    </div>
                    {best.cell ? (
                      <>
                        <p className="mt-2 text-xs leading-snug text-slate-800 line-clamp-4">
                          {best.cell.mandate_text}
                        </p>
                        {best.sub && (
                          <Link
                            to={`/country/${country.code}/subsector/${best.sub.key}#pir-${dim}`}
                            className="mt-2 inline-block text-[11px] font-semibold text-slate-900 hover:underline"
                          >
                            Open {SUBSECTOR_LABELS[best.sub.key] ?? best.sub.label} →
                          </Link>
                        )}
                      </>
                    ) : (
                      <p className="mt-2 text-xs italic text-slate-500">
                        This dimension has not yet been mapped for the related
                        sub-sectors.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Questions your project team should answer
            </h2>
            <ul className="mt-2 list-disc space-y-1.5 pl-5 text-sm text-slate-700">
              {project.readiness_questions.map((q, i) => (
                <li key={i}>{q}</li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Open the full sub-sector deep-dive
            </h2>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {matchedSubsectors.map((s) => (
                <Link
                  key={s.key}
                  to={`/country/${country.code}/subsector/${s.key}`}
                  className="rounded-md border border-slate-200 bg-white p-3 text-sm shadow-sm hover:border-slate-400"
                >
                  <div className="font-semibold text-slate-900">
                    {SUBSECTOR_LABELS[s.key] ?? s.label}
                  </div>
                  {s.headline && (
                    <p className="mt-1 text-xs text-slate-600 line-clamp-3">
                      {s.headline}
                    </p>
                  )}
                  <div className="mt-2 text-[11px] font-semibold text-slate-700">
                    Open deep-dive →
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function ProjectPicker() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Project Wizard
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Tell us what kind of project you're preparing, and the tool will
          return just the relevant slice of the country framework — the
          governing laws, the institutions, the critical PIR dimensions, and
          the questions your team needs to answer next.
        </p>
      </section>

      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {PROJECT_TYPES.map((p) => (
          <Link
            key={p.key}
            to={`/wizard?project=${p.key}`}
            className="group rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-400 hover:shadow"
          >
            <div className="flex items-start gap-3">
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                  p.pillar === "people"
                    ? "bg-pillar-people"
                    : p.pillar === "food"
                    ? "bg-pillar-food"
                    : "bg-pillar-planet"
                }`}
              >
                {p.pillar === "people" ? "P" : p.pillar === "food" ? "F" : "Pl"}
              </span>
              <div>
                <h2 className="text-base font-semibold text-slate-900">
                  {p.label}
                </h2>
                <p className="mt-1 text-xs text-slate-600 line-clamp-3">
                  {p.short_desc}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-1">
              {p.wsip_solutions.map((id) => (
                <span
                  key={id}
                  className="pill bg-slate-100 text-slate-700"
                >
                  WSIP #{id}
                </span>
              ))}
            </div>
            <div className="mt-2 text-[11px] font-semibold text-slate-700 group-hover:text-slate-900">
              Open wizard →
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
