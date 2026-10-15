import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BadgeCheck,
  CalendarCheck,
  CarFront,
  CheckCircle2,
  Clock,
  Disc3,
  Facebook,
  Flower2,
  Gauge,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Snowflake,
  Star,
  Sun,
  Thermometer,
  Wrench,
  X,
  Zap,
} from "lucide-react";

// -----------------------------------------------------------------------------
// COMPANY DETAILS AND CONTENT
// -----------------------------------------------------------------------------

const COMPANY = "Four Seasons Automotive";
const PHONE = "3039865202";
const PHONE_DISPLAY = "(303) 986-5202";
const EMAIL = ""; // The current site hides the shop email behind Cloudflare; add it once confirmed.
const ADDRESS = "1801 S Wadsworth Blvd";
const CITY = "Lakewood, CO 80232";
const MAPS_QUERY = "Four Seasons Automotive, 1801 S Wadsworth Blvd, Lakewood, CO 80232";
const FOUNDED = 1979;
const GOOGLE_PLACE_ID = "ChIJx69ifwCBa4cR0x0WQF-4qUU";
const GOOGLE_REVIEWS_URL = `https://search.google.com/local/reviews?placeid=${GOOGLE_PLACE_ID}`;
const GOOGLE_WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;
// Shown until live Google data loads. From a third-party listing on 2026-10-14; confirm before launch.
const FALLBACK_RATING = { rating: 4.9, userRatingCount: 351 };

// Public contact details for the studio — edit here, no environment variables required.
const STUDIO_PHONE = "+17205156647";
const STUDIO_EMAIL = "hello@blueprintwebstudio.com";
const STUDIO_WEBSITE = "https://blueprintwebstudio.com";
const STUDIO_SOURCE = "fsa.blueprintwebstudio.com";

const END_DATE = import.meta.env.VITE_CONCEPT_END_DATE || "2026-11-15T23:59:59-07:00";

const HOURS = [
  ["Monday – Friday", "7:30 am – 5:30 pm"],
  ["Saturday", "Closed"],
  ["Sunday", "Closed"],
];

const SERVICES = [
  { title: "Auto Repair & Diagnostics", desc: "Check-engine lights, drivability problems and the noises you can't place, tracked down and explained before any work starts.", icon: Wrench },
  { title: "Brakes", desc: "Pads, rotors, calipers and fluid service so every stop on Wadsworth and I-70 is a confident one.", icon: Disc3 },
  { title: "Wheel Alignments", desc: "Precision alignments that stop the pull, protect your tires and keep the steering wheel centered.", icon: Gauge },
  { title: "Steering & Suspension", desc: "Shocks, struts, ball joints and tie rods for a ride that stays planted on rough Colorado roads.", icon: CarFront },
  { title: "Climate Control", desc: "A/C recharges and repairs for July, heater and defrost service for January.", icon: Thermometer },
  { title: "Electrical Systems", desc: "Batteries, starters, alternators and wiring faults diagnosed with the right equipment.", icon: Zap },
  { title: "Tires", desc: "New tires, mounting, balancing and rotations, matched to how and where you drive.", icon: Disc3 },
  { title: "Seasonal Check-ups", desc: "A once-over before the weather turns, so small problems get fixed before they strand you.", icon: CalendarCheck },
];

const SEASONS = [
  { name: "Winter", icon: Snowflake, tone: "winter", lead: "Cold starts and slick roads.", items: ["Battery load test", "Tire tread and pressure", "Antifreeze strength", "Wipers, washer fluid and defrost"] },
  { name: "Spring", icon: Flower2, tone: "spring", lead: "Recover from the pothole season.", items: ["Alignment check", "Suspension and steering inspection", "Brake inspection", "Undercarriage rinse and look-over"] },
  { name: "Summer", icon: Sun, tone: "summer", lead: "Heat and mountain road trips.", items: ["A/C performance test", "Cooling system and hoses", "Belts and fluids", "Tire condition before long drives"] },
  { name: "Fall", icon: Leaf, tone: "fall", lead: "Get ready before the first snow.", items: ["Heater and defrost", "Lights and electrical", "Battery and charging system", "Winter tire planning"] },
];

const PROCESS = [
  ["01", "Request a time", "Book online or call the shop. Tell us what you're noticing and when works for you."],
  ["02", "We inspect and call", "A technician diagnoses the problem and we call you with clear options and pricing."],
  ["03", "You approve", "No work starts until you say yes. You decide what gets done today and what can wait."],
  ["04", "Back on the road", "Pick up your car with a walk-through of the work and what to watch for next."],
];

const CREDENTIALS = [
  { title: "NAPA AutoCare Center", desc: "Part of NAPA's network of independent repair shops held to its service standards." },
  { title: "NAPA Peace of Mind Warranty", desc: "Qualifying repairs are backed by NAPA's nationwide warranty, honored at participating shops." },
  { title: "AAA Approved Auto Repair", desc: "Listed as a AAA Approved Auto Repair facility." },
  { title: "ASA Member", desc: "Member of the Automotive Service Association." },
];

const AREAS = ["Lakewood", "Denver", "Wheat Ridge"];

const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/FourSeasonsAutomotiveLakewoodCO", icon: Facebook },
  { name: "Google", url: GOOGLE_REVIEWS_URL, icon: Star },
  { name: "Yelp", url: "https://www.yelp.com/biz/four-seasons-automotive-lakewood", icon: ArrowUpRight },
];

const SERVICE_OPTIONS = ["Not sure / diagnosis", ...SERVICES.map((service) => service.title), "Oil change / maintenance"];

// -----------------------------------------------------------------------------
// CONCEPT COUNTDOWN + INTEREST FORM (Blueprint WebStudio)
// -----------------------------------------------------------------------------

function getRemaining() {
  const ms = Math.max(0, new Date(END_DATE).getTime() - Date.now());
  return {
    days: Math.floor(ms / 86400000),
    hours: Math.floor(ms / 3600000) % 24,
    minutes: Math.floor(ms / 60000) % 60,
    expired: ms === 0,
  };
}

function ConceptInterestModal({ onClose }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", budget: "", message: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");
  const modalRef = useRef(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const previousFocus = document.activeElement;
    modalRef.current?.focus();
    const handleEscape = (event) => { if (event.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      previousFocus?.focus?.();
    };
  }, [onClose]);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    if (form.website) { setStatus("sent"); return; }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/demo-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prospect: COMPANY,
          source: STUDIO_SOURCE,
          page: window.location.href,
          action: "Partner Program Interest",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          budget: form.budget,
          message: form.message.trim(),
        }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Unable to send your message.");
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err.message || "Please try again.");
    }
  }

  return (
    <div className="interest-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <section className="interest-modal" role="dialog" aria-modal="true" aria-labelledby="interest-title" ref={modalRef} tabIndex={-1}>
        <button type="button" className="interest-close" onClick={onClose} aria-label="Close interest form"><X size={24} /></button>
        <span className="interest-kicker">BLUEPRINT WEBSTUDIO PARTNER PROGRAM</span>
        {status === "sent" ? (
          <div className="interest-success">
            <CheckCircle2 size={44} />
            <h2 id="interest-title">Thank you for your interest.</h2>
            <p>Your message has been sent to Blueprint WebStudio. We'll follow up using the contact information you provided.</p>
            <button type="button" className="interest-submit" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <h2 id="interest-title">Interested in this redesign?</h2>
            <p className="interest-intro">Send a quick note and Blueprint WebStudio will follow up about launching, customizing, or taking over the site.</p>
            <form onSubmit={submit} className="interest-form">
              <label>Name <span>*</span><input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
              <label>Email <span>*</span><input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} required maxLength={254} autoComplete="email" /></label>
              <label>Phone<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} maxLength={40} autoComplete="tel" /></label>
              <label>Budget <span>*</span>
                <select value={form.budget} onChange={(e) => update("budget", e.target.value)} required>
                  <option value="">Select a range...</option>
                  <option value="Under $1,000">Under $1,000</option>
                  <option value="$1,000–$2,500">$1,000–$2,500</option>
                  <option value="$2,500–$5,000">$2,500–$5,000</option>
                  <option value="$5,000–$10,000">$5,000–$10,000</option>
                  <option value="$10,000+">$10,000+</option>
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </label>
              <label>Message <small>(optional)</small><textarea value={form.message} onChange={(e) => update("message", e.target.value)} maxLength={3000} rows={4} placeholder="Questions, ideas, or anything you'd like us to know..." /></label>
              <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
              {error && <p className="interest-error" role="alert">{error}</p>}
              <button type="submit" className="interest-submit" disabled={status === "sending"}>{status === "sending" ? "Sending..." : "Send My Interest"}</button>
              <p className="interest-privacy">Your inquiry goes directly to Blueprint WebStudio, not {COMPANY}.</p>
            </form>
          </>
        )}
      </section>
    </div>
  );
}

function ConceptWidget() {
  const [remaining, setRemaining] = useState(getRemaining);
  const [collapsed, setCollapsed] = useState(() => typeof window !== "undefined" && window.innerWidth < 640);
  const [showForm, setShowForm] = useState(false);
  const closeForm = useCallback(() => setShowForm(false), []);

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <aside className={`concept-widget${collapsed ? " is-collapsed" : ""}`} aria-label="Independent website concept preview">
        <div className="concept-widget-head">
          <span>CONCEPT REVIEW · NOT FOR OFFICIAL USE</span>
          <button type="button" onClick={() => setCollapsed((value) => !value)} aria-label={collapsed ? "Expand concept preview" : "Collapse concept preview"} aria-expanded={!collapsed}>
            {collapsed ? <Plus size={20} /> : <Minus size={20} />}
          </button>
        </div>
        {!collapsed && (
          <div className="concept-widget-body">
            <h2>Private Client Preview</h2>
            <span className="concept-widget-label">PARTNER PROGRAM ELIGIBILITY</span>
            <p>Reserved for review</p>
            <div className="concept-widget-timer" aria-label="Time remaining for concept review">
              {remaining.expired ? <strong>Review window ended</strong> : (
                [[remaining.days, "Days"], [remaining.hours, "Hours"], [remaining.minutes, "Minutes"]].map(([value, unit]) => (
                  <span key={unit}><strong>{String(value).padStart(2, "0")}</strong> {unit}</span>
                ))
              )}
            </div>
            <button type="button" className="concept-widget-cta" onClick={() => setShowForm(true)}>I'm Interested <ArrowUpRight size={18} /></button>
            <div className="concept-widget-links">
              {STUDIO_PHONE && <a href={`tel:${STUDIO_PHONE}`}>Call</a>}
              <a href={`mailto:${STUDIO_EMAIL}`}>Email</a>
              <a href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer">Website</a>
            </div>
          </div>
        )}
        <div className="concept-widget-footer">
          <a className="concept-widget-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Visit Blueprint WebStudio"><span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" /><span>Blueprint WebStudio</span></a>
          <span>Independent concept</span>
        </div>
      </aside>
      {showForm && <ConceptInterestModal onClose={closeForm} />}
    </>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 48 48">
        <path d="M24 4v40M4 24h40" />
        <circle cx="24" cy="24" r="10" />
      </svg>
    </span>
  );
}

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky-header">
      <div className="announce">
        <div className="container announce-inner">
          <span>Family owned in Lakewood since {FOUNDED} · NAPA AutoCare Center · AAA Approved</span>
          <a href={`tel:${PHONE}`}><Phone size={13} /> {PHONE_DISPLAY}</a>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#home" onClick={closeMenu} aria-label={`${COMPANY} home`}>
            <BrandMark />
            <span className="brand-text"><strong>Four Seasons</strong><small>AUTOMOTIVE · EST. {FOUNDED}</small></span>
          </a>
          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#seasons" onClick={closeMenu}>Seasonal Care</a>
            <a href="#about" onClick={closeMenu}>Why Us</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a href="#visit" onClick={closeMenu}>Visit</a>
            <a className="links-cta" href="#book" onClick={closeMenu}>Book a Visit</a>
          </nav>
          <a className="nav-cta" href="#book">Book a Visit <ArrowUpRight size={17} /></a>
          <button className="mobile-toggle" type="button" aria-label="Toggle navigation" aria-expanded={menu} onClick={() => setMenu((current) => !current)}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
      </header>
    </div>
  );
}

// -----------------------------------------------------------------------------
// PAGE SECTIONS
// -----------------------------------------------------------------------------

function Hero({ rating }) {
  const years = new Date().getFullYear() - FOUNDED;
  return (
    <section className="hero">
      <div className="hero-grid" aria-hidden="true" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="eyebrow light">LAKEWOOD, COLORADO · SINCE {FOUNDED}</span>
          <h1>Honest car care for <em>every Colorado season.</em></h1>
          <p>
            Family-owned auto repair and tires on South Wadsworth. Straight answers, careful work,
            and a team that has kept Lakewood, Denver and Wheat Ridge drivers on the road for {years} years.
          </p>
          <div className="hero-actions">
            <a className="btn primary" href="#book">Request an Appointment <ArrowUpRight size={19} /></a>
            <a className="btn ghost" href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          </div>
        </div>
        <aside className="hero-card" aria-label="Shop at a glance">
          <a className="hero-rating" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <span className="stars" aria-hidden="true">★★★★★</span>
            <strong>{rating.rating.toFixed(1)}</strong>
            <span>on Google · {rating.userRatingCount.toLocaleString()} reviews</span>
          </a>
          <ul>
            <li><Clock size={18} /><span><b>Hours</b>Mon–Fri, 7:30 am – 5:30 pm</span></li>
            <li><MapPin size={18} /><span><b>{ADDRESS}</b>{CITY}</span></li>
            <li><ShieldCheck size={18} /><span><b>NAPA Peace of Mind Warranty</b>On qualifying repairs</span></li>
          </ul>
        </aside>
      </div>
      <div className="container stats">
        <div><strong>{FOUNDED}</strong><span>Serving Lakewood since</span></div>
        <div><strong>{years}+ yrs</strong><span>Family owned and operated</span></div>
        <div><strong>{rating.rating.toFixed(1)} ★</strong><span>Google rating</span></div>
        <div><strong>NAPA</strong><span>AutoCare Center</span></div>
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">WHAT WE DO</span>
            <h2>Complete repair, <em>under one roof.</em></h2>
          </div>
          <p>From a squeaky brake to a check-engine light that won't go away, the same team diagnoses it, explains it, and fixes it right.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map(({ title, desc, icon: Icon }, index) => (
            <article className="service-card" key={title}>
              <div className="service-top">
                <span className="service-icon"><Icon size={24} strokeWidth={1.6} /></span>
                <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3>{title}</h3>
              <p>{desc}</p>
              <a href="#book" data-service={title}>Book this service <ArrowRight size={15} /></a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Seasons() {
  return (
    <section className="section seasons" id="seasons">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow light">SEASONAL CARE GUIDE</span>
            <h2>Four seasons. <em>One checklist each.</em></h2>
          </div>
          <p>Colorado can deliver all four in a week. Here's what we look at before each one, so the weather never catches your car off guard.</p>
        </div>
        <div className="seasons-grid">
          {SEASONS.map(({ name, icon: Icon, tone, lead, items }) => (
            <article className={`season-card ${tone}`} key={name}>
              <span className="season-icon"><Icon size={26} strokeWidth={1.5} /></span>
              <h3>{name}</h3>
              <p>{lead}</p>
              <ul>
                {items.map((item) => <li key={item}><CheckCircle2 size={15} /> {item}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section process">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">HOW IT WORKS</span>
            <h2>No surprises. <em>Ever.</em></h2>
          </div>
          <p>You'll always know what's wrong, what it costs, and what can wait before anyone picks up a wrench.</p>
        </div>
        <div className="process-grid">
          {PROCESS.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="container about-inner">
        <div className="about-media" aria-hidden="true">
          <div className="about-quads">
            {SEASONS.map(({ name, icon: Icon, tone }) => (
              <span className={`about-quad ${tone}`} key={name}><Icon size={34} strokeWidth={1.4} /><small>{name}</small></span>
            ))}
          </div>
          <div className="about-badge"><strong>{FOUNDED}</strong><span>Family owned since</span></div>
        </div>
        <div>
          <span className="eyebrow">WHY LAKEWOOD TRUSTS US</span>
          <h2>A family shop, <em>not a franchise.</em></h2>
          <p className="about-lead">
            Four Seasons Automotive has been family owned and operated on South Wadsworth since {FOUNDED}.
            The goal hasn't changed: do the job right, treat people fairly, and earn customers for life.
          </p>
          <div className="credentials">
            {CREDENTIALS.map(({ title, desc }) => (
              <div key={title}>
                <BadgeCheck size={22} strokeWidth={1.6} />
                <span><strong>{title}</strong>{desc}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews({ data, rating }) {
  const reviews = data?.reviews?.filter((review) => review.text?.text || review.originalText?.text) || [];
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">CUSTOMER REVIEWS</span>
            <h2>Rated {rating.rating.toFixed(1)} by <em>{rating.userRatingCount.toLocaleString()} neighbors.</em></h2>
          </div>
          <p>Read what Lakewood drivers say about the shop on Google.</p>
        </div>
        <div className="reviews-summary">
          <div>
            <span className="google-wordmark">Google</span>
            <strong>{rating.rating.toFixed(1)} <span className="stars">★★★★★</span></strong>
            <span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
          </div>
          <div className="reviews-actions">
            <a className="btn dark" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Read reviews on Google <ArrowUpRight size={17} /></a>
            <a className="btn outline" href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a review</a>
          </div>
        </div>
        {reviews.length > 0 && (
          <>
            <div className="reviews-grid">
              {reviews.slice(0, 3).map((review, i) => (
                <article className="review-card" key={`${review.publishTime || i}-${i}`}>
                  <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating || 0))))}</div>
                  <p>{review.text?.text || review.originalText?.text}</p>
                  <footer>
                    <strong>{review.authorAttribution?.displayName || "Google reviewer"}</strong>
                    <small>{review.relativePublishTimeDescription}</small>
                  </footer>
                </article>
              ))}
            </div>
            <p className="reviews-attribution">Reviews provided by Google. A limited selection is displayed.</p>
          </>
        )}
      </div>
    </section>
  );
}

function AppointmentForm() {
  const [form, setForm] = useState({ name: "", phone: "", email: "", vehicle: "", service: "", date: "", notes: "", website: "" });
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const pick = (event) => {
      const link = event.target.closest?.("a[data-service]");
      if (link) setForm((prev) => ({ ...prev, service: link.dataset.service }));
    };
    document.addEventListener("click", pick);
    return () => document.removeEventListener("click", pick);
  }, []);

  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function submit(event) {
    event.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    setMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.success) throw new Error(result.message || "Something went wrong.");
      setStatus(result.demo ? "demo" : "sent");
    } catch (err) {
      setStatus("error");
      setMessage(err.message);
    }
  }

  if (status === "sent" || status === "demo") {
    return (
      <div className="book-form book-done">
        <CheckCircle2 size={44} />
        <h3>{status === "demo" ? "This is where the shop gets your request." : "Request received."}</h3>
        <p>
          {status === "demo"
            ? "In this concept preview, requests aren't sent anywhere. On the live site they'd land in the shop's inbox with the customer's vehicle and preferred date."
            : `Thanks, ${form.name.split(" ")[0]}. We'll call you to confirm a time.`}
        </p>
        <button type="button" className="btn dark" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <div className="book-row">
        <label>Name *<input value={form.name} onChange={(e) => update("name", e.target.value)} required maxLength={120} autoComplete="name" /></label>
        <label>Phone *<input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)} required maxLength={40} autoComplete="tel" /></label>
      </div>
      <div className="book-row">
        <label>Email<input type="email" value={form.email} onChange={(e) => update("email", e.target.value)} maxLength={254} autoComplete="email" /></label>
        <label>Vehicle<input value={form.vehicle} onChange={(e) => update("vehicle", e.target.value)} maxLength={120} placeholder="Year, make, model" /></label>
      </div>
      <div className="book-row">
        <label>Service
          <select value={form.service} onChange={(e) => update("service", e.target.value)}>
            <option value="">Choose a service…</option>
            {SERVICE_OPTIONS.map((option) => <option key={option} value={option}>{option}</option>)}
          </select>
        </label>
        <label>Preferred day<input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} /></label>
      </div>
      <label>What's going on?<textarea rows={4} value={form.notes} onChange={(e) => update("notes", e.target.value)} maxLength={3000} placeholder="Noises, warning lights, when it started…" /></label>
      <div className="interest-honeypot" aria-hidden="true"><label>Website<input type="text" tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => update("website", e.target.value)} /></label></div>
      {message && <p className="form-error" role="alert">{message}</p>}
      <button type="submit" className="btn primary full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request Appointment"} <ArrowUpRight size={18} /></button>
      <p className="form-note">We'll call to confirm your time. Need it sooner? Call <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}

function Book() {
  return (
    <section className="section book" id="book">
      <div className="container book-inner">
        <div>
          <span className="eyebrow light">BOOK A VISIT</span>
          <h2>Skip the phone tag. <em>Request a time online.</em></h2>
          <p>Tell us about your car and when you'd like to bring it in. We'll call to confirm.</p>
          <ul className="book-points">
            <li><CheckCircle2 size={18} /> You approve all work before it starts</li>
            <li><CheckCircle2 size={18} /> NAPA nationwide warranty on qualifying repairs</li>
            <li><CheckCircle2 size={18} /> Family owned in Lakewood since {FOUNDED}</li>
          </ul>
        </div>
        <AppointmentForm />
      </div>
    </section>
  );
}

function Visit() {
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="section visit" id="visit">
      <div className="container visit-inner">
        <div className="visit-info">
          <span className="eyebrow">VISIT THE SHOP</span>
          <h2>Find us on <em>South Wadsworth.</em></h2>
          <div className="visit-blocks">
            <div>
              <MapPin size={20} />
              <span><small>ADDRESS</small>{ADDRESS}<br />{CITY}</span>
            </div>
            <div>
              <Phone size={20} />
              <span><small>PHONE</small><a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a></span>
            </div>
            <div>
              <Clock size={20} />
              <span><small>HOURS</small>
                {HOURS.map(([day, hours]) => <span className="hours-row" key={day}><b>{day}</b>{hours}</span>)}
              </span>
            </div>
          </div>
          <a className="btn dark" href={directions} target="_blank" rel="noopener noreferrer">Get Directions <ArrowUpRight size={17} /></a>
          <p className="areas">Serving {AREAS.join(", ")} and the surrounding west metro.</p>
        </div>
        <div className="visit-map">
          <iframe title={`Map to ${COMPANY}`} src={embed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-main">
        <div>
          <a className="brand" href="#home"><BrandMark /><span className="brand-text"><strong>Four Seasons</strong><small>AUTOMOTIVE · EST. {FOUNDED}</small></span></a>
          <p>Family-owned auto repair and tires serving Lakewood, Denver and Wheat Ridge since {FOUNDED}.</p>
          <div className="footer-social">
            {SOCIAL_LINKS.filter(({ url }) => url).map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <b>Services</b>
          {SERVICES.slice(0, 5).map(({ title }) => <a key={title} href="#services">{title}</a>)}
        </div>
        <div>
          <b>Shop</b>
          <a href="#seasons">Seasonal Care Guide</a>
          <a href="#about">Why Four Seasons</a>
          <a href="#reviews">Reviews</a>
          <a href="#book">Book a Visit</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          {EMAIL && <a href={`mailto:${EMAIL}`}>{EMAIL}</a>}
          <span>{ADDRESS}</span>
          <span>{CITY}</span>
          <span>Mon–Fri 7:30 am – 5:30 pm</span>
        </div>
      </div>
      <div className="container footer-bottom">
        <span>© {new Date().getFullYear()} {COMPANY}. Independent design concept, not an official company website.</span>
        <a className="footer-studio-brand" href={STUDIO_WEBSITE} target="_blank" rel="noopener noreferrer" aria-label="Website concept by Blueprint WebStudio">
          <span>Concept redesign by</span>
          <span className="studio-logo-mask" style={{ WebkitMaskImage: `url(${blueprintLogo})`, maskImage: `url(${blueprintLogo})` }} aria-hidden="true" />
          <strong>Blueprint WebStudio</strong>
        </a>
      </div>
    </footer>
  );
}

// -----------------------------------------------------------------------------
// APP — PAGE ORDER
// -----------------------------------------------------------------------------

export default function App() {
  const [reviewData, setReviewData] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/google-reviews", { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((data) => { if (data) setReviewData(data); })
      .catch(() => {});
    return () => controller.abort();
  }, []);

  const rating = {
    rating: typeof reviewData?.rating === "number" ? reviewData.rating : FALLBACK_RATING.rating,
    userRatingCount: typeof reviewData?.userRatingCount === "number" ? reviewData.userRatingCount : FALLBACK_RATING.userRatingCount,
    googleMapsUri: reviewData?.googleMapsUri || null,
  };

  return (
    <>
      <ConceptWidget />
      <SiteHeader />
      <main id="home">
        <Hero rating={rating} />
        <Services />
        <Seasons />
        <Process />
        <About />
        <Reviews data={reviewData} rating={rating} />
        <Book />
        <Visit />
      </main>
      <Footer />
    </>
  );
}
