import { Link } from "react-router-dom";
import { WorldMap, WorldMapLegend } from "../components/WorldMap";
import { PipeNetwork } from "../components/brand/PipeNetwork";
import { PipeDivider } from "../components/brand/PipeDivider";
import { pickInsightForToday } from "../../data/insights";
import { LESSONS } from "../../data/lessons";
import { getCountry } from "../../data";
import { PIR_DIMENSIONS } from "../framework";
import type { CoverageStatus, PirDimension } from "../types";

/* ─────────────────────────────────────────────────────────────────────────────
 * Brazil-at-a-glance — custom editorial data graphic
 * Computed from the live BRAZIL profile. For each PIR dimension we count how
 * many of the 8 mapped sub-sectors are green / yellow / red / gray. Rendered
 * as a stacked bar with a small numeric counter, not as a card.
 * ──────────────────────────────────────────────────────────────────────────── */

const STATUS_COLORS: Record<CoverageStatus, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-400",
  red: "bg-rose-500",
  gray: "bg-brand-rule",
};

function useBrazilCoverageByDimension(): Array<{
  dim: PirDimension;
  label: string;
  counts: Record<CoverageStatus, number>;
  total: number;
}> {
  const brazil = getCountry("BRA");
  if (!brazil) {
    return PIR_DIMENSIONS.map((d) => ({
      dim: d.key,
      label: d.label,
      counts: { green: 0, yellow: 0, red: 0, gray: 0 },
      total: 0,
    }));
  }

  return PIR_DIMENSIONS.map((d) => {
    const counts: Record<CoverageStatus, number> = {
      green: 0,
      yellow: 0,
      red: 0,
      gray: 0,
    };
    let total = 0;
    for (const sub of brazil.subsectors) {
      const cell = sub.cells.find((c) => c.pir_dimension === d.key);
      if (cell) {
        counts[cell.coverage_status] += 1;
        total += 1;
      } else {
        counts.gray += 1;
        total += 1;
      }
    }
    return { dim: d.key, label: d.label, counts, total };
  });
}

function BrazilAtAGlance() {
  const rows = useBrazilCoverageByDimension();
  const totalCells = rows.reduce((acc, r) => acc + r.total, 0);
  const totalGreen = rows.reduce((acc, r) => acc + r.counts.green, 0);

  return (
    <figure aria-label="Brazil at a glance — coverage by PIR dimension">
      <div className="eyebrow">Figure · Brazil at a glance</div>
      <h3 className="mt-2 font-display text-[24px] font-extrabold leading-[1.1] tracking-tightest text-brand-ink">
        Coverage by PIR dimension, across 8 sub-sectors
      </h3>

      <dl className="mt-6 space-y-3.5">
        {rows.map((r) => (
          <div key={r.dim} className="grid grid-cols-12 items-center gap-3">
            <dt className="col-span-4 eyebrow-ink text-brand-ink/80">
              {r.label}
            </dt>
            <dd className="col-span-7 flex h-3 w-full overflow-hidden rounded-[1px] bg-brand-rule">
              {(["green", "yellow", "red", "gray"] as CoverageStatus[]).map(
                (s) => {
                  const pct = r.total > 0 ? (r.counts[s] / r.total) * 100 : 0;
                  if (pct === 0) return null;
                  return (
                    <span
                      key={s}
                      className={`${STATUS_COLORS[s]} h-full`}
                      style={{ width: `${pct}%` }}
                      aria-label={`${r.counts[s]} ${s}`}
                    />
                  );
                }
              )}
            </dd>
            <dd className="col-span-1 text-right font-sans text-[12px] tabular-nums text-brand-ink/65">
              {r.counts.green}/{r.total}
            </dd>
          </div>
        ))}
      </dl>

      <div className="mt-7 border-t border-brand-rule pt-4 grid grid-cols-3 gap-6 font-sans">
        <div>
          <div className="font-display text-[28px] font-extrabold leading-none tabular-nums text-brand-deep">
            {totalCells}
          </div>
          <div className="mt-1 eyebrow-ink text-brand-ink/65">Mapped cells</div>
        </div>
        <div>
          <div className="font-display text-[28px] font-extrabold leading-none tabular-nums text-brand-deep">
            {totalGreen}
          </div>
          <div className="mt-1 eyebrow-ink text-brand-ink/65">Strong</div>
        </div>
        <div>
          <div className="font-display text-[28px] font-extrabold leading-none tabular-nums text-brand-deep">
            8&nbsp;×&nbsp;6
          </div>
          <div className="mt-1 eyebrow-ink text-brand-ink/65">
            Sub-sectors&nbsp;×&nbsp;dim.
          </div>
        </div>
      </div>

      <figcaption className="figure-caption mt-5">
        <strong>Source</strong> · Brazil country profile (this tool), 2026.
        Each bar shows the 8 mapped WSS / WRM sub-sectors split by coverage
        status. Hover the matrix for cell detail.
      </figcaption>
    </figure>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
 * Page
 * ──────────────────────────────────────────────────────────────────────────── */

export function HomePage() {
  const insight = pickInsightForToday();
  const findings = LESSONS.slice(0, 3);

  return (
    <div>
      {/* ── Spread 1 · Cover ──────────────────────────────────────────────── */}
      <section className="relative isolate overflow-hidden bg-brand-teal text-brand-ink">
        <div className="absolute inset-0 -z-10 text-brand-ink/95">
          <div className="absolute right-[-8%] top-[-4%] h-[120%] w-[68%] opacity-95">
            <PipeNetwork className="h-full w-full" />
          </div>
        </div>

        <div className="mx-auto grid min-h-[78vh] max-w-[88rem] grid-cols-12 items-end gap-8 px-8 pb-16 pt-32">
          <div className="col-span-12 md:col-span-7">
            <div className="eyebrow-ink text-brand-ink/80">
              Water&nbsp;·&nbsp;Policies, Institutions, Regulation
            </div>
            <h1 className="display-hero mt-6 text-[clamp(40px,6.2vw,80px)]">
              Water reform starts
              <br />
              with the law.
            </h1>
            <p className="prose-editorial mt-7 max-w-[34rem] text-[20px] italic text-brand-ink/85">
              This tool maps every water-sector law, regulator and mandate to
              the World Bank Group's WSIP&nbsp;×&nbsp;PIR framework — so you
              can find the gap, cite the source, and brief the minister.
            </p>
            <div className="mt-10 flex flex-wrap items-baseline gap-6 font-serif italic">
              <Link
                to="/country/BRA"
                className="text-[20px] font-medium text-brand-ink underline decoration-brand-ink/40 decoration-2 underline-offset-[8px] transition-colors hover:text-brand-ink hover:decoration-brand-ink"
              >
                Begin with Brazil&nbsp;→
              </Link>
              <Link
                to="/wsip-matrix"
                className="text-[16px] text-brand-ink/70 underline decoration-brand-ink/20 underline-offset-[6px] hover:text-brand-ink hover:decoration-brand-ink/60"
              >
                Open the full matrix
              </Link>
            </div>
          </div>

          <div className="col-span-12 hidden md:col-span-5 md:block">
            {/* This column holds the rightward bleed of the pipe artwork */}
            <div className="h-1 w-0" />
          </div>
        </div>
      </section>

      {/* ── Spread 2 · Thesis + data ──────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto grid max-w-[88rem] grid-cols-12 gap-12 px-8 py-24">
          <div className="col-span-12 md:col-span-6">
            <div className="eyebrow">About this tool</div>
            <h2 className="mt-3 font-display text-[34px] font-extrabold leading-[1.06] tracking-tightest text-brand-ink">
              Who governs water — and where the law is silent.
            </h2>

            <div className="prose-editorial mt-7 max-w-[34rem]">
              <p>
                Water reform is a governance problem before it is a financing
                problem. Policies set the direction; institutions hold the
                mandates; regulation translates them into rules a utility can
                act on. When any one of those is missing, the gap shows up not
                in a policy paper but in the legal text itself — or in its
                absence.
              </p>
              <p>
                The Water&nbsp;·&nbsp;PIR tool reads each country's sector law
                and lays it onto two anchored frameworks: the WBG's seven
                <em> scalable solutions</em> (WSIP, December 2025) and the six
                analytical dimensions of <em>policy, institutions,
                intergovernmental context, financing, regulation and resilience
                </em> (PIR, August 2022). What you see in a single cell is the
                statute, the regulator, the mandate, and — where it diverges —
                the de-facto note that records what's actually happening on
                the ground.
              </p>
            </div>

            <blockquote className="pull-quote mt-10 border-l-2 border-brand-amber pl-6">
              Institutional fragmentation is the&nbsp;<span className="not-italic font-semibold text-brand-deep">#1 challenge</span> to good water management — ahead of weak infrastructure, data, or finance.
              <span className="mt-2 block not-italic text-[12px] font-semibold uppercase tracking-[0.18em] text-brand-ink/55">
                Source · Water Policy Group survey of 86 ministries (2021), via BOSIB Fig 1.1
              </span>
            </blockquote>
          </div>

          <div className="col-span-12 md:col-span-6">
            <BrazilAtAGlance />
            <div className="mt-8 border-t border-brand-rule pt-5">
              <Link
                to="/wsip-matrix?country=BRA"
                className="link-editorial font-display text-[15px] font-semibold tracking-[0.04em]"
              >
                Open the full matrix for Brazil&nbsp;→
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pipe divider ──────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-[88rem] px-8 text-brand-rule">
        <PipeDivider className="h-4 w-full" />
      </div>

      {/* ── Spread 3 · Three findings ─────────────────────────────────────── */}
      <section className="bg-white">
        <div className="mx-auto max-w-[88rem] px-8 py-24">
          <div className="grid grid-cols-12 gap-12">
            <div className="col-span-12 md:col-span-4">
              <div className="eyebrow">Three findings</div>
              <h2 className="mt-3 font-display text-[34px] font-extrabold leading-[1.06] tracking-tightest text-brand-ink">
                What the framework reveals in practice.
              </h2>
              <p className="prose-editorial mt-5 max-w-[28rem] text-[16px]">
                Three short cases from countries the tool covers (Brazil) or
                pipelines (Kenya, Colombia). Each illustrates one corner of
                the PIR framework moving the needle on outcomes.
              </p>
            </div>

            <ol className="col-span-12 md:col-span-8 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
              {findings.map((f, i) => {
                const dimDef = PIR_DIMENSIONS.find(
                  (d) => d.key === (f.pir_dimension as PirDimension)
                );
                const hasLive = !!getCountry(f.country_code);
                const linkTarget =
                  hasLive && f.subsector_key
                    ? `/country/${f.country_code}/subsector/${f.subsector_key}#pir-${f.pir_dimension}`
                    : hasLive
                    ? `/country/${f.country_code}`
                    : `/countries`;
                return (
                  <li
                    key={f.key}
                    className="border-t border-brand-rule pt-4"
                  >
                    <div className="chapter-numeral text-[64px]">
                      {String(i + 1).padStart(2, "0")}
                    </div>
                    <p className="mt-3 font-serif text-[20px] leading-[1.3] text-brand-ink">
                      {f.title}.
                    </p>
                    <div className="mt-5 eyebrow-ink text-brand-ink/55">
                      {f.country_name}&nbsp;·&nbsp;{dimDef?.label ?? f.pir_dimension}
                    </div>
                    <Link
                      to={linkTarget}
                      className="link-editorial mt-3 inline-block font-sans text-[13px]"
                    >
                      {hasLive ? "Read the case" : "Country in pipeline"}&nbsp;→
                    </Link>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </section>

      {/* ── Spread 4 · Map + featured insight ─────────────────────────────── */}
      <section className="bg-brand-sand">
        <div className="mx-auto grid max-w-[88rem] grid-cols-12 gap-12 px-8 py-24">
          <div className="col-span-12 md:col-span-7">
            <div className="eyebrow">Coverage</div>
            <h2 className="mt-3 font-display text-[34px] font-extrabold leading-[1.06] tracking-tightest text-brand-ink">
              The 27 WSIP Water Compact countries.
            </h2>
            <p className="prose-editorial mt-5 max-w-[36rem] text-[16px]">
              The first cohort identified by the World Bank Group under the
              2025 WSIP. Brazil is the pilot for this tool; the rest of the
              cohort is pipelined.
            </p>

            <div className="mt-8 border border-brand-rule bg-white p-3">
              <WorldMap />
            </div>
            <div className="mt-3">
              <WorldMapLegend />
            </div>
          </div>

          <aside className="col-span-12 md:col-span-5">
            <div className="border-l-2 border-brand-deep pl-6">
              <div className="eyebrow">Did you know</div>
              <h3 className="mt-3 font-serif text-[24px] leading-[1.25] text-brand-ink">
                {insight.title}.
              </h3>
              <p className="prose-editorial mt-5 text-[16px] text-brand-ink/85">
                {insight.body}
              </p>
              <div className="mt-6 text-[12px] font-sans uppercase tracking-[0.18em] text-brand-ink/55">
                Source&nbsp;·&nbsp;{insight.source}
              </div>
              {insight.link && (
                <Link
                  to={insight.link.href}
                  className="link-editorial mt-5 inline-block font-sans text-[13px]"
                >
                  {insight.link.label}
                </Link>
              )}
            </div>
          </aside>
        </div>
      </section>

      {/* ── Spread 5 · Wizard CTA ─────────────────────────────────────────── */}
      <section className="bg-brand-ink text-white">
        <div className="mx-auto grid max-w-[88rem] grid-cols-12 items-center gap-8 px-8 py-20">
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow-white">For project preparation</div>
            <h2 className="mt-4 font-display text-[clamp(28px,4vw,52px)] font-extrabold leading-[1.05] tracking-tightest text-white">
              Planning a water project? The wizard
              <br className="hidden md:inline" />
              shows you the law, the regulator, the gap.
            </h2>
          </div>
          <div className="col-span-12 md:col-span-4 md:text-right">
            <Link
              to="/wizard"
              className="font-serif italic text-[20px] text-brand-teal underline decoration-brand-teal/40 decoration-2 underline-offset-[8px] hover:text-white hover:decoration-white"
            >
              Open the wizard&nbsp;→
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

