import { FlatType } from "../../../types/index";
import Toggle from "../Toggle/Toggle";
import { getImageUrl } from "../../../services/flatService";
import { useState } from "react";

interface FlatCardProps {
  flat: FlatType;
  onView: () => void;
  onDelete: () => void;
  onToggle: () => void;
  toggleLoading: boolean;
}
const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

export default function FlatCard({ flat, onView, onDelete, onToggle, toggleLoading }: FlatCardProps) {
  const [imgError, setImgError] = useState(false);

  const firstImage = flat.images && flat.images.length > 0
    ? getImageUrl(flat.images[0])
    : null;



  return (
    <div
      className={`group relative bg-white rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden ${
        flat.available
          ? "border-green-100 hover:border-green-300"
          : "border-gray-200 opacity-70"
      }`}
    >
      {/* Status ribbon */}
      <div
        className={`absolute top-3 right-3 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide z-10 ${
          flat.available
            ? "bg-green-100 text-green-700"
            : "bg-gray-100 text-gray-500"
        }`}
      >
        {flat.available ? "● Available" : "○ Unavailable"}
      </div>

      {/* Thumbnail */}
          {/* ── Image ── */}
      <div className="h-36 w-full overflow-hidden rounded-t-2xl">
        {firstImage && !imgError ? (
          <img
            src={firstImage}
            alt={flat.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div
            className={`h-36 flex items-center justify-center text-4xl select-none ${
              flat.available ? "bg-green-50" : "bg-gray-50"
            }`}
          >
            🏢
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-1">
        <h3 className="font-semibold text-gray-900 text-base leading-snug pr-12 line-clamp-1">
          {flat.title}
        </h3>
        <p className="text-xs text-gray-500 flex items-center gap-1">
          <span>📍</span>
          {flat.city}
          {flat.address ? `, ${flat.address}` : ""}
        </p>

        <div className="flex gap-3 text-xs text-gray-500 mt-1">
          <span>🛏 {flat.bedrooms} Bed</span>
          <span>🚿 {flat.bathrooms} Bath</span>
          {flat.areaSqft > 0 && <span>📐 {flat.areaSqft} ft²</span>}
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
          <span className="text-green-700 font-bold text-base">
            £{flat.rentAmount.toLocaleString()}
            <span className="text-gray-400 font-normal text-xs">/mo</span>
          </span>

          <div className="flex items-center gap-2">
            <Toggle
              checked={flat.available}
              onChange={onToggle}
              loading={toggleLoading}
            />
            <button
              onClick={onView}
              className="px-3 py-1.5 rounded-lg bg-green-50 hover:bg-green-100 text-green-700 text-xs font-semibold transition-colors"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              className="px-3 py-1.5 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-colors"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}