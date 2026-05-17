import type { KeyInsight } from "../types";
import { PIR_DIMENSIONS } from "../framework";

/**
 * Country-level key-insights section. Renders each KeyInsight as an editorial
 * mini-feature anchored to a specific law article, not a card. Severity is
 * communicated by a colored top-stripe and a tracked eyebrow, both reusing the
 * coverage colour palette (strength=green, tension=yellow, gap=red) so the
 * mental model matches the rest of the dashboard.
 */

const SEVERITY_LABEL: Record<KeyInsight["severity"], string> = {
  tension: "Tension",
  gap: "Gap",
  strength: "Strength",
};

const SEVERITY_BLURB: Record<KeyInsight["severity"], string> = {
  tension: "Law clashes with another law, court, or practice",
  gap: "Law exists but coverage or enforcement falls short",
  strength: "Law and implementation work together",
};

// Severity colour bar, picks up the coverage palette so it harmonises with
// matrix cells and droplets. (No new colour tokens.)
const SEVERITY_STRIPE: Record<KeyInsight["severity"], string> = {
  strength: "bg-emerald-500",
  tension: "bg-amber-400",
  gap: "bg-rose-500",
};

const SEVERITY_ACCENT: Record<KeyInsight["severity"], string> = {
  strength: "text-emerald-700",
  tension: "text-amber-700",
  gap: "text-rose-700",
};

interface Props {
  insights: KeyInsight[];
}

export function KeyInsightsSection({ insights }: Props) {
  if (insights.length === 0) return null;

  return (
    <section>
      <div className="eyebrow">Key insights</div>
      <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
        What the law actually says, and where reality diverges.
      </h2>
      <p className="prose-editorial mt-4 max-w-[44rem] text-[15px] text-brand-ink/75">
        Each entry is anchored to a specific article from a verified primary
        source. Severity tags mark whether the article shows up in practice as
        a strength, a tension, or a gap.
      </p>

      <ol className="mt-10 grid grid-cols-1 gap-x-10 gap-y-12 md:grid-cols-2">
        {insights.map((insight, i) => (
          <InsightRow key={i} insight={insight} index={i} />
        ))}
      </ol>
    </section>
  );
}

function InsightRow({ insight, index }: { insight: KeyInsight; index: number }) {
  const sourceUrl =
    insight.legal_basis.faolex_url ?? insight.legal_basis.national_url;
  const dim = PIR_DIMENSIONS.find((d) => d.key === insight.pir_dimension);

  return (
    <li className="border-t border-brand-rule pt-5">
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className={`block h-2 w-10 ${SEVERITY_STRIPE[insight.severity]}`}
        />
        <span
          className={`eyebrow ${SEVERITY_ACCENT[insight.severity]}`}
          title={SEVERITY_BLURB[insight.severity]}
        >
          {SEVERITY_LABEL[insight.severity]}
        </span>
        <span className="ml-auto font-display text-[14px] font-extrabold tabular-nums leading-none text-brand-deep">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <h3 className="mt-4 font-display text-[20px] font-extrabold leading-tight tracking-tightest text-brand-ink">
        {insight.title}.
      </h3>

      <p className="mt-3 font-serif text-[15px] leading-[1.55] text-brand-ink/85">
        {insight.body}
      </p>

      <div className="mt-5 border-t border-brand-rule pt-3 flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
        <span className="font-display text-[12px] font-semibold tabular-nums text-brand-ink">
          {insight.legal_basis.short}&nbsp;·&nbsp;{insight.legal_basis.article}
        </span>
        {dim && (
          <span className="eyebrow-ink text-brand-ink/55">
            PIR · {dim.label}
          </span>
        )}
        {sourceUrl && (
          <a
            href={sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-editorial font-sans text-[12px] tracking-[0.04em]"
          >
            Source&nbsp;→
          </a>
        )}
      </div>
    </li>
  );
}
