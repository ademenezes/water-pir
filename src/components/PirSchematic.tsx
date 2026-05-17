import { PIR_DIMENSIONS } from "../framework";

// Circular mini-mirror of BOSIB Figure 1.2, six PIR dimensions around a "Resilience" core.
// Pure SVG, no dependencies.

const COLORS: Record<string, string> = {
  policy: "#5BC4E2",
  institutions: "#5AB17F",
  igc: "#9AC58A",
  financing: "#7d3c98",
  regulation: "#F4B400",
  resilience: "#0f766e",
};

export function PirSchematic() {
  // 6 wedges around a central core (resilience at centre per BOSIB Figure 1.2).
  // Display 5 outer dimensions + Resilience in the middle.
  const outer = PIR_DIMENSIONS.filter((d) => d.key !== "resilience");
  const size = 220;
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = 96;
  const rInner = 40;
  const totalArcs = outer.length;

  const arcs = outer.map((d, i) => {
    const startAngle = (i / totalArcs) * 2 * Math.PI - Math.PI / 2;
    const endAngle = ((i + 1) / totalArcs) * 2 * Math.PI - Math.PI / 2;
    const x1 = cx + rOuter * Math.cos(startAngle);
    const y1 = cy + rOuter * Math.sin(startAngle);
    const x2 = cx + rOuter * Math.cos(endAngle);
    const y2 = cy + rOuter * Math.sin(endAngle);
    const xi1 = cx + rInner * Math.cos(startAngle);
    const yi1 = cy + rInner * Math.sin(startAngle);
    const xi2 = cx + rInner * Math.cos(endAngle);
    const yi2 = cy + rInner * Math.sin(endAngle);
    const largeArc = endAngle - startAngle > Math.PI ? 1 : 0;
    const path = [
      `M ${x1} ${y1}`,
      `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${xi2} ${yi2}`,
      `A ${rInner} ${rInner} 0 ${largeArc} 0 ${xi1} ${yi1}`,
      "Z",
    ].join(" ");

    const midAngle = (startAngle + endAngle) / 2;
    const labelR = (rOuter + rInner) / 2;
    const lx = cx + labelR * Math.cos(midAngle);
    const ly = cy + labelR * Math.sin(midAngle);

    return {
      key: d.key,
      label: d.label,
      blurb: d.blurb,
      path,
      color: COLORS[d.key],
      labelX: lx,
      labelY: ly,
    };
  });

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-3">
        <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          Framework axis 2
        </div>
        <div className="text-sm font-semibold text-slate-900">
          PIR, 6 analytical dimensions
        </div>
        <div className="text-[11px] text-slate-500">
          Source: WBG WSS PIR Synthesis, Aug 2022, Figure 1.2.
        </div>
      </div>

      <div className="flex items-center justify-center">
        <svg
          viewBox={`0 0 ${size} ${size}`}
          width={size}
          height={size}
          aria-label="PIR framework wheel"
        >
          {arcs.map((a) => (
            <g key={a.key}>
              <path d={a.path} fill={a.color} fillOpacity={0.85} stroke="white" strokeWidth={1.5} />
              <text
                x={a.labelX}
                y={a.labelY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={9}
                fontWeight={700}
                fill="white"
                style={{ paintOrder: "stroke", stroke: "rgba(0,0,0,0.15)", strokeWidth: 1 }}
              >
                {a.label.length > 14 ? a.label.split(" ").map((w, i) => (
                  <tspan key={i} x={a.labelX} dy={i === 0 ? -4 : 10}>
                    {w}
                  </tspan>
                )) : a.label}
              </text>
            </g>
          ))}
          <circle cx={cx} cy={cy} r={rInner} fill={COLORS.resilience} />
          <text
            x={cx}
            y={cy - 2}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={10}
            fontWeight={800}
            fill="white"
          >
            RESILIENCE
          </text>
          <text
            x={cx}
            y={cy + 11}
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize={7}
            fill="white"
            fillOpacity={0.85}
          >
            (core)
          </text>
        </svg>
      </div>

      <div className="mt-3 text-[10px] leading-snug text-slate-500">
        Each PIR dimension is examined for every WSIP sub-sector, producing the
        7 × 6 country matrix.
      </div>
    </div>
  );
}
