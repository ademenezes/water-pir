import type {
  GovernmentLevel,
  SectorTarget,
  TargetDomain,
  TargetStatus,
} from "../types";

/**
 * Country-level "Targets & ambitions" panel. A typed KPI layer, distinct from
 * the de-jure mandate matrix: it records what a country (its government,
 * regulator, or an endorsed assessment) has actually committed to, including
 * the honest cases where no quantified target exists. Rendered as an editorial
 * table grouped by domain, not a grid of SaaS cards. Status reuses the coverage
 * mental model (set ≈ strength, not_set ≈ gap) without introducing new tokens.
 *
 * Conditional render: the dashboard mounts this only when country.targets is set.
 */

const DOMAIN_LABEL: Record<TargetDomain, string> = {
  water_access: "Water access",
  sanitation: "Sanitation",
  performance: "Performance",
  financing: "Financing",
  wrm: "Water resources",
};

const DOMAIN_ORDER: TargetDomain[] = [
  "water_access",
  "sanitation",
  "performance",
  "financing",
  "wrm",
];

const STATUS_LABEL: Record<TargetStatus, string> = {
  set: "Set",
  slipping: "Slipping",
  qualitative: "Qualitative",
  to_be_determined: "To be determined",
  not_set: "Not set",
};

const STATUS_BLURB: Record<TargetStatus, string> = {
  set: "Quantified target with a horizon",
  slipping: "Target exists but the deadline has been pushed back",
  qualitative: "Stated ambition, no number",
  to_be_determined: "Placeholder, value not yet fixed",
  not_set: "No national target exists",
};

// Status stripe / accent, picks up the coverage palette so it harmonises with
// matrix cells, droplets and the key-insights stripes. (No new colour tokens.)
const STATUS_STRIPE: Record<TargetStatus, string> = {
  set: "bg-emerald-500",
  slipping: "bg-amber-400",
  qualitative: "bg-slate-300",
  to_be_determined: "bg-slate-300",
  not_set: "bg-rose-500",
};

const STATUS_ACCENT: Record<TargetStatus, string> = {
  set: "text-emerald-700",
  slipping: "text-amber-700",
  qualitative: "text-slate-500",
  to_be_determined: "text-slate-500",
  not_set: "text-rose-700",
};

// Government level the target is set at. Reuses the existing GovernmentLevel
// type so the tag harmonises with the mandate swim-lane (national / state /
// local / basin). "state" reads as the regional / autonomous-republic tier.
const LEVEL_LABEL: Record<GovernmentLevel, string> = {
  national: "National",
  state: "Regional",
  local: "Municipal",
  basin: "River basin",
};

interface Props {
  targets: SectorTarget[];
}

export function TargetsPanel({ targets }: Props) {
  if (targets.length === 0) return null;

  const quantified = targets.filter(
    (t) => t.status === "set" || t.status === "slipping"
  ).length;

  const subnational = targets.filter(
    (t) => t.level && t.level !== "national"
  );
  const subnationalLevels = Array.from(
    new Set(subnational.map((t) => t.level as GovernmentLevel))
  );

  const domains = DOMAIN_ORDER.filter((d) =>
    targets.some((t) => t.domain === d)
  );

  return (
    <section>
      <div className="eyebrow">Targets &amp; ambitions</div>
      <h2 className="mt-3 font-display text-[clamp(24px,3vw,36px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
        What the country has committed to, and where it has not.
      </h2>
      <p className="prose-editorial mt-4 max-w-[44rem] text-[15px] text-brand-ink/75">
        Access, performance and financing goals set by the government, its
        regulator, or an endorsed assessment.{" "}
        <span className="tabular-nums">{quantified}</span> of{" "}
        <span className="tabular-nums">{targets.length}</span> are quantified
        with a horizon; the rest are qualitative, undetermined, or simply not
        set, which is the honest state of a sector mid-reform.
        {subnational.length > 0 && (
          <>
            {" "}
            <span className="tabular-nums">{subnational.length}</span> of{" "}
            <span className="tabular-nums">{targets.length}</span> sit below the
            national level ({subnationalLevels.map((l) => LEVEL_LABEL[l]).join(", ")}).
          </>
        )}
      </p>

      <div className="mt-10 border-t border-brand-ink/15">
        {domains.map((domain) => (
          <div
            key={domain}
            className="grid grid-cols-12 gap-x-6 gap-y-4 border-b border-brand-rule py-7"
          >
            <div className="col-span-12 md:col-span-3">
              <div className="eyebrow text-brand-deep">
                {DOMAIN_LABEL[domain]}
              </div>
            </div>
            <div className="col-span-12 md:col-span-9 divide-y divide-brand-rule">
              {targets
                .filter((t) => t.domain === domain)
                .map((t, i) => (
                  <TargetRow key={i} target={t} />
                ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TargetRow({ target }: { target: SectorTarget }) {
  const url = target.source.faolex_url ?? target.source.national_url;

  return (
    <div className="py-4 first:pt-0 last:pb-0">
      <div className="flex items-baseline gap-3">
        <span
          aria-hidden
          className={`block h-2 w-8 ${STATUS_STRIPE[target.status]}`}
        />
        <span
          className={`eyebrow ${STATUS_ACCENT[target.status]}`}
          title={STATUS_BLURB[target.status]}
        >
          {STATUS_LABEL[target.status]}
        </span>
        {target.level && (
          <span className="eyebrow-ink text-brand-ink/45">
            {LEVEL_LABEL[target.level]}
          </span>
        )}
        {target.target_year && (
          <span className="ml-auto font-display text-[14px] font-extrabold tabular-nums leading-none text-brand-deep">
            {target.target_year}
          </span>
        )}
      </div>

      <h3 className="mt-3 font-display text-[17px] font-bold leading-tight tracking-tightest text-brand-ink">
        {target.indicator}
      </h3>
      <p className="mt-1.5 font-serif text-[15px] leading-[1.5] text-brand-ink/85">
        {target.target_value}
        {target.baseline ? (
          <span className="text-brand-ink/55">
            {" "}
            (baseline: {target.baseline})
          </span>
        ) : null}
      </p>
      {target.note && (
        <p className="mt-1.5 font-serif text-[13px] italic leading-[1.5] text-brand-ink/60">
          {target.note}
        </p>
      )}

      <div className="mt-2.5 flex flex-wrap items-baseline gap-x-5 gap-y-1.5">
        <span className="eyebrow-ink text-brand-ink/55">
          {target.issuing_body}
        </span>
        <span className="font-display text-[12px] font-semibold tabular-nums text-brand-ink/80">
          {target.source.short}&nbsp;·&nbsp;{target.source.article}
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
