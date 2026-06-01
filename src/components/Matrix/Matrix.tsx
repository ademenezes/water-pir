import { Droplet } from "../brand/Droplet";
import {
  PIR_DIMENSIONS,
  SUBSECTOR_LABELS,
  WSIP_SOLUTIONS,
} from "../../framework";
import { CELL_BG } from "../CoverageDot";
import type {
  CountryProfile,
  CoverageStatus,
  PirDimension,
  SubsectorEntry,
  WsipPillar,
  WsipSolutionId,
} from "../../types";

const STATUS_LABEL: Record<CoverageStatus, string> = {
  green: "Strong",
  yellow: "Partial",
  red: "Gap",
  gray: "Not mapped",
};

const DROPLET_VARIANT: Record<
  CoverageStatus,
  "filled" | "half" | "outline" | "dotted"
> = {
  green: "filled",
  yellow: "half",
  red: "outline",
  gray: "dotted",
};

const PILLAR_LABEL: Record<WsipPillar, string> = {
  people: "Water for People",
  food: "Water for Food",
  planet: "Water for Planet",
};

const PILLAR_BG: Record<WsipPillar, string> = {
  people: "bg-pillar-people",
  food: "bg-pillar-food",
  planet: "bg-pillar-planet",
};

// Number of WSIP solutions in each pillar, drives the rowSpan in the pillar column.
const PILLAR_ROW_SPAN: Record<WsipPillar, number> = {
  people: WSIP_SOLUTIONS.filter((s) => s.pillar === "people").length,
  food: WSIP_SOLUTIONS.filter((s) => s.pillar === "food").length,
  planet: WSIP_SOLUTIONS.filter((s) => s.pillar === "planet").length,
};

export interface MatrixCellTarget {
  country: CountryProfile;
  solutionId: WsipSolutionId;
  subsector: SubsectorEntry;
  pirDimension: PirDimension;
}

interface MatrixProps {
  country: CountryProfile;
  /** Open the cell-detail panel. If undefined, cells are not interactive. */
  onCellOpen?: (target: MatrixCellTarget) => void;
  /** Optional dimension to soft-highlight (e.g. on PirWheel arc hover). */
  highlightDimension?: PirDimension;
}

export function Matrix({ country, onCellOpen, highlightDimension }: MatrixProps) {
  return (
    <div className="overflow-x-auto border-y border-brand-rule">
      <table className="w-full min-w-[1080px] border-collapse">
        <thead>
          <tr className="border-b border-brand-rule">
            <th className="sticky left-0 z-20 w-[92px] bg-brand-ink px-4 py-5 text-left">
              <span className="font-display text-[13px] font-extrabold uppercase tracking-[0.18em] text-white">
                Pillar
              </span>
            </th>
            <th className="sticky left-[92px] z-20 w-[220px] bg-white px-4 py-5 text-left">
              <span className="eyebrow-ink text-brand-ink/55">
                WSIP solution
              </span>
            </th>
            {PIR_DIMENSIONS.map((d) => (
              <th
                key={d.key}
                className={[
                  "sticky top-0 z-10 border-l border-brand-rule bg-white px-4 py-5 text-left",
                  highlightDimension === d.key ? "bg-brand-sand/60" : "",
                ].join(" ")}
                title={d.blurb}
              >
                <div className="font-display text-[13px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
                  {d.label}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {WSIP_SOLUTIONS.map((sol, rowIdx) => {
            const subs = country.subsectors.filter((s) =>
              s.wsip_solutions.includes(sol.id as WsipSolutionId)
            );

            // First row of a pillar emits the pillar <th> with rowSpan;
            // subsequent rows skip it (rowSpan handles the layout).
            const prev = rowIdx > 0 ? WSIP_SOLUTIONS[rowIdx - 1] : null;
            const isFirstOfPillar = !prev || prev.pillar !== sol.pillar;

            return (
              <tr key={sol.id} className="border-t border-brand-rule">
                {isFirstOfPillar && (
                  <th
                    rowSpan={PILLAR_ROW_SPAN[sol.pillar]}
                    className={[
                      "sticky left-0 z-10 w-[92px] align-middle text-center",
                      PILLAR_BG[sol.pillar],
                    ].join(" ")}
                    aria-label={PILLAR_LABEL[sol.pillar]}
                  >
                    <div className="px-3 py-6 font-display text-[18px] font-black leading-tight tracking-tight text-brand-ink">
                      {PILLAR_LABEL[sol.pillar].split(" ").map((w, i) => (
                        <span key={i} className="block">
                          {w}
                        </span>
                      ))}
                    </div>
                  </th>
                )}

                <th className="sticky left-[92px] z-10 w-[220px] bg-white p-0 text-left align-top">
                  <div className="px-5 py-5">
                    <div className="font-display text-[26px] font-extrabold leading-none tabular-nums text-brand-deep">
                      {String(sol.id).padStart(2, "0")}
                    </div>
                    <div className="mt-2 font-sans text-[15px] font-semibold leading-snug text-brand-ink">
                      {sol.shortName}
                    </div>
                  </div>
                </th>

                {PIR_DIMENSIONS.map((d) => {
                  const best = bestCellAcross(subs, d.key);
                  const subsector = best.subsector;
                  const isInteractive = !!subsector && !!onCellOpen;
                  const subsectorLabel = subsector
                    ? SUBSECTOR_LABELS[subsector.key] ?? subsector.label
                    : null;

                  const handleClick = isInteractive
                    ? () =>
                        onCellOpen!({
                          country,
                          solutionId: sol.id as WsipSolutionId,
                          subsector,
                          pirDimension: d.key,
                        })
                    : undefined;

                  return (
                    <td
                      key={d.key}
                      className={[
                        "border-l border-brand-rule p-0 align-top",
                        highlightDimension === d.key ? "bg-brand-sand/30" : "",
                      ].join(" ")}
                    >
                      <button
                        type="button"
                        onClick={handleClick}
                        disabled={!isInteractive}
                        aria-label={
                          subsector
                            ? `${subsectorLabel}, ${d.label}, ${STATUS_LABEL[best.status]}`
                            : `${d.label}, ${STATUS_LABEL[best.status]}`
                        }
                        className={[
                          "group block h-full w-full p-4 text-left transition-colors min-h-[148px]",
                          CELL_BG[best.status],
                          isInteractive
                            ? "cursor-pointer hover:bg-white/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-deep focus-visible:ring-inset"
                            : "cursor-default",
                        ].join(" ")}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <Droplet
                            variant={DROPLET_VARIANT[best.status]}
                            size={28}
                          />
                          {subsector && subsectorLabel && (
                            <span className="eyebrow-ink text-[12px] text-brand-ink/55 max-w-[8rem] text-right leading-tight">
                              {subsectorLabel.split(" & ")[0]}
                            </span>
                          )}
                        </div>
                        <div className="mt-2 eyebrow-ink text-[12px] text-brand-ink/75">
                          {STATUS_LABEL[best.status]}
                        </div>
                        {best.mandate ? (
                          <p className="mt-2 font-serif text-[15px] leading-[1.45] text-brand-ink/85 line-clamp-3">
                            {best.mandate}
                          </p>
                        ) : (
                          <p className="mt-2 font-serif italic text-[14px] leading-[1.45] text-brand-ink/45">
                            {subs.length === 0
                              ? "WSIP solution not mapped to a sub-sector"
                              : "Dimension not yet assessed"}
                          </p>
                        )}
                      </button>
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

/* ─────────────────────────────────────────────────────────────────────────── */

export function bestCellAcross(
  subsectors: SubsectorEntry[],
  pir: PirDimension
): {
  status: CoverageStatus;
  subsector?: SubsectorEntry;
  mandate?: string;
} {
  let best: {
    status: CoverageStatus;
    subsector?: SubsectorEntry;
    mandate?: string;
  } = { status: "gray" };
  for (const sub of subsectors) {
    const cell = sub.cells.find((c) => c.pir_dimension === pir);
    if (!cell) continue;
    // Assign the first real cell found (even gray) so its mandate text is
    // carried; thereafter only a strictly higher-ranked cell replaces it. This
    // keeps "first wins on ties" while ensuring an all-gray (mapped) cell still
    // renders its gap note instead of the "not assessed" placeholder.
    if (!best.subsector || rank(cell.coverage_status) > rank(best.status)) {
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
