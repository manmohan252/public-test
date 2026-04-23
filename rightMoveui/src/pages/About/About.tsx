import { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "100+", label: "Happy Tenants" },
  { value: "£0", label: "Hidden Charges" },
  { value: "48hrs", label: "Average Response Time" },
];

const values = [
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: "Verified Listings",
    desc: "Every property is personally inspected by our team. No fake photos, no misleading descriptions.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
    ),
    title: "Full Transparency",
    desc: "All pricing, terms, and fees are disclosed upfront. No surprises on moving day.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "People First",
    desc: "We take time to understand your unique needs, preferences, and budget — then find the right match.",
  },
  {
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Modern & Fast",
    desc: "Streamlined searches, digital processing, and quick communication — renting made effortless.",
  },
];



const propertyTypes = [
  "Student Accommodation",
  "Modern Apartments",
  "Family Homes",
  "Professional Lets",
  "Short-Term Lets",
  "HMO Properties",
  "Studio Flats",
  "City Centre Flats",
  "Suburban Houses",
  "Furnished Rooms",
  "Ensuite Rooms",
  "Pet-Friendly Homes",
];

function useCountUp(target: string, duration: number = 1800, start: boolean = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!start) return;
    const num = parseFloat(target.replace(/[^0-9.]/g, ""));
    if (!num) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (startTime === null) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setVal(Math.floor(progress * num));
      if (progress < 1) requestAnimationFrame(step);
      else setVal(num);
    };
    requestAnimationFrame(step);
  }, [start]);
  return val;
}

function StatCard({ value, label, animate }: { value: string; label: string; animate: boolean }) {
  const num = useCountUp(value, 1600, animate);
  const prefix = value.startsWith("£") ? "£" : "";
  const suffix = value.endsWith("+") ? "+" : value.endsWith("%") ? "%" : value.endsWith("hrs") ? "hrs" : "";
  const isZero = value === "£0";
  const isHrs = value === "48hrs";
  const display = isZero ? "£0" : isHrs ? "48hrs" : `${prefix}${num.toLocaleString("en-GB")}${suffix}`;

  return (
    <div style={{
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      padding: "32px 24px",
      textAlign: "center",
    }}>
      <div style={{ fontSize: 38, fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", fontFamily: "'Clash Display', sans-serif" }}>
        {display}
      </div>
      <div style={{ fontSize: 13, color: "rgba(255,255,255,0.45)", marginTop: 6, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 500 }}>
        {label}
      </div>
    </div>
  );
}

const AboutPage = () => {
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setStatsVisible(true); }, { threshold: 0.3 });
    if (statsRef.current) obs.observe(statsRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#FAFAF8", color: "#0F172A", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet" />
       <Navbar/>
      {/* ── HERO ── */}
      <section style={{
        background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #2563EB 100%)",
        padding: "100px 24px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.04 }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div style={{ position: "absolute", top: -80, right: -80, width: 400, height: 400, background: "rgba(96,165,250,0.12)", borderRadius: "50%", filter: "blur(60px)" }} />
        <div style={{ position: "absolute", bottom: -60, left: -60, width: 300, height: 300, background: "rgba(37,99,235,0.2)", borderRadius: "50%", filter: "blur(50px)" }} />

        <div style={{ maxWidth: 800, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: 999, padding: "6px 16px", marginBottom: 28,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16A34A", display: "inline-block" }} />
            <span style={{ fontSize: 11, fontWeight: 600, color: "rgba(255,255,255,0.8)", letterSpacing: "0.1em", textTransform: "uppercase" }}>About Us</span>
          </div>

          <h1 style={{
            fontFamily: "'DM Serif Display', serif",
            fontSize: "clamp(2.4rem, 6vw, 4rem)",
            fontWeight: 400,
            color: "#fff",
            lineHeight: 1.15,
            margin: "0 0 24px",
          }}>
            Cardiff's trusted letting agency<br />
            <em style={{ color: "#93C5FD" }}>since 2014.</em>
          </h1>

          <p style={{ fontSize: "clamp(1rem, 2vw, 1.15rem)", color: "rgba(255,255,255,0.6)", lineHeight: 1.75, maxWidth: 620, margin: "0 0 16px" }}>
            Convenience Property Letting was built on a simple belief — finding a home should be an exciting experience, not a stressful one. Based on City Road, Cardiff, we've spent over a decade making that belief a reality for hundreds of tenants.
          </p>
          <p style={{ fontSize: 13, color: "rgba(255,255,255,0.4)", margin: 0 }}>
            86 City Road, Cardiff, CF24 3DD &nbsp;·&nbsp; Mon–Fri, 10:00 AM – 6:00 PM
          </p>
        </div>
      </section>

      {/* ── STATS ── */}
  
      {/* ── ORIGIN STORY ── */}
      <section style={{ padding: "96px 24px", maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "80px", alignItems: "center" }}>
        {/* Timeline */}
        <div style={{ position: "relative", order: -1 }}>
          {[
            { year: "2014", event: "Founded on City Road, Cardiff — starting with a small portfolio of local rentals." },
            { year: "2017", event: "Expanded into student accommodation and professional lets across Cardiff." },
            { year: "2020", event: "Embraced digital tools for virtual viewings and remote lease signing." },
           
          ].map((item, i) => (
            <div key={i} style={{ display: "flex", gap: 20, marginBottom: i < 3 ? 32 : 0 }}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: i === 3 ? "#2563EB" : "#EFF6FF",
                  border: `2px solid ${i === 3 ? "#2563EB" : "#BFDBFE"}`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 11, fontWeight: 700,
                  color: i === 3 ? "#fff" : "#1D4ED8",
                  flexShrink: 0,
                }}>
                  {item.year.slice(2)}
                </div>
                {i < 3 && <div style={{ width: 2, flex: 1, background: "#BFDBFE", marginTop: 4 }} />}
              </div>
              <div style={{ paddingTop: 8 }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "#2563EB", marginBottom: 4 }}>{item.year}</div>
                <div style={{ fontSize: 15, color: "#334155", lineHeight: 1.6 }}>{item.event}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Text */}
        <div>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 16 }}>Who we are</span>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.6rem)", fontWeight: 400, lineHeight: 1.2, margin: "0 0 24px", color: "#0F172A" }}>
            A decade of making Cardiff feel like home
          </h2>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", margin: "0 0 20px" }}>
            Established in 2014, Convenience Property Letting has built a strong reputation for delivering reliable, professional, and customer-focused property services in Cardiff and the surrounding areas.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569", margin: "0 0 20px" }}>
            Our mission is simple — to help individuals, students, families, and professionals find a place they can truly call home. With years of experience in the local market, our dedicated team has in-depth knowledge of Cardiff's rental landscape.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.8, color: "#475569" }}>
            We take the time to understand each client's unique needs, preferences, and budget, ensuring we match them with properties that perfectly suit their lifestyle.
          </p>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section style={{ background: "#F1F5F9", padding: "96px 24px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 12 }}>What we stand for</span>
            <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.8rem, 4vw, 2.4rem)", fontWeight: 400, margin: 0 }}>Our principles</h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
            {values.map((v, i) => (
              <div key={i} style={{
                background: "#fff",
                border: "1px solid #E2E8F0",
                borderRadius: 16,
                padding: "32px 24px",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.1)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 12,
                  background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center",
                  color: "#2563EB", marginBottom: 20,
                }}>
                  {v.icon}
                </div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#0F172A", marginBottom: 10 }}>{v.title}</div>
                <div style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7 }}>{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      
      {/* ── PROPERTY TYPES ── */}
      <section style={{ background: "#0F172A", padding: "80px 24px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", textAlign: "center", marginBottom: 40 }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#60A5FA", display: "block", marginBottom: 12 }}>What we offer</span>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)", fontWeight: 400, color: "#fff", margin: 0 }}>Properties for every lifestyle</h2>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 800, margin: "0 auto" }}>
          {propertyTypes.map((type, i) => (
            <div key={i} style={{
              padding: "8px 20px",
              borderRadius: 999,
              background: i < 4 ? "rgba(37,99,235,0.3)" : "rgba(255,255,255,0.05)",
              border: `1px solid ${i < 4 ? "rgba(96,165,250,0.4)" : "rgba(255,255,255,0.08)"}`,
              fontSize: 13, fontWeight: 500,
              color: i < 4 ? "#93C5FD" : "rgba(255,255,255,0.5)",
            }}>
              {type}
            </div>
          ))}
        </div>
      </section>

      {/* ── ACCREDITATIONS ── */}
      <section style={{ background: "#F8FAFC", padding: "64px 24px", borderTop: "1px solid #E2E8F0", borderBottom: "1px solid #E2E8F0" }}>
        <div style={{ maxWidth: 960, margin: "0 auto", textAlign: "center" }}>
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 16 }}>Regulated & trusted</span>
          <h2 style={{ fontFamily: "'DM Serif Display', serif", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, margin: "0 0 32px", color: "#0F172A" }}>
            Your confidence matters to us
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20, maxWidth: 700, margin: "0 auto" }}>
            {[
              
              { badge: "Property Redress Scheme", desc: "Registered for full accountability and dispute resolution." },
            ].map((item, i) => (
              <div key={i} style={{ background: "#fff", border: "1px solid #E2E8F0", borderRadius: 16, padding: "28px 24px" }}>
                <div style={{
                  display: "inline-block", background: "#EFF6FF", color: "#1D4ED8",
                  fontSize: 12, fontWeight: 700, borderRadius: 8, padding: "6px 14px", marginBottom: 14, letterSpacing: "0.04em",
                }}>
                  {item.badge}
                </div>
                <p style={{ fontSize: 14, color: "#64748B", lineHeight: 1.7, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{
        padding: "100px 24px",
        textAlign: "center",
        background: "#FAFAF8",
      }}>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#2563EB", display: "block", marginBottom: 16 }}>Ready to find your home?</span>
        <h2 style={{
          fontFamily: "'DM Serif Display', serif",
          fontSize: "clamp(2rem, 5vw, 3rem)",
          fontWeight: 400, lineHeight: 1.2,
          margin: "0 auto 20px", maxWidth: 600,
        }}>
          Professional. Transparent.<br />Your next home in Cardiff.
        </h2>
        <p style={{ fontSize: 16, color: "#64748B", marginBottom: 36 }}>
          Browse our verified rentals across Cardiff — student, professional, and family homes available now.
        </p>
        <a href="/" style={{
          display: "inline-flex", alignItems: "center", gap: 10,
          background: "linear-gradient(135deg, #1E3A8A, #2563EB)",
          color: "#fff", borderRadius: 14, padding: "16px 36px",
          fontSize: 15, fontWeight: 600, textDecoration: "none",
          boxShadow: "0 8px 32px rgba(37,99,235,0.3)",
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 40px rgba(37,99,235,0.4)"; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,99,235,0.3)"; }}
        >
          Browse listings
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
        </a>
      </section>
    </div>
  );
};

export default AboutPage;