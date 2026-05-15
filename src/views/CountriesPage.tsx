import { Link } from "react-router-dom";
import { useMemo, useState } from "react";
import { WSIP_COUNTRIES } from "../../data/countries-meta";
import type { CountryStatus, CountryMeta } from "../../data/countries-meta";
import { listCountries } from "../../data";

type Filter = "all" | "live" | "pipeline" | "planned";

const STATUS_BADGE: Record<CountryStatus, string> = {
  live: "bg-teal-600 text-white",
  pipeline: "bg-sky-200 text-sky-900",
  planned: "bg-slate-300 text-slate-800",
};

const STATUS_LABEL: Record<CountryStatus, string> = {
  live: "Live data",
  pipeline: "Pipeline",
  planned: "Planned",
};

export function CountriesPage() {
  const live = useMemo(() => {
    const map: Record<string, ReturnType<typeof listCountries>[number]> = {};
    listCountries().forEach((c) => {
      map[c.code] = c;
    });
    return map;
  }, []);

  const [filter, setFilter] = useState<Filter>("all");
  const [region, setRegion] = useState<string>("all");

  const regions = Array.from(new Set(WSIP_COUNTRIES.map((c) => c.region))).sort();

  const filtered = WSIP_COUNTRIES.filter((c) => {
    if (filter !== "all" && c.status !== filter) return false;
    if (region !== "all" && c.region !== region) return false;
    return true;
  });

  const counts = {
    all: WSIP_COUNTRIES.length,
    live: WSIP_COUNTRIES.filter((c) => c.status === "live").length,
    pipeline: WSIP_COUNTRIES.filter((c) => c.status === "pipeline").length,
    planned: WSIP_COUNTRIES.filter((c) => c.status === "planned").length,
  };

  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          Countries
        </h1>
        <p className="mt-1 max-w-3xl text-sm text-slate-600">
          The WSIP Water Compact priority cohort (27 countries identified by the
          WBG, plus Phase-3 additions). Click any "Live" card to open its
          dashboard.
        </p>
      </section>

      <section className="flex flex-wrap items-center gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-sm">
        <div className="flex flex-wrap gap-1">
          {(["all", "live", "pipeline", "planned"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                filter === f
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {f === "all" ? `All (${counts.all})` : `${STATUS_LABEL[f]} (${counts[f]})`}
            </button>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-md border border-slate-300 bg-white px-3 py-1 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
          >
            <option value="all">All regions</option>
            {regions.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((c) => (
            <CountryCard key={c.code} c={c} liveProfile={live[c.code]} />
          ))}
        </div>
      </section>
    </div>
  );
}

function CountryCard({
  c,
  liveProfile,
}: {
  c: CountryMeta;
  liveProfile?: ReturnType<typeof listCountries>[number];
}) {
  const clickable = c.status === "live";

  return (
    <div
      className={`group flex h-full flex-col rounded-lg border bg-white p-4 shadow-sm transition ${
        clickable
          ? "border-slate-200 hover:border-slate-400 hover:shadow"
          : "border-slate-200 opacity-90"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="text-2xl">{c.flag}</div>
          <div className="mt-1 text-base font-semibold text-slate-900">
            {c.name}
          </div>
          <div className="text-[11px] uppercase tracking-wider text-slate-400">
            {c.region}
          </div>
        </div>
        <span
          className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${STATUS_BADGE[c.status]}`}
        >
          {STATUS_LABEL[c.status]}
        </span>
      </div>

      {c.blurb && (
        <p className="mt-3 text-sm text-slate-600 line-clamp-3">{c.blurb}</p>
      )}

      {liveProfile && (
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-slate-600">
          <div>
            <div className="font-semibold text-slate-700">Sub-sectors</div>
            <div>{liveProfile.subsectors.length} mapped</div>
          </div>
          <div>
            <div className="font-semibold text-slate-700">Updated</div>
            <div>{liveProfile.last_updated}</div>
          </div>
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-3">
        {clickable ? (
          <>
            <Link
              to={`/country/${c.code}`}
              className="flex-1 rounded-md bg-slate-900 px-2.5 py-1.5 text-center text-xs font-semibold text-white hover:bg-slate-700"
            >
              Open dashboard →
            </Link>
            <Link
              to={`/wsip-matrix?country=${c.code}`}
              className="rounded-md border border-slate-300 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:border-slate-400"
              title="Jump straight to the WSIP × PIR matrix for this country"
            >
              Matrix
            </Link>
          </>
        ) : (
          <div className="text-xs font-semibold text-slate-500">
            {c.status === "pipeline"
              ? "WSIP Water Compact priority — data coming"
              : "Planned for an upcoming phase"}
          </div>
        )}
      </div>
    </div>
  );
}
