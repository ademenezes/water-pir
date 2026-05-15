import { useState } from "react";
import { listCountries } from "../../data";
import { WSIP_COUNTRIES } from "../../data/countries-meta";
import {
  PIR_DIMENSIONS,
  SUBSECTOR_LABELS,
} from "../framework";
import { CoverageDot } from "../components/CoverageDot";
import type { PirDimension } from "../types";

type Mode = "by-subsector" | "by-dimension";

export function PirComparator() {
  const countries = listCountries();
  const allSubsectorKeys = Array.from(
    new Set(countries.flatMap((c) => c.subsectors.map((s) => s.key)))
  );

  const [mode, setMode] = useState<Mode>("by-subsector");
  const [subsectorKey, setSubsectorKey] = useState<string>(
    allSubsectorKeys[0] ?? ""
  );
  const [pirKey, setPirKey] = useState<PirDimension>("regulation");

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          PIR Comparator
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          Compare countries across the PIR framework. Switch between two
          analytical modes depending on the question you want to answer.
        </p>
      </section>

      <section className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Mode
          </span>
          <div className="inline-flex rounded-md border border-slate-200 p-0.5">
            <button
              onClick={() => setMode("by-subsector")}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                mode === "by-subsector"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              Sub-sector → all PIR dimensions
            </button>
            <button
              onClick={() => setMode("by-dimension")}
              className={`rounded px-3 py-1 text-xs font-semibold ${
                mode === "by-dimension"
                  ? "bg-slate-900 text-white"
                  : "text-slate-700 hover:bg-slate-100"
              }`}
            >
              PIR dimension → all sub-sectors
            </button>
          </div>

          <div className="ml-2 flex items-center gap-2">
            {mode === "by-subsector" ? (
              <>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Sub-sector
                </label>
                <select
                  value={subsectorKey}
                  onChange={(e) => setSubsectorKey(e.target.value)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
                >
                  {allSubsectorKeys.map((k) => (
                    <option key={k} value={k}>
                      {SUBSECTOR_LABELS[k] ?? k}
                    </option>
                  ))}
                </select>
              </>
            ) : (
              <>
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  PIR dimension
                </label>
                <select
                  value={pirKey}
                  onChange={(e) => setPirKey(e.target.value as PirDimension)}
                  className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
                >
                  {PIR_DIMENSIONS.map((d) => (
                    <option key={d.key} value={d.key}>
                      {d.label}
                    </option>
                  ))}
                </select>
              </>
            )}
          </div>
        </div>
        <p className="mt-2 text-xs text-slate-500">
          {mode === "by-subsector"
            ? "Pick a sub-sector. The table shows each country's coverage across all six PIR dimensions for that sub-sector."
            : "Pick a PIR dimension. The table shows each country's coverage of that dimension across all its mapped sub-sectors."}
        </p>
      </section>

      {mode === "by-subsector" ? (
        <SubsectorMode subsectorKey={subsectorKey} />
      ) : (
        <DimensionMode pirKey={pirKey} />
      )}
    </div>
  );
}

function SubsectorMode({ subsectorKey }: { subsectorKey: string }) {
  const countries = listCountries();
  const rows = countries
    .map((c) => ({
      country: c,
      subsector: c.subsectors.find((s) => s.key === subsectorKey),
    }))
    .filter((r) => r.subsector);

  const pipelinePlaceholders = WSIP_COUNTRIES.filter(
    (c) => c.status !== "live"
  ).slice(0, 5);

  return (
    <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="w-full min-w-[900px] border-collapse text-sm">
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
          {pipelinePlaceholders.map((p) => (
            <tr
              key={p.code}
              className="border-t border-slate-200 opacity-60"
              title="Pending data ingestion"
            >
              <th className="px-3 py-3 text-left align-top">
                <div className="text-base font-semibold text-slate-500">
                  {p.flag} {p.name}
                </div>
                <div className="text-[11px] text-slate-400">
                  {p.status === "pipeline" ? "WSIP pipeline" : "Planned"}
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
  );
}

function DimensionMode({ pirKey }: { pirKey: PirDimension }) {
  const countries = listCountries();
  const allSubsectorKeys = Array.from(
    new Set(countries.flatMap((c) => c.subsectors.map((s) => s.key)))
  );
  const pirDef = PIR_DIMENSIONS.find((d) => d.key === pirKey);

  return (
    <section className="space-y-4">
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          {pirDef?.label}
        </div>
        <p className="mt-1 text-sm text-slate-600">{pirDef?.blurb}</p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[800px] border-collapse text-sm">
          <thead>
            <tr className="bg-slate-50">
              <th className="px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                Country
              </th>
              {allSubsectorKeys.map((k) => (
                <th
                  key={k}
                  className="border-l border-slate-200 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600"
                >
                  {SUBSECTOR_LABELS[k] ?? k}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.code} className="border-t border-slate-200">
                <th className="px-3 py-3 text-left align-top">
                  <div className="text-base font-semibold text-slate-900">
                    {country.flag_emoji} {country.name}
                  </div>
                </th>
                {allSubsectorKeys.map((k) => {
                  const sub = country.subsectors.find((s) => s.key === k);
                  const cell = sub?.cells.find((c) => c.pir_dimension === pirKey);
                  return (
                    <td
                      key={k}
                      className="border-l border-slate-200 px-3 py-3 align-top"
                    >
                      <div className="flex items-start gap-2">
                        <CoverageDot status={cell?.coverage_status ?? "gray"} />
                        <div className="text-[11px] leading-snug text-slate-700 line-clamp-5">
                          {cell?.mandate_text ?? (
                            <span className="italic text-slate-400">
                              {sub ? "Dimension not assessed" : "Sub-sector not mapped"}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
