import { Link, useParams } from "react-router-dom";
import { getCountry } from "../../data";
import {
  WSIP_SOLUTIONS,
  PIR_DIMENSIONS,
  SUBSECTOR_LABELS,
} from "../framework";
import { CoverageDot, CoverageLegend, CELL_BG } from "../components/CoverageDot";
import type {
  CoverageStatus,
  PirDimension,
  SubsectorEntry,
  WsipSolutionId,
} from "../types";

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
    const better =
      rank(cell.coverage_status) > rank(best.status) ||
      (cell.coverage_status === best.status && !best.mandate);
    if (better) {
      best = {
        status: cell.coverage_status,
        subsector: sub,
        mandate: cell.mandate_text,
      };
    }
  }
  return best;
}

function rank(s: CoverageStatus): number {
  return s === "green" ? 4 : s === "yellow" ? 3 : s === "red" ? 2 : 1;
}

const STATUS_LABEL: Record<CoverageStatus, string> = {
  green: "Strong",
  yellow: "Partial",
  red: "Gap",
  gray: "Not mapped",
};

export function MatrixView() {
  const { code } = useParams();
  const country = getCountry(code ?? "");
  if (!country) return <div>Country not found.</div>;

  return (
    <div className="space-y-6">
      <section className="flex items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            WSIP × PIR Matrix — {country.name}
          </h1>
          <p className="mt-1 max-w-3xl text-sm text-slate-600">
            Each row is a WSIP scalable solution; each column is a PIR
            dimension. The cell shows the strongest mapped sub-sector for that
            intersection in {country.name}. Click any cell to open the
            sub-sector deep-dive.
          </p>
        </div>
        <CoverageLegend />
      </section>

      <section className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr>
              <th className="sticky left-0 z-10 bg-slate-100 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-600">
                WSIP Solution
              </th>
              {PIR_DIMENSIONS.map((d) => (
                <th
                  key={d.key}
                  className="border-l border-slate-200 bg-slate-50 px-3 py-2 text-left text-xs font-semibold uppercase tracking-wide text-slate-700"
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
                  <th className="sticky left-0 z-10 max-w-[220px] bg-white px-3 py-3 text-left align-top">
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
                        <div className="text-sm font-semibold text-slate-900">
                          {sol.shortName}
                        </div>
                        <div className="text-[10px] uppercase tracking-wide text-slate-400">
                          {sol.pillar === "people"
                            ? "Water for People"
                            : sol.pillar === "food"
                            ? "Water for Food"
                            : "Water for Planet"}
                        </div>
                      </div>
                    </div>
                  </th>
                  {PIR_DIMENSIONS.map((d) => {
                    const best = bestCellAcross(subs, d.key);
                    const targetSub = best.subsector;
                    const cellContent = (
                      <div
                        className={`h-full min-h-[88px] w-full p-2 ring-1 ring-inset ${CELL_BG[best.status]} ${targetSub ? "cursor-pointer hover:ring-slate-400" : ""}`}
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
                              ? SUBSECTOR_LABELS[targetSub.key]?.split(" ")[0] ??
                                targetSub.label.split(" ")[0]
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
                              ? "WSIP solution not yet mapped to a national sub-sector"
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
      </section>

      <section className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-600">
        <strong className="text-slate-900">How to read this matrix:</strong> the
        cell summarises the highest-coverage sub-sector for that WSIP × PIR
        intersection. Empty / grey cells reveal where neither the law nor a
        regulator has yet been mapped — these are the priority areas for reform
        or further desk-research, exactly the de jure–de facto diagnostic that
        BOSIB's PIR Framework Tool is designed to surface.
      </section>
    </div>
  );
}
