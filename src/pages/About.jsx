import Button from "../components/Button";
import Reveal from "../components/Reveal";
import { facts, learningJourney, specialties, strengths } from "../utils/data";

/* One shared card style so every card has the same radius, border, padding. */
const card = "h-full rounded-2xl border border-line bg-bg p-6 sm:p-8";

export default function About() {
  return (
    <section id="about" className="section-shell bg-surface px-6 py-24 text-ink md:px-12 md:py-32">
      <div className="mx-auto max-w-6xl">
        {/* ───────── 01 · ABOUT ME ───────── */}
        <Reveal>
          <div className="section-kicker">
            <span>01</span>
            <i /> ABOUT ME
          </div>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start lg:gap-16">
            {/* LEFT: story */}
            <div>
              <h2 className="section-heading max-w-3xl">
                Full-stack developer.
                <span className="block text-accent">AI enthusiast.</span>
              </h2>

              {/* One strong lead, then short supporting copy: easier to scan than 4 equal paragraphs */}
              <p className="mt-8 max-w-2xl text-lg font-medium leading-8 text-ink sm:text-xl sm:leading-9">
                I&apos;m Sumit Mokasare, a BCA student who turns ideas into functional, user-friendly web applications,
                from the interface to the API behind it.
              </p>

              <div className="mt-6 max-w-2xl space-y-4 text-sm leading-7 text-muted sm:text-base">
                <p>
                  I started with web fundamentals and grew into building complete applications: responsive interfaces,
                  REST APIs, and scalable architectures. Right now I&apos;m adding Generative AI to that toolkit,
                  including LLMs, RAG, and AI agents, so I can build smarter apps that solve meaningful problems.
                </p>
                <p>
                  I learn best by building, and I&apos;m preparing for my first software development internship where I
                  can contribute and grow alongside experienced developers.
                </p>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
                <Button variant="primary" href="#contact">
                  Let&apos;s connect <span aria-hidden="true">↗</span>
                </Button>
                <a
                  href="#work"
                  className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-ink hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  See my work
                </a>
              </div>
            </div>

            {/* RIGHT: profile card */}
            <aside className="about-profile-card relative overflow-hidden rounded-2xl border border-line bg-bg p-6 sm:p-8 lg:sticky lg:top-28">
              <div
                className="absolute -right-12 -top-16 h-48 w-48 rounded-full bg-accent/10 blur-2xl"
                aria-hidden="true"
              />
              <div className="relative">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-accent font-display text-lg font-bold text-white">
                    SM
                  </div>
                  <div className="min-w-0">
                    <p className="font-display text-lg font-semibold">Sumit Mokasare</p>
                    <p className="mt-1 inline-flex items-center gap-2 text-xs text-muted">
                      <span className="relative flex size-3">
                        <span className="absolute inline-flex h-full  w-full animate-ping! rounded-full bg-accent2 opacity-75"></span>
                        <span className="relative inline-flex  size-3 rounded-full bg-accent2"></span>
                      </span>
                      Open to internships
                    </p>
                  </div>
                </div>

                <dl className="mt-6 divide-y divide-line border-y border-line text-sm">
                  {facts.map((fact) => (
                    <div key={fact.label} className="flex items-baseline justify-between gap-6 py-3">
                      <dt className="shrink-0 text-xs text-muted">{fact.label}</dt>
                      <dd className="text-right font-medium">{fact.value}</dd>
                    </div>
                  ))}
                </dl>

                <p className="mt-6 text-base font-medium leading-7">
                  Solve real problems with clean code, thoughtful design, and continuous learning.
                </p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {["Build", "Learn", "Improve"].map((label) => (
                    <span
                      key={label}
                      className="rounded-full border border-line bg-surface px-3 py-1.5 text-xs text-muted"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </aside>
          </div>
        </Reveal>
        {/* ───────── 01.2 + 01.3 · EDUCATION / JOURNEY ───────── */}
        <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="flex h-full flex-col">
              <div className="section-kicker">
                <span>01.2</span>
                <i /> EDUCATION & EXPERIENCE
              </div>
              <article className={`${card} mt-6 flex-1`}>
                <span className="rounded-full bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-accent">
                  Currently pursuing
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold sm:text-2xl">
                  Bachelor of Computer Applications (BCA)
                </h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  I&apos;m pursuing my undergraduate degree while learning full-stack development and Generative AI
                  through practical projects, self-learning, and online courses.
                </p>
                <div className="mt-7 border-t border-line pt-6">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-muted">Experience</p>
                  <h4 className="mt-3 font-display text-lg font-semibold">Fresher · Aspiring developer</h4>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    I haven&apos;t yet held a professional industry role. Personal full-stack projects have helped me
                    practice frontend and backend development, authentication, database design, API development, and
                    modern workflows.
                  </p>
                </div>
              </article>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col">
              <div className="section-kicker">
                <span>01.3</span>
                <i /> MY LEARNING JOURNEY
              </div>
              {/* Timeline now lives in the same card as its neighbour => equal height, equal padding */}
              <div className={`${card} mt-6 flex-1`}>
                <ol className="learning-timeline space-y-0">
                  {learningJourney.map((step, index) => (
                    <li key={step} className="learning-step">
                      <span className="learning-step-marker">{String(index + 1).padStart(2, "0")}</span>
                      <p className="text-sm leading-6 text-muted">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Reveal>
        </div>
        {/* ───────── 01.4 + 01.5 · OBJECTIVE / DIFFERENT ───────── */}
        {/* Same structure as 01.2/01.3: kicker above, card below, equal heights, same top margin */}
        <div className="mt-24 grid gap-12 md:mt-32 lg:grid-cols-2 lg:gap-8">
          <Reveal>
            <div className="flex h-full flex-col">
              <div className="section-kicker">
                <span>01.4</span>
                <i /> CAREER OBJECTIVE
              </div>
              <article className={`${card} mt-6 flex-1`}>
                <h3 className="font-display text-xl font-semibold">Ready to grow with a collaborative team.</h3>
                <p className="mt-3 text-sm leading-6 text-muted">
                  I&apos;m looking for internship and entry-level opportunities where I can contribute to real-world
                  products, learn from experienced engineers, and grow into a well-rounded software developer with a
                  focus on AI-powered applications.
                </p>
              </article>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="flex h-full flex-col">
              <div className="section-kicker">
                <span>01.5</span>
                <i /> WHAT MAKES ME DIFFERENT
              </div>
              <article className={`${card} mt-6 flex-1`}>
                <h3 className="font-display text-xl font-semibold">Curiosity with a hands-on mindset.</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {strengths.map((strength) => (
                    <span
                      key={strength}
                      className="rounded-full border border-line bg-surface px-3 py-2 text-xs text-muted"
                    >
                      {strength}
                    </span>
                  ))}
                </div>
              </article>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
