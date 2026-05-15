import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCountry } from "../../data";
import { Matrix, type MatrixCellTarget } from "../components/Matrix/Matrix";
import { MatrixCellPanel } from "../components/Matrix/MatrixCellPanel";

/**
 * Per-country matrix view at `/country/:code/matrix`. Kept as a backwards-
 * compatible deep-link target; the canonical UI now lives at `/wsip-matrix`.
 */
export function MatrixView() {
  const { code } = useParams();
  const country = getCountry(code ?? "");
  const [panelTarget, setPanelTarget] = useState<MatrixCellTarget | null>(null);

  if (!country) {
    return (
      <div className="font-serif text-[15px] text-brand-ink/70">
        Country not found.{" "}
        <Link to="/countries" className="link-editorial font-sans text-[13px]">
          Browse countries&nbsp;→
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <header>
        <div className="eyebrow">{country.flag_emoji} {country.name}</div>
        <h1 className="mt-3 font-display text-[clamp(28px,4vw,44px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
          WSIP&nbsp;×&nbsp;PIR matrix.
        </h1>
        <p className="prose-editorial mt-4 max-w-[42rem] text-[17px] italic text-brand-ink/80">
          Each row is a WSIP scalable solution; each column is a PIR
          dimension. The cell shows the strongest mapped sub-sector for that
          intersection in {country.name}. Click any cell to open its full
          context.
        </p>
        <div className="mt-5 flex flex-wrap items-baseline gap-x-6 gap-y-2">
          <Link
            to={`/wsip-matrix?country=${country.code}`}
            className="link-editorial font-sans text-[13px]"
          >
            Open in the full matrix tab&nbsp;→
          </Link>
          <Link
            to={`/country/${country.code}`}
            className="link-editorial font-sans text-[13px]"
          >
            Open {country.name} dashboard&nbsp;→
          </Link>
        </div>
      </header>

      <Matrix country={country} onCellOpen={setPanelTarget} />

      <MatrixCellPanel target={panelTarget} onClose={() => setPanelTarget(null)} />
    </div>
  );
}
