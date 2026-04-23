import React from "react";
import Navbar from "../../components/Navbar/Navbar";

const Contact: React.FC = () => {

  return (
    <div className="font-sans bg-[#FAFAF8] text-[#0F172A] overflow-x-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'DM Serif Display', serif; }
        .form-input {
          width: 100%;
          background: #fff;
          border: 1.5px solid #E2E8F0;
          border-radius: 10px;
          padding: 13px 16px;
          font-size: 14px;
          color: #0F172A;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          font-family: 'DM Sans', sans-serif;
        }
        .form-input:focus {
          border-color: #2563EB;
          box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
        }
        .form-input::placeholder { color: #94A3B8; }
        .btn-primary {
          transition: transform 0.2s, box-shadow 0.2s, background 0.2s;
        }
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(37,99,235,0.4) !important;
          background: linear-gradient(135deg, #1E3A8A, #1D4ED8) !important;
        }
        .info-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .info-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 32px rgba(37,99,235,0.08);
        }

        /* ── RESPONSIVE ── */

        /* Mobile: ≤ 640px */
        @media (max-width: 640px) {
          .hero-section { padding: 72px 16px 56px !important; }
          .info-strip   { padding: 28px 16px !important; }
          .info-grid    { grid-template-columns: 1fr !important; gap: 12px !important; }
          .main-section { padding: 40px 16px !important; }
          .main-grid    { grid-template-columns: 1fr !important; gap: 28px !important; }
          .form-card    { padding: 24px 16px !important; border-radius: 16px !important; }
          .form-name-row { grid-template-columns: 1fr !important; gap: 0 !important; }
          .submit-btn   { width: 100% !important; }
          .cta-section  { padding: 48px 16px !important; }
          .cta-btn      { width: 100% !important; justify-content: center !important; box-sizing: border-box !important; }
        }

        /* Tablet: 641px – 1023px */
        @media (min-width: 641px) and (max-width: 1023px) {
          .info-grid    { grid-template-columns: repeat(2, 1fr) !important; }
          .main-section { padding: 60px 24px !important; }
          .main-grid    { grid-template-columns: 1fr !important; gap: 40px !important; }
          .form-card    { padding: 36px 32px !important; }
        }
      `}</style>

      <Navbar />

      {/* ── HERO ── */}
      <section
        className="hero-section"
        style={{
          background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #2563EB 100%)",
          padding: "100px 24px 80px",
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
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Get in touch</span>
          </div>

          <h1
            className="serif"
            style={{
              fontSize: "clamp(2.4rem, 6vw, 4rem)",
              fontWeight: 400,
              color: "#fff",
              lineHeight: 1.15,
              margin: "0 0 24px",
            }}
          >
            We'd love to hear<br />
            <em style={{ color: "#93C5FD" }}>from you.</em>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 560, margin: 0 }}>
            Whether you have questions about our properties, need help finding the right rental, or want to learn more about our services — our team is here to help.
          </p>
        </div>
      </section>

      {/* ── QUICK INFO STRIP ── */}
      <section className="info-strip" style={{ background: "#F1F5F9", padding: "48px 24px" }}>
        <div className="info-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          {[
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.09 15.91l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              ),
              label: "Phone",
              value: "+44 (0) 2920 465300",
              accent: "#2563EB",
              bg: "#EFF6FF",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
                </svg>
              ),
              label: "Email",
              value: "akhan@conveniencepropertylettings.co.uk",
              accent: "#2563EB",
              bg: "#EFF6FF",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              ),
              label: "Office",
              value: "86 City Road, Cardiff, CF24 3DD",
              accent: "#2563EB",
              bg: "#EFF6FF",
            },
            {
              icon: (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                </svg>
              ),
              label: "Hours",
              value: "Mon–Fri 10–6 · Sat 10–3",
              accent: "#059669",
              bg: "#ECFDF5",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="info-card"
              style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                padding: "20px 22px",
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: item.bg,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: item.accent, flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 4 }}>{item.label}</div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#0F172A", lineHeight: 1.5, overflowWrap: "anywhere"}}>{item.value}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── MAIN CONTENT: OFFICE DETAILS + SELLER MOBILE ── */}
      <section className="main-section" style={{ padding: "96px 24px", maxWidth: 720, margin: "0 auto" }}>

        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 12 }}>Our office</span>
        <h2 className="serif" style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 400, margin: "0 0 20px", color: "#0F172A", lineHeight: 1.2 }}>
          Visit us in Cardiff
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", margin: "0 0 36px" }}>
          Our team is based in the heart of Cardiff. Pop in, call, or drop us an email — we're happy to help with any property enquiry.
        </p>

        {/* Address card */}
        <div style={{
          background: "linear-gradient(135deg, #EFF6FF, #DBEAFE)",
          border: "1px solid #BFDBFE",
          borderRadius: 16,
          padding: "28px",
          marginBottom: 24,
        }}>
          <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
            <div style={{
              width: 44, height: 44, borderRadius: "50%",
              background: "#2563EB",
              display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", flexShrink: 0,
            }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#1E3A8A", marginBottom: 6 }}>Convenience Property Letting</div>
              <div style={{ fontSize: 14, color: "#334155", lineHeight: 1.8 }}>
                86 City Road<br />Cardiff, CF24 3DD<br />United Kingdom
              </div>
            </div>
          </div>
        </div>

        {/* Seller Mobile Number card */}
        <div style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          padding: "24px 28px",
          marginBottom: 24,
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}>
          <div style={{
            width: 48, height: 48, borderRadius: "50%",
            background: "#EFF6FF",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#2563EB", flexShrink: 0,
          }}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.09 15.91l.77-.77a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#94A3B8", marginBottom: 4 }}>Seller's Mobile Number</div>
            <a
              href="tel:+442920465300"
              style={{ fontSize: 20, fontWeight: 600, color: "#1E3A8A", textDecoration: "none", letterSpacing: "0.01em" }}
            >
              +44 (0) 2920 465300
            </a>
          </div>
        </div>

        {/* Business hours */}
        <div style={{
          background: "#fff",
          border: "1px solid #E2E8F0",
          borderRadius: 16,
          padding: "24px 28px",
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#94A3B8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 18 }}>Business Hours</div>
          {[
            { day: "Monday – Friday", hours: "10:00 AM – 6:00 PM", open: true },
            { day: "Saturday", hours: "10:00 AM – 3:00 PM", open: true },
            { day: "Sunday", hours: "Closed", open: false },
          ].map((row, i) => (
            <div
              key={i}
              style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0",
                borderBottom: i < 2 ? "1px solid #F1F5F9" : "none",
              }}
            >
              <span style={{ fontSize: 14, color: "#334155", fontWeight: 500 }}>{row.day}</span>
              <span style={{
                fontSize: 13, fontWeight: 600,
                color: row.open ? "#059669" : "#94A3B8",
                background: row.open ? "#ECFDF5" : "#F8FAFC",
                border: `1px solid ${row.open ? "#BBF7D0" : "#E2E8F0"}`,
                borderRadius: 999, padding: "3px 12px",
              }}>
                {row.hours}
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* ── CTA FOOTER STRIP ── */}
      <section
        className="cta-section"
        style={{
          padding: "80px 24px",
          textAlign: "center",
          background: "#FAFAF8",
          borderTop: "1px solid #E2E8F0",
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 16 }}>Ready to find your next home?</span>
        <h2
          className="serif"
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: 400, lineHeight: 1.2,
            margin: "0 auto 20px", maxWidth: 560,
          }}
        >
          Browse our available<br />properties today.
        </h2>
        <p style={{ fontSize: 16, color: "#64748B", marginBottom: 36 }}>
          Over 100 properties across Cardiff — student lets, apartments, and family homes.
        </p>
        <a
          href="/"
          className="btn-primary cta-btn"
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
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
      </section>
    </div>
  );
};

export default Contact;