import { PIR_DIMENSIONS } from "../../framework";
import type { PirDimension } from "../../types";

/**
 * Editorial repaint of BOSIB PIR Synthesis Figure 1.2: a donut of five outer
 * PIR dimensions wrapped around a "Resilience" core, in the brand palette.
 *
 * Used:
 * - On the About page as Figure 2 (canonical PIR diagram).
 * - As a navigator inside the Matrix tab — hovering an arc filters / highlights
 *   the matching dimension column (controlled via `highlight` + `onHover`).
 */

const ARC_COLOR: Record<PirDimension, string> = {
  policy: "#5BC4E2",        // brand.teal
  regulation: "#F59A3B",    // brand.amber
  institutions: "#A8B946",  // brand.olive
  igc: "#3E9CB0",           // mid-teal (slightly desaturated)
  financing: "#9AD2DE",     // light teal
  resilience: "#0FAACB",    // brand.deep (centre)
};

interface PirWheelProps {
  size?: number;
  /** Soft-highlight one dimension's arc. */
  highlight?: PirDimension;
  onHover?: (dim: PirDimension | null) => void;
  onClick?: (dim: PirDimension) => void;
  /** When true, hide the label text inside arcs (use sparingly — for very small sizes). */
  hideLabels?: boolean;
  className?: string;
}

export function PirWheel({
  size = 280,
  highlight,
  onHover,
  onClick,
  hideLabels = false,
  className,
}: PirWheelProps) {
  const outer = PIR_DIMENSIONS.filter((d) => d.key !== "resilience");
  const cx = size / 2;
  const cy = size / 2;
  const rOuter = size * 0.46;
  const rInner = size * 0.18;
  const totalArcs = outer.length;

  return (
    <svg
      viewBox={`0 0 ${size} ${size}`}
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="PIR framework wheel: Policy, Regulation, Institutions, Intergovernmental Context, Financing wrapped around a Resilience core."
    >
      {outer.map((d, i) => {
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
        const dimmed = highlight && highlight !== d.key;
        const opacity = dimmed ? 0.35 : 1;
        const interactive = !!onHover || !!onClick;

        return (
          <g
            key={d.key}
            style={interactive ? { cursor: "pointer" } : undefined}
            onMouseEnter={onHover ? () => onHover(d.key) : undefined}
            onMouseLeave={onHover ? () => onHover(null) : undefined}
            onClick={onClick ? () => onClick(d.key) : undefined}
          >
            <path
              d={path}
              fill={ARC_COLOR[d.key]}
              stroke="white"
              strokeWidth={2}
              opacity={opacity}
            />
            {!hideLabels && (
              <text
                x={lx}
                y={ly}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize={size > 240 ? 11 : 9}
                fontWeight={800}
                fill="white"
                style={{ pointerEvents: "none", letterSpacing: "0.04em" }}
                opacity={opacity}
              >
                {d.label.length > 16
                  ? d.label.split(" ").map((w, ix, arr) => (
                      <tspan
                        key={ix}
                        x={lx}
                        dy={ix === 0 ? -(arr.length - 1) * 6 : 12}
                      >
                        {w}
                      </tspan>
                    ))
                  : d.label.toUpperCase()}
              </text>
            )}
          </g>
        );
      })}

      {/* Resilience core */}
      <circle
        cx={cx}
        cy={cy}
        r={rInner}
        fill={ARC_COLOR.resilience}
        stroke="white"
        strokeWidth={2}
        opacity={highlight && highlight !== "resilience" ? 0.5 : 1}
      />
      {!hideLabels && (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize={size > 240 ? 11 : 9}
          fontWeight={800}
          fill="white"
          style={{ letterSpacing: "0.04em" }}
        >
          RESILIENCE
        </text>
      )}
    </svg>
  );
}
