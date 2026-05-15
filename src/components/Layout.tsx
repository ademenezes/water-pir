import { Link, NavLink } from "react-router-dom";

const TABS: { to: string; label: string; end?: boolean }[] = [
  { to: "/", label: "Home", end: true },
  { to: "/wsip-matrix", label: "WSIP Matrix" },
  { to: "/pir-comparator", label: "PIR Comparator" },
  { to: "/countries", label: "Countries" },
  { to: "/wizard", label: "Project Wizard" },
  { to: "/about", label: "Methodology" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-slate-900 text-white">
              <span className="text-sm font-bold">W</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">
                Water PIR Tool
              </div>
              <div className="text-[11px] uppercase tracking-wider text-slate-500">
                WSIP × PIR · sector framework explorer
              </div>
            </div>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            {TABS.map((t) => (
              <NavLink
                key={t.to}
                to={t.to}
                end={t.end}
                className={({ isActive }) =>
                  `rounded px-2.5 py-1 ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-700 hover:bg-slate-100"
                  }`
                }
              >
                {t.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-6 py-6">{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-4 text-xs text-slate-500">
          Frameworks: WSIP (WBG, Dec 2025, Figure 4) · PIR (WBG, Aug 2022,
          Figure 1.2). Legal sources: FAOLEX & AQUALEX (FAO), national gazettes.
          Always verify against the linked source. Brazil pilot.
        </div>
      </footer>
    </div>
  );
}
