import { useState } from "react";
import emailjs from "@emailjs/browser";

const EMAIL = "sumitmokasare@gmail.com"; // replace with your real email
// --- EmailJS (free tier: 200 emails/month, no backend needed) ---
// 1. Create a free account at https://www.emailjs.com
// 2. Add an Email Service (e.g. Gmail) -> copy its Service ID
// 3. Create an Email Template with {{from_name}}, {{from_email}}, {{message}} variables -> copy its Template ID
// 4. Account -> General -> copy your Public Key
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* ───────── Contact details: replace the values below with your real ones ─────────
   Leave a value as "" to hide that row. */
const PHONE = "+91 8793877175"; // your number
const GITHUB_URL = "https://github.com/sumit-mokasare";
const LINKEDIN_URL = "https://www.linkedin.com/in/sumitmokasare";
const X_URL = "https://x.com/sumitMokasare";

const stripProtocol = (url) => url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const contactLinks = [
  { id: "email", label: "Email", value: EMAIL, href: `mailto:${EMAIL}`, icon: "mail" },
  { id: "github", label: "GitHub", value: stripProtocol(GITHUB_URL), href: GITHUB_URL, icon: "github", external: true },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: stripProtocol(LINKEDIN_URL),
    href: LINKEDIN_URL,
    icon: "linkedin",
    external: true,
  },
  { id: "x", label: "X.com", value: stripProtocol(X_URL), href: X_URL, icon: "x", external: true },
  { id: "phone", label: PHONE, value: PHONE, href: `tel:${PHONE.replace(/[^+\d]/g, "")}`, icon: "phone" },
].filter((item) => item.value);

/* ───────── Icons ───────── */
function ContactIcon({ name }) {
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
  };

  switch (name) {
    case "mail":
      return (
        <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
        </svg>
      );
    case "github":
      return (
        <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      );
    case "linkedin":
      return (
        <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect width="4" height="12" x="2" y="9" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      );
    case "x":
      return (
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
    case "pin":
    default:
      return (
        <svg viewBox="0 0 24 24" {...stroke} aria-hidden="true">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
      );
  }
}

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

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
        console.log("llogg husaa");
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
      id="contact"
      className="section-shell relative overflow-hidden bg-bg px-6 py-24 text-ink md:px-12 md:py-32"
    >
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* HEADER */}
        <div className="section-kicker">
          <span>06</span>
          <i /> CONTACT
        </div>

        <h2 className="mt-8 font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
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
          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
            <div>
              <label htmlFor="contact-name" className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-invalid={Boolean(errors.name)}
                className="mt-2 w-full border-b border-line bg-transparent py-3 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-accent2 "
              />
              {errors.name && <p className="mt-1 text-xs text-accent2">{errors.name}</p>}
            </div>

            <div>
              <label htmlFor="contact-email" className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Email
              </label>
              <input
                id="contact-email"
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

            <div>
              <label htmlFor="contact-message" className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Message
              </label>
              <textarea
                id="contact-message"
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
              className="mt-2 w-fit rounded-full border border-accent2/50 px-6 py-3 font-mono text-xs uppercase tracking-widest text-accent2 transition-colors hover:bg-accent2 hover:text-bg disabled:opacity-50"
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

          {/* INFO / CONTACT DETAILS */}
          <div className="flex flex-col gap-8">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Based in</p>
              <p className="mt-2 flex items-center gap-2 font-display text-xl font-bold">
                <span className="h-5 w-5 text-accent2">
                  <ContactIcon name="pin" />
                </span>
                Nagpur, India
              </p>

              <p className="mt-6 font-mono text-[10px] uppercase tracking-widest text-muted">Available for</p>
              <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted">
                Freelance projects, full-time roles and interesting collaborations in web development and generative AI.
              </p>
            </div>

            <div>
              <p className="font-mono text-[10px] uppercase tracking-widest text-muted">Find me online</p>
              <ul className="mt-4 grid grid-cols-2 gap-3">
                {contactLinks.map((item) => (
                  <li key={item.id} className="[&:last-child:nth-child(odd)]:col-span-2">
                    <a
                      href={item.href}
                      {...(item.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      aria-label={item.label}
                      className="contact-link group flex h-12 items-center gap-3 rounded-xl border border-line px-4 text-muted transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-accent2/60 hover:bg-accent2/5 hover:text-ink"
                    >
                      <span className="block h-4 w-4 shrink-0 transition-colors duration-300 group-hover:text-accent2">
                        <ContactIcon name={item.icon} />
                      </span>
                      <span className="text-sm font-medium leading-none">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
