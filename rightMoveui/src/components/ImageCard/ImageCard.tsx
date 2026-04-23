// src/components/ImageCard/ImageCard.tsx

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { FlatType } from "../../types";
import { getImageUrl } from "../../services/flatService";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80";

type Props = {
  data: FlatType;
};

const Badge = ({
  children,
  color,
}: {
  children: React.ReactNode;
  color: "green" | "blue" | "orange" | "gray";
}) => {
  const colors = {
    green: "bg-green-50 text-green-700 border-green-200",
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    gray: "bg-gray-100 text-gray-500 border-gray-200",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full border ${colors[color]}`}
    >
      {children}
    </span>
  );
};

const ImageCard = ({ data }: Props) => {
  const navigate = useNavigate();
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [expanded, setExpanded] = useState(false); // ✅ NEW

  const imageUrl =
    !imgError && data.images && data.images.length > 0
      ? getImageUrl(data.images[0])
      : FALLBACK_IMAGE;

  const formattedRent = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(data.rentAmount);

  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden border border-[#E2E8F0] cursor-pointer group transition-all duration-250 ${
        hovered ? "shadow-xl -translate-y-1 border-[#BFDBFE]" : "shadow-sm"
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => navigate(`/details/${data.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) =>
        e.key === "Enter" && navigate(`/details/${data.id}`)
      }
    >
      {/* Image */}
      <div className="relative w-full h-[200px] overflow-hidden bg-gray-100">
        <img
          src={imageUrl}
          alt={data.title}
          onError={(e) => {
            setImgError(true);
            (e.target as HTMLImageElement).src = FALLBACK_IMAGE;
          }}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            hovered ? "scale-105" : "scale-100"
          }`}
        />

        {/* Availability Badge */}
        <div className="absolute top-3 left-3 flex gap-1.5 flex-wrap">
          {data.available ? (
            <span className="bg-[#16A34A] text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow">
              Available
            </span>
          ) : (
            <span className="bg-gray-800/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
              Unavailable
            </span>
          )}
        </div>

        {/* Rent Chip */}
        <div className="absolute bottom-0 right-0 bg-[#0F172A]/80 backdrop-blur-sm text-white text-sm font-bold px-3 py-1.5 rounded-tl-xl">
          {formattedRent}
          <span className="text-white/60 text-xs font-normal">/mo</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <h3 className="text-[#0F172A] font-bold text-sm leading-snug line-clamp-1 mb-1 group-hover:text-[#2563EB] transition-colors">
          {data.title || "Untitled Property"}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-1 text-[#64748B] text-xs mb-3">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="truncate">
            {data.address}, {data.city}, {data.state}
          </span>
        </div>

        {/* Stats */}
        <div className="flex items-center gap-3 text-xs text-[#64748B] mb-3 border-y border-[#F1F5F9] py-2.5">
          <span>
            <strong className="text-[#0F172A]">{data.bedrooms}</strong> Bed
          </span>
          <span>|</span>
          <span>
            <strong className="text-[#0F172A]">{data.bathrooms}</strong>  Washroom
          </span>
          <span>|</span>
          <span>
            <strong className="text-[#0F172A]">{data.areaSqft}</strong> sqft
          </span>
        </div>

        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          <Badge color="blue">{data.furnishingStatus || "—"}</Badge>
          {data.petsAllowed && <Badge color="green"> Pets Allowed</Badge>}
          {data.parkingAvailable && <Badge color="blue">Parking</Badge>}
          {data.flatType && <Badge color="orange">{data.flatType}</Badge>}
        </div>

        {/* ✅ Description with Read More */}
  {data.description && (
  <div className="mb-3">
    <div className="relative">
      <div
        className={`text-[11.5px] leading-[1.55] text-slate-500 overflow-hidden transition-all duration-200 ${
          expanded ? "max-h-48 overflow-y-auto" : "max-h-[2.4em]"
        }`}
      >
        {data.description}
      </div>
      {!expanded && data.description.length > 60 && (
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-white to-transparent pointer-events-none" />
      )}
    </div>

    {data.description.length > 60 && (
      <button
        className="mt-1 inline-flex items-center gap-1 text-[11px] font-medium text-blue-500 hover:text-blue-600 transition-colors"
        onClick={(e) => {
          e.stopPropagation();
          setExpanded(!expanded);
        }}
      >
        {expanded ? "Show less" : "Read more"}
        <svg
          className={`w-2.5 h-2.5 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          viewBox="0 0 10 10" fill="none"
        >
          <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    )}
  </div>
)}

        {/* CTA */}
        <button
          className="w-full py-2.5 rounded-xl text-sm font-semibold border-2 border-[#2563EB] text-[#2563EB] hover:bg-[#2563EB] hover:text-white transition-all duration-200 active:scale-95"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/details/${data.id}`);
          }}
        >
          View Details →
        </button>
      </div>
    </div>
  );
};

export default ImageCard;