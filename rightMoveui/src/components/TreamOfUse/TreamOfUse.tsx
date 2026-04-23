import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";

const sections = [
  {
    id: "booking",
    accentText: "text-blue-600",
    accentBorder: "border-blue-200",
    headerBg: "bg-blue-50",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-800",
    iconColor: "text-blue-600",
    barColor: "bg-blue-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    label: "Section 1",
    title: "Property Booking & Reservation",
    intro: "To reserve a property with Convenience Property Letting, the following conditions must be satisfied before any reservation is confirmed.",
    items: [
      { heading: "Holding Deposit", body: "A holding deposit equivalent to one week's rent is required to reserve a property. This deposit demonstrates your intent to proceed and is deducted from your first payment upon tenancy commencement." },
      { heading: "Reservation Conditions", body: "A property cannot be reserved until: (a) a viewing has been completed — either in person or online; and (b) the applicant has formally confirmed their intent to proceed with the tenancy." },
    ],
  },
  {
    id: "deposit",
    accentText: "text-violet-600",
    accentBorder: "border-violet-200",
    headerBg: "bg-violet-50",
    badgeBg: "bg-violet-100",
    badgeText: "text-violet-800",
    iconColor: "text-violet-600",
    barColor: "bg-violet-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/>
      </svg>
    ),
    label: "Section 2",
    title: "Tenancy Deposit",
    intro: "A tenancy deposit is required before any tenancy can begin. The amount is subject to the outcome of your referencing check.",
    items: [
      { heading: "Standard Deposit Amount", body: "The standard tenancy deposit is equivalent to one month's rent plus £100. This deposit is held in accordance with applicable tenancy deposit protection legislation." },
    
      { heading: "Payment Timing", body: "The full deposit must be paid and cleared before the tenancy commencement date. Failure to do so may result in the property being re-listed." },
    ],
  },
  {
    id: "guarantor",
    accentText: "text-emerald-600",
    accentBorder: "border-emerald-200",
    headerBg: "bg-emerald-50",
    badgeBg: "bg-emerald-100",
    badgeText: "text-emerald-800",
    iconColor: "text-emerald-600",
    barColor: "bg-emerald-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: "Section 3",
    title: "Guarantor Requirement",
    intro: "In certain circumstances, a UK-based guarantor is required as a condition of the tenancy.",
    items: [
      { heading: "When a Guarantor is Required", body: "A guarantor must be provided if the applicant is a full-time student, or if the applicant does not meet the standard referencing criteria set by the landlord or letting agent." },
      { heading: "Guarantor Eligibility", body: "The guarantor must be a UK resident and a homeowner with sufficient financial income to cover the rent in the event the tenant defaults. Proof of homeownership and income may be requested." },
    ],
  },
  {
    id: "agreement",
    accentText: "text-amber-600",
    accentBorder: "border-amber-200",
    headerBg: "bg-amber-50",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-800",
    iconColor: "text-amber-600",
    barColor: "bg-amber-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
        <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    label: "Section 4",
    title: "Tenancy Agreement",
    intro: "The tenancy agreement is the legally binding contract between the tenant and the landlord. Please read it carefully before signing.",
    items: [
      { heading: "Legally Binding", body: "Once signed by all parties, the tenancy agreement becomes a legally binding document. Both the tenant and landlord are obligated to fulfil all terms contained within it." },
      { heading: "Standard Duration", body: "Tenancies are typically offered on a 12-month fixed-term basis. Any variation to this duration will be stated explicitly in the agreement." },
      { heading: "Tenant Obligations", body: "All terms set out in the tenancy agreement must be adhered to by the tenant throughout the duration of the tenancy, including those relating to property care, noise, subletting, and conduct." },
    ],
  },
  {
    id: "payments",
    accentText: "text-cyan-600",
    accentBorder: "border-cyan-200",
    headerBg: "bg-cyan-50",
    badgeBg: "bg-cyan-100",
    badgeText: "text-cyan-800",
    iconColor: "text-cyan-600",
    barColor: "bg-cyan-400",
    label: "Section 5",
    title: "Payments & Permitted Charges",
    intro: "The following payments are permitted in connection with your tenancy. No other charges will be levied beyond those listed.",
    items: [
      { heading: "Permitted Payments", body: "Permitted payments include: rent (as agreed in the tenancy agreement); the holding deposit (capped at one week's rent); the security/tenancy deposit; and any charges arising directly from a breach of contract by the tenant." },
      { heading: "Late Payment Interest", body: "If rent remains unpaid for more than 14 days beyond the due date, interest will be charged at 3% above the Bank of England base rate, calculated daily from the date the payment was first due." },
    ],
  },
  {
    id: "legal",
    accentText: "text-red-600",
    accentBorder: "border-red-200",
    headerBg: "bg-red-50",
    badgeBg: "bg-red-100",
    badgeText: "text-red-800",
    iconColor: "text-red-600",
    barColor: "bg-red-400",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
      </svg>
    ),
    label: "Section 6",
    title: "Legal Compliance & Fraud",
    intro: "All applicants and tenants are required to provide accurate and truthful information throughout the application and tenancy process.",
    items: [
      { heading: "Fraud & Misrepresentation", body: "The provision of fraudulent, false, or misleading information at any stage — including during application, referencing, or tenancy — may result in immediate termination of the tenancy agreement and potential legal proceedings." },
      { heading: "Legal Action", body: "Convenience Property Letting reserves the right to pursue legal action against any party found to have provided false information or acted in a manner constituting fraud, in accordance with applicable UK law." },
    ],
  },
];

const Terms: React.FC = () => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActiveId(id);
  };

  return (
    <div className="font-sans bg-slate-50 text-slate-900 overflow-x-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&display=swap"
        rel="stylesheet"
      />
      <style>{`
        * { font-family: 'DM Sans', sans-serif; }
        .serif { font-family: 'DM Serif Display', serif; }
      `}</style>

      <Navbar />

      {/* HERO */}
      <section
        className="relative overflow-hidden px-6 pt-24 pb-20"
        style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 55%, #2563EB 100%)" }}
      >
        <svg className="absolute inset-0 w-full h-full opacity-[0.04]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute -top-20 -right-20 w-96 h-96 rounded-full bg-blue-400 opacity-10 blur-3xl" />
        <div className="absolute -bottom-16 -left-16 w-72 h-72 rounded-full bg-blue-600 opacity-20 blur-3xl" />

        <div className="relative z-10 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-7">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 inline-block" />
            <span className="text-[11px] font-semibold text-white/80 tracking-widest uppercase">Legal</span>
          </div>

          <h1 className="serif text-4xl md:text-5xl lg:text-6xl font-normal text-white leading-tight mb-6">
            Terms &amp; Conditions.<br />
            <em className="text-blue-300">Clear and transparent.</em>
          </h1>

          <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-xl mb-8">
            Please read these terms carefully before proceeding with any application or tenancy. By signing a tenancy agreement with Convenience Property Letting, you agree to be bound by the conditions set out below.
          </p>

          <div className="flex flex-wrap gap-3">
            {["Last updated: 2025", "Applies to all tenancies", "Cardiff, Wales, UK"].map((t, i) => (
              <span key={i} className="bg-white/10 border border-white/15 rounded-full px-3.5 py-1 text-xs font-medium text-white/60">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT */}
      <div className="max-w-6xl mx-auto px-6 py-20 lg:flex lg:gap-12 lg:items-start">

        {/* SIDEBAR */}
        <aside className="hidden lg:block w-56 shrink-0 sticky top-8">
          <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-4">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-slate-400 mb-3 px-2">
              Contents
            </p>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left text-xs font-medium transition-colors mb-0.5
                  ${activeId === s.id
                    ? "bg-blue-50 text-blue-900"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
                  }`}
              >
                <span className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors
                  ${activeId === s.id ? `${s.headerBg} ${s.iconColor}` : "bg-slate-100 text-slate-400"}`}>
                  {/* £ */}
                </span>
                <span className="truncate leading-snug">{s.title.split(" ").slice(0, 2).join(" ")}…</span>
              </button>
            ))}
          </div>

          <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
            <p className="text-sm font-semibold text-blue-900 mb-1.5">Questions?</p>
            <p className="text-xs text-slate-600 leading-relaxed mb-3">
              Our team is available Mon–Fri, 10 AM – 6 PM to help clarify any of these terms.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors"
            >
              Contact us
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
              </svg>
            </a>
          </div>
        </aside>

        {/* SECTIONS */}
        <div className="flex-1 flex flex-col gap-8 min-w-0">
          {sections.map((s) => (
            <div
              key={s.id}
              id={s.id}
              className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-lg transition-shadow duration-200"
            >
              {/* Header */}
              <div className={`${s.headerBg} border-b ${s.accentBorder} px-8 py-6 flex items-start gap-5`}>
                <div className={`w-12 h-12 rounded-xl bg-white border ${s.accentBorder} flex items-center justify-center ${s.iconColor} shrink-0 shadow-sm`}>
                  {s.icon}
                </div>
                <div>
                  <span className={`inline-block ${s.badgeBg} ${s.badgeText} text-[10px] font-bold tracking-widest uppercase rounded-full px-2.5 py-1 mb-2`}>
                    {s.label}
                  </span>
                  <h2 className="serif text-2xl md:text-3xl font-normal text-slate-900 leading-tight">
                    {s.title}
                  </h2>
                </div>
              </div>

              {/* Body */}
              <div className="px-8 py-7">
                <p className="text-sm text-slate-400 leading-relaxed italic mb-6">{s.intro}</p>
                <div className="flex flex-col gap-4">
                  {s.items.map((item, i) => (
                    <div key={i} className="flex gap-4 bg-slate-50 border border-slate-100 rounded-xl p-5">
                      <div className={`w-1 rounded-full ${s.barColor} opacity-50 shrink-0 self-stretch`} />
                      <div>
                        <p className="text-sm font-semibold text-slate-900 mb-1.5">{item.heading}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {/* Acceptance note */}
          <div
            className="rounded-2xl p-8 flex gap-5 items-start"
            style={{ background: "linear-gradient(135deg, #0F172A, #1E3A8A)" }}
          >
            <div className="w-11 h-11 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-blue-300 shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </div>
            <div>
              <p className="text-sm font-semibold text-white mb-2">Acceptance of Terms</p>
              <p className="text-sm text-white/50 leading-relaxed">
                By proceeding with an application or signing a tenancy agreement with Convenience Property Letting, you confirm that you have read, understood, and agree to be bound by these terms and conditions in their entirety. These terms are governed by the laws of England and Wales.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <section className="px-6 py-20 text-center bg-slate-50 border-t border-slate-200">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-blue-600 block mb-4">
          Ready to get started?
        </span>
        <h2 className="serif text-3xl md:text-5xl font-normal leading-tight max-w-lg mx-auto mb-5">
          No hidden fees. No surprises.<br />Just your next home.
        </h2>
        <p className="text-base text-slate-500 mb-9">
          Talk to our team — Mon to Fri, 10:00 AM to 6:00 PM — or browse listings online.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="/"
            className="inline-flex items-center gap-2.5 text-white rounded-2xl px-9 py-4 text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background: "linear-gradient(135deg, #1E3A8A, #2563EB)", boxShadow: "0 8px 32px rgba(37,99,235,0.3)" }}
          >
            Browse listings
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
            </svg>
          </a>
          <a
            href="/contact"
            className="inline-flex items-center gap-2.5 bg-white text-blue-900 border border-blue-200 hover:bg-blue-50 rounded-2xl px-9 py-4 text-sm font-semibold transition-colors"
          >
            Contact us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Terms;