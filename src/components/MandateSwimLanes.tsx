import { useEffect, useMemo, useState } from "react";
import type {
  MandateRecord,
  MandateFunction,
  GovernmentLevel,
} from "../types";

/**
 * Country mandate diagram: 4 government levels × 6 water-sector functions.
 * Each chip is anchored to a specific article (popover on click); empty cells
 * show a dashed "mandate gap" placeholder so constitutional silences are
 * visible at a glance.
 *
 * Editorial restyle of the original swim-lane: warm-neutral grid lines, no
 * heavy slate row banners, typographic chips (no rounded boxes), and a popover
 * that matches the MatrixCellPanel styling.
 */

const LEVEL_ORDER: GovernmentLevel[] = ["national", "state", "local", "basin"];

const LEVEL_LABEL: Record<GovernmentLevel, string> = {
  national: "Federal",
  state: "State",
  local: "Municipal",
  basin: "Basin",
};

const LEVEL_BLURB: Record<GovernmentLevel, string> = {
  national: "União, CF/1988 Art. 21, XIX",
  state: "Estados, CF/1988 Art. 26, I",
  local: "Municípios, CF/1988 Art. 30; LNSB Art. 8-A",
  basin: "Bacia hidrográfica, PNRH Art. 1, V",
};

// Per-level accent stripe drawn on the row header (left edge).
const LEVEL_STRIPE: Record<GovernmentLevel, string> = {
  national: "bg-brand-ink",
  state: "bg-pir-policy",
  local: "bg-brand-deep",
  basin: "bg-pir-resilience",
};

const FUNCTION_ORDER: MandateFunction[] = [
  "policy",
  "norm_setting",
  "regulation",
  "planning",
  "service_delivery",
  "financing",
];

const FUNCTION_LABEL: Record<MandateFunction, string> = {
  policy: "Policy",
  norm_setting: "Norm-setting",
  regulation: "Regulation",
  planning: "Planning",
  service_delivery: "Service delivery",
  financing: "Financing",
};

const FUNCTION_BLURB: Record<MandateFunction, string> = {
  policy: "Who sets the rules of the game",
  norm_setting: "Who issues binding normative acts",
  regulation: "Who licenses, tariffs, enforces",
  planning: "Who produces the plans",
  service_delivery: "Who actually delivers the service",
  financing: "Who mobilises and allocates money",
};

interface Props {
  records: MandateRecord[];
}

export function MandateSwimLanes({ records }: Props) {
  const [openChip, setOpenChip] = useState<string | null>(null);

  // Close on Escape
  useEffect(() => {
    if (!openChip) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenChip(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [openChip]);

  // Bucket by (level, function)
  const cells = useMemo(() => {
    const map = new Map<string, MandateRecord[]>();
    for (const r of records) {
      const key = `${r.level}:${r.function}`;
      const arr = map.get(key) ?? [];
      arr.push(r);
      map.set(key, arr);
    }
    return map;
  }, [records]);

  return (
    <section>
      <div className="eyebrow">Who does what</div>
      <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
        Federal, state, municipal, basin, across the value chain.
      </h2>
      <p className="prose-editorial mt-4 max-w-[44rem] text-[15px] text-brand-ink/75">
        Each entry cites the article that grants the mandate. Empty cells are
        mandate gaps, no actor currently holds that function at that level.
        Click any entry for the legal basis and the canonical source.
      </p>

      {/* Desktop grid */}
      <div className="mt-8 hidden md:block">
        <div className="overflow-x-auto border-y border-brand-rule">
          <table className="w-full min-w-[920px] table-fixed border-collapse">
            <thead>
              <tr className="border-b border-brand-rule">
                <th className="w-[180px] px-4 py-4 text-left align-bottom">
                  <div className="eyebrow-ink text-brand-ink/55">Level</div>
                </th>
                {FUNCTION_ORDER.map((fn) => (
                  <th
                    key={fn}
                    scope="col"
                    className="border-l border-brand-rule px-4 py-4 align-bottom text-left"
                  >
                    <div className="font-display text-[12px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
                      {FUNCTION_LABEL[fn]}
                    </div>
                    <div className="mt-1.5 font-serif italic text-[12px] leading-snug text-brand-ink/55">
                      {FUNCTION_BLURB[fn]}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {LEVEL_ORDER.map((level) => (
                <tr key={level} className="border-t border-brand-rule align-top">
                  <th scope="row" className="w-[180px] p-0 text-left align-top">
                    <div className="flex h-full items-stretch">
                      <span
                        className={`w-1 shrink-0 ${LEVEL_STRIPE[level]}`}
                        aria-hidden
                      />
                      <div className="flex-1 px-4 py-4">
                        <div className="font-display text-[18px] font-extrabold leading-tight tracking-tightest text-brand-ink">
                          {LEVEL_LABEL[level]}
                        </div>
                        <div className="mt-1.5 font-serif italic text-[12px] leading-snug text-brand-ink/55">
                          {LEVEL_BLURB[level]}
                        </div>
                      </div>
                    </div>
                  </th>
                  {FUNCTION_ORDER.map((fn) => {
                    const items = cells.get(`${level}:${fn}`) ?? [];
                    const isEmpty = items.length === 0;
                    return (
                      <td
                        key={fn}
                        className={[
                          "border-l border-brand-rule px-3 py-3 align-top",
                          isEmpty ? "bg-brand-sand/30" : "",
                        ].join(" ")}
                      >
                        {isEmpty ? (
                          <div className="flex min-h-[56px] items-center border border-dashed border-brand-rule px-3 py-2 font-serif italic text-[12px] text-brand-ink/45">
                            mandate gap
                          </div>
                        ) : (
                          <ul className="space-y-2">
                            {items.map((r, i) => {
                              const chipId = `d:${level}:${fn}:${i}`;
                              return (
                                <li key={chipId}>
                                  <Chip
                                    record={r}
                                    open={openChip === chipId}
                                    onToggle={() =>
                                      setOpenChip((cur) =>
                                        cur === chipId ? null : chipId
                                      )
                                    }
                                  />
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 font-serif italic text-[12px] text-brand-ink/55 max-w-[44rem]">
          All citations verified against the canonical text indexed in
          documents/brazil/manifest.json. Level labels reflect display names;
          underlying values are national / state / local / basin.
        </p>
      </div>

      {/* Mobile accordion */}
      <div className="mt-8 md:hidden">
        <ul className="border-y border-brand-rule divide-y divide-brand-rule">
          {LEVEL_ORDER.map((level) => {
            const levelRecords = records.filter((r) => r.level === level);
            if (levelRecords.length === 0) return null;
            return (
              <li key={level}>
                <details className="group">
                  <summary className="flex cursor-pointer items-baseline justify-between gap-4 py-4">
                    <div className="flex items-baseline gap-3">
                      <span
                        className={`block h-2 w-6 ${LEVEL_STRIPE[level]}`}
                        aria-hidden
                      />
                      <span className="font-display text-[16px] font-extrabold tracking-tightest text-brand-ink">
                        {LEVEL_LABEL[level]}
                      </span>
                    </div>
                    <span className="eyebrow text-brand-ink/55 group-open:hidden">
                      Expand
                    </span>
                    <span className="hidden eyebrow text-brand-ink/55 group-open:inline">
                      Collapse
                    </span>
                  </summary>
                  <div className="space-y-5 pb-5">
                    {FUNCTION_ORDER.map((fn) => {
                      const items = cells.get(`${level}:${fn}`) ?? [];
                      return (
                        <div key={fn}>
                          <div className="flex items-baseline gap-3">
                            <div className="eyebrow">{FUNCTION_LABEL[fn]}</div>
                            <span className="font-serif italic text-[11px] text-brand-ink/45">
                              {FUNCTION_BLURB[fn]}
                            </span>
                          </div>
                          {items.length === 0 ? (
                            <div className="mt-2 border border-dashed border-brand-rule px-3 py-2 font-serif italic text-[12px] text-brand-ink/45">
                              mandate gap
                            </div>
                          ) : (
                            <ul className="mt-2 space-y-2">
                              {items.map((r, i) => {
                                const chipId = `m:${level}:${fn}:${i}`;
                                return (
                                  <li key={chipId}>
                                    <Chip
                                      record={r}
                                      open={openChip === chipId}
                                      onToggle={() =>
                                        setOpenChip((cur) =>
                                          cur === chipId ? null : chipId
                                        )
                                      }
                                    />
                                  </li>
                                );
                              })}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </details>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function Chip({
  record,
  open,
  onToggle,
}: {
  record: MandateRecord;
  open: boolean;
  onToggle: () => void;
}) {
  const label = record.acronym ?? record.actor;
  const sourceUrl =
    record.legal_basis.faolex_url ?? record.legal_basis.national_url;
  const ariaLabel = `${record.actor}, ${record.function.replace("_", " ")}, ${
    record.legal_basis.short
  } ${record.legal_basis.article}`;

  return (
    <span className="relative inline-block w-full">
      <button
        type="button"
        onClick={onToggle}
        aria-label={ariaLabel}
        aria-expanded={open}
        className={[
          "block w-full text-left transition-colors px-2.5 py-2 border-l-2",
          open
            ? "border-brand-deep bg-brand-sand/40"
            : "border-brand-rule hover:border-brand-deep hover:bg-brand-sand/30",
        ].join(" ")}
        title={record.actor}
      >
        <div className="font-display text-[13px] font-semibold leading-tight tabular-nums text-brand-ink">
          {label}
        </div>
        <div className="mt-1 eyebrow-ink text-[10px] text-brand-ink/55">
          {record.legal_basis.short}&nbsp;·&nbsp;{record.legal_basis.article}
        </div>
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default"
            onClick={onToggle}
            aria-hidden
            tabIndex={-1}
          />
          <div
            role="dialog"
            className="absolute left-0 top-full z-50 mt-1 w-[22rem] border border-brand-rule bg-white p-5 shadow-2xl"
          >
            <div className="eyebrow">Legal basis</div>
            <h4 className="mt-2 font-display text-[16px] font-extrabold leading-tight tracking-tightest text-brand-ink">
              {record.actor}
            </h4>
            <div className="mt-2 font-display text-[13px] font-semibold tabular-nums text-brand-deep">
              {record.legal_basis.short}&nbsp;·&nbsp;{record.legal_basis.article}
            </div>

            {record.legal_basis.verbatim_short && (
              <blockquote className="mt-3 border-l-2 border-brand-rule pl-3 font-serif italic text-[13px] leading-[1.55] text-brand-ink/80">
                &ldquo;{record.legal_basis.verbatim_short}&rdquo;
              </blockquote>
            )}

            {record.de_facto_note && (
              <aside className="mt-4 border-l-2 border-brand-amber bg-brand-sand px-4 py-3">
                <div className="eyebrow text-brand-amber">
                  De&#8209;jure vs. de&#8209;facto
                </div>
                <p className="mt-1.5 font-serif text-[13px] leading-[1.55] text-brand-ink/85">
                  {record.de_facto_note}
                </p>
              </aside>
            )}

            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link-editorial mt-4 inline-block font-sans text-[12px] tracking-[0.04em]"
              >
                Open canonical source&nbsp;→
              </a>
            )}
          </div>
        </>
      )}
    </span>
  );
}
