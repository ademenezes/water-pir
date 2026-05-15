/**
 * Cover-style pipe-network illustration in the spirit of the BOSIB PIR
 * Synthesis Report cover (Circle Graphics, 2022). Bold dark-navy lines on a
 * transparent background, designed to bleed off the right edge of the hero.
 *
 * The viewBox is 800×600. Strokes are ~14 wide, with the joint dots/elbows
 * sized to match. A few small "fixtures" (a faucet and a valve) are scattered
 * through the network to keep it from feeling like generic pipes.
 *
 * Color is inherited from `currentColor`, so place inside `text-brand-ink`.
 */
export function PipeNetwork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 800 600"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
      preserveAspectRatio="xMidYMid meet"
    >
      <g
        stroke="currentColor"
        strokeWidth={14}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Top horizontal trunk, crosses full width */}
        <path d="M -20 70 L 320 70 L 360 110 L 720 110 L 760 70 L 820 70" />

        {/* Right vertical down from the top trunk */}
        <path d="M 720 110 L 720 280 L 680 320 L 680 480" />

        {/* Mid horizontal pipe forming the spine */}
        <path d="M -20 320 L 240 320 L 280 360 L 540 360 L 580 320 L 680 320" />

        {/* Vertical riser left of center */}
        <path d="M 240 320 L 240 470 L 280 510 L 540 510" />

        {/* Left vertical down — comes up from below the bottom edge */}
        <path d="M 120 620 L 120 460 L 80 420 L 80 230 L 120 190 L 320 190" />

        {/* Short branch to the upper-right (suggests a tap stub) */}
        <path d="M 420 110 L 420 60 L 440 40" />

        {/* Lower branch into the bottom of the frame */}
        <path d="M 540 510 L 540 620" />
      </g>

      {/* Faucet fixture, top-right area */}
      <g
        stroke="currentColor"
        strokeWidth={10}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="currentColor"
      >
        <rect x={695} y={40} width={50} height={28} rx={4} fill="currentColor" />
        <rect x={712} y={20} width={16} height={20} fill="currentColor" />
        <rect x={700} y={68} width={40} height={10} fill="currentColor" />
      </g>

      {/* Valve fixture, mid-left */}
      <g stroke="currentColor" strokeWidth={10} fill="currentColor">
        <circle cx={170} cy={320} r={18} fill="none" />
        <rect x={166} y={296} width={8} height={48} fill="currentColor" />
      </g>

      {/* Small dots at a couple of joints to imply welds */}
      <g fill="currentColor">
        <circle cx={360} cy={110} r={7} />
        <circle cx={680} cy={320} r={7} />
        <circle cx={280} cy={360} r={7} />
        <circle cx={420} cy={110} r={7} />
      </g>
    </svg>
  );
}
