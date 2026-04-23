import { Link, useNavigate } from "react-router-dom";


const columns = [
  {
    heading: "Services",
    links: [
      { label: "Property Rentals",      path: "/services" },
      { label: "Short-Term Lets",       path: "/services" },
      { label: "Holiday Rentals",       path: "/services" },
      { label: "Student Accommodation", path: "/services" },
    ],
  },
  {
    heading: "Search",
    links: [
      { label: "Homes for Rent",  path: "/" },
      { label: "Homes for Sale",  path: "/buy" },
      
    ],
  },
  {
    heading: "Locations",
    links: [
      { label: "Cathays",             path: "/" },
      { label: "Roath",               path: "/" },
      { label: "Cardiff City Centre", path: "/" },
      { label: "Canton",              path: "/" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us",           path: "/about" },
      { label: "Services",           path: "/services" },
      // { label: "Policies",           path: "/policies" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Contact Us",         path: "/contact" },
    ],
  },
];

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path:string) => {
  navigate(path);
  window.scrollTo({
    top: 0,
    behavior: "smooth", // optional
  });
};

  return (
    <>
      <footer className="bg-slate-900 text-white">

        {/* ── CTA Band ── */}
        <div
          className="px-5 sm:px-8 py-10 sm:py-14"
          style={{ background: "linear-gradient(135deg, #0F172A 0%, #1E3A8A 60%, #2563EB 100%)" }}
        >
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <p className="text-[11px] font-semibold tracking-widest uppercase text-white/50 mb-2">
                Ready to find your next home?
              </p>
              <h2
                className="text-2xl sm:text-3xl font-normal leading-snug text-white"
                style={{ fontFamily: "'DM Serif Display', serif" }}
              >
                Let&apos;s get you{" "}
                <em className="text-blue-300">moved in.</em>
              </h2>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <button
                onClick={() => handleNavigate("/")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
              >
                Browse listings
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
              <button
                onClick={() => handleNavigate("/contact")}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl px-6 py-3 text-sm font-semibold transition-colors"
              >
                Contact us
              </button>
            </div>
          </div>
        </div>

        {/* ── Main Grid ── */}
        <div className="px-5 sm:px-8 py-12 sm:py-16 bg-slate-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">

            {/* Brand column */}
            <div className="sm:col-span-2 lg:col-span-1">
              
              
               
              <Link to="/" className="inline-block mb-4">
                <span className="text-white font-semibold text-sm leading-tight">
                  Convenience<br />Property Letting
                </span>
              </Link>

              <p className="text-sm text-slate-400 leading-relaxed mb-6 max-w-xs">
                Helping Cardiff residents find quality rental properties — from student lets to family homes.
              </p>

              <div className="space-y-3">
                {/* Phone */}
                <a
                  href="tel:+442920465300"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.35 2 2 0 0 1 3.58 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91A16 16 0 0 0 15.09 15.91l.77-.77a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </span>
                  +44 (0) 2920 465300
                </a>

                {/* Email */}
                <a
                  href="mailto:akhan@conveniencepropertylettings.co.uk"
                  className="flex items-center gap-3 text-sm text-slate-400 hover:text-white transition-colors group"
                >
                  <span className="w-7 h-7 rounded-lg bg-slate-800 group-hover:bg-blue-600 flex items-center justify-center transition-colors shrink-0">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                  <span className="truncate">akhan@convenienceproperty…</span>
                </a>

                {/* Address */}
                <div className="flex items-start gap-3 text-sm text-slate-400">
                  <span className="w-7 h-7 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 mt-0.5">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  <span>86 City Road, Cardiff,<br />CF24 3DD</span>
                </div>
              </div>
            </div>

            {/* Link columns */}
            {columns.map((col) => (
              <div key={col.heading}>
                <h3 className="text-[11px] font-semibold tracking-widest uppercase text-slate-500 mb-4">
                  {col.heading}
                </h3>
                <ul className="space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <button
                        onClick={() => handleNavigate(link.path)}
                        className="text-sm text-slate-400 hover:text-white transition-colors text-left"
                      >
                        {link.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="border-t border-slate-800 px-5 sm:px-8 py-5 bg-slate-900">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
            <p>© {new Date().getFullYear()} Convenience Property Letting. All rights reserved.</p>
            <div className="flex items-center gap-4 flex-wrap justify-center">
              <button onClick={() => handleNavigate("/terms")}    className="hover:text-slate-300 transition-colors">Terms &amp; Conditions</button>
              {/* <button onClick={() => handleNavigate("/policies")} className="hover:text-slate-300 transition-colors">Policies</button> */}
              <button onClick={() => handleNavigate("/contact")}  className="hover:text-slate-300 transition-colors">Contact</button>
            </div>
          </div>
        </div>

      </footer>

     
    </>
  );
};

export default Footer;