import { Link } from "react-router-dom";
import { LESSONS } from "../../data/lessons";
import { getCountry } from "../../data";
import { PIR_DIMENSIONS, WSIP_SOLUTIONS } from "../framework";

interface Props {
  /** Restrict to specific lesson keys, in order. If omitted, shows the first 3. */
  keys?: string[];
}

export function LessonsGrid({ keys }: Props) {
  const items = keys
    ? keys.map((k) => LESSONS.find((l) => l.key === k)).filter(Boolean) as typeof LESSONS
    : LESSONS.slice(0, 3);

  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {items.map((l) => {
        const hasLiveCountry = !!getCountry(l.country_code);
        const dimDef = PIR_DIMENSIONS.find((d) => d.key === (l.pir_dimension as never));
        const linkTarget =
          hasLiveCountry && l.subsector_key
            ? `/country/${l.country_code}/subsector/${l.subsector_key}#pir-${l.pir_dimension}`
            : hasLiveCountry
            ? `/country/${l.country_code}`
            : `/countries`;

        return (
          <Link
            key={l.key}
            to={linkTarget}
            className="group flex flex-col rounded-lg border border-slate-200 bg-white p-4 shadow-sm hover:border-slate-400 hover:shadow"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1 text-slate-700">
                <span className="text-lg">{l.country_flag}</span>
                <span className="font-semibold">{l.country_name}</span>
              </span>
              {dimDef && (
                <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-slate-600">
                  {dimDef.label}
                </span>
              )}
            </div>
            <h3 className="mt-2 text-sm font-semibold leading-snug text-slate-900">
              {l.title}
            </h3>
            <p className="mt-1.5 flex-1 text-xs leading-snug text-slate-600 line-clamp-5">
              {l.body}
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-1">
              {l.wsip_solutions.map((sid) => {
                const sol = WSIP_SOLUTIONS.find((s) => s.id === sid);
                if (!sol) return null;
                return (
                  <span
                    key={sid}
                    className={`pill ${
                      sol.pillar === "people"
                        ? "pill-people"
                        : sol.pillar === "food"
                        ? "pill-food"
                        : "pill-planet"
                    }`}
                  >
                    WSIP #{sid}
                  </span>
                );
              })}
            </div>
            <div className="mt-2 text-[10px] text-slate-400">{l.source}</div>
            <div className="mt-1 text-[11px] font-semibold text-slate-700 group-hover:text-slate-900">
              {hasLiveCountry ? "Open in tool →" : "Country in pipeline →"}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
