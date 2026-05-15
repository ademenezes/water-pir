import { Link } from "react-router-dom";
import { pickInsightForToday } from "../../data/insights";

export function FeaturedInsight() {
  const insight = pickInsightForToday();
  return (
    <div className="rounded-lg border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-amber-100 text-base">
          💡
        </div>
        <div className="flex-1">
          <div className="text-[10px] font-bold uppercase tracking-wider text-amber-700">
            Did you know?
          </div>
          <h3 className="mt-0.5 text-base font-semibold text-slate-900">
            {insight.title}
          </h3>
          <p className="mt-1 text-sm text-slate-700">{insight.body}</p>
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-[11px]">
            <span className="text-slate-500">Source: {insight.source}</span>
            {insight.link && (
              <Link
                to={insight.link.href}
                className="font-semibold text-slate-900 hover:underline"
              >
                {insight.link.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
