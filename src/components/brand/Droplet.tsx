type DropletVariant = "filled" | "half" | "outline" | "dotted";

interface DropletProps {
  variant?: DropletVariant;
  size?: number;
  /** Override the fill/stroke color (default uses coverage-status colors). */
  color?: string;
  className?: string;
  title?: string;
}

/**
 * Brand water-droplet glyph in 4 data variants.
 *
 *   filled  → strong coverage (or solid mark)
 *   half    → partial coverage
 *   outline → gap (law/regulator absent)
 *   dotted  → not yet mapped
 *
 * The default colors are tuned to the coverage palette so a coverage-status
 * variant maps cleanly: filled=green, half=yellow, outline=red, dotted=gray.
 * Pass `color` to override (e.g. brand-deep teal for the header wordmark).
 */
export function Droplet({
  variant = "filled",
  size = 20,
  color,
  className,
  title,
}: DropletProps) {
  const defaultColor =
    color ??
    {
      filled: "#16a34a",   // coverage-green
      half: "#eab308",     // coverage-yellow
      outline: "#dc2626",  // coverage-red
      dotted: "#9ca3af",   // coverage-gray
    }[variant];

  // Path: a stylised water-droplet (rounded teardrop), centered at (12, 13).
  // Drawn within a 24×24 viewBox; the bulb sits 2px above the bottom edge,
  // the tip points up to y=2.
  const dropPath =
    "M12 2 C 12 2, 4 11, 4 15.5 C 4 19.8, 7.6 23, 12 23 C 16.4 23, 20 19.8, 20 15.5 C 20 11, 12 2, 12 2 Z";

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? "img" : undefined}
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {title ? <title>{title}</title> : null}

      {variant === "filled" && (
        <path d={dropPath} fill={defaultColor} />
      )}

      {variant === "half" && (
        <>
          {/* Outline of full droplet */}
          <path
            d={dropPath}
            fill="none"
            stroke={defaultColor}
            strokeWidth={2}
          />
          {/* Bottom half filled. clipPath restricts the fill rect to the droplet shape. */}
          <defs>
            <clipPath id={`half-clip-${defaultColor.replace("#", "")}`}>
              <path d={dropPath} />
            </clipPath>
          </defs>
          <rect
            x={0}
            y={13}
            width={24}
            height={11}
            fill={defaultColor}
            clipPath={`url(#half-clip-${defaultColor.replace("#", "")})`}
          />
        </>
      )}

      {variant === "outline" && (
        <path
          d={dropPath}
          fill="none"
          stroke={defaultColor}
          strokeWidth={2}
        />
      )}

      {variant === "dotted" && (
        <path
          d={dropPath}
          fill="none"
          stroke={defaultColor}
          strokeWidth={1.5}
          strokeDasharray="2 2.5"
        />
      )}
    </svg>
  );
}

/**
 * Inline droplet replacing a capital "O" in display headlines.
 * Sized to roughly match cap-height of the surrounding text.
 */
export function DropletO({
  size = "0.9em",
  color = "currentColor",
  className,
}: {
  size?: number | string;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      aria-hidden
      style={{
        display: "inline-block",
        verticalAlign: "baseline",
        transform: "translateY(0.08em)",
      }}
    >
      <path
        d="M12 2 C 12 2, 4 11, 4 15.5 C 4 19.8, 7.6 23, 12 23 C 16.4 23, 20 19.8, 20 15.5 C 20 11, 12 2, 12 2 Z"
        fill={color}
      />
    </svg>
  );
}
