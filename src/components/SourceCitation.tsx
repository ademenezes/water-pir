import type { LegalInstrument } from "../types";

const TYPE_LABELS: Record<string, string> = {
  constitution: "Constitution",
  framework_law: "Framework Law",
  sectoral_law: "Sectoral Law",
  decree: "Decree",
  regulation: "Regulation",
  resolution: "Resolution",
  policy: "Policy",
  plan: "Plan",
};

interface Props {
  instrument: LegalInstrument;
  compact?: boolean;
}

export function SourceCitation({ instrument, compact }: Props) {
  const url = instrument.faolex_url ?? instrument.national_url;
  const isFaolex = !!instrument.faolex_url;

  const inner = (
    <span className="inline-flex items-baseline gap-1.5">
      <span className="font-semibold text-slate-800">{instrument.short}</span>
      <span className="text-xs text-slate-500">
        · {TYPE_LABELS[instrument.type] ?? instrument.type} · {instrument.year}
      </span>
      {isFaolex && (
        <span className="ml-1 inline-flex items-center rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-emerald-700 ring-1 ring-emerald-200">
          FAOLEX
        </span>
      )}
      {!isFaolex && instrument.national_url && (
        <span className="ml-1 inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-slate-200">
          National source
        </span>
      )}
    </span>
  );

  if (compact) {
    return url ? (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:underline"
      >
        {inner}
      </a>
    ) : (
      <span>{inner}</span>
    );
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white p-3 hover:border-slate-300">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          {url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-900 hover:underline"
            >
              {inner}
            </a>
          ) : (
            inner
          )}
          {instrument.title !== instrument.short && (
            <div className="mt-0.5 text-sm text-slate-600">{instrument.title}</div>
          )}
          {instrument.articles_cited && (
            <div className="mt-1 text-xs text-slate-500">
              <span className="font-medium">Articles cited:</span>{" "}
              {instrument.articles_cited}
            </div>
          )}
          {instrument.note && (
            <div className="mt-1 text-xs italic text-slate-500">
              {instrument.note}
            </div>
          )}
        </div>
        {instrument.faolex_id && (
          <span className="font-mono text-[11px] text-slate-400">
            {instrument.faolex_id}
          </span>
        )}
      </div>
    </div>
  );
}
