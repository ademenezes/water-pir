/**
 * Section divider styled as a thin pipe-line: a horizontal stroke with a
 * small inline elbow/joint mid-line. Use sparingly (≤ once per page) as a
 * tonal accent. The default section rule is a plain `.rule` from index.css.
 *
 * Color is inherited from `currentColor` (default: brand-rule warm neutral
 * when used inside a default container; bump to brand-ink for emphasis).
 */
export function PipeDivider({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1000 16"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      preserveAspectRatio="none"
    >
      <g
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        fill="none"
      >
        {/* Left segment */}
        <path d="M 0 8 L 470 8" />
        {/* Joint: a small box-step (down, across, up) mid-line */}
        <path d="M 470 8 L 480 8 L 484 4 L 516 4 L 520 8 L 530 8" />
        {/* Right segment */}
        <path d="M 530 8 L 1000 8" />
      </g>
      {/* Two small dots at the joint corners to imply welds */}
      <g fill="currentColor">
        <circle cx={482} cy={5} r={1.5} />
        <circle cx={518} cy={5} r={1.5} />
      </g>
    </svg>
  );
}
