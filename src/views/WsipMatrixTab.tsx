import { useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { listCountries } from "../../data";
import { WSIP_COUNTRIES } from "../../data/countries-meta";
import { PIR_DIMENSIONS, SUBSECTOR_LABELS } from "../framework";
import type { CountryProfile, PirDimension } from "../types";
import { Matrix, type MatrixCellTarget } from "../components/Matrix/Matrix";
import { MatrixCellPanel } from "../components/Matrix/MatrixCellPanel";
import { Droplet } from "../components/brand/Droplet";
import { Flag } from "../components/Flag";
import type { CoverageStatus } from "../types";

type View =
  | "country"
  | "compare"
  | "by-subsector"
  | "by-dimension";

const VIEW_LABELS: Record<View, string> = {
  country: "By country",
  compare: "Side-by-side",
  "by-subsector": "Sub-sector × countries",
  "by-dimension": "Dimension × countries",
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

const LEGEND_ITEMS: {
  status: CoverageStatus;
  label: string;
  blurb: string;
}[] = [
  {
    status: "green",
    label: "Strong",
    blurb: "Law, regulator and practice broadly aligned.",
  },
  {
    status: "yellow",
    label: "Partial",
    blurb: "Law exists; regulation or enforcement uneven.",
  },
  {
    status: "red",
    label: "Gap",
    blurb: "No specific law or regulator on this intersection.",
  },
  {
    status: "gray",
    label: "Not mapped",
    blurb: "Cell not yet assessed for this country.",
  },
];

/* ────────────────────────────────────────────────────────────────────────── */

export function WsipMatrixTab() {
  const liveCountries = listCountries();
  const [params, setParams] = useSearchParams();
  const view: View = (params.get("view") as View | null) ?? "country";
  const code = (
    params.get("country") ?? liveCountries[0]?.code ?? "BRA"
  ).toUpperCase();
  const compareCode = params.get("compare")?.toUpperCase();
  const country = liveCountries.find((c) => c.code === code);
  const compareCountry = compareCode
    ? liveCountries.find((c) => c.code === compareCode)
    : undefined;
  const compareMeta = compareCode
    ? WSIP_COUNTRIES.find((c) => c.code === compareCode)
    : undefined;

  const [panelTarget, setPanelTarget] = useState<MatrixCellTarget | null>(null);

  function update(updates: Record<string, string | null>) {
    const next = new URLSearchParams(params);
    for (const [key, val] of Object.entries(updates)) {
      if (val === null || val === "") next.delete(key);
      else next.set(key, val);
    }
    setParams(next);
  }

  function setView(v: View) {
    const updates: Record<string, string | null> = { view: v === "country" ? null : v };
    // Auto-set a comparison country if entering compare view without one
    if (v === "compare" && !compareCode) {
      const fallback =
        liveCountries.find((c) => c.code !== code)?.code ??
        WSIP_COUNTRIES.find((c) => c.code !== code)?.code ??
        "";
      if (fallback) updates.compare = fallback;
    }
    update(updates);
  }

  return (
    <div>
      <section className="mx-auto max-w-[88rem] px-8 pt-16 pb-12">
        <div className="eyebrow">The matrix</div>
        <h1 className="mt-4 font-display text-[clamp(40px,5.6vw,80px)] font-extrabold leading-[1.02] tracking-tightest text-brand-ink">
          Seven solutions, six dimensions.
        </h1>
        <p className="prose-editorial mt-7 max-w-[52rem] text-[21px] italic text-brand-ink/80">
          Forty&#8209;two cells per country. The colour and the droplet tell
          you whether the law is there. The cell text tells you what it
          actually says. Empty cells reveal where reform is still required.
        </p>
      </section>

      {/* ── Editorial masthead controls ───────────────────────────────────── */}
      <section className="mx-auto max-w-[88rem] px-8 pb-6">
        <div className="border-y border-brand-rule py-6">
          <div className="flex flex-wrap items-baseline gap-x-8 gap-y-3 font-serif text-[17px] text-brand-ink">
            <MastheadField label="Showing">
              <CountrySelect
                value={code}
                onChange={(v) => update({ country: v })}
                live={liveCountries}
              />
            </MastheadField>

            {view === "compare" && (
              <MastheadField label="Compare with">
                <CountrySelect
                  value={compareCode ?? ""}
                  onChange={(v) => update({ compare: v })}
                  live={liveCountries.filter((c) => c.code !== code)}
                  allowPipeline
                />
              </MastheadField>
            )}

            <MastheadField label="View">
              <ViewToggle value={view} onChange={setView} />
            </MastheadField>

            {country && (
              <Link
                to={`/country/${country.code}`}
                className="ml-auto link-editorial font-sans text-[12px] tracking-[0.04em]"
              >
                Open {country.name} dashboard&nbsp;→
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Coverage legend ───────────────────────────────────────────────── */}
      <section className="mx-auto max-w-[88rem] px-8 pt-6 pb-10">
        <div className="eyebrow text-brand-ink/60">What the droplets mean</div>
        <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-5 border-b border-brand-rule pb-6 sm:grid-cols-2 lg:grid-cols-4">
          {LEGEND_ITEMS.map((item) => (
            <div key={item.status} className="flex items-start gap-3">
              <Droplet variant={DROPLET_VARIANT[item.status]} size={28} />
              <div>
                <div className="font-display text-[12px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
                  {item.label}
                </div>
                <p className="mt-1 font-serif text-[13.5px] leading-[1.5] text-brand-ink/75">
                  {item.blurb}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Body, view depends on mode ───────────────────────────────────── */}
      <section className="mx-auto max-w-[88rem] px-8 pb-24">
        {!country ? (
          <div className="border border-brand-amber/40 bg-brand-sand p-8 font-serif text-[15px] text-brand-ink">
            No live data for this country yet.
          </div>
        ) : view === "country" ? (
          <Matrix country={country} onCellOpen={setPanelTarget} />
        ) : view === "compare" ? (
          <CompareView
            primary={country}
            secondary={compareCountry}
            secondaryMeta={compareMeta}
            secondaryCode={compareCode}
            onCellOpen={setPanelTarget}
          />
        ) : view === "by-subsector" ? (
          <BySubsectorView />
        ) : (
          <ByDimensionView />
        )}

        <p className="mt-10 max-w-[44rem] font-serif text-[14px] leading-[1.55] text-brand-ink/65">
          <strong className="font-semibold text-brand-ink">
            How to read this matrix.
          </strong>{" "}
          Each cell summarises the highest-coverage sub-sector for that
          WSIP&nbsp;×&nbsp;PIR intersection. Click any cell to open its full
          mandate, legal instruments, responsible institutions, and the
          de&#8209;jure / de&#8209;facto note. An outline or dotted droplet
          flags a gap, exactly the priority areas for reform.
        </p>
      </section>

      <MatrixCellPanel
        target={panelTarget}
        onClose={() => setPanelTarget(null)}
      />
    </div>
  );
}

/* ── Masthead bits ────────────────────────────────────────────────────────── */

function MastheadField({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <span className="inline-flex items-baseline gap-2">
      <span className="eyebrow text-brand-ink/60">{label}</span>
      <span className="inline-flex items-baseline">{children}</span>
    </span>
  );
}

function CountrySelect({
  value,
  onChange,
  live,
  allowPipeline,
}: {
  value: string;
  onChange: (code: string) => void;
  live: CountryProfile[];
  allowPipeline?: boolean;
}) {
  return (
    <span className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none bg-transparent pr-5 font-display text-[17px] font-semibold tracking-[0.02em] text-brand-ink underline decoration-brand-rule decoration-1 underline-offset-[6px] hover:decoration-brand-deep focus:outline-none"
      >
        <optgroup label="Live data">
          {live.map((c) => (
            <option key={c.code} value={c.code}>
              {c.name}
            </option>
          ))}
        </optgroup>
        <optgroup label={allowPipeline ? "Pipeline (no data yet)" : "Pipeline (coming soon)"}>
          {WSIP_COUNTRIES.filter(
            (c) => c.status !== "live" && !live.some((l) => l.code === c.code)
          ).map((c) => (
            <option key={c.code} value={c.code} disabled={!allowPipeline}>
              {c.name}
              {allowPipeline ? "" : ", coming soon"}
            </option>
          ))}
        </optgroup>
      </select>
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-ink/45">
        ▾
      </span>
    </span>
  );
}

function ViewToggle({
  value,
  onChange,
}: {
  value: View;
  onChange: (v: View) => void;
}) {
  return (
    <span className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as View)}
        className="appearance-none bg-transparent pr-5 font-display text-[17px] font-semibold tracking-[0.02em] text-brand-ink underline decoration-brand-rule decoration-1 underline-offset-[6px] hover:decoration-brand-deep focus:outline-none"
      >
        {(Object.keys(VIEW_LABELS) as View[]).map((v) => (
          <option key={v} value={v}>
            {VIEW_LABELS[v]}
          </option>
        ))}
      </select>
      <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-ink/45">
        ▾
      </span>
    </span>
  );
}

/* ── Compare view ────────────────────────────────────────────────────────── */

function CompareView({
  primary,
  secondary,
  secondaryMeta,
  secondaryCode,
  onCellOpen,
}: {
  primary: CountryProfile;
  secondary: CountryProfile | undefined;
  secondaryMeta: { name: string; flag: string; region: string; status: string; blurb?: string } | undefined;
  secondaryCode: string | undefined;
  onCellOpen: (t: MatrixCellTarget) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
      <CompareColumn country={primary}>
        <Matrix country={primary} onCellOpen={onCellOpen} />
      </CompareColumn>

      {secondary ? (
        <CompareColumn country={secondary}>
          <Matrix country={secondary} onCellOpen={onCellOpen} />
        </CompareColumn>
      ) : (
        <PipelinePlaceholder meta={secondaryMeta} code={secondaryCode ?? ""} />
      )}
    </div>
  );
}

function CompareColumn({
  country,
  children,
}: {
  country: CountryProfile;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between gap-3">
        <h2 className="font-display text-[22px] font-extrabold tracking-tightest text-brand-ink">
          <Flag emoji={country.flag_emoji} title={country.name} className="mr-2" />{country.name}
        </h2>
        <div className="eyebrow-ink text-brand-ink/55 text-[11px]">
          Updated <span className="tabular-nums">{country.last_updated}</span>
        </div>
      </div>
      {children}
    </div>
  );
}

function PipelinePlaceholder({
  meta,
  code,
}: {
  meta: { name: string; flag: string; region: string; status: string; blurb?: string } | undefined;
  code: string;
}) {
  return (
    <div className="border border-dashed border-brand-rule bg-brand-sand/40 p-8">
      <div className="text-4xl"><Flag emoji={meta?.flag ?? "🏳️"} title={meta?.name} /></div>
      <h2 className="mt-4 font-display text-[22px] font-extrabold tracking-tightest text-brand-ink">
        {meta?.name ?? code}
      </h2>
      <div className="mt-1 eyebrow-ink text-brand-ink/55">
        {meta?.region ?? "Region unknown"}&nbsp;·&nbsp;{meta?.status ?? "pipeline"}
      </div>
      {meta?.blurb && (
        <p className="mt-4 max-w-[28rem] font-serif text-[14px] leading-[1.55] text-brand-ink/75">
          {meta.blurb}
        </p>
      )}
      <p className="mt-6 border-t border-brand-rule pt-4 font-serif italic text-[13px] leading-[1.55] text-brand-ink/55 max-w-[28rem]">
        Country data is curated under the WSIP Water Compact roadmap; the
        matrix above will populate once the country profile is added.
      </p>
    </div>
  );
}

/* ── Cross-country views (folded in from former PirComparator) ──────────── */

function BySubsectorView() {
  const countries = listCountries();
  const allSubsectorKeys = useMemo(
    () =>
      Array.from(
        new Set(countries.flatMap((c) => c.subsectors.map((s) => s.key)))
      ),
    [countries]
  );
  const [subsectorKey, setSubsectorKey] = useState<string>(
    allSubsectorKeys[0] ?? ""
  );
  const rows = countries
    .map((c) => ({
      country: c,
      subsector: c.subsectors.find((s) => s.key === subsectorKey),
    }))
    .filter((r) => r.subsector);
  const pipelinePlaceholders = WSIP_COUNTRIES.filter(
    (c) => c.status !== "live"
  ).slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-3">
        <span className="eyebrow text-brand-ink/60">Sub-sector</span>
        <span className="relative">
          <select
            value={subsectorKey}
            onChange={(e) => setSubsectorKey(e.target.value)}
            className="appearance-none bg-transparent pr-5 font-display text-[17px] font-semibold tracking-[0.02em] text-brand-ink underline decoration-brand-rule decoration-1 underline-offset-[6px] hover:decoration-brand-deep focus:outline-none"
          >
            {allSubsectorKeys.map((k) => (
              <option key={k} value={k}>
                {SUBSECTOR_LABELS[k] ?? k}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-ink/45">
            ▾
          </span>
        </span>
      </div>

      <div className="overflow-x-auto border-y border-brand-rule">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr className="border-b border-brand-rule">
              <th className="px-4 py-4 text-left">
                <span className="eyebrow-ink text-brand-ink/55">Country</span>
              </th>
              {PIR_DIMENSIONS.map((d) => (
                <th
                  key={d.key}
                  className="border-l border-brand-rule px-4 py-4 text-left"
                >
                  <span className="font-display text-[12px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
                    {d.label}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(({ country, subsector }) => (
              <tr key={country.code} className="border-t border-brand-rule">
                <th className="px-4 py-5 text-left align-top">
                  <div className="font-display text-[18px] font-extrabold tracking-tightest text-brand-ink">
                    <Flag emoji={country.flag_emoji} title={country.name} className="mr-2" />{country.name}
                  </div>
                  {subsector?.headline && (
                    <p className="mt-2 max-w-[18rem] font-serif text-[13px] leading-[1.45] text-brand-ink/65 line-clamp-3">
                      {subsector.headline}
                    </p>
                  )}
                </th>
                {PIR_DIMENSIONS.map((d) => {
                  const cell = subsector?.cells.find(
                    (c) => c.pir_dimension === d.key
                  );
                  const status: CoverageStatus =
                    cell?.coverage_status ?? "gray";
                  return (
                    <td
                      key={d.key}
                      className="border-l border-brand-rule px-4 py-5 align-top"
                    >
                      <div className="flex items-start gap-3">
                        <Droplet
                          variant={DROPLET_VARIANT[status]}
                          size={22}
                        />
                        <p className="font-serif text-[13px] leading-[1.45] text-brand-ink/85 line-clamp-5">
                          {cell?.mandate_text ?? (
                            <span className="italic text-brand-ink/40">
                              Not yet assessed
                            </span>
                          )}
                        </p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
            {pipelinePlaceholders.map((p) => (
              <tr
                key={p.code}
                className="border-t border-brand-rule opacity-55"
                title="Pending data ingestion"
              >
                <th className="px-4 py-5 text-left align-top">
                  <div className="font-display text-[18px] font-extrabold tracking-tightest text-brand-ink/65">
                    <Flag emoji={p.flag} title={p.name} className="mr-2" />{p.name}
                  </div>
                  <div className="mt-1 eyebrow-ink text-brand-ink/40">
                    {p.status === "pipeline" ? "WSIP pipeline" : "Planned"}
                  </div>
                </th>
                {PIR_DIMENSIONS.map((d) => (
                  <td
                    key={d.key}
                    className="border-l border-brand-rule px-4 py-5 align-top"
                  >
                    <Droplet variant="dotted" size={22} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ByDimensionView() {
  const countries = listCountries();
  const allSubsectorKeys = useMemo(
    () =>
      Array.from(
        new Set(countries.flatMap((c) => c.subsectors.map((s) => s.key)))
      ),
    [countries]
  );
  const [pirKey, setPirKey] = useState<PirDimension>("regulation");
  const pirDef = PIR_DIMENSIONS.find((d) => d.key === pirKey);

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-3">
        <span className="eyebrow text-brand-ink/60">PIR dimension</span>
        <span className="relative">
          <select
            value={pirKey}
            onChange={(e) => setPirKey(e.target.value as PirDimension)}
            className="appearance-none bg-transparent pr-5 font-display text-[17px] font-semibold tracking-[0.02em] text-brand-ink underline decoration-brand-rule decoration-1 underline-offset-[6px] hover:decoration-brand-deep focus:outline-none"
          >
            {PIR_DIMENSIONS.map((d) => (
              <option key={d.key} value={d.key}>
                {d.label}
              </option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-brand-ink/45">
            ▾
          </span>
        </span>
      </div>

      {pirDef && (
        <p className="font-serif italic text-[15px] leading-[1.55] text-brand-ink/70 border-l-2 border-brand-rule pl-5 max-w-[40rem]">
          {pirDef.blurb}
        </p>
      )}

      <div className="overflow-x-auto border-y border-brand-rule">
        <table className="w-full min-w-[860px] border-collapse">
          <thead>
            <tr className="border-b border-brand-rule">
              <th className="px-4 py-4 text-left">
                <span className="eyebrow-ink text-brand-ink/55">Country</span>
              </th>
              {allSubsectorKeys.map((k) => (
                <th
                  key={k}
                  className="border-l border-brand-rule px-4 py-4 text-left"
                >
                  <span className="font-display text-[12px] font-extrabold uppercase tracking-[0.18em] text-brand-deep">
                    {SUBSECTOR_LABELS[k] ?? k}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.code} className="border-t border-brand-rule">
                <th className="px-4 py-5 text-left align-top">
                  <div className="font-display text-[18px] font-extrabold tracking-tightest text-brand-ink">
                    <Flag emoji={country.flag_emoji} title={country.name} className="mr-2" />{country.name}
                  </div>
                </th>
                {allSubsectorKeys.map((k) => {
                  const sub = country.subsectors.find((s) => s.key === k);
                  const cell = sub?.cells.find(
                    (c) => c.pir_dimension === pirKey
                  );
                  const status: CoverageStatus =
                    cell?.coverage_status ?? "gray";
                  return (
                    <td
                      key={k}
                      className="border-l border-brand-rule px-4 py-5 align-top"
                    >
                      <div className="flex items-start gap-3">
                        <Droplet
                          variant={DROPLET_VARIANT[status]}
                          size={22}
                        />
                        <p className="font-serif text-[13px] leading-[1.45] text-brand-ink/85 line-clamp-5">
                          {cell?.mandate_text ?? (
                            <span className="italic text-brand-ink/40">
                              {sub
                                ? "Dimension not assessed"
                                : "Sub-sector not mapped"}
                            </span>
                          )}
                        </p>
                      </div>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
