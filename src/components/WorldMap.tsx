import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { isoNumericToMeta } from "../../data/countries-meta";
import type { CountryStatus } from "../../data/countries-meta";

const TOPO_URL = `${import.meta.env.BASE_URL}countries-110m.json`;

const FILL: Record<CountryStatus | "none", string> = {
  live: "#0f766e",
  pipeline: "#7dd3fc",
  planned: "#cbd5e1",
  none: "#f1f5f9",
};

const STROKE: Record<CountryStatus | "none", string> = {
  live: "#134e4a",
  pipeline: "#0369a1",
  planned: "#64748b",
  none: "#e2e8f0",
};

export function WorldMap() {
  const navigate = useNavigate();
  const meta = isoNumericToMeta();
  const [hover, setHover] = useState<{
    name: string;
    code: string;
    status: CountryStatus | "none";
    blurb?: string;
    x: number;
    y: number;
  } | null>(null);

  return (
    <div className="relative">
      <ComposableMap
        projectionConfig={{ scale: 165 }}
        width={980}
        height={460}
        style={{ width: "100%", height: "auto" }}
      >
        <Geographies geography={TOPO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const id = String(geo.id).padStart(3, "0");
              const m = meta[id];
              const status: CountryStatus | "none" = m?.status ?? "none";
              const interactive = m && (m.status === "live" || m.status === "pipeline" || m.status === "planned");
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  onMouseEnter={(e) => {
                    if (m) {
                      setHover({
                        name: m.name,
                        code: m.code,
                        status: m.status,
                        blurb: m.blurb,
                        x: e.clientX,
                        y: e.clientY,
                      });
                    }
                  }}
                  onMouseMove={(e) => {
                    if (m) setHover((h) => (h ? { ...h, x: e.clientX, y: e.clientY } : h));
                  }}
                  onMouseLeave={() => setHover(null)}
                  onClick={() => {
                    if (m?.status === "live") {
                      navigate(`/country/${m.code}`);
                    }
                  }}
                  style={{
                    default: {
                      fill: FILL[status],
                      stroke: STROKE[status],
                      strokeWidth: 0.5,
                      outline: "none",
                      cursor: m?.status === "live" ? "pointer" : "default",
                    },
                    hover: {
                      fill: interactive ? "#fbbf24" : FILL[status],
                      stroke: "#1f2937",
                      strokeWidth: 0.75,
                      outline: "none",
                      cursor: m?.status === "live" ? "pointer" : interactive ? "help" : "default",
                    },
                    pressed: {
                      fill: "#f59e0b",
                      outline: "none",
                    },
                  }}
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {hover && (
        <div
          className="pointer-events-none fixed z-50 rounded-md border border-slate-200 bg-white px-3 py-2 text-xs shadow-lg"
          style={{ left: hover.x + 12, top: hover.y + 12, maxWidth: 280 }}
        >
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-900">{hover.name}</span>
            <span
              className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                hover.status === "live"
                  ? "bg-teal-600 text-white"
                  : hover.status === "pipeline"
                  ? "bg-sky-200 text-sky-900"
                  : hover.status === "planned"
                  ? "bg-slate-300 text-slate-800"
                  : "bg-slate-100 text-slate-500"
              }`}
            >
              {hover.status}
            </span>
          </div>
          {hover.blurb && (
            <div className="mt-1 text-slate-600">{hover.blurb}</div>
          )}
          {hover.status === "live" && (
            <div className="mt-1 text-[10px] uppercase tracking-wider text-teal-700">
              Click to open dashboard
            </div>
          )}
          {hover.status !== "live" && hover.status !== "none" && (
            <div className="mt-1 text-[10px] uppercase tracking-wider text-slate-500">
              {hover.status === "pipeline"
                ? "WSIP Water Compact priority, data coming"
                : "Planned for Phase 3"}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function WorldMapLegend() {
  return (
    <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-4 rounded-sm" style={{ background: FILL.live, border: `1px solid ${STROKE.live}` }} />
        Live data
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-4 rounded-sm" style={{ background: FILL.pipeline, border: `1px solid ${STROKE.pipeline}` }} />
        WSIP Water Compact (pipeline)
      </span>
      <span className="flex items-center gap-1.5">
        <span className="h-3 w-4 rounded-sm" style={{ background: FILL.planned, border: `1px solid ${STROKE.planned}` }} />
        Planned
      </span>
    </div>
  );
}
