import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountry } from "../../data";
import { PIR_DIMENSIONS, SUBSECTOR_LABELS, WSIP_SOLUTIONS } from "../framework";
import { Droplet } from "../components/brand/Droplet";
import { Flag } from "../components/Flag";
import type {
  CoverageStatus,
  InstitutionRole,
  LegalInstrument,
  Institution,
  SubsectorPirCell,
  PirDimensionDef,
} from "../types";

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

const ROLE_LABEL: Record<InstitutionRole, string> = {
  policy_maker: "Policy maker",
  asset_owner: "Asset owner",
  service_provider: "Service provider",
  regulator: "Regulator",
  user_rep: "User representation",
  basin_org: "Basin organisation",
};

export function SubsectorDeepDive() {
  const { code, subKey } = useParams();
  const country = getCountry(code ?? "");
  const subsector = country?.subsectors.find((s) => s.key === subKey);

  useEffect(() => {
    if (window.location.hash) {
      const el = document.getElementById(window.location.hash.slice(1));
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [subKey]);

  if (!country) {
    return (
      <div className="pt-12 font-serif text-[16px] text-brand-ink/75">
        Country not found.{" "}
        <Link to="/countries" className="link-editorial font-sans text-[13px]">
          Browse countries&nbsp;→
        </Link>
      </div>
    );
  }

  if (!subsector) {
    return (
      <div className="pt-12 font-serif text-[16px] text-brand-ink/75">
        Sub-sector not mapped for {country.name}.{" "}
        <Link
          to={`/country/${country.code}`}
          className="link-editorial font-sans text-[13px]"
        >
          Back to {country.name}&nbsp;→
        </Link>
      </div>
    );
  }

  const subsectorLabel = SUBSECTOR_LABELS[subsector.key] ?? subsector.label;

  return (
    <article>
      {/* ── Header ────────────────────────────────────────────────────────── */}
      <header className="pt-8 pb-10 border-b border-brand-rule">
        <Link
          to={`/country/${country.code}`}
          className="eyebrow text-brand-ink/55 hover:text-brand-deep"
        >
          ←&nbsp;Back to {country.name} dashboard
        </Link>

        <div className="mt-6 grid grid-cols-12 gap-8 items-end">
          <div className="col-span-12 md:col-span-8">
            <div className="eyebrow">
              <Flag emoji={country.flag_emoji} title={country.name} className="mr-1.5" />{country.name}&nbsp;·&nbsp;{country.code}
              &nbsp;·&nbsp;Updated&nbsp;
              <span className="tabular-nums">{country.last_updated}</span>
            </div>
            <h1 className="mt-4 font-display text-[clamp(32px,4.4vw,56px)] font-extrabold leading-[1.04] tracking-tightest text-brand-ink">
              {subsectorLabel}.
            </h1>

            {/* WSIP solution stripes */}
            <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
              {subsector.wsip_solutions.map((id) => {
                const sol = WSIP_SOLUTIONS.find((x) => x.id === id);
                if (!sol) return null;
                return (
                  <li
                    key={id}
                    className="flex items-center gap-2 font-sans text-[13px] text-brand-ink"
                  >
                    <span
                      className={[
                        "h-2 w-6",
                        sol.pillar === "people"
                          ? "bg-pillar-people"
                          : sol.pillar === "food"
                          ? "bg-pillar-food"
                          : "bg-pillar-planet",
                      ].join(" ")}
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

          <div className="col-span-12 md:col-span-4">
            {subsector.headline && (
              <p className="pull-quote text-[20px] md:text-[22px] leading-[1.35] border-l-2 border-brand-amber pl-5">
                {subsector.headline}
              </p>
            )}
          </div>
        </div>
      </header>

      {/* ── Reform lessons (if any) ──────────────────────────────────────── */}
      {subsector.reform_lessons && subsector.reform_lessons.length > 0 && (
        <section className="border-b border-brand-rule py-10">
          <div className="grid grid-cols-12 gap-8">
            <div className="col-span-12 md:col-span-3">
              <div className="eyebrow">Reform lessons</div>
            </div>
            <ol className="col-span-12 md:col-span-9 space-y-4">
              {subsector.reform_lessons.map((l, i) => (
                <li key={i} className="flex gap-4">
                  <span className="font-display text-[18px] font-extrabold tabular-nums leading-snug text-brand-deep">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="font-serif text-[16px] leading-[1.55] text-brand-ink">
                    {l}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <div>
        {PIR_DIMENSIONS.map((d) => {
          const cell = subsector.cells.find((c) => c.pir_dimension === d.key);
          return (
            <DimensionSection
              key={d.key}
              dim={d}
              cell={cell}
              countryName={country.name}
              subsectorLabel={subsectorLabel}
            />
          );
        })}
      </div>

      <footer className="border-t border-brand-rule mt-12 pt-8 pb-12">
        <Link
          to={`/wsip-matrix?country=${country.code}`}
          className="link-editorial font-display text-[15px] font-semibold tracking-[0.02em]"
        >
          Open the matrix tab for {country.name}&nbsp;→
        </Link>
      </footer>
    </article>
  );
}

/* ─────────────────────────────────────────────────────────────────────────── */

function DimensionSection({
  dim,
  cell,
  countryName,
  subsectorLabel,
}: {
  dim: PirDimensionDef;
  cell: SubsectorPirCell | undefined;
  countryName: string;
  subsectorLabel: string;
}) {
  const id = `pir-${dim.key}`;
  const status = cell?.coverage_status ?? "gray";

  return (
    <section
      id={id}
      className="border-b border-brand-rule scroll-mt-24 py-14"
    >
      <div className="grid grid-cols-12 gap-8">
        <header className="col-span-12 md:col-span-3 md:sticky md:top-8 md:self-start">
          <div className="eyebrow">PIR dimension</div>
          <h2 className="mt-3 font-display text-[clamp(26px,3vw,38px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            {dim.label}.
          </h2>
          <p className="mt-3 font-serif italic text-[15px] leading-[1.5] text-brand-ink/65">
            {dim.blurb}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <Droplet variant={DROPLET_VARIANT[status]} size={24} />
            <span className="eyebrow-ink text-brand-ink/80">
              {STATUS_LABEL[status]}
            </span>
          </div>
        </header>

        {/* Content column */}
        <div className="col-span-12 md:col-span-9 space-y-8">
          {!cell ? (
            <div className="border border-dashed border-brand-rule bg-brand-sand/40 p-6">
              <p className="font-serif italic text-[15px] leading-[1.55] text-brand-ink/55">
                This dimension has not yet been mapped for {subsectorLabel} in&nbsp;
                {countryName}.
              </p>
            </div>
          ) : (
            <>
              <div>
                <div className="eyebrow">Mandate</div>
                <p className="prose-editorial mt-3 max-w-[44rem] text-[17px]">
                  {cell.mandate_text}
                </p>
              </div>

              {cell.de_facto_note && (
                <aside className="border-l-2 border-brand-amber bg-brand-sand px-6 py-5 max-w-[44rem]">
                  <div className="eyebrow text-brand-amber">
                    De&#8209;jure vs. de&#8209;facto
                  </div>
                  <p className="mt-3 font-serif text-[15px] leading-[1.55] text-brand-ink/85">
                    {cell.de_facto_note}
                  </p>
                </aside>
              )}

              {cell.legal_instruments.length > 0 && (
                <div>
                  <div className="eyebrow">Legal instruments</div>
                  <ol className="mt-4 space-y-5">
                    {cell.legal_instruments.map((inst, i) => (
                      <InstrumentRow key={i} inst={inst} index={i} />
                    ))}
                  </ol>
                </div>
              )}

              {cell.responsible_institutions.length > 0 && (
                <div>
                  <div className="eyebrow">Responsible institutions</div>
                  <ul className="mt-4 divide-y divide-brand-rule">
                    {cell.responsible_institutions.map((inst, i) => (
                      <InstitutionRow key={i} inst={inst} />
                    ))}
                  </ul>
                </div>
              )}

              <div className="eyebrow-ink text-[11px] text-brand-ink/55">
                Last verified&nbsp;·&nbsp;
                <span className="tabular-nums">{cell.last_verified_date}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

function InstrumentRow({ inst, index }: { inst: LegalInstrument; index: number }) {
  const href = inst.faolex_url ?? inst.national_url ?? null;
  return (
    <li className="flex items-start gap-5">
      <span className="font-display text-[16px] font-bold tabular-nums leading-snug text-brand-deep">
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="flex-1 border-l border-brand-rule pl-5">
        <div className="font-serif text-[16px] leading-snug text-brand-ink">
          {inst.title}&nbsp;
          <span className="tabular-nums text-brand-ink/65">({inst.year})</span>
        </div>
        <div className="mt-1.5 eyebrow-ink text-[11px] text-brand-ink/60">
          {inst.short}
          {inst.articles_cited ? ` · Arts. ${inst.articles_cited}` : ""}
        </div>
        {inst.note && (
          <p className="mt-2 font-serif italic text-[14px] leading-[1.5] text-brand-ink/65">
            {inst.note}
          </p>
        )}
        <div className="mt-2 flex flex-wrap items-baseline gap-x-4 gap-y-1">
          {href && (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="link-editorial font-sans text-[12px] tracking-[0.04em]"
            >
              {inst.faolex_url ? "FAOLEX" : "National gazette"}&nbsp;→
            </a>
          )}
          {inst.faolex_id && (
            <span className="font-sans text-[11px] uppercase tracking-[0.14em] text-brand-ink/45 tabular-nums">
              {inst.faolex_id}
            </span>
          )}
        </div>
      </div>
    </li>
  );
}

function InstitutionRow({ inst }: { inst: Institution }) {
  return (
    <li className="grid grid-cols-12 gap-3 py-3.5">
      <div className="col-span-12 md:col-span-6 font-serif text-[15px] text-brand-ink">
        <strong className="font-semibold">
          {inst.acronym ? `${inst.acronym}, ` : ""}
          {inst.name}
        </strong>
        {inst.url && (
          <a
            href={inst.url}
            target="_blank"
            rel="noreferrer"
            className="ml-2 font-sans text-[11px] uppercase tracking-[0.18em] text-brand-deep hover:underline"
          >
            →
          </a>
        )}
      </div>
      <div className="col-span-6 md:col-span-3 eyebrow-ink text-brand-ink/65">
        {ROLE_LABEL[inst.role]}
      </div>
      <div className="col-span-6 md:col-span-3 eyebrow-ink text-brand-ink/55">
        {inst.level}
      </div>
    </li>
  );
}
