import { Link, NavLink } from "react-router-dom";
import { Logo } from "./brand/Logo";

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
   * When true, page content renders without a max-width container so it can
   * do full-bleed spreads (HomePage). Default false; other pages keep the
   * centred column.
   */
  fullBleed?: boolean;
}

export function Layout({ children, fullBleed = false }: LayoutProps) {
  return (
    <div className="min-h-screen bg-white text-brand-ink">
      <div className="h-1 w-full bg-brand-teal" />

      <header className="border-b border-brand-rule bg-white">
        <div className="mx-auto flex max-w-[88rem] items-center justify-between gap-8 px-8 py-5">
          <Link to="/" className="group text-brand-ink">
            <Logo size={36} />
          </Link>

          <nav className="flex items-end gap-8 text-[15px] font-medium">
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
            <span className="text-white">
              <Logo size={32} />
            </span>
            <p className="mt-4 font-serif text-[14px] leading-[1.6] text-white/65">
              An interactive companion to the World Bank Group's WSIP and PIR
              frameworks.
            </p>
          </div>

          <div className="col-span-12 md:col-span-5">
            <div className="eyebrow-white">Source discipline</div>
            <p className="mt-3 font-serif text-[14px] leading-[1.6] text-white/65">
              Every legal instrument cited links back to its primary source.
              FAOLEX where indexed, national gazettes otherwise. Always verify
              against the linked source. Where law and practice diverge, the
              de&#8209;jure / de&#8209;facto note records the gap.
            </p>
          </div>

          <div className="col-span-12 md:col-span-3">
            <div className="eyebrow-white">Frameworks</div>
            <ul className="mt-3 space-y-1.5 font-serif text-[14px] leading-[1.5] text-white/65">
              <li>WSIP&nbsp;·&nbsp;WBG, Dec 2025 (Fig&nbsp;4)</li>
              <li>PIR&nbsp;·&nbsp;WBG / BOSIB, Aug 2022 (Fig&nbsp;1.2)</li>
            </ul>
          </div>

          <div className="col-span-12 mt-4 border-t border-white/10 pt-4 text-[13px] uppercase tracking-[0.18em] text-white/45">
            World Bank Group&nbsp;·&nbsp;GWSP&nbsp;·&nbsp;FAO FAOLEX&nbsp;·&nbsp;AQUALEX
          </div>
        </div>
      </footer>
    </div>
  );
}
