import { WsipSchematic } from "../components/WsipSchematic";
import { PirWheel } from "../components/brand/PirWheel";

export function AboutPage() {
  return (
    <article className="space-y-16">
      <header className="pt-8">
        <div className="eyebrow">About</div>
        <h1 className="mt-4 font-display text-[clamp(40px,5.6vw,80px)] font-extrabold leading-[1.02] tracking-tightest text-brand-ink">
          About this tool.
        </h1>
        <p className="prose-editorial mt-7 max-w-[52rem] text-[21px] italic text-brand-ink/80">
          What it does, and what to trust. A brief on the two frameworks the
          tool sits on top of.
        </p>
      </header>

      {/* The two frameworks */}
      <section id="frameworks" className="space-y-8">
        <header>
          <div className="eyebrow">Frameworks</div>
          <h2 className="mt-3 font-display text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            The two frameworks.
          </h2>
        </header>

        <p className="prose-editorial max-w-[52rem] text-[19px]">
          Every country view in this tool sits on top of two World Bank Group
          frameworks. The rows of the matrix come from the WSIP, the Water
          Strategy Implementation Plan (December&nbsp;2025), which organises
          the sector into seven scalable solutions across three pillars
          (people, food, planet). The columns come from the PIR, Policies,
          Institutions and Regulation (August&nbsp;2022), which adds six
          analytical dimensions to read each solution against.
        </p>

        <div className="grid grid-cols-12 gap-10">
          <figure className="col-span-12 md:col-span-7">
            <WsipSchematic />
            <figcaption className="figure-caption mt-4 max-w-[42rem]">
              <strong>Figure&nbsp;1.</strong> WSIP at a glance. 3 pillars
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
              <strong>Figure&nbsp;2.</strong> The PIR framework. Five
              analytical dimensions wrapped around a resilience core. After
              WBG (2022), Figure&nbsp;1.2. Each dimension becomes a column of
              the country matrix.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* Phasing */}
      <section id="phasing" className="space-y-6">
        <header>
          <div className="eyebrow">Roadmap</div>
          <h2 className="mt-3 font-display text-[clamp(28px,3.6vw,44px)] font-extrabold leading-[1.05] tracking-tightest text-brand-ink">
            Phasing.
          </h2>
        </header>

        <ol className="grid grid-cols-12 gap-x-8 gap-y-6 max-w-[60rem]">
          {[
            { n: "01", body: "Brazil pilot. End-to-end, all 8 sub-sectors mapped." },
            { n: "02", body: "Six first-cohort Water Compact countries (Cambodia, Chad, Yemen, Senegal, Uzbekistan, and one more)." },
            { n: "03", body: "Remaining 27 WSIP Water Compact priority countries." },
            { n: "04", body: "AI-assisted ingestion pipeline against FAOLEX and AQUALEX, with human review." },
          ].map((p) => (
            <li key={p.n} className="col-span-12 md:col-span-6 grid grid-cols-12 gap-3 border-t border-brand-rule pt-4">
              <span className="col-span-1 font-display text-[26px] font-extrabold tabular-nums leading-none text-brand-deep">
                {p.n}
              </span>
              <p className="col-span-11 font-serif text-[17px] leading-[1.55] text-brand-ink/85">
                {p.body}
              </p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}
