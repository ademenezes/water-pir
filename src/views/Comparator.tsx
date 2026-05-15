import { useState } from "react";
import { listCountries } from "../../data";
import { SUBSECTOR_LABELS, PIR_DIMENSIONS } from "../framework";
import { CoverageDot } from "../components/CoverageDot";

export function Comparator() {
  const countries = listCountries();
  const allSubsectorKeys = Array.from(
    new Set(countries.flatMap((c) => c.subsectors.map((s) => s.key)))
  );
  const [selected, setSelected] = useState<string>(allSubsectorKeys[0] ?? "");

  const rows = countries
    .map((c) => ({
      country: c,
      subsector: c.subsectors.find((s) => s.key === selected),
    }))
    .filter((r) => r.subsector);

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Sub-sector comparator
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          For any sub-sector, see how each country in the tool handles policy,
          institutions, financing, regulation, and resilience. Note: the pilot
          currently only has Brazil populated; additional countries (Colombia,
          Kenya, Peru, Indonesia) come in Phase 3.
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Sub-sector
          </label>
          <select
            value={selected}
            onChange={(e) => setSelected(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
          >
            {allSubsectorKeys.map((k) => (
              <option key={k} value={k}>
                {SUBSECTOR_LABELS[k] ?? k}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Country
              </th>
              {PIR_DIMENSIONS.map((d) => (
                <th
                  key={d.key}
                  className="border-l border-slate-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  {d.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ country, subsector }) => (
              <tr key={country.code} className="border-t border-slate-200">
                <th className="px-3 py-3 text-left align-top">
                  <div className="text-base font-semibold text-slate-900">
                    {country.flag_emoji} {country.name}
                  </div>
                  {subsector?.headline && (
                    <div className="mt-1 max-w-xs text-[11px] leading-snug text-slate-500 line-clamp-3">
                      {subsector.headline}
                    </div>
                  )}
                </th>
                {PIR_DIMENSIONS.map((d) => {
                  const cell = subsector?.cells.find(
                    (c) => c.pir_dimension === d.key
                  );
                  return (
                    <td
                      key={d.key}
                      className="border-l border-slate-200 px-3 py-3 align-top"
                    >
                      <div className="flex items-start gap-2">
                        <CoverageDot status={cell?.coverage_status ?? "gray"} />
                        <div className="text-[11px] leading-snug text-slate-700 line-clamp-5">
                          {cell?.mandate_text ?? (
                            <span className="italic text-slate-400">
                              Not yet assessed
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* Placeholder rows for upcoming countries */}
            {["COL", "KEN", "PER", "IDN"].map((code) => (
              <tr
                key={code}
                className="border-t border-slate-200 opacity-60"
                title="Pending data ingestion"
              >
                <th className="px-3 py-3 text-left align-top">
                  <div className="text-base font-semibold text-slate-500">
                    {code}
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Coming in Phase 3
                  </div>
                </th>
                {PIR_DIMENSIONS.map((d) => (
                  <td
                    key={d.key}
                    className="border-l border-slate-200 px-3 py-3 align-top"
                  >
                    <CoverageDot status="gray" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
