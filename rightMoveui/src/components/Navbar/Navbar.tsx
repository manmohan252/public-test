
import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

const navItems = [
  { label: "Rent",       path: "/" },
  { label: "Services",   path: "/services" },
  { label: "Terms & Condition",   path: "/terms" },
  { label: "About Us",   path: "/about" },
  { label: "Contact Us", path: "/contact" },
];

const Navbar = () => {
  const [scrolled,   setScrolled]   = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const location  = useLocation();
  const navigate  = useNavigate();

  // ── Scroll shadow ──────────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close drawer on route change ───────────────────────────────────────────
  useEffect(() => { setMobileOpen(false); }, [location.pathname]);

  // ── Close drawer on outside click ─────────────────────────────────────────
  useEffect(() => {
    if (!mobileOpen) return;
    const handler = (e: MouseEvent) => {
      if (drawerRef.current && !drawerRef.current.contains(e.target as Node)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileOpen]);

  // ── Close drawer on Escape key ─────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  // ── Prevent body scroll when drawer is open ────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const isActive = (label: string) => {
    if (label === "Rent" && (location.pathname === "/" || location.pathname.startsWith("/details"))) return true;
    const item = navItems.find(n => n.label === label);
    return item ? location.pathname === item.path : false;
  };

  const handleNav = (path: string) => {
    navigate(path);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        ref={drawerRef}
        role="navigation"
        aria-label="Main navigation"
        className={`w-full sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "shadow-md bg-white/95 backdrop-blur-md"
            : "bg-white border-b border-slate-200"
        }`}
      >
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">

          {/* ── Logo ── */}
          <Link
            to="/"
            aria-label="Go to homepage"
            className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 rounded-md"
          >
            <img
              src={logo}
              alt="Convenience Property Lettings"
              className="h-76 w-auto max-w-[200px] sm:max-w-[260px] object-contain"
            />
          </Link>
                      
          {/* ── Desktop Nav ── */}
          <div className="hidden lg:flex items-center gap-0.5 ml-auto" role="menubar">
            {navItems.map(({ label, path }) => {
              const active = isActive(label);
              return (
                <button
                  key={label}
                  role="menuitem"
                  onClick={() => handleNav(path)}
                  aria-current={active ? "page" : undefined}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? "text-blue-600"
                      : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                  }`}
                >
                  {label}
                  {active && (
                    <span className="absolute bottom-0.5 left-4 right-4 h-0.5 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Right Actions ── */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Hamburger — visible below lg */}
            <button
              className="lg:hidden p-2 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 active:scale-95 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              onClick={() => setMobileOpen(prev => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                {mobileOpen ? (
                  <>
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6"  y1="6" x2="18" y2="18" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="7"  x2="21" y2="7"  />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="17" x2="21" y2="17" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* ── Mobile Drawer ── */}
        <div
          id="mobile-menu"
          aria-hidden={!mobileOpen}
          className={`
            lg:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="border-t border-slate-200 bg-white px-4 pt-3 pb-4 flex flex-col gap-1">
            {navItems.map(({ label, path }) => {
              const active = isActive(label);
              return (
                <button
                  key={label}
                  onClick={() => handleNav(path)}
                  aria-current={active ? "page" : undefined}
                  className={`text-left w-full px-3 py-3 text-sm font-medium rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    active
                      ? "text-blue-600 bg-blue-50"
                      : "text-slate-800 hover:bg-slate-50"
                  }`}
                >
                  <span className="flex items-center justify-between">
                    {label}
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ── Backdrop overlay for mobile drawer ── */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px] lg:hidden transition-opacity duration-300 ${
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};

export default Navbar;
