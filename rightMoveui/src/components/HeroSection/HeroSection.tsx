






import { useState } from "react";
import { useNavigate } from "react-router-dom";

const popularCities = ["Cardiff Bay", "City Centre", "Pontcanna", "Roath", "Canton", "Grangetown"];
const bhkOptions = ["1 BHK", "2 BHK", "3 BHK", "4+ BHK"];
const budgetOptions = ["Under £10K", "£10K–20K", "£20K–40K", "£40K+"];

const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E3A8A] to-[#2563EB] min-h-[520px] flex items-center">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-20 w-[400px] h-[400px] bg-[#2563EB]/30 rounded-full blur-3xl" />
        <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-16 w-full">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
          <span className="text-white/90 text-xs font-semibold tracking-wide uppercase">
            7,200+ Verified Listings
          </span>
        </div>

        {/* Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white leading-tight mb-4 max-w-2xl">
          Find your perfect{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#60A5FA] to-[#A5F3FC]">
            rental home
          </span>
        </h1>
        <p className="text-white/70 text-base md:text-lg mb-8 max-w-xl">
          Discover thousands of verified properties. No brokerage, no hassle.
        </p>

        {/* Search Box */}
        <div className="bg-white rounded-2xl shadow-2xl p-2 flex flex-col sm:flex-row gap-2 max-w-2xl">
          <div className="flex items-center gap-3 flex-1 px-3 py-2">
            <svg className="shrink-0 text-[#64748B]" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              className="flex-1 bg-transparent text-[#0F172A] placeholder:text-[#94A3B8] text-sm outline-none font-medium"
              placeholder="Search by city, area, or locality..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button
            className="bg-[#2563EB] hover:bg-[#1D4ED8] text-white font-semibold text-sm px-6 py-3 rounded-xl transition-colors duration-200 shrink-0 active:scale-95"
            onClick={() => navigate("/")}
          >
            Search
          </button>
        </div>

        {/* Quick Chips */}
        <div className="mt-5 flex flex-wrap gap-3">
          <span className="text-white/50 text-sm font-medium self-center">Popular:</span>
          {popularCities.map((city) => (
            <button
              key={city}
              onClick={() => setSearchQuery(city)}
              className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/90 text-xs font-medium px-3 py-1.5 rounded-full transition-colors duration-150"
            >
              {city}
            </button>
          ))}
        </div>

        {/* BHK + Budget chips */}
        <div className="mt-3 flex flex-wrap gap-2">
          {bhkOptions.map((b) => (
            <button
              key={b}
              className="bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 text-xs font-medium px-3 py-1 rounded-full transition-colors duration-150"
            >
              {b}
            </button>
          ))}
          {budgetOptions.map((b) => (
            <button
              key={b}
              className="bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 text-xs font-medium px-3 py-1 rounded-full transition-colors duration-150"
            >
              {b}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;