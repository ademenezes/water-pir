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
        <div className="mx-auto flex max-w-[88rem] flex-col items-start justify-between gap-6 px-8 py-10 md:flex-row md:items-center">
          <span className="text-white">
            <Logo size={32} />
          </span>
          <p className="font-serif text-[15px] leading-[1.55] text-white/70 md:text-right">
            Questions or comments?{" "}
            <a
              href="mailto:ademenezes1@worldbank.org"
              className="text-brand-teal underline decoration-brand-teal/40 underline-offset-[5px] hover:text-white hover:decoration-white"
            >
              ademenezes1@worldbank.org
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
