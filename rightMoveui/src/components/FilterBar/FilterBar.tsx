import { useState } from "react";

type FilterBarProps = {
  onFilterChange?: (filters: FilterState) => void;
};

export type FilterState = {
  location: string;
  minRent: string;
  maxRent: string;
  bedrooms: string;
  furnishing: string;
  petsAllowed: boolean | null;
  parkingAvailable: boolean | null;
};

const bedroomOptions = ["Any", "1", "2", "3", "4+"];
const furnishingOptions = ["Any", "Furnished", "Semi-Furnished", "Unfurnished"];
const budgetRanges = [
  { label: "Any", min: "", max: "" },
  { label: "Under £10K", min: "", max: "10000" },
  { label: "£10K–20K", min: "10000", max: "20000" },
  { label: "£20K–40K", min: "20000", max: "40000" },
  { label: "£40K+", min: "40000", max: "" },
];

const FilterBar = ({ onFilterChange }: FilterBarProps) => {
  const [filters, setFilters] = useState<FilterState>({
    location: "",
    minRent: "",
    maxRent: "",
    bedrooms: "",
    furnishing: "",
    petsAllowed: null,
    parkingAvailable: null,
  });
  const [activeBudget, setActiveBudget] = useState("Any");
  const [activeBedrooms, setActiveBedrooms] = useState("Any");
  const [activeFurnishing, setActiveFurnishing] = useState("Any");

  const update = (partial: Partial<FilterState>) => {
    const next = { ...filters, ...partial };
    setFilters(next);
    onFilterChange?.(next);
  };

  return (
    <div className="bg-white border-b border-[#E2E8F0] sticky top-16 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3">
        <div className="flex flex-wrap items-center gap-2">

          {/* Budget */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-[#64748B] mr-1 hidden sm:block">Budget</span>
            {budgetRanges.map((b) => (
              <button
                key={b.label}
                onClick={() => {
                  setActiveBudget(b.label);
                  update({ minRent: b.min, maxRent: b.max });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                  activeBudget === b.label
                    ? "bg-[#2563EB] text-white border-[#2563EB]"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-[#E2E8F0] hidden sm:block" />

          {/* Bedrooms */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-[#64748B] mr-1 hidden sm:block">BHK</span>
            {bedroomOptions.map((b) => (
              <button
                key={b}
                onClick={() => {
                  setActiveBedrooms(b);
                  update({ bedrooms: b === "Any" ? "" : b === "4+" ? "4" : b });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                  activeBedrooms === b
                    ? "bg-[#2563EB] text-white border-[#2563EB]"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {b}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-[#E2E8F0] hidden sm:block" />

          {/* Furnishing */}
          <div className="flex items-center gap-1">
            <span className="text-xs font-semibold text-[#64748B] mr-1 hidden sm:block">Furnishing</span>
            {furnishingOptions.map((f) => (
              <button
                key={f}
                onClick={() => {
                  setActiveFurnishing(f);
                  update({ furnishing: f === "Any" ? "" : f });
                }}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
                  activeFurnishing === f
                    ? "bg-[#2563EB] text-white border-[#2563EB]"
                    : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="h-5 w-px bg-[#E2E8F0] hidden sm:block" />

          {/* Pets toggle */}
          <button
            onClick={() => update({ petsAllowed: filters.petsAllowed === true ? null : true })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              filters.petsAllowed === true
                ? "bg-[#16A34A] text-white border-[#16A34A]"
                : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#16A34A] hover:text-[#16A34A]"
            }`}
          >
            🐾 Pets Allowed
          </button>

          {/* Parking toggle */}
          <button
            onClick={() => update({ parkingAvailable: filters.parkingAvailable === true ? null : true })}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 ${
              filters.parkingAvailable === true
                ? "bg-[#2563EB] text-white border-[#2563EB]"
                : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#2563EB] hover:text-[#2563EB]"
            }`}
          >
            🚗 Parking
          </button>

          {/* Reset */}
          <button
            onClick={() => {
              setActiveBudget("Any");
              setActiveBedrooms("Any");
              setActiveFurnishing("Any");
              const reset: FilterState = {
                location: "", minRent: "", maxRent: "",
                bedrooms: "", furnishing: "",
                petsAllowed: null, parkingAvailable: null,
              };
              setFilters(reset);
              onFilterChange?.(reset);
            }}
            className="ml-auto text-xs text-[#64748B] hover:text-[#2563EB] font-medium underline underline-offset-2 transition-colors"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;