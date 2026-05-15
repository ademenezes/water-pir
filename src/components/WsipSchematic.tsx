import { PILLAR_LABELS, WSIP_SOLUTIONS } from "../framework";

// Mini visual mirror of WSIP "At a Glance" (Figure 4 of P165586).
// Static, non-interactive teaser.

export function WsipSchematic() {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Framework axis 1
        </div>
        <div className="text-sm font-semibold text-slate-900">
          WSIP — 3 Pillars × 7 Scalable Solutions
        </div>
        <div className="text-[11px] text-slate-500">
          Source: WBG Water Strategy Implementation Plan, Dec 2025, Figure 4.
        </div>
      </div>

      <div className="rounded-md bg-slate-900 px-3 py-1.5 text-center text-[10px] font-bold uppercase tracking-widest text-white">
        Goal: water security for 400 M people by 2030
      </div>

      <div className="mt-2 grid grid-cols-3 gap-1.5 text-center">
        {(["people", "food", "planet"] as const).map((p) => (
          <div
            key={p}
            className={`rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-wide ${
              p === "people"
                ? "bg-pillar-people/30 text-sky-900"
                : p === "food"
                ? "bg-pillar-food/30 text-emerald-900"
                : "bg-pillar-planet/30 text-amber-900"
            }`}
          >
            {PILLAR_LABELS[p]}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-3 gap-1.5">
        {(["people", "food", "planet"] as const).map((p) => (
          <div key={p} className="space-y-1">
            {WSIP_SOLUTIONS.filter((s) => s.pillar === p).map((s) => (
              <div
                key={s.id}
                className={`flex items-center gap-1 rounded px-1.5 py-1 text-[10px] leading-tight ${
                  p === "people"
                    ? "bg-pillar-people/10 text-sky-900"
                    : p === "food"
                    ? "bg-pillar-food/10 text-emerald-900"
                    : "bg-pillar-planet/10 text-amber-900"
                }`}
                title={s.fullName}
              >
                <span
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full text-[9px] font-bold text-white ${
                    p === "people"
                      ? "bg-pillar-people"
                      : p === "food"
                      ? "bg-pillar-food"
                      : "bg-pillar-planet"
                  }`}
                >
                  {s.id}
                </span>
                <span className="truncate font-medium">{s.shortName}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-1">
        <div className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">
          Enabler 1 · Scalable solutions
        </div>
        <div className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">
          Enabler 2 · Knowledge framework (incl. policies & regulations)
        </div>
        <div className="rounded bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-700">
          Enabler 3 · Programmatic approaches & Country Water Compacts
        </div>
      </div>
    </div>
  );
}
