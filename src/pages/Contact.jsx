import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { SplitText } from "gsap/all";
import emailjs from "@emailjs/browser";

gsap.registerPlugin(ScrollTrigger, SplitText);

const EMAIL = "hello@sumitmokasare.dev"; // replace with your real email
const socials = [
  { name: "GitHub", url: "https://github.com/your-username" },
  { name: "LinkedIn", url: "https://linkedin.com/in/your-username" },
  { name: "Twitter / X", url: "https://x.com/your-username" },
];

// --- EmailJS (free tier: 200 emails/month, no backend needed) ---
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) -> copy its Service ID
// 3. Create an Email Template with {{from_name}}, {{from_email}}, {{message}} variables -> copy its Template ID
// 4. Account -> General -> copy your Public Key
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

export default function Contact() {
  const sectionRef = useRef(null);
  const numeralRef = useRef(null);
  const headingRef = useRef(null);
  const formRef = useRef(null);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useGSAP(
    () => {
      const headlineSplit = SplitText.create(headingRef.current, { type: "words" });

      gsap.from(headlineSplit.words, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.05,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", once: true },
      });

      gsap.from(".contact-form-field", {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: formRef.current, start: "top 85%", once: true },
      });

      gsap.to(numeralRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top bottom", end: "bottom top", scrub: 1 },
      });
    },
    { scope: sectionRef },
  );

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  // ---- validation ----
  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!form.name.trim()) {
      nextErrors.name = "Please enter your name.";
    } else if (form.name.trim().length < 2) {
      nextErrors.name = "Name looks too short.";
    }

    if (!form.email.trim()) {
      nextErrors.email = "Please enter your email.";
    } else if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = "Please enter a valid email address.";
    }

    if (!form.message.trim()) {
      nextErrors.message = "Please add a short message.";
    } else if (form.message.trim().length < 10) {
      nextErrors.message = "Message should be at least 10 characters.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    setStatus("sending");

    try {
      if (EMAILJS_SERVICE_ID !== "YOUR_SERVICE_ID") {
        // real send via EmailJS, once the IDs above are filled in
        await emailjs.send(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          { from_name: form.name, from_email: form.email, message: form.message },
          { publicKey: EMAILJS_PUBLIC_KEY },
        );
      } else {
        // fallback while EmailJS isn't configured yet, so the form still works
        const subject = encodeURIComponent(`Portfolio inquiry from ${form.name}`);
        const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
        window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
      }

      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("Email send failed:", err);
      setStatus("error");
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden bg-bg px-4 py-24 text-ink md:px-6 md:py-32"
    >
      {/* BIG BACKGROUND NUMBER */}
      <div
        ref={numeralRef}
        className="pointer-events-none absolute -top-10 left-1/2 z-0 -translate-x-1/2 select-none font-bold text-ink"
        style={{ fontSize: "min(34vw, 300px)", opacity: 0.035, lineHeight: 1, letterSpacing: "-0.05em" }}
      >
        06
      </div>

      {/* HEADER */}
      <div className="relative z-10 flex items-center gap-3 font-mono text-[10px] tracking-widest text-muted md:text-[11px]">
        <span className="text-xs">( 06 )</span>
        <span className="h-px w-10 bg-line" />
        <span className="text-xs">CONTACT</span>
      </div>

      <div className="relative z-10 mx-auto mt-14 max-w-5xl">
        <h2
          ref={headingRef}
          className="font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
        >
          Got an idea? <span className="text-accent2">Let's build it.</span>
        </h2>

        <a
          href={`mailto:${EMAIL}`}
          className="group relative mt-8 inline-block font-display text-xl font-bold tracking-tight sm:text-2xl md:text-3xl"
        >
          {EMAIL}
          <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent2 transition-transform duration-500 ease-out group-hover:scale-x-100" />
        </a>

        <div className="mt-16 grid gap-12 md:grid-cols-[1fr_1fr] md:gap-16">
          {/* FORM */}
          <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <div className="contact-form-field">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                className="mt-2 w-full border-b border-line bg-transparent py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent2"
              />
              {errors.name && <p className="mt-1 text-xs text-accent2">{errors.name}</p>}
            </div>

            <div className="contact-form-field">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                className="mt-2 w-full border-b border-line bg-transparent py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent2"
              />
              {errors.email && <p className="mt-1 text-xs text-accent2">{errors.email}</p>}
            </div>

            <div className="contact-form-field">
              <label className="font-mono text-[10px] uppercase tracking-widest text-muted">Message</label>
              <textarea
                name="message"
                rows={4}
                value={form.message}
                onChange={handleChange}
                placeholder="Tell me about your project"
                aria-invalid={Boolean(errors.message)}
                className="mt-2 w-full resize-none border-b border-line bg-transparent py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent2"
              />
              {errors.message && <p className="mt-1 text-xs text-accent2">{errors.message}</p>}
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="contact-form-field mt-2 w-fit rounded-full border border-accent2/50 px-6 py-3 font-mono text-xs uppercase tracking-widest text-accent2 transition-colors hover:bg-accent2 hover:text-bg disabled:opacity-50"
            >
              {status === "sent"
                ? "Message sent ✓"
                : status === "sending"
                  ? "Sending…"
                  : status === "error"
                    ? "Failed — try again →"
                    : "Send message →"}
            </button>
          </form>

          {/* INFO / SOCIALS */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Based in</p>
              <p className="mt-2 font-display text-xl font-bold">Nagpur, India</p>

              <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-muted">Available for</p>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted">
                Freelance projects, full-time roles and interesting collaborations in web development and generative AI.
              </p>
            </div>

            <div className="mt-12 border-t border-line pt-6">
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Elsewhere</p>
              <div className="mt-3 flex flex-col gap-2">
                {socials.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="noreferrer"
                    className="w-fit font-display text-lg font-bold transition-colors hover:text-accent2"
                  >
                    {s.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
