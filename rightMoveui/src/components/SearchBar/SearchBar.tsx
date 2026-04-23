// src/components/SearchBar/SearchBar.tsx

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:8080";

type FlatResult = {
  id: number;
  title: string;
  city: string;
  state: string;
  rentAmount: number;
  bedrooms: number;
};

const SearchBar = () => {
  const [query, setQuery]           = useState("");
  const [results, setResults]       = useState<FlatResult[]>([]);
  const [loading, setLoading]       = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate    = useNavigate();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef  = useRef<HTMLDivElement>(null);

  // ── Close dropdown on outside click ─────────────
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  // ── Debounced search (400ms) ──────────────────────
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);

    const trimmed = query.trim();

    if (!trimmed) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        setLoading(true);
        // Search by city — backend: /api/flats/search?city=...
        const res  = await fetch(
          `${BASE_URL}/api/flats/search?city=${encodeURIComponent(trimmed)}`
        );
        if (!res.ok) throw new Error("Search failed");
        const data: FlatResult[] = await res.json();
        console.log("🔍 Search results:", data);
        setResults(data);
        setShowDropdown(true);
      } catch (err) {
        console.error("❌ Search error:", err);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 400); // 400ms debounce

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query]);

  // ── Manual search button ──────────────────────────
  const handleSearch = async () => {
    const trimmed = query.trim();
    if (!trimmed) return;

    // Throttle: if already loading skip
    if (loading) return;

    try {
      setLoading(true);
      const res  = await fetch(
        `${BASE_URL}/api/flats/search?city=${encodeURIComponent(trimmed)}`
      );
      if (!res.ok) throw new Error("Search failed");
      const data: FlatResult[] = await res.json();
      console.log("🔍 Manual search results:", data);
      setResults(data);
      setShowDropdown(true);
    } catch (err) {
      console.error("❌ Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
    if (e.key === "Escape") setShowDropdown(false);
  };

  const handleSelect = (id: number) => {
    setShowDropdown(false);
    setQuery("");
    navigate(`/details/${id}`);
  };

  return (
    <div ref={wrapperRef} className="relative w-full">

      {/* ── Input Row ── */}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search by city (e.g. Jaipur)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => results.length > 0 && setShowDropdown(true)}
            className="w-full px-4 py-2 pr-10 rounded-lg border border-gray-300
                       outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100
                       transition text-sm"
          />

          {/* Inline spinner */}
          {loading && (
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500
                              rounded-full animate-spin" />
            </div>
          )}

          {/* Clear button */}
          {query && !loading && (
            <button
              onClick={() => { setQuery(""); setResults([]); setShowDropdown(false); }}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          )}
        </div>

        <button
          onClick={handleSearch}
          disabled={loading || !query.trim()}
          className="bg-green-500 hover:bg-green-600 disabled:opacity-50
                     disabled:cursor-not-allowed px-4 py-2 rounded-lg text-white
                     text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>

      {/* ── Dropdown Results ── */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white
                        border border-gray-200 rounded-xl shadow-xl z-50
                        max-h-72 overflow-y-auto">

          {results.length === 0 && !loading && (
            <div className="px-4 py-3 text-sm text-gray-400 text-center">
              No properties found for "{query}"
            </div>
          )}

          {results.map((flat) => (
            <button
              key={flat.id}
              onClick={() => handleSelect(flat.id)}
              className="w-full text-left px-4 py-3 hover:bg-gray-50
                         transition-colors border-b border-gray-50 last:border-0"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {flat.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    📍 {flat.city}, {flat.state}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-bold text-green-600">
                    ₹{flat.rentAmount?.toLocaleString("en-IN")}
                  </p>
                  <p className="text-xs text-gray-400">{flat.bedrooms} BHK</p>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;