import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Droplet } from "../brand/Droplet";
import { Flag } from "../Flag";
import { PIR_DIMENSIONS, SUBSECTOR_LABELS } from "../../framework";
import type { MatrixCellTarget } from "./Matrix";
import type { CoverageStatus, InstitutionRole } from "../../types";

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

export function MatrixCellPanel({
  target,
  onClose,
}: {
  target: MatrixCellTarget | null;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    if (!target) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [target, onClose]);

  if (!target) return null;

  const { country, subsector, pirDimension } = target;
  const cell = subsector.cells.find((c) => c.pir_dimension === pirDimension);
  const dimDef = PIR_DIMENSIONS.find((d) => d.key === pirDimension);
  const status: CoverageStatus = cell?.coverage_status ?? "gray";
  const subsectorLabel = SUBSECTOR_LABELS[subsector.key] ?? subsector.label;

  return (
    <>
      <button
        aria-label="Close panel"
        className="fixed inset-0 z-40 bg-brand-ink/35 transition-opacity"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cell-panel-title"
        className="fixed inset-y-0 right-0 z-50 w-full max-w-[44rem] overflow-y-auto bg-white shadow-2xl"
      >
        {/* Header, chapter mini-cover */}
        <div className="border-b border-brand-rule px-10 pt-8 pb-7">
          <button
            type="button"
            onClick={onClose}
            className="eyebrow text-brand-ink/55 hover:text-brand-deep"
          >
            ← Close
          </button>

          <div className="mt-7">
            <div className="eyebrow">
              {country.flag_emoji ? (
                <Flag emoji={country.flag_emoji} title={country.name} className="mr-1.5" />
              ) : null}
              {country.name}&nbsp;·&nbsp;{dimDef?.label ?? pirDimension}
            </div>
            <h2
              id="cell-panel-title"
              className="mt-3 font-display text-[34px] font-extrabold leading-[1.05] tracking-tightest text-brand-ink"
            >
              {subsectorLabel}
            </h2>
            <div className="mt-5 flex items-center gap-3">
              <Droplet variant={DROPLET_VARIANT[status]} size={24} />
              <span className="eyebrow-ink text-brand-ink/80">
                {STATUS_LABEL[status]}
              </span>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="space-y-9 px-10 py-9">
          {dimDef?.blurb && (
            <p className="font-serif italic text-[15px] leading-[1.55] text-brand-ink/70 border-l-2 border-brand-rule pl-5">
              {dimDef.blurb}
            </p>
          )}

          {cell?.mandate_text && (
            <section>
              <div className="eyebrow">Mandate</div>
              <p className="prose-editorial mt-3 text-[16px]">
                {cell.mandate_text}
              </p>
            </section>
          )}

          {cell && cell.legal_instruments.length > 0 && (
            <section>
              <div className="eyebrow">Legal instruments</div>
              <ol className="mt-4 space-y-4">
                {cell.legal_instruments.map((inst, i) => {
                  const href = inst.faolex_url ?? inst.national_url ?? null;
                  return (
                    <li key={i} className="flex items-start gap-4">
                      <span className="font-display text-[15px] font-bold tabular-nums leading-snug text-brand-deep">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div className="flex-1 border-l border-brand-rule pl-4">
                        <div className="font-serif text-[15px] leading-snug text-brand-ink">
                          {inst.title} <span className="tabular-nums">({inst.year})</span>
                        </div>
                        <div className="mt-1 eyebrow-ink text-[11px] text-brand-ink/60">
                          {inst.short}
                          {inst.articles_cited
                            ? ` · Arts. ${inst.articles_cited}`
                            : ""}
                        </div>
                        {inst.note && (
                          <p className="mt-1.5 font-serif italic text-[13px] leading-snug text-brand-ink/65">
                            {inst.note}
                          </p>
                        )}
                        {href && (
                          <a
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                            className="link-editorial mt-1.5 inline-block font-sans text-[12px]"
                          >
                            {inst.faolex_url ? "FAOLEX" : "National gazette"}&nbsp;→
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </section>
          )}

          {cell && cell.responsible_institutions.length > 0 && (
            <section>
              <div className="eyebrow">Responsible institutions</div>
              <ul className="mt-4 divide-y divide-brand-rule">
                {cell.responsible_institutions.map((inst, i) => (
                  <li key={i} className="grid grid-cols-12 gap-3 py-3">
                    <div className="col-span-7 font-serif text-[15px] text-brand-ink">
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
                    <div className="col-span-3 eyebrow-ink text-brand-ink/65">
                      {ROLE_LABEL[inst.role]}
                    </div>
                    <div className="col-span-2 eyebrow-ink text-brand-ink/55">
                      {inst.level}
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {cell?.de_facto_note && (
            <section className="border-l-2 border-brand-amber bg-brand-sand px-5 py-4">
              <div className="eyebrow text-brand-amber">
                De&#8209;jure vs. de&#8209;facto
              </div>
              <p className="mt-2 font-serif text-[14px] leading-[1.55] text-brand-ink/85">
                {cell.de_facto_note}
              </p>
            </section>
          )}

          <section className="border-t border-brand-rule pt-6">
            <Link
              to={`/country/${country.code}/subsector/${subsector.key}#pir-${pirDimension}`}
              onClick={onClose}
              className="link-editorial font-display text-[15px] font-semibold tracking-[0.02em]"
            >
              Open full sub-sector deep-dive&nbsp;→
            </Link>
            {cell?.last_verified_date && (
              <div className="mt-4 eyebrow-ink text-[11px] text-brand-ink/60">
                Last verified&nbsp;·&nbsp;
                <span className="tabular-nums">{cell.last_verified_date}</span>
              </div>
            )}
          </section>
        </div>
      </aside>
    </>
  );
}
