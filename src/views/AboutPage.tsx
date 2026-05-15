export function AboutPage() {
  return (
    <article className="prose prose-slate max-w-3xl">
      <h1 className="text-2xl font-bold text-slate-900">
        Methodology, frameworks and sources
      </h1>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">Purpose</h2>
      <p className="text-sm text-slate-700">
        This tool helps government officials and water-sector reformers see, at a
        glance, what their country's law says about each water sub-sector — who
        is the policy-maker, asset owner, service provider, regulator and user
        representative; how the law is financed; and where the de jure framework
        diverges from de facto practice.
      </p>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">Frameworks</h2>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>
          <strong>WSIP — Water Strategy Implementation Plan</strong> (World Bank
          Group, December 2025). Figure 4 ("WSIP at a Glance") provides the
          three pillars (Water for People, Food, Planet), seven scalable
          solutions and three enablers that organise the country view.
        </li>
        <li>
          <strong>PIR — Policies, Institutions and Regulation framework</strong>{" "}
          (World Bank Group, WSS PIR Synthesis, August 2022). Figure 1.2 defines
          the six analytical dimensions (Policy, Institutions, Intergovernmental
          Context, Financing, Regulation, Resilience) used as the matrix
          columns.
        </li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">
        Legal data sources
      </h2>
      <ul className="space-y-2 text-sm text-slate-700">
        <li>
          <strong>FAOLEX</strong> (
          <a
            href="https://www.fao.org/faolex/en/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 underline"
          >
            fao.org/faolex
          </a>
          ) — global legal database curated by FAO. Each cited instrument links
          back to its FAOLEX record where available.
        </li>
        <li>
          <strong>AQUALEX</strong> (
          <a
            href="https://aqualex.fao.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-900 underline"
          >
            aqualex.fao.org
          </a>
          ) — water-specific subset of FAOLEX (~26,000 records).
        </li>
        <li>
          National gazettes and ministry websites where FAOLEX indexing is
          incomplete (clearly tagged "National source").
        </li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">
        Coverage status
      </h2>
      <ul className="space-y-1 text-sm text-slate-700">
        <li>
          <span className="font-semibold text-emerald-700">Aligned (green):</span>{" "}
          a law/regulation exists, a regulator is in place, and practice is
          broadly consistent with the legal mandate.
        </li>
        <li>
          <span className="font-semibold text-amber-700">
            Partial / uneven (yellow):
          </span>{" "}
          a legal mandate exists but implementation, regulation or enforcement
          is partial.
        </li>
        <li>
          <span className="font-semibold text-rose-700">Gap (red):</span>{" "}
          no specific legal instrument or regulator for this intersection.
        </li>
        <li>
          <span className="font-semibold text-slate-500">
            Not assessed (grey):
          </span>{" "}
          dimension not yet mapped for this sub-sector.
        </li>
      </ul>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">
        How to cite
      </h2>
      <p className="text-sm text-slate-700">
        Treat the tool as a navigation layer over the underlying primary
        sources. Always cite the underlying instrument (e.g., "Brazil, Law
        14.026/2020, Art. 11B, via FAOLEX LEX-FAOC074469"). Each instrument
        carries a "last verified" date — please re-check the FAOLEX page before
        relying on the citation for official purposes.
      </p>

      <h2 className="mt-6 text-lg font-semibold text-slate-900">Phasing</h2>
      <ol className="list-decimal space-y-1 pl-5 text-sm text-slate-700">
        <li>Brazil pilot end-to-end (current).</li>
        <li>Fill all seven sub-sectors for Brazil; comparator scaffold ready.</li>
        <li>Add Colombia, Kenya, Peru, Indonesia.</li>
        <li>AI-assisted ingestion pipeline against FAOLEX / AQUALEX.</li>
      </ol>
    </article>
  );
}
