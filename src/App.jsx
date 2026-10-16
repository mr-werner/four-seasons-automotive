import blueprintLogo from "./assets/blueprint-webstudio-logo.png";
import fsaLogo from "./assets/fsa-logo.png";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Bus,
  CheckCircle2,
  Clock,
  Coffee,
  CreditCard,
  Flower2,
  Leaf,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShieldCheck,
  Snowflake,
  Sofa,
  Sun,
  Wifi,
  X,
} from "lucide-react";
import { FacebookIcon, GoogleIcon, YelpIcon } from "./social-icons.jsx";

// -----------------------------------------------------------------------------
// COMPANY DETAILS AND CONTENT
// Everything below comes from fourseasonsautomotive.com unless noted.
// -----------------------------------------------------------------------------

const COMPANY = "Four Seasons Automotive";
const PHONE = "3039865202";
const PHONE_DISPLAY = "(303) 986-5202";
// Decoded from the Cloudflare-protected address on the current site; confirm before launch.
const EMAIL = "fourseasonsinlakewood@gmail.com";
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
  ["Mon – Fri", "7:30 am – 5:30 pm"],
  ["Saturday", "Closed"],
  ["Sunday", "Closed"],
];

// Photo services from the current homepage tiles.
const FEATURED = [
  { title: "Wheel Alignments", photo: "/photos/alignment.webp", desc: "Camber, caster and toe set to factory spec, so the car tracks straight and tires wear evenly." },
  { title: "Brake Repair", photo: "/photos/brakes.webp", desc: "Inspections, pads, rotors, front and rear disc and drum brakes, parking brake adjustment." },
  { title: "Steering & Suspension", photo: "/photos/suspension.webp", desc: "Shocks, struts, ball joints, tie rods and sway links for a planted, quiet ride." },
  { title: "Climate Control", photo: "/photos/climate.webp", desc: "A/C diagnosis and service for July. Heater and defrost service for January." },
  { title: "Electrical Systems", photo: "/photos/electrical.webp", desc: "Dashboard warning lights, lighting, power windows, locks and sunroofs." },
  { title: "Tire Services", photo: "/photos/tires.webp", desc: "Tire sales, mounting, balancing, rotation and TPMS service." },
];

// Full category list from the current "Auto Repair" page.
const ALL_SERVICES = [
  "Axle, CV Joint & Driveshaft",
  "Belts & Hoses",
  "Brake Repair",
  "Climate Control",
  "Cooling System",
  "Electrical & Electronics",
  "Engine Diagnostics",
  "Four-Wheel Drive",
  "Oil & Filter Change",
  "Preventive Maintenance",
  "Starting, Charging & Batteries",
  "Steering & Suspension",
  "TPMS",
  "Tire Services",
  "Transmission Service",
  "Wheel Alignment",
];

const SEASONS = [
  { name: "Winter", months: "Dec–Feb", icon: Snowflake, tone: "winter", lead: "Cold starts, slick roads.", items: ["Battery load test", "Wipers and washer fluid", "Antifreeze strength", "Tire tread and pressure"] },
  { name: "Spring", months: "Mar–May", icon: Flower2, tone: "spring", lead: "After pothole season.", items: ["Alignment check", "Steering and suspension", "Brake inspection", "Undercarriage look-over"] },
  { name: "Summer", months: "Jun–Aug", icon: Sun, tone: "summer", lead: "Heat and mountain trips.", items: ["A/C performance", "Cooling system and hoses", "Belts and fluids", "Tires before long drives"] },
  { name: "Fall", months: "Sep–Nov", icon: Leaf, tone: "fall", lead: "Before the first snow.", items: ["Heater and defrost", "Lights and electrical", "Battery and charging", "Winter tire planning"] },
];

// Badges shown on the current site (homepage logo row and NAPA pages).
const AWARDS = [
  { src: "/badges/napa-gold.png", alt: "NAPA AutoCare Gold Certified", label: "NAPA AutoCare Gold Certified", round: true },
  { src: "/badges/napa-autocare.png", alt: "NAPA AutoCare Center", label: "NAPA AutoCare Center" },
  { src: "/badges/aaa-approved.png", alt: "AAA Approved Auto Repair", label: "AAA Approved Auto Repair" },
  { src: "/badges/asa.png", alt: "ASA, Automotive Service Association", label: "Automotive Service Association" },
  { src: "/badges/napa-warranty-36.png", alt: "NAPA Peace of Mind 36 month / 36,000 mile nationwide warranty", label: "Peace of Mind Warranty", round: true },
];

// Current promotions from the homepage slider and banner.
const OFFERS = [
  { tag: "New drivers", title: "Free safety inspection", text: "Student drivers with a valid permit or new license get a free safety inspection and vehicle check-up: tires, brakes, battery, fluids, lights and wipers.", fine: "Excludes check-engine-light and in-depth diagnostics. Good through the 2026–27 school year.", img: "/photos/offer-new-drivers.webp" },
  { tag: "Teachers", title: "10% off labor", text: "All teachers receive 10% off labor on any needed service. Thank you for what you do.", fine: "Not combinable with other coupons. Up to $75 off.", img: "/photos/offer-teachers.webp" },
];

// Verbatim from "What Our Customers Say" on the current homepage. Excerpts end where the
// current site cuts them off; replace with full text from the shop's review page.
const TESTIMONIALS = [
  { quote: "They are always so nice and honest. would recommend them for all your car needs.", name: "Kathy Ferriola" },
  { quote: "Excellent service! Professional, knowledgeable…", name: "Damian & Jackie Wicks" },
];

const AMENITIES = [
  { icon: Wifi, label: "Free Wi-Fi" },
  { icon: Coffee, label: "Free coffee" },
  { icon: Sofa, label: "Waiting room" },
  { icon: Bus, label: "Shuttle within 5 miles" },
];

const PAYMENTS = ["Visa", "Mastercard", "American Express", "Discover", "Cash", "Check", "NAPA EasyPay card"];

const AREAS = ["Lakewood", "Denver", "Wheat Ridge"];

const SOCIAL_LINKS = [
  { name: "Facebook", url: "https://www.facebook.com/FourSeasonsAutomotiveLakewoodCO/", icon: FacebookIcon },
  { name: "Google", url: GOOGLE_REVIEWS_URL, icon: GoogleIcon },
  { name: "Yelp", url: "https://www.yelp.com/biz/four-seasons-automotive-lakewood", icon: YelpIcon },
];

const SERVICE_OPTIONS = ["Not sure / diagnosis", ...ALL_SERVICES, "New driver safety inspection"];

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
// SIGNATURE MOTIF: the logo's six-armed snowflake, redrawn as line art
// -----------------------------------------------------------------------------

function Flake({ className = "" }) {
  const arm = "M50 50 L50 6 M50 20 L40 11 M50 20 L60 11 M50 33 L41 25 M50 33 L59 25";
  return (
    <svg className={`flake ${className}`} viewBox="0 0 100 100" aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((deg) => <path key={deg} d={arm} transform={`rotate(${deg} 50 50)`} />)}
    </svg>
  );
}

function SeasonStripe() {
  return (
    <div className="season-stripe" aria-hidden="true">
      {SEASONS.map(({ name, tone }) => <span key={name} className={tone} />)}
    </div>
  );
}

// -----------------------------------------------------------------------------
// HEADER
// -----------------------------------------------------------------------------

function SiteHeader() {
  const [menu, setMenu] = useState(false);
  const closeMenu = () => setMenu(false);

  return (
    <div className="sticky-header">
      <div className="topbar">
        <div className="container topbar-inner">
          <span className="topbar-item"><Clock size={14} /> Mon–Fri 7:30–5:30</span>
          <a className="topbar-item hide-sm" href="#visit"><MapPin size={14} /> {ADDRESS}, Lakewood</a>
          <span className="topbar-social">
            {SOCIAL_LINKS.map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={`${COMPANY} on ${name}`}><Icon size={14} /></a>
            ))}
          </span>
        </div>
      </div>
      <header className="header">
        <div className="container nav">
          <a className="brand" href="#home" onClick={closeMenu} aria-label={`${COMPANY} home`}>
            <img src={fsaLogo} alt={`${COMPANY}, Neighborhood Automotive Experts`} width="356" height="125" />
          </a>
          <nav className={menu ? "links open" : "links"} aria-label="Main navigation">
            <a href="#services" onClick={closeMenu}>Services</a>
            <a href="#offers" onClick={closeMenu}>Offers</a>
            <a href="#seasons" onClick={closeMenu}>Seasonal Care</a>
            <a href="#about" onClick={closeMenu}>Our Shop</a>
            <a href="#reviews" onClick={closeMenu}>Reviews</a>
            <a className="links-cta" href="#book" onClick={closeMenu}>Book a Visit</a>
          </nav>
          <a className="nav-phone" href={`tel:${PHONE}`}><Phone size={17} /><span>{PHONE_DISPLAY}</span></a>
          <a className="nav-cta" href="#book">Book a Visit</a>
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
      <Flake className="hero-flake" />
      <div className="container hero-inner">
        <div className="hero-copy">
          <span className="kicker"><Snowflake size={15} /> Neighborhood automotive experts · Lakewood, CO</span>
          <h1>Here for every season <span>of your life.</span></h1>
          <p>
            Dependable car care since {FOUNDED}. A family-owned NAPA AutoCare Center on South Wadsworth,
            keeping Lakewood, Denver and Wheat Ridge drivers on the road for {years} years.
          </p>
          <div className="hero-actions">
            <a className="btn orange" href="#book">Request an Appointment <ArrowUpRight size={19} /></a>
            <a className="btn line" href={`tel:${PHONE}`}><Phone size={18} /> {PHONE_DISPLAY}</a>
          </div>
          <a className="hero-rating" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">
            <GoogleIcon size={18} />
            <strong>{rating.rating.toFixed(1)}</strong>
            <span className="stars" aria-hidden="true">★★★★★</span>
            <span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
          </a>
        </div>
        <div className="hero-media">
          <figure className="hero-photo">
            <img src="/photos/storefront.webp" alt="The Four Seasons Automotive shop at 1801 S Wadsworth Blvd in Lakewood" width="1234" height="774" />
          </figure>
          <div className="hero-since" aria-label={`Family owned since ${FOUNDED}`}>
            <Flake />
            <small>Family owned</small>
            <strong>{FOUNDED}</strong>
            <small>{years} years</small>
          </div>
          <div className="hero-hours">
            <span><Clock size={16} /> <b>Open Mon–Fri</b> 7:30 am – 5:30 pm</span>
            <span><MapPin size={16} /> {ADDRESS}</span>
          </div>
        </div>
      </div>
      <SeasonStripe />
    </section>
  );
}

function Awards() {
  return (
    <section className="awards" aria-labelledby="awards-title">
      <div className="container awards-inner">
        <div className="awards-head">
          <span className="eyebrow">Credentials</span>
          <h2 id="awards-title">Certified, approved, backed nationwide.</h2>
        </div>
        <ul className="awards-row">
          {AWARDS.map(({ src, alt, label, round }) => (
            <li key={label} className={round ? "round" : ""}>
              <img src={src} alt={alt} loading="lazy" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
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
            <span className="eyebrow">What we fix</span>
            <h2>Complete auto repair, <em>one trusted shop.</em></h2>
          </div>
          <p>Cars, SUVs and medium-duty trucks, most makes and models. Our technicians explain the problem and the fix before any work starts.</p>
        </div>
        <div className="services-grid">
          {FEATURED.map(({ title, photo, desc }, index) => (
            <article className="service-card" key={title}>
              <div className="service-photo">
                <img src={photo} alt="" loading="lazy" width="435" height="374" />
                <span className="service-num">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <div className="service-body">
                <h3>{title}</h3>
                <p>{desc}</p>
                <a href="#book" data-service={title === "Electrical Systems" ? "Electrical & Electronics" : title === "Wheel Alignments" ? "Wheel Alignment" : title}>Book this <ArrowRight size={15} /></a>
              </div>
            </article>
          ))}
        </div>
        <div className="all-services">
          <h3>Everything we service</h3>
          <ul>
            {ALL_SERVICES.map((service) => <li key={service}>{service}</li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Offers() {
  return (
    <section className="section offers" id="offers">
      <Flake className="offers-flake" />
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow light">Current offers</span>
            <h2>A little thank-you <em>from the shop.</em></h2>
          </div>
          <p>Mention the offer when you call or book. Ask about our winter vehicle check-up too: wipers, battery and coolant, before the snow.</p>
        </div>
        <div className="offers-grid">
          {OFFERS.map(({ tag, title, text, fine, img }) => (
            <article className="offer-card" key={title}>
              <img src={img} alt={`${title} flyer`} loading="lazy" width="683" height="1024" />
              <div>
                <span className="offer-tag">{tag}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <small>{fine}</small>
                <a className="btn navy" href="#book" data-service={tag === "New drivers" ? "New driver safety inspection" : ""}>Claim it <ArrowRight size={16} /></a>
              </div>
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
            <span className="eyebrow light">Seasonal care guide</span>
            <h2>Four seasons. <em>Sometimes in one week.</em></h2>
          </div>
          <p>Colorado weather is hard on cars. Here's what we look at before each season so it never catches you off guard.</p>
        </div>
        <div className="seasons-grid">
          {SEASONS.map(({ name, months, icon: Icon, tone, lead, items }) => (
            <article className={`season-card ${tone}`} key={name}>
              <div className="season-top">
                <span className="season-icon"><Icon size={24} strokeWidth={1.6} /></span>
                <span className="season-q">{months}</span>
              </div>
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

function About() {
  const years = new Date().getFullYear() - FOUNDED;
  return (
    <section className="section about" id="about">
      <div className="container about-inner">
        <div className="about-media">
          <img src="/photos/front-desk.webp" alt="The front counter inside Four Seasons Automotive" width="811" height="596" />
          <div className="about-years"><strong>{years}</strong><span>years on<br />South Wadsworth</span></div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">Our shop</span>
          <h2>Family owned and operated <em>since {FOUNDED}.</em></h2>
          <p className="about-lead">
            Four Seasons Automotive has served Lakewood and the surrounding communities for {years} years.
            Our technicians answer your questions, give you the best solution for your vehicle, and use quality parts at fair prices.
            We'd rather earn a customer for life than make one sale.
          </p>
          <ul className="amenities">
            {AMENITIES.map(({ icon: Icon, label }) => <li key={label}><Icon size={19} strokeWidth={1.7} /> {label}</li>)}
          </ul>
          <div className="assurance">
            <div>
              <ShieldCheck size={26} strokeWidth={1.6} />
              <span>
                <strong>NAPA Peace of Mind® Warranty</strong>
                Free on qualifying repairs: 24 months / 24,000 miles, extended to 36 months / 36,000 miles when you pay with a NAPA credit card. Honored at 14,000+ locations nationwide.
              </span>
            </div>
            <div>
              <CreditCard size={26} strokeWidth={1.6} />
              <span>
                <strong>Financing with NAPA EasyPay</strong>
                Special financing on qualifying purchases, subject to credit approval. Ask us for details.
              </span>
            </div>
          </div>
          <p className="payments"><b>We accept</b> {PAYMENTS.join(" · ")}</p>
        </div>
      </div>
    </section>
  );
}

function Reviews({ data, rating }) {
  const live = data?.reviews?.filter((review) => review.text?.text || review.originalText?.text) || [];
  return (
    <section className="section reviews" id="reviews">
      <div className="container">
        <div className="reviews-top">
          <div>
            <span className="eyebrow">Reviews</span>
            <h2>{rating.rating.toFixed(1)} stars from <em>{rating.userRatingCount.toLocaleString()} neighbors.</em></h2>
          </div>
          <div className="reviews-score">
            <GoogleIcon size={26} />
            <div>
              <strong>{rating.rating.toFixed(1)} <span className="stars" aria-hidden="true">★★★★★</span></strong>
              <span>{rating.userRatingCount.toLocaleString()} Google reviews</span>
            </div>
          </div>
        </div>
        <div className="reviews-grid">
          {live.length > 0
            ? live.slice(0, 3).map((review, i) => (
              <figure className="review-card" key={`${review.publishTime || i}-${i}`}>
                <div className="stars" aria-label={`${review.rating} out of 5 stars`}>{"★".repeat(Math.max(0, Math.min(5, Math.round(review.rating || 0))))}</div>
                <blockquote>{review.text?.text || review.originalText?.text}</blockquote>
                <figcaption><strong>{review.authorAttribution?.displayName || "Google reviewer"}</strong><small>Google review · {review.relativePublishTimeDescription}</small></figcaption>
              </figure>
            ))
            : TESTIMONIALS.map(({ quote, name }) => (
              <figure className="review-card" key={name}>
                <div className="stars" aria-label="5 out of 5 stars">★★★★★</div>
                <blockquote>“{quote}”</blockquote>
                <figcaption><strong>{name}</strong><small>Customer review, from the current website</small></figcaption>
              </figure>
            ))}
          <div className="review-card review-cta">
            <Flake />
            <p>Read what Lakewood drivers say, or tell us how we did.</p>
            <a className="btn navy" href={rating.googleMapsUri || GOOGLE_REVIEWS_URL} target="_blank" rel="noopener noreferrer">Read reviews on Google <ArrowUpRight size={17} /></a>
            <a className="text-link" href={GOOGLE_WRITE_REVIEW_URL} target="_blank" rel="noopener noreferrer">Leave a review</a>
          </div>
        </div>
        {live.length > 0 && <p className="reviews-attribution">Reviews provided by Google. A limited selection is displayed.</p>}
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
      if (link && link.dataset.service) setForm((prev) => ({ ...prev, service: link.dataset.service }));
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
        <button type="button" className="btn navy" onClick={() => setStatus("idle")}>Back to the form</button>
      </div>
    );
  }

  return (
    <form className="book-form" onSubmit={submit}>
      <h3>Request an appointment</h3>
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
      <button type="submit" className="btn orange full" disabled={status === "sending"}>{status === "sending" ? "Sending…" : "Request Appointment"} <ArrowUpRight size={18} /></button>
      <p className="form-note">We'll call to confirm your time. Need it sooner? Call <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>.</p>
    </form>
  );
}

function BookVisit() {
  const embed = `https://maps.google.com/maps?q=${encodeURIComponent(MAPS_QUERY)}&z=15&output=embed`;
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(MAPS_QUERY)}`;
  return (
    <section className="section book" id="book">
      <Flake className="book-flake" />
      <div className="container book-inner">
        <div className="visit-info" id="visit">
          <span className="eyebrow light">Book a visit</span>
          <h2>Skip the phone tag. <em>Request a time online.</em></h2>
          <p>Tell us about your car and when you'd like to bring it in. We'll call to confirm, and no work starts until you approve it.</p>
          <dl className="visit-blocks">
            <div>
              <dt><MapPin size={18} /> Address</dt>
              <dd>{ADDRESS}<br />{CITY}<br /><a href={directions} target="_blank" rel="noopener noreferrer">Get directions <ArrowUpRight size={14} /></a></dd>
            </div>
            <div>
              <dt><Phone size={18} /> Call</dt>
              <dd><a className="big-phone" href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a><a href={`mailto:${EMAIL}`}>{EMAIL}</a></dd>
            </div>
            <div>
              <dt><Clock size={18} /> Hours</dt>
              <dd>{HOURS.map(([day, hours]) => <span className="hours-row" key={day}><b>{day}</b>{hours}</span>)}</dd>
            </div>
          </dl>
          <p className="areas">Proudly serving {AREAS.join(", ")} and the surrounding west metro.</p>
        </div>
        <AppointmentForm />
      </div>
      <div className="container">
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
      <SeasonStripe />
      <div className="container footer-main">
        <div className="footer-brand">
          <img src={fsaLogo} alt={COMPANY} width="356" height="125" loading="lazy" />
          <p>Dependable car care since {FOUNDED}. Family-owned auto repair and tires for Lakewood, Denver and Wheat Ridge.</p>
          <div className="footer-social">
            {SOCIAL_LINKS.map(({ name, url, icon: Icon }) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" aria-label={name} title={name}><Icon size={16} /></a>
            ))}
          </div>
        </div>
        <div>
          <b>Services</b>
          {FEATURED.map(({ title }) => <a key={title} href="#services">{title}</a>)}
        </div>
        <div>
          <b>Shop</b>
          <a href="#offers">Current offers</a>
          <a href="#seasons">Seasonal care guide</a>
          <a href="#about">Warranty &amp; financing</a>
          <a href="#reviews">Reviews</a>
          <a href={`mailto:${EMAIL}?subject=Job%20inquiry`}>Careers</a>
        </div>
        <div>
          <b>Contact</b>
          <a href={`tel:${PHONE}`}>{PHONE_DISPLAY}</a>
          <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
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
        <Awards />
        <Services />
        <Offers />
        <Seasons />
        <About />
        <Reviews data={reviewData} rating={rating} />
        <BookVisit />
      </main>
      <Footer />
    </>
  );
}
