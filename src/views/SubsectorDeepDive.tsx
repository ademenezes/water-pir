import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountry } from "../../data";
import {
  PIR_DIMENSIONS,
  WSIP_SOLUTIONS,
  SUBSECTOR_LABELS,
} from "../framework";
import { CoverageDot } from "../components/CoverageDot";
import { SourceCitation } from "../components/SourceCitation";
import { MandateMap } from "../components/MandateMap";

export function SubsectorDeepDive() {
  const { code, subKey } = useParams();
  const country = getCountry(code ?? "");
  const subsector = country?.subsectors.find((s) => s.key === subKey);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [subKey]);

  if (!country) return <div>Country not found.</div>;
  if (!subsector) return <div>Sub-sector not mapped for {country.name}.</div>;

  return (
    <div className="space-y-8">
      <section>
        <div className="text-xs text-slate-500">
          <Link to={`/country/${country.code}`} className="hover:underline">
            ← Back to {country.name} dashboard
          </Link>
        </div>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
          {SUBSECTOR_LABELS[subsector.key] ?? subsector.label} · {country.name}
        </h1>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {subsector.wsip_solutions.map((id) => {
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
                WSIP #{id} · {sol.fullName}
              </span>
            );
          })}
        </div>
        {subsector.headline && (
          <p className="mt-3 max-w-4xl rounded-lg border-l-4 border-slate-300 bg-white p-3 text-sm text-slate-700">
            {subsector.headline}
          </p>
        )}
      </section>

      {subsector.reform_lessons && subsector.reform_lessons.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Reform lessons
          </h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-slate-700">
            {subsector.reform_lessons.map((l, i) => (
              <li key={i}>{l}</li>
            ))}
          </ul>
        </section>
      )}

      {PIR_DIMENSIONS.map((d) => {
        const cell = subsector.cells.find((c) => c.pir_dimension === d.key);
        const id = `pir-${d.key}`;
        return (
          <section
            key={d.key}
            id={id}
            className="scroll-mt-20 rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {d.label}
                </h3>
                <p className="text-xs text-slate-500">{d.blurb}</p>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <CoverageDot status={cell?.coverage_status ?? "gray"} size="md" />
                <span className="font-medium uppercase tracking-wide">
                  {cell?.coverage_status ?? "not assessed"}
                </span>
              </div>
            </div>

            {!cell ? (
              <div className="mt-3 rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm italic text-slate-500">
                This dimension has not yet been mapped for {SUBSECTOR_LABELS[subsector.key] ?? subsector.label} in {country.name}.
              </div>
            ) : (
              <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Mandate
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-slate-800">
                    {cell.mandate_text}
                  </p>
                  {cell.de_facto_note && (
                    <div className="mt-3 rounded-md border-l-4 border-amber-300 bg-amber-50 p-3 text-sm text-amber-900">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
                        De jure vs. de facto
                      </span>
                      <p className="mt-0.5">{cell.de_facto_note}</p>
                    </div>
                  )}

                  <div className="mt-5">
                    <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                      Legal instruments
                    </div>
                    {cell.legal_instruments.length === 0 ? (
                      <div className="mt-1 text-sm italic text-slate-400">
                        No specific legal instrument identified.
                      </div>
                    ) : (
                      <div className="mt-2 space-y-2">
                        {cell.legal_instruments.map((inst, i) => (
                          <SourceCitation
                            key={`${inst.short}-${i}`}
                            instrument={inst}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 text-[11px] text-slate-400">
                    Last verified: {cell.last_verified_date}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                    Institutional mandate map
                  </div>
                  <div className="mt-2">
                    <MandateMap institutions={cell.responsible_institutions} />
                  </div>
                </div>
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
