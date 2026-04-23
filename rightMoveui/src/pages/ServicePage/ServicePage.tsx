import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const rentalTypes = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 9V7h-2V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2v-2" />
        <path d="M11 11h10" /><path d="M11 15h10" />
      </svg>
    ),
    title: "Student Accommodation",
    desc: "Houses and flats near Cardiff's major universities, primarily in Cathays and Roath with excellent transport links.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
      </svg>
    ),
    title: "Apartments",
    desc: "Modern flats across Cardiff for young professionals seeking convenience, comfort, and city living.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Family Homes",
    desc: "Spacious properties in quieter surrounding areas — perfect for families seeking community and comfort.",
  },
];

const amenities = [
  { label: "Fully equipped kitchen", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg> },
  { label: "Laundry facilities", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="2"/><circle cx="12" cy="13" r="4"/><circle cx="7" cy="6" r="1" fill="currentColor"/></svg> },
  { label: "Internet access", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg> },
  { label: "Garden access (selected)", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22V12"/><path d="M5 3l7 9 7-9"/><path d="M3 17h18"/></svg> },
  { label: "Comfortable living spaces", icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3"/><path d="M2 11v5a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v2H6v-2a2 2 0 0 0-4 0z"/></svg> },
];

const Services: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="font-sans bg-[#FAFAF8] text-[#0F172A] overflow-x-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { font-family: 'DM Sans', sans-serif; box-sizing: border-box; }
        .serif { font-family: 'DM Serif Display', serif; }
        .fade-up {
          opacity: 0;
          transform: translateY(24px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
        .card-hover {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .card-hover:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(37,99,235,0.1);
        }
        .btn-primary {
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(37,99,235,0.4) !important;
          background: linear-gradient(135deg, #1E3A8A, #1D4ED8) !important;
        }
        .btn-secondary {
          transition: background 0.2s, color 0.2s;
        }
        .btn-secondary:hover {
          background: #1E3A8A !important;
          color: #fff !important;
        }

        /* ── Responsive Layout ── */

        /* Two-column content grids → single column on mobile */
        .two-col-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 64px;
          align-items: start;
        }
        @media (max-width: 768px) {
          .two-col-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Cathays highlight box */
        .highlight-box {
          display: grid;
          grid-template-columns: auto 1fr;
          gap: 24px;
          align-items: center;
        }
        @media (max-width: 480px) {
          .highlight-box {
            grid-template-columns: 1fr;
            text-align: center;
          }
          .highlight-box .highlight-icon {
            margin: 0 auto;
          }
        }

        /* Section padding */
        .section-pad {
          padding: 96px 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .section-pad {
            padding: 64px 20px;
          }
        }
        @media (max-width: 480px) {
          .section-pad {
            padding: 48px 16px;
          }
        }

        /* Hero */
        .hero-section {
          padding: 100px 24px 80px;
        }
        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 20px 60px;
          }
        }
        @media (max-width: 480px) {
          .hero-section {
            padding: 72px 16px 48px;
          }
        }

        /* Service strip */
        .service-strip-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 1100px;
          margin: 0 auto;
        }
        @media (max-width: 768px) {
          .service-strip-grid {
            grid-template-columns: 1fr;
            gap: 12px;
          }
        }
        @media (max-width: 480px) {
          .service-strip-grid {
            gap: 10px;
          }
        }

        /* Section header row */
        .section-header {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 48px;
          flex-wrap: wrap;
        }
        @media (max-width: 480px) {
          .section-header {
            margin-bottom: 32px;
          }
        }

        /* CTA buttons */
        .cta-buttons {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }
        .cta-btn-primary, .cta-btn-secondary {
          width: auto;
        }
        @media (max-width: 480px) {
          .cta-buttons {
            flex-direction: column;
            align-items: center;
          }
          .cta-btn-primary, .cta-btn-secondary {
            width: 100%;
            max-width: 320px;
            justify-content: center;
          }
        }

        /* Duration card responsive */
        .duration-number {
          font-size: 56px;
        }
        @media (max-width: 480px) {
          .duration-number {
            font-size: 48px;
          }
        }

        /* Tenancy pill */
        .tenancy-pill {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #EFF6FF;
          border: 1px solid #BFDBFE;
          border-radius: 10px;
          padding: 12px 20px;
        }
        @media (max-width: 480px) {
          .tenancy-pill {
            width: 100%;
            justify-content: center;
          }
        }

        /* Short-term right column order */
        @media (max-width: 768px) {
          .shortterm-right {
            order: -1;
          }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="hero-section"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #2563EB 100%)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Orbs */}
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "rgba(96,165,250,0.12)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, background: "rgba(37,99,235,0.2)", borderRadius: "50%", filter: "blur(50px)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
              borderRadius: 999, padding: "6px 16px", marginBottom: 28,
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Our Services</span>
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2rem, 6vw, 4rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.15,
              margin: "0 0 24px",
            }}
          >
            A home for every need.<br />
            <em style={{ color: "#93C5FD" }}>We'll help you find it.</em>
          </h1>

          <p style={{ fontSize: "clamp(0.95rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 620, margin: 0 }}>
            From long-term rentals to flexible short stays, Convenience Property Letting offers a full range of property services across Cardiff — tailored to your lifestyle, budget, and timeline.
          </p>
        </div>
      </section>

      {/* ── SERVICE OVERVIEW STRIP ── */}
      <section className="bg-gray-100 py-12 px-6">
        <div className="service-strip-grid">
          {[
            { label: "Property Rentals", sub: "12-month tenancies", accent: "#60A5FA" },
            { label: "Short-Term Lets", sub: "1 to 28 days", accent: "#34D399" },
            { label: "Holiday Rentals", sub: "Fully furnished", accent: "#FBBF24" },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white border border-gray-200 rounded-2xl p-6 flex items-center gap-4 shadow-sm hover:shadow-md transition"
            >
              <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: item.accent }} />
              <div>
                <div className="text-base font-semibold text-gray-800">{item.label}</div>
                <div className="text-sm text-gray-500 mt-1">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PROPERTY RENTALS ── */}
      <section className="section-pad">
        <div className="section-header">
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", color: "#2563EB",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
            </svg>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 4 }}>Long-term letting</span>
            <h2 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 400, margin: 0, color: "#0F172A" }}>Property Rentals</h2>
          </div>
        </div>

        <div className="two-col-grid">
          {/* Left — description */}
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", margin: "0 0 20px" }}>
              We are dedicated to helping you find a rental property that perfectly fits your needs and lifestyle. Our team is ready to assist you at every stage — from your first search to signing your lease.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", margin: "0 0 32px" }}>
              We also provide properties in surrounding areas ideal for families and young professionals, ensuring a variety of options to suit different lifestyles and budgets.
            </p>

            <div className="tenancy-pill">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#1E3A8A" }}>Typical tenancy: 12 months</span>
            </div>
          </div>

          {/* Right — rental type cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {rentalTypes.map((r, i) => (
              <div
                key={i}
                className="card-hover"
                style={{
                  background: "#fff",
                  border: "1px solid #E2E8F0",
                  borderRadius: 16,
                  padding: "24px",
                  display: "flex", gap: 16, alignItems: "flex-start",
                }}
              >
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#2563EB",
                }}>
                  {r.icon}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#0F172A", marginBottom: 6 }}>{r.title}</div>
                  <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.6 }}>{r.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cathays/Roath highlight */}
        <div
          className="highlight-box"
          style={{
            marginTop: 56,
            background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
            border: "1px solid #BFDBFE",
            borderRadius: 16,
            padding: "36px 32px",
          }}
        >
          <div
            className="highlight-icon"
            style={{
              width: 56, height: 56, borderRadius: "50%", flexShrink: 0,
              background: "#2563EB",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff",
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 15, fontWeight: 600, color: "#1E3A8A", marginBottom: 6 }}>Cathays & Roath — Cardiff's student heartland</div>
            <p style={{ fontSize: 14, color: "#334155", lineHeight: 1.7, margin: 0 }}>
              Most of our student accommodations are situated in Cathays and Roath, offering excellent transport links and easy access to all of Cardiff's major universities.
            </p>
          </div>
        </div>
      </section>

      {/* ── DIVIDER ── */}
      <div style={{ height: 1, background: "#E2E8F0", maxWidth: 1100, margin: "0 auto" }} />

      {/* ── SHORT-TERM RENTALS ── */}
      <section className="section-pad">
        <div className="section-header">
          <div style={{
            width: 48, height: 48, borderRadius: 12, flexShrink: 0,
            background: "#ECFDF5", display: "flex", alignItems: "center", justifyContent: "center", color: "#059669",
          }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
          </div>
          <div>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#059669", display: "block", marginBottom: 4 }}>Flexible stays</span>
            <h2 className="serif" style={{ fontSize: "clamp(1.6rem, 4vw, 2.6rem)", fontWeight: 400, margin: 0, color: "#0F172A" }}>Short-Term & Holiday Rentals</h2>
          </div>
        </div>

        <div className="two-col-grid">
          {/* Left — amenities */}
          <div>
            <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", margin: "0 0 32px" }}>
              We offer a selection of holiday and short-term rental properties that are fully furnished and ready for immediate booking — perfect for business trips, relocations, or a Cardiff getaway.
            </p>

            <p style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 16 }}>What's included</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {amenities.map((a, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex", alignItems: "center", gap: 14,
                    background: "#fff",
                    border: "1px solid #E2E8F0",
                    borderRadius: 12, padding: "14px 18px",
                  }}
                >
                  <div style={{ color: "#059669", flexShrink: 0 }}>{a.icon}</div>
                  <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{a.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — duration + booking (moves above amenities on mobile) */}
          <div className="shortterm-right" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {/* Duration card */}
            <div style={{
              background: "linear-gradient(135deg, #0F172A, #1E3A8A)",
              borderRadius: 20, padding: "40px 32px",
              color: "#fff", textAlign: "center",
            }}>
              <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Flexible stay duration</div>
              <div className="duration-number" style={{ fontWeight: 800, color: "#fff", lineHeight: 1, marginBottom: 8 }}>1–28</div>
              <div style={{ fontSize: 18, color: "#93C5FD", fontWeight: 500 }}>days</div>
              <div style={{ marginTop: 24, height: 1, background: "rgba(255,255,255,0.1)" }} />
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.7, marginTop: 20, marginBottom: 0 }}>
                Explore availability and pricing through our platform or trusted partners like Booking.com.
              </p>
            </div>

            {/* Booking CTA */}
            <div style={{
              background: "#F0FDF4", border: "1px solid #BBF7D0",
              borderRadius: 16, padding: "24px",
            }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#065F46", marginBottom: 8 }}>Easy to book, simple to stay</div>
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.7, margin: "0 0 16px" }}>
                Browse our short-term listings online or contact our team directly to check availability and pricing for your dates.
              </p>
              <a
                href="/contact"
                className="btn-secondary"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  background: "#059669", color: "#fff",
                  borderRadius: 10, padding: "10px 20px",
                  fontSize: 13, fontWeight: 600, textDecoration: "none",
                }}
              >
                Check availability
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "clamp(60px, 10vw, 100px) 24px",
        textAlign: "center",
        background: "#FAFAF8",
        borderTop: "1px solid #E2E8F0",
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 16 }}>Ready to get started?</span>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            fontWeight: 400, lineHeight: 1.2,
            margin: "0 auto 20px", maxWidth: 600,
          }}
        >
          No hidden fees. No surprises.<br />Just your next home.
        </h2>
        <p style={{ fontSize: "clamp(14px, 2vw, 16px)", color: "#64748B", marginBottom: 36, padding: "0 16px" }}>
          Talk to our team — Mon to Fri, 10:00 AM to 6:00 PM — or browse listings online.
        </p>
        <div className="cta-buttons">
          <a
            href="/"
            className="btn-primary cta-btn-primary"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
              color: "#fff", borderRadius: 14, padding: "16px 36px",
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              boxShadow: "0 8px 32px rgba(37,99,235,0.3)",
            }}
          >
            Browse listings
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
          <a
            href="/contact"
            className="cta-btn-secondary"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              background: "#fff", color: "#1E3A8A",
              border: "1.5px solid #BFDBFE",
              borderRadius: 14, padding: "16px 36px",
              fontSize: 15, fontWeight: 600, textDecoration: "none",
              transition: "border-color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#EFF6FF"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.background = "#fff"; }}
          >
            Contact us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;