import { PILLAR_LABELS, WSIP_SOLUTIONS } from "../framework";

/**
 * Editorial repaint of WSIP "At a Glance" (Figure 4 of P165586): three pillars
 * across, seven scalable solutions below, three enablers at the foot. No card
 * chrome — meant to be embedded inside a figure block on the About page.
 */
export function WsipSchematic() {
  return (
    <div className="font-sans">
      <div className="border-y border-brand-rule bg-brand-ink py-3 text-center">
        <div className="eyebrow text-brand-teal">Goal</div>
        <div className="mt-1 font-display text-[13px] font-extrabold uppercase tracking-[0.18em] text-white">
          Water security for 400 M people by 2030
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-1 text-center">
        {(["people", "food", "planet"] as const).map((p) => (
          <div
            key={p}
            className={[
              "py-2 font-display text-[11px] font-extrabold uppercase tracking-[0.18em] text-white",
              p === "people"
                ? "bg-pillar-people"
                : p === "food"
                ? "bg-pillar-food"
                : "bg-pillar-planet",
            ].join(" ")}
          >
            {PILLAR_LABELS[p]}
          </div>
        ))}
      </div>

      <div className="mt-1 grid grid-cols-3 gap-1">
        {(["people", "food", "planet"] as const).map((p) => (
          <div key={p} className="space-y-1">
            {WSIP_SOLUTIONS.filter((s) => s.pillar === p).map((s) => (
              <div
                key={s.id}
                className={[
                  "flex items-center gap-2 px-2 py-2 text-[11px] leading-tight",
                  p === "people"
                    ? "bg-pillar-people/15"
                    : p === "food"
                    ? "bg-pillar-food/15"
                    : "bg-pillar-planet/15",
                ].join(" ")}
                title={s.fullName}
              >
                <span
                  className={[
                    "font-display text-[12px] font-extrabold tabular-nums",
                    p === "people"
                      ? "text-pillar-people"
                      : p === "food"
                      ? "text-pillar-food"
                      : "text-pillar-planet",
                  ].join(" ")}
                >
                  {String(s.id).padStart(2, "0")}
                </span>
                <span className="font-medium text-brand-ink">{s.shortName}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-3 space-y-1">
        {[
          "Enabler 1 · Scalable solutions",
          "Enabler 2 · Knowledge framework (policies & regulations)",
          "Enabler 3 · Programmatic approaches & Country Water Compacts",
        ].map((e) => (
          <div
            key={e}
            className="border border-brand-rule bg-white px-3 py-2 text-[11px] font-medium text-brand-ink/75"
          >
            {e}
          </div>
        ))}
      </div>
    </div>
  );
}
