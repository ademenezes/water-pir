import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { listCountries } from "../../data";
import { WSIP_COUNTRIES } from "../../data/countries-meta";
import { LESSONS } from "../../data/lessons";
import { PROJECT_TYPES } from "../../data/project-types";
import { SUBSECTOR_LABELS, WSIP_SOLUTIONS, PIR_DIMENSIONS } from "../framework";

interface SearchResult {
  kind: "country" | "subsector" | "instrument" | "lesson" | "project" | "solution" | "dimension";
  label: string;
  sub_label?: string;
  href: string;
  keywords: string;
}

function buildIndex(): SearchResult[] {
  const results: SearchResult[] = [];

  // Live country dashboards + nested sub-sectors + each legal instrument
  for (const country of listCountries()) {
    results.push({
      kind: "country",
      label: country.name,
      sub_label: "Country dashboard",
      href: `/country/${country.code}`,
      keywords: `${country.name} ${country.code} dashboard`,
    });
    for (const sub of country.subsectors) {
      results.push({
        kind: "subsector",
        label: `${SUBSECTOR_LABELS[sub.key] ?? sub.label} · ${country.name}`,
        sub_label: "Sub-sector deep-dive",
        href: `/country/${country.code}/subsector/${sub.key}`,
        keywords: `${SUBSECTOR_LABELS[sub.key] ?? sub.label} ${sub.label} ${country.name} ${sub.headline ?? ""}`,
      });
      for (const cell of sub.cells) {
        for (const inst of cell.legal_instruments) {
          results.push({
            kind: "instrument",
            label: `${inst.short} — ${inst.title}`,
            sub_label: `${country.name} · ${SUBSECTOR_LABELS[sub.key] ?? sub.label}`,
            href: `/country/${country.code}/subsector/${sub.key}#pir-${cell.pir_dimension}`,
            keywords: `${inst.short} ${inst.title} ${inst.faolex_id ?? ""} ${country.name}`,
          });
        }
      }
    }
  }

  // Pipeline / planned countries (not yet live)
  for (const c of WSIP_COUNTRIES) {
    if (listCountries().some((live) => live.code === c.code)) continue;
    results.push({
      kind: "country",
      label: c.name,
      sub_label: `${c.region} · ${c.status}`,
      href: `/countries`,
      keywords: `${c.name} ${c.code} ${c.region} pipeline`,
    });
  }

  // WSIP solutions and PIR dimensions as entry points
  for (const s of WSIP_SOLUTIONS) {
    results.push({
      kind: "solution",
      label: `WSIP #${s.id} · ${s.shortName}`,
      sub_label: s.fullName,
      href: `/wsip-matrix`,
      keywords: `${s.shortName} ${s.fullName} wsip solution ${s.id} ${s.traditionalSubsectors.join(" ")}`,
    });
  }
  for (const d of PIR_DIMENSIONS) {
    results.push({
      kind: "dimension",
      label: `PIR · ${d.label}`,
      sub_label: d.blurb.slice(0, 80) + (d.blurb.length > 80 ? "…" : ""),
      href: `/pir-comparator`,
      keywords: `${d.label} ${d.blurb}`,
    });
  }

  // Project types
  for (const p of PROJECT_TYPES) {
    results.push({
      kind: "project",
      label: p.label,
      sub_label: "Project wizard",
      href: `/wizard?project=${p.key}`,
      keywords: `${p.label} ${p.short_desc} ${p.subsector_keys.join(" ")} project`,
    });
  }

  // Lessons
  for (const l of LESSONS) {
    results.push({
      kind: "lesson",
      label: l.title,
      sub_label: `${l.country_flag} ${l.country_name} · lesson`,
      href: l.subsector_key && listCountries().some((c) => c.code === l.country_code)
        ? `/country/${l.country_code}/subsector/${l.subsector_key}`
        : `/`,
      keywords: `${l.title} ${l.body} ${l.country_name} ${l.source}`,
    });
  }

  return results;
}

const KIND_LABEL: Record<SearchResult["kind"], string> = {
  country: "Country",
  subsector: "Sub-sector",
  instrument: "Legal instrument",
  lesson: "Lesson",
  project: "Project type",
  solution: "WSIP solution",
  dimension: "PIR dimension",
};

const KIND_COLOR: Record<SearchResult["kind"], string> = {
  country: "bg-slate-100 text-slate-700",
  subsector: "bg-sky-50 text-sky-800",
  instrument: "bg-emerald-50 text-emerald-800",
  lesson: "bg-amber-50 text-amber-800",
  project: "bg-purple-50 text-purple-800",
  solution: "bg-teal-50 text-teal-800",
  dimension: "bg-rose-50 text-rose-800",
};

export function SearchBox() {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => buildIndex(), []);
  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return [];
    const tokens = query.split(/\s+/).filter(Boolean);
    const scored = index
      .map((r) => {
        const hay = (r.label + " " + (r.sub_label ?? "") + " " + r.keywords).toLowerCase();
        const score = tokens.every((t) => hay.includes(t))
          ? tokens.reduce((acc, t) => acc + (hay.indexOf(t) === -1 ? 0 : 1 / (hay.indexOf(t) + 1)), 0)
          : -1;
        return { r, score };
      })
      .filter((x) => x.score >= 0)
      .sort((a, b) => b.score - a.score);
    return scored.slice(0, 10).map((x) => x.r);
  }, [q, index]);

  useEffect(() => {
    setActiveIndex(0);
  }, [q]);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function go(r: SearchResult) {
    setOpen(false);
    setQ("");
    navigate(r.href);
  }

  return (
    <div ref={containerRef} className="relative">
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          🔎
        </span>
        <input
          type="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => {
            if (e.key === "ArrowDown") {
              e.preventDefault();
              setActiveIndex((i) => Math.min(results.length - 1, i + 1));
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setActiveIndex((i) => Math.max(0, i - 1));
            } else if (e.key === "Enter") {
              e.preventDefault();
              if (results[activeIndex]) go(results[activeIndex]);
            } else if (e.key === "Escape") {
              setOpen(false);
            }
          }}
          placeholder='Try: "wastewater Brazil", "ANA", "rural sanitation", "Marco Legal"…'
          className="w-full rounded-md border border-slate-300 bg-white py-2.5 pl-9 pr-3 text-sm shadow-sm focus:border-slate-500 focus:outline-none"
        />
      </div>
      {open && q.trim() !== "" && (
        <div className="absolute left-0 right-0 top-full z-30 mt-1 max-h-96 overflow-auto rounded-md border border-slate-200 bg-white shadow-lg">
          {results.length === 0 ? (
            <div className="p-4 text-sm text-slate-500">
              No matches. Try a country name, sub-sector keyword, or instrument
              number (e.g. <em>Law 14.026</em>).
            </div>
          ) : (
            <ul className="divide-y divide-slate-100">
              {results.map((r, i) => (
                <li key={r.href + i}>
                  <button
                    onMouseEnter={() => setActiveIndex(i)}
                    onClick={() => go(r)}
                    className={`flex w-full items-start gap-3 px-3 py-2 text-left text-sm hover:bg-slate-50 ${
                      i === activeIndex ? "bg-slate-50" : ""
                    }`}
                  >
                    <span
                      className={`mt-0.5 rounded px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${KIND_COLOR[r.kind]}`}
                    >
                      {KIND_LABEL[r.kind]}
                    </span>
                    <span className="flex-1">
                      <div className="font-medium text-slate-900">{r.label}</div>
                      {r.sub_label && (
                        <div className="text-[11px] text-slate-500">
                          {r.sub_label}
                        </div>
                      )}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
