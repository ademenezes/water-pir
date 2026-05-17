import { useState } from "react";
import type { CoverageStatus } from "../types";

const TITLE: Record<CoverageStatus, string> = {
  green:
    "Strong coverage, there is a law, an active regulator, and practice broadly matches the legal mandate.",
  yellow:
    "Partial coverage, a law or policy exists but regulation, enforcement or implementation is incomplete or uneven.",
  red:
    "Coverage gap, no specific law or regulator covers this intersection of WSIP solution and PIR dimension.",
  gray: "Not yet mapped, this cell has not been assessed for the country.",
};

const SHORT_LABEL: Record<CoverageStatus, string> = {
  green: "Strong",
  yellow: "Partial",
  red: "Gap",
  gray: "Not mapped",
};

// The SAME background/ring colors used for actual matrix cells.
// Source of truth, imported by the matrix views too.
export const CELL_BG: Record<CoverageStatus, string> = {
  green: "bg-emerald-50 ring-emerald-200",
  yellow: "bg-amber-50 ring-amber-200",
  red: "bg-rose-50 ring-rose-200",
  gray: "bg-slate-50 ring-slate-200",
};

export function CoverageDot({
  status,
  size = "sm",
}: {
  status: CoverageStatus;
  size?: "sm" | "md";
}) {
  const dim = size === "md" ? "h-3 w-3" : "h-2.5 w-2.5";
  return (
    <span
      className={`inline-block rounded-full coverage-${status} ${dim}`}
      title={TITLE[status]}
      aria-label={TITLE[status]}
    />
  );
}

/**
 * Inline legend showing a MINI MATRIX CELL for each status, same background,
 * same dot, so the visual link between the legend and the actual matrix is unmistakable.
 */
export function CoverageLegend() {
  const items: { status: CoverageStatus; short: string }[] = [
    { status: "green", short: SHORT_LABEL.green },
    { status: "yellow", short: SHORT_LABEL.yellow },
    { status: "red", short: SHORT_LABEL.red },
    { status: "gray", short: SHORT_LABEL.gray },
  ];
  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
        Cell colour =
      </span>
      {items.map((i) => (
        <span
          key={i.status}
          title={TITLE[i.status]}
          className={`inline-flex items-center gap-1.5 rounded px-2 py-1 ring-1 ring-inset ${CELL_BG[i.status]}`}
        >
          <CoverageDot status={i.status} />
          <span className="text-[11px] font-semibold text-slate-700">
            {i.short}
          </span>
        </span>
      ))}
      <CoverageLegendHelp />
    </div>
  );
}

/**
 * Click-to-expand "?" affordance, shows the full sentence-level definition
 * of every status. Use alongside CoverageLegend.
 */
function CoverageLegendHelp() {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-5 w-5 items-center justify-center rounded-full border border-slate-300 bg-white text-[10px] font-bold text-slate-600 hover:border-slate-400 hover:bg-slate-50"
        aria-label="Explain coverage statuses"
      >
        ?
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-hidden="true"
            tabIndex={-1}
          />
          <div className="absolute right-0 top-7 z-50 w-80 rounded-lg border border-slate-200 bg-white p-3 text-xs shadow-lg">
            <div className="mb-1 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              What the coverage status means
            </div>
            <p className="mb-2 text-slate-600">
              Each cell in the matrix is colour-coded by how completely a
              country's legal and institutional framework covers one
              intersection of a WSIP solution and a PIR dimension. The legend
              swatches match the cell backgrounds in the table below.
            </p>
            <CoverageRow status="green" title="Strong coverage" />
            <CoverageRow status="yellow" title="Partial coverage" />
            <CoverageRow status="red" title="Coverage gap" />
            <CoverageRow status="gray" title="Not yet mapped" />
          </div>
        </>
      )}
    </span>
  );
}

function CoverageRow({
  status,
  title,
}: {
  status: CoverageStatus;
  title: string;
}) {
  return (
    <div className={`mt-2 flex items-start gap-2 rounded px-2 py-1.5 ring-1 ring-inset ${CELL_BG[status]}`}>
      <CoverageDot status={status} size="md" />
      <div className="leading-snug">
        <div className="text-[11px] font-semibold text-slate-900">{title}</div>
        <div className="text-[11px] text-slate-700">{TITLE[status]}</div>
      </div>
    </div>
  );
}

/**
 * Larger, always-visible legend card for embedding inside a page when the
 * inline legend doesn't read clearly enough. Each status looks like a mini
 * matrix cell, so the link is impossible to miss.
 */
export function CoverageLegendCard() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
        How to read the matrix
      </div>
      <p className="mt-1 text-xs text-slate-600">
        Each cell below is colour-coded. The colour and dot tell you how
        completely a country's law and institutions cover that WSIP × PIR
        intersection. The swatches in the row below match the cell colours in
        the table.
      </p>
      <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <CoverageRow status="green" title="Strong coverage" />
        <CoverageRow status="yellow" title="Partial coverage" />
        <CoverageRow status="red" title="Coverage gap" />
        <CoverageRow status="gray" title="Not yet mapped" />
      </div>
    </div>
  );
}
