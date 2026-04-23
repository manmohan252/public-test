import { useEffect, useState } from "react";
import { useKeenSlider } from "keen-slider/react";
import type { KeenSliderPlugin } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import HeroSection from "../../components/HeroSection/HeroSection";
import FilterBar from "../../components/FilterBar/FilterBar";
import ImageCard from "../../components/ImageCard/ImageCard";
import FeatureBox from "../../components/FeatureBox/FeatureBox";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import { featuresData } from "../../data/homeData";
import { getAvailableFlats } from "../../services/flatService";
import type { FlatType } from "../../types";
import type { FilterState } from "../../components/FilterBar/FilterBar";

// ── Auto-play Plugin ──────────────────────────────────────────────────────────
const AutoPlay = (interval: number): KeenSliderPlugin => (slider) => {
  let timer: ReturnType<typeof setInterval>;
  const start = () => { timer = setInterval(() => slider.next(), interval); };
  const stop  = () => clearInterval(timer);
  slider.on("created",        start);
  slider.on("dragStarted",    stop);
  slider.on("animationEnded", start);
  slider.on("updated",        start);
  slider.on("destroyed",      stop);
};

// ── Skeleton Card ─────────────────────────────────────────────────────────────
const SkeletonCard = () => (
  <div className="animate-pulse bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-100">
    <div className="w-full h-[200px] bg-gradient-to-r from-slate-100 via-slate-200 to-slate-100 bg-[length:200%_100%]" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-slate-200 rounded-full w-3/4" />
      <div className="h-3 bg-slate-100 rounded-full w-full" />
      <div className="h-3 bg-slate-100 rounded-full w-2/3" />
      <div className="flex gap-2 pt-1">
        <div className="h-6 w-16 bg-slate-100 rounded-full" />
        <div className="h-6 w-16 bg-slate-100 rounded-full" />
      </div>
      <div className="h-9 bg-slate-100 rounded-xl mt-1" />
    </div>
  </div>
);

// ── Arrow Button ──────────────────────────────────────────────────────────────
type ArrowProps = {
  direction: "left" | "right";
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
};

const Arrow = ({ direction, onClick, disabled }: ArrowProps) => (
  <button
    onClick={onClick}
    disabled={disabled}
    aria-label={direction === "left" ? "Previous slide" : "Next slide"}
    className={`
      absolute top-[95px] z-10 -translate-y-1/2
      ${direction === "left" ? "-left-5 md:-left-6" : "-right-5 md:-right-6"}
      w-10 h-10 md:w-11 md:h-11
      rounded-full bg-white shadow-md border border-slate-200
      flex items-center justify-center text-slate-500
      hover:text-slate-900 hover:shadow-lg hover:border-blue-400 hover:scale-105
      active:scale-95
      transition-all duration-200
      disabled:opacity-0 disabled:pointer-events-none
    `}
  >
    {direction === "left" ? (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    ) : (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    )}
  </button>
);

// ── Dot Indicators ────────────────────────────────────────────────────────────
type DotsProps = {
  count: number;
  current: number;
  onDotClick: (idx: number) => void;
};

const Dots = ({ count, current, onDotClick }: DotsProps) => (
  <div className="flex justify-center items-center gap-2 mt-6" role="tablist" aria-label="Slider navigation">
    {Array.from({ length: count }).map((_, idx) => (
      <button
        key={idx}
        role="tab"
        aria-selected={current === idx}
        aria-label={`Go to slide ${idx + 1}`}
        onClick={() => onDotClick(idx)}
        className={`rounded-full transition-all duration-300 ${
          current === idx
            ? "bg-blue-600 w-6 h-2.5"
            : "bg-slate-200 w-2.5 h-2.5 hover:bg-slate-400"
        }`}
      />
    ))}
  </div>
);

// ── Section Header ────────────────────────────────────────────────────────────
type SectionHeaderProps = {
  count: number;
  loading: boolean;
  error: string | null;
  perView: number;
  showAll: boolean;
  onToggleShowAll: () => void;
};

const SectionHeader = ({ count, loading, error, perView, showAll, onToggleShowAll }: SectionHeaderProps) => (
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
        Available Listings
      </h2>
      {!loading && !error && (
        <p className="text-sm text-slate-500 mt-1">
          {count} {count === 1 ? "property" : "properties"} found
        </p>
      )}fla
    </div>

    <div className="flex flex-wrap items-center gap-3">
      {/* See All / Show Less toggle */}
      {!loading && !error && count > perView && (
        <button
          onClick={onToggleShowAll}
          className="
            inline-flex items-center gap-1.5 text-sm font-semibold
            text-blue-600 border border-blue-300 rounded-xl px-4 py-2
            hover:bg-blue-50 hover:border-blue-500
            active:scale-95
            transition-all duration-200
          "
        >
          {showAll ? "Show Less" : "See All"}
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
            className={`transition-transform duration-300 ${showAll ? "rotate-90" : ""}`}
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Verified badge */}
      <div className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-full px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        Verified listings only
      </div>
    </div>
  </div>
);

// ── Empty State ───────────────────────────────────────────────────────────────
const EmptyState = () => (
  <div className="text-center py-20 flex flex-col items-center gap-4">
    <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center text-4xl">
      🏠
    </div>
    <div>
      <p className="text-slate-900 font-bold text-xl">No properties found</p>
      <p className="text-slate-500 text-sm mt-1">Try adjusting your filters to see more results.</p>
    </div>
  </div>
);

// ── Error State ───────────────────────────────────────────────────────────────
const ErrorState = ({ message }: { message: string }) => (
  <div className="text-center py-20 flex flex-col items-center gap-4">
    <div className="w-20 h-20 rounded-2xl bg-red-50 flex items-center justify-center text-4xl">
      😕
    </div>
    <div>
      <p className="text-slate-900 font-bold text-xl">Something went wrong</p>
      <p className="text-slate-500 text-sm mt-1">{message}</p>
    </div>
    <button
      onClick={() => window.location.reload()}
      className="mt-1 inline-flex items-center gap-2 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:scale-95 px-5 py-2.5 rounded-xl transition-all duration-200"
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 .49-4.95" />
      </svg>
      Try again
    </button>
  </div>
);

// ── Main Component ────────────────────────────────────────────────────────────
const Home = () => {
  const [flats,        setFlats]        = useState<FlatType[]>([]);
  const [filtered,     setFiltered]     = useState<FlatType[]>([]);
  const [loading,      setLoading]      = useState<boolean>(true);
  const [error,        setError]        = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [perView,      setPerView]      = useState(3);
  const [loaded,       setLoaded]       = useState(false);
  const [showAll,      setShowAll]      = useState(false);

  // ── Responsive perView tracker ─────────────────────────────────────────────
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640)       setPerView(1);
      else if (window.innerWidth < 1024) setPerView(2);
      else                               setPerView(3);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      loop: false,
      slides: { perView: 3, spacing: 20 },
      breakpoints: {
        "(max-width: 1024px)": { slides: { perView: 2, spacing: 14 } },
        "(max-width: 640px)":  { slides: { perView: 1, spacing: 10 } },
      },
      created()           { setLoaded(true); },
      slideChanged(slider){ setCurrentSlide(slider.track.details.rel); },
    },
    !showAll && filtered.length > perView ? [AutoPlay(5000)] : []
  );

  // ── Fetch listings ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchFlats = async () => {
      try {
        setLoading(true);
        const data = await getAvailableFlats();
        setFlats(data);
        setFiltered(data);
      } catch (err) {
        console.error("❌ Error fetching flats:", err);
        setError("Failed to load listings. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlats();
  }, []);

  // ── Filter logic ───────────────────────────────────────────────────────────
  const handleFilterChange = (filters: FilterState) => {
    let result = [...flats];
    if (filters.minRent)               result = result.filter(f => f.rentAmount >= Number(filters.minRent));
    if (filters.maxRent)               result = result.filter(f => f.rentAmount <= Number(filters.maxRent));
    if (filters.bedrooms)              result = result.filter(f => f.bedrooms >= Number(filters.bedrooms));
    if (filters.furnishing)            result = result.filter(f => f.furnishingStatus?.toLowerCase().includes(filters.furnishing.toLowerCase()));
    if (filters.petsAllowed === true)  result = result.filter(f => f.petsAllowed);
    if (filters.parkingAvailable === true) result = result.filter(f => f.parkingAvailable);
    setFiltered(result);
    setCurrentSlide(0);
    setShowAll(false);
    instanceRef.current?.moveToIdx(0);
  };

  const handlePrev = (e: React.MouseEvent) => { e.stopPropagation(); instanceRef.current?.prev(); };
  const handleNext = (e: React.MouseEvent) => { e.stopPropagation(); instanceRef.current?.next(); };

  const totalSlides = filtered.length;
  const isStart     = currentSlide === 0;
  const isEnd       = currentSlide >= totalSlides - perView;
  const needsSlider = totalSlides > perView;
  const dotCount    = Math.max(0, totalSlides - perView + 1);

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar />
      <HeroSection />
      <FilterBar onFilterChange={handleFilterChange} />

      {/* ── Available Listings Section ── */}
      <section aria-labelledby="listings-heading" className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10 sm:py-14">

        <SectionHeader
          count={filtered.length}
          loading={loading}
          error={error}
          perView={perView}
          showAll={showAll}
          onToggleShowAll={() => setShowAll(prev => !prev)}
        />

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3].map(i => <SkeletonCard key={i} />)}
          </div>
        )}

        {/* Error */}
        {!loading && error && <ErrorState message={error} />}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && <EmptyState />}

        {/* Cards */}
        {!loading && !error && filtered.length > 0 && (
          showAll ? (
            /* Grid view */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
              {filtered.map(flat => (
                <ImageCard key={flat.id} data={flat} />
              ))}
            </div>
          ) : !needsSlider ? (
            /* Static grid (few cards) */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map(flat => <ImageCard key={flat.id} data={flat} />)}
            </div>
          ) : (
            /* Slider */
            <div className="relative px-5 sm:px-6">
              {loaded && <Arrow direction="left"  onClick={handlePrev} disabled={isStart} />}
              <div className="overflow-hidden">
                <div ref={sliderRef} className="keen-slider">
                  {filtered.map(flat => (
                    <div key={flat.id} className="keen-slider__slide min-w-0">
                      <ImageCard data={flat} />
                    </div>
                  ))}
                </div>
              </div>
              {loaded && <Arrow direction="right" onClick={handleNext} disabled={isEnd} />}
              <Dots count={dotCount} current={currentSlide} onDotClick={(idx) => instanceRef.current?.moveToIdx(idx)} />
            </div>
          )
        )}
      </section>

      {/* ── Divider ── */}
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <hr className="border-slate-200" />
      </div>

      {/* ── Features Section ── */}
      <section aria-labelledby="features-heading" className="bg-white">
        <div className="max-w-screen-xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="mb-8 sm:mb-10">
            <h2 id="features-heading" className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Explore more on Rightmove
            </h2>
            <p className="text-slate-500 text-sm sm:text-base mt-1.5">
              Everything you need in one place.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {featuresData.map(item => (
              <FeatureBox key={item.id} data={item} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;