import { WsipSchematic } from "../components/WsipSchematic";
import { PirWheel } from "../components/brand/PirWheel";

interface Chapter {
  id: string;
  number: string;
  title: string;
}

const CHAPTERS: Chapter[] = [
  { id: "frameworks", number: "01", title: "The two frameworks" },
  { id: "sources", number: "02", title: "Source discipline" },
  { id: "method", number: "03", title: "What we did, and didn't" },
  { id: "errors", number: "04", title: "How to flag an error" },
  { id: "phasing", number: "05", title: "Phasing" },
];

export function AboutPage() {
  return (
    <article className="space-y-16">
      {/* ── Chapter cover ─────────────────────────────────────────────────── */}
      <header className="grid grid-cols-12 gap-8 pt-8">
        <div className="col-span-12 md:col-span-3">
          <div className="eyebrow">Chapter · 04</div>
          <div className="chapter-numeral mt-3 text-[120px] md:text-[140px]">
            04
          </div>
        </div>
        <div className="col-span-12 md:col-span-9">
          <h1 className="font-display text-[clamp(32px,4.6vw,56px)] font-extrabold leading-[1.02] tracking-tightest text-brand-ink">
            About this tool.
          </h1>
          <p className="prose-editorial mt-5 max-w-[42rem] text-[19px] italic text-brand-ink/80">
            What it does, what it doesn't, and what to trust. A short brief on
            the frameworks it sits on top of, the sources it pulls from, and
            the rule the curators follow when the law and the practice
            disagree.
          </p>
        </div>
      </header>

      {/* ── Table of contents ─────────────────────────────────────────────── */}
      <nav aria-labelledby="toc-heading" className="border-y border-brand-rule py-6">
        <div className="eyebrow" id="toc-heading">Contents</div>
        <ol className="mt-4 space-y-3">
          {CHAPTERS.map((c) => (
            <li key={c.id} className="grid grid-cols-12 items-baseline gap-3">
              <span className="col-span-1 font-display text-[14px] font-extrabold tabular-nums text-brand-deep">
                {c.number}
              </span>
              <a
                href={`#${c.id}`}
                className="col-span-9 font-serif text-[17px] text-brand-ink hover:text-brand-deep"
              >
                {c.title}
              </a>
              <span
                className="col-span-2 hidden border-b border-dotted border-brand-rule pb-1 text-right font-sans text-[11px] uppercase tracking-[0.18em] text-brand-ink/50 md:block"
                aria-hidden
              >
                jump&nbsp;↓
              </span>
            </li>
          ))}
        </ol>
      </nav>

      {/* ── Ch. 1 — The two frameworks ────────────────────────────────────── */}
      <section id="frameworks" className="space-y-8 scroll-mt-24">
        <header>
          <div className="eyebrow">Chapter&nbsp;·&nbsp;01</div>
          <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            The two frameworks.
          </h2>
        </header>

        <p className="prose-editorial max-w-[42rem] text-[17px]">
          Every country view in this tool sits on top of two World Bank Group
          frameworks. The rows of the matrix come from the WSIP — the Water
          Strategy Implementation Plan (December&nbsp;2025) — which organises
          the sector into seven scalable solutions across three pillars
          (people, food, planet). The columns come from the PIR — Policies,
          Institutions and Regulation (August&nbsp;2022) — which adds six
          analytical dimensions to read each solution against.
        </p>

        <div className="grid grid-cols-12 gap-10">
          <figure className="col-span-12 md:col-span-7">
            <WsipSchematic />
            <figcaption className="figure-caption mt-4 max-w-[42rem]">
              <strong>Figure&nbsp;1.</strong> WSIP at a glance — 3 pillars
              &times; 7 scalable solutions, with three enablers. After WBG
              (2025), Figure&nbsp;4. The pillar colours flow into the row
              headers of every matrix in the tool.
            </figcaption>
          </figure>

          <figure className="col-span-12 md:col-span-5">
            <div className="flex justify-center">
              <PirWheel size={280} />
            </div>
            <figcaption className="figure-caption mt-4 max-w-[28rem] mx-auto">
              <strong>Figure&nbsp;2.</strong> The PIR framework — five
              analytical dimensions wrapped around a resilience core. After
              WBG (2022), Figure&nbsp;1.2. Each dimension becomes a column of
              the country matrix.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* ── Ch. 2 — Source discipline ─────────────────────────────────────── */}
      <section id="sources" className="space-y-6 scroll-mt-24">
        <header>
          <div className="eyebrow">Chapter&nbsp;·&nbsp;02</div>
          <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            Source discipline.
          </h2>
        </header>

        <p className="prose-editorial max-w-[42rem] text-[17px]">
          Every legal instrument cited in the matrix is linked back to a
          primary source. The order of preference is: FAOLEX first, AQUALEX
          second, national gazettes only when the others don't index the
          instrument. WBG analysis (BOSIB boxes, WSIP figures) is acceptable
          as a secondary source for coverage assessments — never for the
          existence of a statute.
        </p>

        <aside className="border-l-2 border-brand-amber bg-brand-sand px-6 py-5 max-w-[42rem]">
          <div className="eyebrow text-brand-amber">Worked example</div>
          <p className="mt-3 font-serif text-[15px] leading-[1.55] text-brand-ink/85">
            Brazil&nbsp;·&nbsp;urban WSS policy:&nbsp;
            <strong className="font-semibold">
              Law 14.026/2020, Art. 11B
            </strong>
            &nbsp;(national reference norms) — indexed in FAOLEX as
            LEX-FAOC196437. The "via FAOLEX" citation makes the trail
            re-checkable for anyone reviewing the brief.
          </p>
          <a
            href="https://www.fao.org/faolex/en/"
            target="_blank"
            rel="noreferrer"
            className="link-editorial mt-4 inline-block font-sans text-[12px]"
          >
            fao.org/faolex&nbsp;→
          </a>
        </aside>

        <ul className="grid grid-cols-12 gap-x-8 gap-y-4 max-w-[60rem]">
          {[
            {
              key: "FAOLEX",
              body: "Global legal database curated by the FAO Legal Office. ~110k records. Each cited instrument links back to its FAOLEX page where indexed.",
              href: "https://www.fao.org/faolex/en/",
            },
            {
              key: "AQUALEX",
              body: "Water-specific subset of FAOLEX, ~26k records. Tighter taxonomy for water-sector instruments; preferred when both index the same act.",
              href: "https://aqualex.fao.org/",
            },
            {
              key: "National gazette",
              body: "Country-specific official gazette or sector regulator page. Used only when FAOLEX / AQUALEX indexing is confirmed missing. Always tagged “National source”.",
              href: null,
            },
          ].map((s) => (
            <li key={s.key} className="col-span-12 md:col-span-4 border-t border-brand-rule pt-4">
              <div className="eyebrow">{s.key}</div>
              <p className="mt-2 font-serif text-[14px] leading-[1.5] text-brand-ink/85">
                {s.body}
              </p>
              {s.href && (
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="link-editorial mt-2 inline-block font-sans text-[12px]"
                >
                  Visit&nbsp;→
                </a>
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* ── Ch. 3 — Method ────────────────────────────────────────────────── */}
      <section id="method" className="space-y-6 scroll-mt-24">
        <header>
          <div className="eyebrow">Chapter&nbsp;·&nbsp;03</div>
          <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            What we did, and didn't.
          </h2>
        </header>

        <div className="grid grid-cols-12 gap-10">
          <div className="col-span-12 md:col-span-6">
            <div className="eyebrow text-brand-deep">What we did</div>
            <p className="prose-editorial mt-3 text-[16px]">
              For every live country, the curators read the framework law,
              the sector law and the lead regulator's mandate. Each cell of
              the 7&nbsp;&times;&nbsp;6 matrix gets a colour (strong /
              partial / gap / not mapped), a mandate summary, the legal
              instruments that produce it, and the responsible institutions.
              Where the law and the implementation diverge, a separate
              de&#8209;jure / de&#8209;facto note records the gap and cites
              its evidence.
            </p>
          </div>
          <div className="col-span-12 md:col-span-6">
            <div className="eyebrow text-brand-amber">What we did not</div>
            <p className="prose-editorial mt-3 text-[16px]">
              No algorithmic scoring. No machine translation of legal text.
              No backend, no AI summarisation in production — every mandate
              is human-written or human-edited and re-checked against its
              source. The tool is a navigation layer, not an authority: cite
              the underlying statute, not the cell.
            </p>
          </div>
        </div>
      </section>

      {/* ── Ch. 4 — Errors ─────────────────────────────────────────────────── */}
      <section id="errors" className="space-y-6 scroll-mt-24">
        <header>
          <div className="eyebrow">Chapter&nbsp;·&nbsp;04</div>
          <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            How to flag an error.
          </h2>
        </header>

        <p className="prose-editorial max-w-[42rem] text-[17px]">
          If a citation is wrong, an institution has been renamed, or a law
          has been repealed, please reach out. The fastest path to a
          correction is the FAOLEX record itself — copy the LEX-FAOC&hellip;
          identifier and email it with the context, and a curator will
          update the cell and the verified-on date.
        </p>
        <a
          href="mailto:water-pir@example.org"
          className="link-editorial font-display text-[16px] font-semibold tracking-[0.02em]"
        >
          water-pir@example.org&nbsp;→
        </a>
      </section>

      {/* ── Ch. 5 — Phasing ───────────────────────────────────────────────── */}
      <section id="phasing" className="space-y-6 scroll-mt-24">
        <header>
          <div className="eyebrow">Chapter&nbsp;·&nbsp;05</div>
          <h2 className="mt-2 font-display text-[clamp(26px,3.4vw,40px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            Phasing.
          </h2>
        </header>

        <ol className="grid grid-cols-12 gap-x-8 gap-y-6 max-w-[60rem]">
          {[
            { n: "01", body: "Brazil pilot — end-to-end, all 8 sub-sectors mapped." },
            { n: "02", body: "Six first-cohort Water Compact countries (Cambodia, Chad, Yemen, Senegal, Uzbekistan, + one)." },
            { n: "03", body: "Remaining 27 WSIP Water Compact priority countries." },
            { n: "04", body: "AI-assisted ingestion pipeline against FAOLEX / AQUALEX, with human review." },
          ].map((p) => (
            <li key={p.n} className="col-span-12 md:col-span-6 grid grid-cols-12 gap-3 border-t border-brand-rule pt-4">
              <span className="col-span-1 font-display text-[24px] font-extrabold tabular-nums leading-none text-brand-deep">
                {p.n}
              </span>
              <p className="col-span-11 font-serif text-[15px] leading-[1.55] text-brand-ink/85">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Colophon ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-brand-rule pt-8 mb-12">
        <div className="eyebrow">Colophon</div>
        <p className="mt-3 max-w-[44rem] font-serif text-[14px] leading-[1.6] text-brand-ink/65">
          Built on the World Bank Group's WSIP (December&nbsp;2025) and PIR
          (August&nbsp;2022) frameworks. Visual identity drawn from the
          BOSIB PIR Synthesis Report cover (Circle Graphics, 2022). Type:
          Inter and Source&nbsp;Serif&nbsp;4. Brazil pilot, 2026.
        </p>
      </footer>
    </article>
  );
}
