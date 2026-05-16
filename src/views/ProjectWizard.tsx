import { Link, useSearchParams } from "react-router-dom";
import { PROJECT_TYPES, getProjectType } from "../../data/project-types";
import { listCountries } from "../../data";
import {
  PIR_DIMENSIONS,
  SUBSECTOR_LABELS,
  WSIP_SOLUTIONS,
} from "../framework";
import { Droplet } from "../components/brand/Droplet";
import { CELL_BG } from "../components/CoverageDot";
import type { CoverageStatus, PirDimension, SubsectorEntry } from "../types";

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

const PILLAR_LABEL: Record<"people" | "food" | "planet", string> = {
  people: "Water · People",
  food: "Water · Food",
  planet: "Water · Planet",
};

const PILLAR_STRIPE: Record<"people" | "food" | "planet", string> = {
  people: "bg-pillar-people",
  food: "bg-pillar-food",
  planet: "bg-pillar-planet",
};

/* ─────────────────────────────────────────────────────────────────────────── */

export function ProjectWizard() {
  const [params, setParams] = useSearchParams();
  const projectKey = params.get("project");
  const countryCode = (params.get("country") ?? "BRA").toUpperCase();

  const project = projectKey ? getProjectType(projectKey) : undefined;
  const liveCountries = listCountries();
  const country = liveCountries.find((c) => c.code === countryCode);

  if (!project) {
    return <ProjectPicker />;
  }

  // Find the matched sub-sectors for this country
  const matchedSubsectors = country
    ? country.subsectors.filter((s) => project.subsector_keys.includes(s.key))
    : [];

  // Aggregate coverage of critical dimensions across the matched sub-sectors
  const critical = project.critical_dimensions.map((dim) => {
    const cells = matchedSubsectors
      .map((s) => ({ sub: s, cell: s.cells.find((c) => c.pir_dimension === dim) }))
      .filter((x) => x.cell);
    const best = cells.reduce<{
      status: CoverageStatus;
      mandate?: string;
      sub?: SubsectorEntry;
    }>(
      (acc, c) => {
        const rank = (s: CoverageStatus) =>
          s === "green" ? 4 : s === "yellow" ? 3 : s === "red" ? 2 : 1;
        return rank(c.cell!.coverage_status) > rank(acc.status)
          ? {
              status: c.cell!.coverage_status,
              mandate: c.cell!.mandate_text,
              sub: c.sub,
            }
          : acc;
      },
      { status: "gray" as CoverageStatus }
    );
    return { dim, best };
  });

  return (
    <article>
      {/* ── Chapter cover ─────────────────────────────────────────────────── */}
      <header className="grid grid-cols-12 gap-8 pt-8 pb-12">
        <div className="col-span-12 md:col-span-3">
          <div className="eyebrow">Chapter · 03</div>
          <div className="chapter-numeral mt-3 text-[120px] md:text-[140px]">
            03
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Link
            to="/wizard"
            className="eyebrow text-brand-ink/55 hover:text-brand-deep"
          >
            ←&nbsp;Change project archetype
          </Link>
          <h1 className="mt-4 font-display text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.04] tracking-tightest text-brand-ink">
            {project.label}.
          </h1>
          <p className="prose-editorial mt-5 max-w-[44rem] text-[18px] italic text-brand-ink/80">
            {project.short_desc}
          </p>

          {/* WSIP solution stripes */}
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2">
            {project.wsip_solutions.map((id) => {
              const sol = WSIP_SOLUTIONS.find((s) => s.id === id);
              if (!sol) return null;
              return (
                <li
                  key={id}
                  className="flex items-center gap-2 font-sans text-[13px] text-brand-ink"
                >
                  <span
                    className={`h-2 w-6 ${PILLAR_STRIPE[sol.pillar]}`}
                    aria-hidden
                  />
                  <span className="font-semibold tabular-nums">
                    WSIP&nbsp;#{id}
                  </span>
                  <span className="text-brand-ink/70">{sol.shortName}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </header>

      {/* ── Editorial masthead controls ───────────────────────────────────── */}
      <section className="border-y border-brand-rule py-6">
        <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-serif text-[17px] text-brand-ink">
          <span className="inline-flex items-baseline gap-2">
            <span className="eyebrow text-brand-ink/60">Country</span>
            <span className="relative">
              <select
                value={countryCode}
                onChange={(e) => {
                  const next = new URLSearchParams(params);
                  next.set("country", e.target.value);
                  setParams(next);
                }}
                className="appearance-none bg-transparent pr-5 font-display text-[17px] font-semibold tracking-[0.02em] text-brand-ink underline decoration-brand-rule decoration-1 underline-offset-[6px] hover:decoration-brand-deep focus:outline-none"
              >
                {liveCountries.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-ink/45">
                ▾
              </span>
            </span>
          </span>

          {country && matchedSubsectors.length === 0 && (
            <span className="font-serif italic text-[14px] text-rose-700">
              None of this project's sub-sectors are mapped for {country.name} yet.
            </span>
          )}
        </div>
      </section>

      {/* ── Body ─────────────────────────────────────────────────────────── */}
      {country && matchedSubsectors.length > 0 && (
        <>
          {/* ── Reform readiness ───────────────────────────────────────── */}
          <section className="py-12">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-3">
                <div className="eyebrow">Reform readiness</div>
                <h2 className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
                  Critical PIR dimensions.
                </h2>
                <p className="mt-3 font-serif text-[14px] leading-[1.55] text-brand-ink/65">
                  These four dimensions most affect this project archetype.
                  Each shows the strongest coverage across&nbsp;
                  {country.name}'s mapped sub-sectors.
                </p>
              </div>
              <div className="col-span-12 md:col-span-9">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  {critical.map(({ dim, best }) => (
                    <CriticalCard
                      key={dim}
                      dim={dim}
                      best={best}
                      countryCode={country.code}
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ── Readiness questions ────────────────────────────────────── */}
          <section className="border-t border-brand-rule py-12">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-3">
                <div className="eyebrow">Readiness questions</div>
                <h2 className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
                  Questions your team should answer.
                </h2>
              </div>
              <ol className="col-span-12 md:col-span-9 space-y-5">
                {project.readiness_questions.map((q, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="font-display text-[18px] font-extrabold tabular-nums leading-snug text-brand-deep">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="font-serif text-[16px] leading-[1.55] text-brand-ink">
                      {q}
                    </p>
                  </li>
                ))}
              </ol>
            </div>
          </section>

          {/* ── Deep-dive links ────────────────────────────────────────── */}
          <section className="border-t border-brand-rule py-12">
            <div className="grid grid-cols-12 gap-8">
              <div className="col-span-12 md:col-span-3">
                <div className="eyebrow">Sub-sectors</div>
                <h2 className="mt-3 font-display text-[clamp(22px,2.6vw,30px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
                  Open the deep-dive.
                </h2>
              </div>
              <ul className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {matchedSubsectors.map((s) => (
                  <li
                    key={s.key}
                    className="border-t border-brand-rule pt-4"
                  >
                    <Link
                      to={`/country/${country.code}/subsector/${s.key}`}
                      className="group block"
                    >
                      <h3 className="font-display text-[18px] font-extrabold tracking-tightest leading-tight text-brand-ink group-hover:text-brand-deep">
                        {SUBSECTOR_LABELS[s.key] ?? s.label}
                      </h3>
                      {s.headline && (
                        <p className="mt-2 font-serif text-[14px] leading-[1.5] text-brand-ink/75 line-clamp-4">
                          {s.headline}
                        </p>
                      )}
                      <span className="link-editorial mt-3 inline-block font-sans text-[12px] tracking-[0.04em]">
                        Open deep-dive&nbsp;→
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        </>
      )}

      {/* No country */}
      {!country && (
        <section className="py-16">
          <p className="prose-editorial max-w-[42rem] text-[16px]">
            No live data for {countryCode} yet.&nbsp;
            <Link to="/countries" className="link-editorial font-sans text-[13px]">
              Browse countries&nbsp;→
            </Link>
          </p>
        </section>
      )}
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function CriticalCard({
  dim,
  best,
  countryCode,
}: {
  dim: PirDimension;
  best: { status: CoverageStatus; mandate?: string; sub?: SubsectorEntry };
  countryCode: string;
}) {
  const dimDef = PIR_DIMENSIONS.find((d) => d.key === dim);
  if (!dimDef) return null;

  return (
    <div
      className={`p-5 ring-1 ring-inset ${CELL_BG[best.status]}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-display text-[12px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
            {dimDef.label}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Droplet variant={DROPLET_VARIANT[best.status]} size={22} />
          <span className="eyebrow-ink text-brand-ink/80">
            {STATUS_LABEL[best.status]}
          </span>
        </div>
      </div>
      {best.mandate ? (
        <>
          <p className="mt-3 font-serif text-[14px] leading-[1.5] text-brand-ink/85 line-clamp-4">
            {best.mandate}
          </p>
          {best.sub && (
            <Link
              to={`/country/${countryCode}/subsector/${best.sub.key}#pir-${dim}`}
              className="link-editorial mt-3 inline-block font-sans text-[12px] tracking-[0.04em]"
            >
              Open {SUBSECTOR_LABELS[best.sub.key] ?? best.sub.label}&nbsp;→
            </Link>
          )}
        </>
      ) : (
        <p className="mt-3 font-serif italic text-[13px] text-brand-ink/55">
          Not yet mapped for the related sub-sectors.
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function ProjectPicker() {
  return (
    <article>
      {/* Chapter cover */}
      <header className="grid grid-cols-12 gap-8 pt-8 pb-12">
        <div className="col-span-12 md:col-span-3">
          <div className="eyebrow">Chapter · 03</div>
          <div className="chapter-numeral mt-3 text-[120px] md:text-[140px]">
            03
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h1 className="font-display text-[clamp(34px,4.6vw,60px)] font-extrabold leading-[1.02] tracking-tightest text-brand-ink">
            Project wizard.
          </h1>
          <p className="prose-editorial mt-5 max-w-[42rem] text-[19px] italic text-brand-ink/80">
            Tell the tool what project you're preparing. It returns the
            governing law, the responsible institutions, the critical PIR
            dimensions and the questions your team should answer next — only
            the relevant slice of the country framework.
          </p>
        </div>
      </header>

      {/* Project archetype list */}
      <section className="border-t border-brand-rule">
        <div className="eyebrow py-6">Choose a project archetype</div>
        <ul className="divide-y divide-brand-rule">
          {PROJECT_TYPES.map((p) => (
            <li key={p.key}>
              <Link
                to={`/wizard?project=${p.key}`}
                className="group grid grid-cols-12 items-start gap-6 py-6 transition-colors hover:bg-brand-sand/40 -mx-4 px-4"
              >
                <div className="col-span-12 md:col-span-1">
                  <span
                    className={`block h-2 w-8 ${PILLAR_STRIPE[p.pillar]}`}
                    aria-hidden
                  />
                </div>
                <div className="col-span-12 md:col-span-7">
                  <h2 className="font-display text-[22px] font-extrabold leading-tight tracking-tightest text-brand-ink group-hover:text-brand-deep">
                    {p.label}
                  </h2>
                  <p className="mt-2 font-serif text-[15px] leading-[1.55] text-brand-ink/75 max-w-[44rem] line-clamp-3">
                    {p.short_desc}
                  </p>
                </div>
                <div className="col-span-12 md:col-span-3">
                  <div className="eyebrow text-brand-ink/55">
                    {PILLAR_LABEL[p.pillar]}
                  </div>
                  <div className="mt-2 font-sans text-[13px] text-brand-ink/70 tabular-nums">
                    WSIP&nbsp;·&nbsp;
                    {p.wsip_solutions.map((id) => `#${id}`).join(" · ")}
                  </div>
                </div>
                <div className="col-span-12 md:col-span-1 md:text-right">
                  <span className="link-editorial font-display text-[14px] font-semibold tracking-[0.02em]">
                    Open&nbsp;→
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
}
