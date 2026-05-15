import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listCountries } from "../../data";
import { WSIP_COUNTRIES } from "../../data/countries-meta";
import {
  PIR_DIMENSIONS,
  SUBSECTOR_LABELS,
  WSIP_SOLUTIONS,
} from "../framework";
import {
  CoverageDot,
  CoverageLegend,
  CELL_BG,
} from "../components/CoverageDot";
import type {
  CoverageStatus,
  PirDimension,
  SubsectorEntry,
  WsipSolutionId,
} from "../types";
import type { CountryProfile } from "../types";

const STATUS_LABEL: Record<CoverageStatus, string> = {
  green: "Strong",
  yellow: "Partial",
  red: "Gap",
  gray: "Not mapped",
};

function rank(s: CoverageStatus): number {
  return s === "green" ? 4 : s === "yellow" ? 3 : s === "red" ? 2 : 1;
}

function bestCellAcross(
  subsectors: SubsectorEntry[],
  pir: PirDimension
): { status: CoverageStatus; subsector?: SubsectorEntry; mandate?: string } {
  let best: { status: CoverageStatus; subsector?: SubsectorEntry; mandate?: string } = {
    status: "gray",
  };
  for (const sub of subsectors) {
    const cell = sub.cells.find((c) => c.pir_dimension === pir);
    if (!cell) continue;
    if (rank(cell.coverage_status) > rank(best.status)) {
      best = {
        status: cell.coverage_status,
        subsector: sub,
        mandate: cell.mandate_text,
      };
    }
  }
  return best;
}

export function WsipMatrixTab() {
  const liveCountries = listCountries();
  const [params, setParams] = useSearchParams();
  const code = (params.get("country") ?? liveCountries[0]?.code ?? "BRA").toUpperCase();
  const compareCode = params.get("compare")?.toUpperCase();

  const country = liveCountries.find((c) => c.code === code);
  const compareCountry = compareCode ? liveCountries.find((c) => c.code === compareCode) : undefined;
  const compareMeta = compareCode ? WSIP_COUNTRIES.find((c) => c.code === compareCode) : undefined;

  function update(key: string, value: string | null) {
    const next = new URLSearchParams(params);
    if (value === null || value === "") next.delete(key);
    else next.set(key, value);
    setParams(next);
  }

  return (
    <div className="space-y-6">
      <section className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            WSIP × PIR Matrix
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            7 WSIP scalable solutions (rows) × 6 PIR dimensions (columns). Each
            cell shows the strongest mapped sub-sector for that intersection.
            Empty cells reveal gaps in law or regulation.
          </p>
        </div>
        <CoverageLegend />
      </section>

      <section className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <CountrySelect
          label="Country"
          value={code}
          onChange={(v) => update("country", v)}
          live={liveCountries}
        />
        {compareCode ? (
          <>
            <span className="text-sm font-semibold text-slate-500">vs.</span>
            <CountrySelect
              label="Compare with"
              value={compareCode}
              onChange={(v) => update("compare", v)}
              live={liveCountries.filter((c) => c.code !== code)}
              allowPipeline
            />
            <button
              onClick={() => update("compare", null)}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400"
            >
              Exit comparison
            </button>
          </>
        ) : (
          <button
            onClick={() => update("compare", liveCountries.find((c) => c.code !== code)?.code ?? WSIP_COUNTRIES.find((c) => c.code !== code)?.code ?? "")}
            className="rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400"
          >
            ⇄ Compare with another country
          </button>
        )}
        {country && (
          <Link
            to={`/country/${country.code}`}
            className="ml-auto rounded-md border border-slate-300 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-slate-400"
          >
            Open {country.name} dashboard →
          </Link>
        )}
      </section>

      {!country ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-900">
          No live data for this country yet.
        </div>
      ) : compareCode ? (
        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <MatrixPanel country={country} />
          {compareCountry ? (
            <MatrixPanel country={compareCountry} />
          ) : (
            <PipelineMatrixPlaceholder meta={compareMeta} code={compareCode} />
          )}
        </div>
      ) : (
        <MatrixPanel country={country} />
      )}

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <strong className="text-slate-900">How to read this matrix:</strong>{" "}
        the cell summarises the highest-coverage sub-sector for that WSIP × PIR
        intersection. Empty / grey cells reveal where neither the law nor a
        regulator has yet been mapped — these are the priority areas for reform
        or further desk-research.
      </section>
    </div>
  );
}

function CountrySelect({
  label,
  value,
  onChange,
  live,
  allowPipeline,
}: {
  label: string;
  value: string;
  onChange: (code: string) => void;
  live: CountryProfile[];
  allowPipeline?: boolean;
}) {
  return (
    <div className="flex items-center gap-2">
      <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium shadow-sm focus:border-slate-500 focus:outline-none"
      >
        <optgroup label="Live data">
          {live.map((c) => (
            <option key={c.code} value={c.code}>
              {c.flag_emoji} {c.name}
            </option>
          ))}
        </optgroup>
        <optgroup label={allowPipeline ? "Pipeline (no data yet)" : "Pipeline (coming soon)"}>
          {WSIP_COUNTRIES.filter((c) => c.status !== "live" && !live.some((l) => l.code === c.code)).map((c) => (
            <option key={c.code} value={c.code} disabled={!allowPipeline}>
              {c.flag} {c.name} {allowPipeline ? "" : "— coming soon"}
            </option>
          ))}
        </optgroup>
      </select>
    </div>
  );
}

function MatrixPanel({ country }: { country: CountryProfile }) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50 px-4 py-2">
        <div className="text-sm font-semibold text-slate-900">
          {country.flag_emoji} {country.name}
        </div>
        <div className="text-[11px] text-slate-500">
          Last updated {country.last_updated}
        </div>
      </div>
      <table className="w-full min-w-[760px] border-collapse text-sm">
        <thead>
          <tr>
            <th className="sticky left-0 z-10 bg-slate-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
              WSIP Solution
            </th>
            {PIR_DIMENSIONS.map((d) => (
              <th
                key={d.key}
                className="border-l border-slate-200 bg-slate-50 px-2 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-700"
                title={d.blurb}
              >
                {d.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WSIP_SOLUTIONS.map((sol) => {
            const subs = country.subsectors.filter((s) =>
              s.wsip_solutions.includes(sol.id as WsipSolutionId)
            );
            return (
              <tr key={sol.id} className="border-t border-slate-200">
                <th className="sticky left-0 z-10 max-w-[200px] bg-white px-3 py-3 text-left align-top">
                  <div className="flex items-start gap-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${
                        sol.pillar === "people"
                          ? "bg-pillar-people"
                          : sol.pillar === "food"
                          ? "bg-pillar-food"
                          : "bg-pillar-planet"
                      }`}
                    >
                      {sol.id}
                    </span>
                    <div className="leading-tight">
                      <div className="text-xs font-semibold text-slate-900">
                        {sol.shortName}
                      </div>
                    </div>
                  </div>
                </th>
                {PIR_DIMENSIONS.map((d) => {
                  const best = bestCellAcross(subs, d.key);
                  const targetSub = best.subsector;
                  const cellContent = (
                    <div
                      className={`h-full min-h-[88px] w-full p-2 ring-1 ring-inset ${CELL_BG[best.status]} ${
                        targetSub ? "cursor-pointer hover:ring-slate-400" : ""
                      }`}
                    >
                      <div className="mb-1 flex items-center justify-between gap-1">
                        <span className="inline-flex items-center gap-1">
                          <CoverageDot status={best.status} />
                          <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-700">
                            {STATUS_LABEL[best.status]}
                          </span>
                        </span>
                        <span className="text-[10px] uppercase tracking-wide text-slate-500">
                          {targetSub
                            ? (SUBSECTOR_LABELS[targetSub.key] ?? targetSub.label).split(" ")[0]
                            : subs.length === 0
                            ? "—"
                            : "no cell"}
                        </span>
                      </div>
                      {best.mandate ? (
                        <div className="line-clamp-4 text-[11px] leading-snug text-slate-700">
                          {best.mandate}
                        </div>
                      ) : (
                        <div className="text-[11px] italic text-slate-400">
                          {subs.length === 0
                            ? "WSIP solution not yet mapped to a sub-sector"
                            : "Dimension not yet assessed"}
                        </div>
                      )}
                    </div>
                  );
                  return (
                    <td
                      key={d.key}
                      className="border-l border-slate-200 p-0 align-top"
                    >
                      {targetSub ? (
                        <Link
                          to={`/country/${country.code}/subsector/${targetSub.key}#pir-${d.key}`}
                          className="block h-full"
                        >
                          {cellContent}
                        </Link>
                      ) : (
                        cellContent
                      )}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function PipelineMatrixPlaceholder({
  meta,
  code,
}: {
  meta: { name: string; flag: string; region: string; status: string; blurb?: string } | undefined;
  code: string;
}) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-600">
      <div className="flex items-start gap-3">
        <div className="text-3xl">{meta?.flag ?? "🏳️"}</div>
        <div className="flex-1">
          <div className="text-base font-semibold text-slate-900">
            {meta?.name ?? code}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-slate-500">
            {meta?.region ?? "—"} · {meta?.status ?? "pipeline"}
          </div>
          {meta?.blurb && (
            <p className="mt-2 text-xs text-slate-600">{meta.blurb}</p>
          )}
          <div className="mt-4 rounded-md bg-white p-3 ring-1 ring-slate-200">
            <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Side-by-side comparison
            </div>
            <p className="mt-1 text-xs text-slate-600">
              The matrix for {meta?.name ?? code} will populate once the country
              dataset is curated. Until then, the comparison view shows the
              live country alone — the framework grid above is the same one the
              second country's data will fill into.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
