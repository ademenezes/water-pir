/**
 * Wordmark + symbol for the Water PIR Tool.
 *
 * Symbol: a teal-ringed monogram with a centred droplet on a navy field. The
 * wordmark is "WATER PIR" in display black with wide tracking.
 */
export function Logo({
  size = 28,
  showWordmark = true,
  className,
}: {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}) {
  return (
    <span className={["inline-flex items-center gap-3", className ?? ""].join(" ")}>
      <span
        aria-hidden
        style={{ width: size, height: size, display: "inline-block" }}
      >
        <svg
          viewBox="0 0 40 40"
          width={size}
          height={size}
          style={{ display: "block" }}
        >
          <circle
            cx={20}
            cy={20}
            r={18.5}
            fill="none"
            stroke="#0FAACB"
            strokeWidth={1.5}
          />
          <circle cx={20} cy={20} r={15} fill="#0F2A44" />
          <path
            d="M 20 8.5 C 20 8.5, 12.5 16, 12.5 21 C 12.5 25, 16 28, 20 28 C 24 28, 27.5 25, 27.5 21 C 27.5 16, 20 8.5, 20 8.5 Z"
            fill="#5BC4E2"
          />
          <ellipse cx={17.2} cy={20} rx={1.4} ry={2.4} fill="#A8E8F4" />
        </svg>
      </span>
      {showWordmark && (
        <span className="font-display text-[18px] font-black leading-none tracking-[0.06em]">
          WATER&nbsp;PIR
        </span>
      )}
    </span>
  );
}
