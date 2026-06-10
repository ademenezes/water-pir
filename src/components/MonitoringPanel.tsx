import type {
  GovernmentLevel,
  MonitoringDomain,
  MonitoringIndicator,
  MonitoringStatus,
} from "../types";

/**
 * Country-level "Monitoring & evidence base" panel. A typed observability layer,
 * sibling to the Targets panel but answering a different question: not what the
 * country has committed to, but whether it can actually measure its own sector.
 * Each row names the indicator, the latest value and as-of year, who produces it,
 * and a monitoring-quality signal. Status reuses the coverage mental model
 * (measured ≈ strength, not_measured ≈ gap) without introducing new tokens.
 *
 * Conditional render: the dashboard mounts this only when country.monitoring is set.
 */

const DOMAIN_LABEL: Record<MonitoringDomain, string> = {
  water_access: "Water access",
  sanitation: "Sanitation",
  performance: "Service performance",
  resource: "Water resources",
  financing: "Financing",
};

const DOMAIN_ORDER: MonitoringDomain[] = [
  "water_access",
  "sanitation",
  "performance",
  "resource",
  "financing",
];

const STATUS_LABEL: Record<MonitoringStatus, string> = {
  measured: "Measured",
  partial: "Partial",
  stale: "Stale",
  not_measured: "Not measured",
  unmapped: "Unmapped",
};

const STATUS_BLURB: Record<MonitoringStatus, string> = {
  measured: "Regularly produced and current",
  partial: "Measured, but incomplete coverage or a proxy only",
  stale: "Exists but one-off or out of date",
  not_measured: "No measurement system in place",
  unmapped: "Not yet assessed",
};

// Status stripe / accent, picks up the coverage palette so it harmonises with
// the Targets panel, matrix cells and key-insights stripes. (No new colour tokens.)
const STATUS_STRIPE: Record<MonitoringStatus, string> = {
  measured: "bg-emerald-500",
  partial: "bg-amber-400",
  stale: "bg-amber-400",
  not_measured: "bg-rose-500",
  unmapped: "bg-slate-300",
};

const STATUS_ACCENT: Record<MonitoringStatus, string> = {
  measured: "text-emerald-700",
  partial: "text-amber-700",
  stale: "text-amber-700",
  not_measured: "text-rose-700",
  unmapped: "text-slate-500",
};

// Government level the indicator is measured at. Reuses the existing
// GovernmentLevel type so the tag harmonises with the Targets panel and the
// mandate swim-lane. "state" reads as the regional / autonomous-republic tier.
const LEVEL_LABEL: Record<GovernmentLevel, string> = {
  national: "National",
  state: "Regional",
  local: "Municipal",
  basin: "River basin",
};

interface Props {
  indicators: MonitoringIndicator[];
}

export function MonitoringPanel({ indicators }: Props) {
  if (indicators.length === 0) return null;

  const blind = indicators.filter(
    (i) => i.status === "not_measured" || i.status === "stale"
  ).length;

  const domains = DOMAIN_ORDER.filter((d) =>
    indicators.some((i) => i.domain === d)
  );

  return (
    <section>
      <div className="eyebrow">Monitoring &amp; evidence base</div>
      <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
        What the country can actually see about its own sector.
      </h2>
      <p className="prose-editorial mt-4 max-w-[44rem] text-[15px] text-brand-ink/75">
        Each indicator names who measures it, the latest value, and the year it is
        current to. <span className="tabular-nums">{blind}</span> of{" "}
        <span className="tabular-nums">{indicators.length}</span> are unmonitored or
        stale, the sector's blind spots, which is what makes a target hard to steer
        toward even where one has been set.
      </p>

      <div className="mt-10 border-t border-brand-ink/15">
        {domains.map((domain) => (
          <div
            key={domain}
            className="grid grid-cols-12 gap-x-6 gap-y-4 border-b border-brand-rule py-7"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="eyebrow text-brand-deep">{DOMAIN_LABEL[domain]}</div>
            </div>
            <div className="col-span-12 md:col-span-9 divide-y divide-brand-rule">
              {indicators
                .filter((i) => i.domain === domain)
                .map((i, n) => (
                  <IndicatorRow key={n} indicator={i} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function IndicatorRow({ indicator }: { indicator: MonitoringIndicator }) {
  const url = indicator.source.faolex_url ?? indicator.source.national_url;

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className={`block h-2 w-8 ${STATUS_STRIPE[indicator.status]}`}
        />
        <span
          className={`eyebrow ${STATUS_ACCENT[indicator.status]}`}
          title={STATUS_BLURB[indicator.status]}
        >
          {STATUS_LABEL[indicator.status]}
        </span>
        {indicator.level && (
          <span className="eyebrow-ink text-brand-ink/45">
            {LEVEL_LABEL[indicator.level]}
          </span>
        )}
        {indicator.as_of_year && (
          <span className="ml-auto font-display text-[14px] font-extrabold tabular-nums leading-none text-brand-deep">
            {indicator.as_of_year}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-[17px] font-bold leading-tight tracking-tightest text-brand-ink">
        {indicator.indicator}
      </h3>
      <p className="mt-1.5 font-serif text-[15px] leading-[1.5] text-brand-ink/85">
        {indicator.current_value}
      </p>
      {indicator.gap_note && (
        <p className="mt-1.5 font-serif text-[13px] italic leading-[1.5] text-brand-ink/60">
          {indicator.gap_note}
        </p>
      )}

      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
        <span className="eyebrow-ink text-brand-ink/55">{indicator.producer}</span>
        <span className="font-display text-[12px] font-semibold tabular-nums text-brand-ink/80">
          {indicator.source.short}&nbsp;·&nbsp;{indicator.source.article}
        </span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="link-editorial font-sans text-[12px] tracking-[0.04em]"
          >
            Source&nbsp;→
          </a>
        )}
      </div>
    </div>
  );
}
