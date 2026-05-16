import { Link, NavLink } from "react-router-dom";
import { DropletO } from "./brand/Droplet";

const TABS: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Home", end: true },
  { to: "/wsip-matrix", label: "Matrix" },
  { to: "/countries", label: "Countries" },
  { to: "/wizard", label: "Wizard" },
  { to: "/about", label: "About" },
];

interface LayoutProps {
  children: React.ReactNode;
  /**
   * When true, the page content is rendered without any max-width container
   * so it can do full-bleed magazine spreads (HomePage). Default false —
   * other pages keep their familiar centred column.
   */
  fullBleed?: boolean;
}

export function Layout({ children, fullBleed = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-brand-ink">
      {/* Brand stripe, full bleed */}
      <div className="h-1 w-full bg-brand-teal" />

      <header className="border-b border-brand-rule bg-white">
        <div className="mx-auto flex max-w-[88rem] items-end justify-between gap-8 px-8 py-5">
          <Link to="/" className="flex items-baseline gap-2 group">
            <span className="text-brand-deep transition-transform group-hover:translate-y-[1px]">
              <DropletO size={22} color="currentColor" />
            </span>
            <div>
              <div className="font-display text-[15px] font-extrabold tracking-[0.18em] text-brand-ink">
                WATER&nbsp;·&nbsp;PIR
              </div>
              <div className="eyebrow mt-0.5">Brazil pilot</div>
            </div>
          </Link>

          <nav className="flex items-end gap-7 text-[13px] font-medium">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  [
                    "relative pb-1 transition-colors",
                    isActive
                      ? "text-brand-ink"
                      : "text-brand-ink/65 hover:text-brand-ink",
                    isActive
                      ? "after:absolute after:inset-x-0 after:-bottom-[2px] after:h-[2px] after:bg-brand-deep"
                      : "",
                  ].join(" ")
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="bg-white">
        {fullBleed ? (
          children
        ) : (
          <div className="mx-auto max-w-7xl px-6 py-8">{children}</div>
        )}
      </main>

      <footer className="mt-24 bg-brand-ink text-white/80">
        <div className="mx-auto grid max-w-[88rem] grid-cols-12 gap-8 px-8 py-10">
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-baseline gap-2">
              <span className="text-brand-teal">
                <DropletO size={20} color="currentColor" />
              </span>
              <div className="font-display text-[14px] font-extrabold tracking-[0.18em] text-white">
                WATER&nbsp;·&nbsp;PIR
              </div>
            </div>
            <p className="mt-3 font-serif text-[13px] leading-[1.6] text-white/65">
              An interactive companion to the World Bank Group's WSIP and PIR
              frameworks. Brazil pilot, 2026.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow-white">Source discipline</div>
            <p className="mt-2 font-serif text-[13px] leading-[1.6] text-white/65">
              Every legal instrument cited is linked to its primary source —
              FAOLEX (FAO Legal Office), national gazettes, or sector
              regulators. Always verify against the linked source. Where law
              and practice diverge, the de-jure–de-facto note records the gap.
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow-white">Frameworks</div>
            <ul className="mt-2 space-y-1 font-serif text-[13px] leading-[1.5] text-white/65">
              <li>WSIP · WBG, Dec 2025 (Fig 4)</li>
              <li>PIR · WBG / BOSIB, Aug 2022 (Fig 1.2)</li>
            </ul>
          </div>

          <div className="col-span-12 mt-4 border-t border-white/10 pt-4 text-[12px] uppercase tracking-[0.18em] text-white/45">
            World Bank Group · GWSP · FAO FAOLEX&nbsp;·&nbsp;AQUALEX
          </div>
        </div>
      </footer>
    </div>
  );
}
