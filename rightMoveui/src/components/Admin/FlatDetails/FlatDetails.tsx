import { useEffect, useState } from "react";
import { FlatType } from "../../../types/index";
import FlatForm from "../FlatForm/FlatForm";

interface FlatDetailProps {
  flat: FlatType;
  onSave: (data: FlatType) => void;
  saving: boolean;
}

const statItems = (flat: FlatType) => [
  { icon: "🛏", value: flat.bedrooms, label: "Bedrooms" },
  { icon: "🚿", value: flat.bathrooms, label: "Bathrooms" },
  { icon: "📐", value: `${flat.areaSqft} ft²`, label: "Area" },
  { icon: "🛋", value: flat.furnishingStatus === "furnished" ? "Yes" : "No", label: "Furnished" },
  { icon: "💰", value: `£${flat.rentAmount.toLocaleString()}`, label: "Rent/mo" },
];

export default function FlatDetail({ flat, onSave, saving }: FlatDetailProps) {
  const [images, setImages] = useState<string[]>([]);
  const [imgLoading, setImgLoading] = useState(true);
  const [imgError, setImgError] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setImgLoading(true);
        setImgError(false);
        const res = await fetch(`/api/flats/images/${flat.id}
          `);
        if (!res.ok) throw new Error();
        const data = await res.json();
        // adjust key below if your API uses a different field name
        const imgs: string[] = data.images ?? data.imageUrls ?? data.photos ?? [];
        setImages(imgs);
        setActiveImg(0);
      } catch {
        setImgError(true);
      } finally {
        setImgLoading(false);
      }
    };

    fetchImages();
  }, [flat.id]);

  return (
    <div className="flex flex-col gap-6">

      {/* ── Image Gallery ── */}
      <div className="flex flex-col gap-2">

        {/* Main viewer */}
        <div className="w-full h-56 rounded-2xl overflow-hidden bg-green-50 flex items-center justify-center border border-green-100">
          {imgLoading ? (
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-green-200 border-t-green-500 rounded-full animate-spin" />
              <span className="text-xs text-green-600 font-medium">Loading images…</span>
            </div>
          ) : imgError ? (
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <span className="text-4xl">🖼️</span>
              <span className="text-xs">Could not load images</span>
            </div>
          ) : images.length === 0 ? (
            <div className="flex flex-col items-center gap-1 text-gray-400">
              <span className="text-4xl">🏢</span>
              <span className="text-xs">No images available</span>
            </div>
          ) : (
            <img
              src={images[activeImg]}
              alt={`Flat image ${activeImg + 1}`}
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Thumbnail strip — shown only when multiple images exist */}
        {!imgLoading && !imgError && images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((src, idx) => (
              <button
                key={idx}
                onClick={() => setActiveImg(idx)}
                className={`shrink-0 w-16 h-16 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                  activeImg === idx
                    ? "border-green-500 shadow-md scale-105"
                    : "border-transparent opacity-60 hover:opacity-90 hover:border-green-200"
                }`}
              >
                <img
                  src={src}
                  alt={`Thumb ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Photo count */}
        {!imgLoading && !imgError && images.length > 0 && (
          <p className="text-xs text-gray-400 text-right">
            {activeImg + 1} / {images.length} photo{images.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* ── Stat Strip ── */}
      <div className="grid grid-cols-3 gap-3 text-center">
        {statItems(flat).map(({ icon, value, label }) => (
          <div key={label} className="bg-green-50 rounded-xl p-3">
            <div className="text-xl">{icon}</div>
            <div className="font-bold text-green-800 text-sm">{value}</div>
            <div className="text-[11px] text-gray-400">{label}</div>
          </div>
        ))}
      </div>

      <hr className="border-green-100" />
      <h3 className="font-semibold text-green-800 -mb-2">Update Details</h3>
      <FlatForm flat={flat} onSuccess={onSave} onCancel={() => {}} />
    </div>
  );
}