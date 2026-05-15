import { Link } from "react-router-dom";
import { WorldMap, WorldMapLegend } from "../components/WorldMap";
import { WsipSchematic } from "../components/WsipSchematic";
import { PirSchematic } from "../components/PirSchematic";
import { SearchBox } from "../components/SearchBox";
import { FeaturedInsight } from "../components/FeaturedInsight";
import { LessonsGrid } from "../components/LessonsGrid";

export function HomePage() {
  return (
    <div className="space-y-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          See your country's water sector at a glance.
        </h1>
        <p className="max-w-3xl text-slate-600">
          The Water PIR Tool maps national water-sector laws, regulators and
          mandates onto the World Bank's <strong>WSIP × PIR framework</strong> —
          so a reformer can answer, in one click, who is responsible for what,
          under which legal instrument, and where the gap is.
        </p>

        <div className="max-w-2xl pt-2">
          <SearchBox />
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Link
            to="/country/BRA"
            className="rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-slate-700"
          >
            Explore Brazil →
          </Link>
          <Link
            to="/wsip-matrix"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400"
          >
            Open the WSIP × PIR matrix
          </Link>
          <Link
            to="/wizard"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400"
          >
            Open the project wizard
          </Link>
          <Link
            to="/countries"
            className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-800 shadow-sm hover:border-slate-400"
          >
            Browse countries
          </Link>
        </div>
      </section>

      {/* Featured "did you know?" insight */}
      <section>
        <FeaturedInsight />
      </section>

      {/* How to use — 3 steps */}
      <section>
        <div className="text-sm font-semibold uppercase tracking-wide text-slate-500">
          How to use the tool
        </div>
        <ol className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-3">
          {[
            {
              n: 1,
              title: "Pick a country",
              body:
                "Click on the map or choose from the Countries tab. Brazil is fully populated; the 27 WSIP Water Compact countries are pipelined.",
            },
            {
              n: 2,
              title: "Open the WSIP × PIR matrix",
              body:
                "See the 7 scalable solutions × 6 PIR dimensions at a glance. Coverage dots flag the de jure–de facto gaps.",
            },
            {
              n: 3,
              title: "Drill into a sub-sector",
              body:
                "Each cell links to the law, the regulator, the mandate, and the FAOLEX source — ready to cite in a reform brief.",
            },
          ].map((step) => (
            <li
              key={step.n}
              className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm"
            >
              <div className="flex items-baseline gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                  {step.n}
                </span>
                <h3 className="text-base font-semibold text-slate-900">
                  {step.title}
                </h3>
              </div>
              <p className="mt-2 text-sm text-slate-600">{step.body}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Map */}
      <section>
        <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Pick a country
            </h2>
            <p className="text-xs text-slate-500">
              Click <strong>Brazil</strong> to open the full dashboard. The teal
              countries are the WSIP Water Compact priority cohort — data coming
              in the next phases.
            </p>
          </div>
          <WorldMapLegend />
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-2 shadow-sm">
          <WorldMap />
        </div>
      </section>

      {/* Frameworks — schematics side-by-side */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          The two frameworks that organise everything
        </h2>
        <p className="max-w-3xl text-xs text-slate-500">
          Each country view is structured by these two analytical frameworks.
          They intersect to form the WSIP × PIR matrix.
        </p>
        <div className="mt-3 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <WsipSchematic />
          <PirSchematic />
        </div>
      </section>

      {/* Lessons from practice */}
      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Lessons from practice
        </h2>
        <p className="max-w-3xl text-xs text-slate-500">
          Reform cases from BOSIB and the WSIP that show how laws, regulators
          and financing instruments combine in real countries. Click any card
          to open the relevant deep-dive (where the country is live in the
          tool).
        </p>
        <div className="mt-3">
          <LessonsGrid />
        </div>
      </section>
    </div>
  );
}
