import { FlatType } from "../../../types/index";
import FlatCard from "../FlatCard/FlatCard";

interface FlatGridProps {
  flats: FlatType[];
  loading: boolean;
  error: string;
  search: string;
  toggleLoading: Record<number, boolean>;
  onRetry: () => void;
  onView: (flat: FlatType) => void;
  onDelete: (flat: FlatType) => void;
  onToggle: (flat: FlatType) => void;
  onCreateClick: () => void;
}

export default function FlatGrid({
  flats,
  loading,
  error,
  search,
  toggleLoading,
  onRetry,
  onView,
  onDelete,
  onToggle,
  onCreateClick,
}: FlatGridProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin" />
          <span className="text-green-700 font-medium text-sm">Loading flats…</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl px-5 py-4 text-sm font-medium flex items-center gap-3">
        <span className="text-xl">⚠️</span>
        <span>{error}</span>
        <button
          onClick={onRetry}
          className="ml-auto text-red-600 underline hover:no-underline"
        >
          Retry
        </button>
      </div>
    );
  }

  if (flats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center">
        <span className="text-5xl">🏗</span>
        <p className="text-gray-500 font-medium">
          {search ? "No flats match your search." : "No flats found."}
        </p>
        {!search && (
          <button
            onClick={onCreateClick}
            className="mt-2 px-5 py-2 bg-green-600 text-white rounded-xl text-sm font-semibold hover:bg-green-700 transition-colors"
          >
            + Add Your First Flat
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      {flats.map((flat) => (
        <FlatCard
          key={flat.id}
          flat={flat}
          onView={() => onView(flat)}
          onDelete={() => onDelete(flat)}
          onToggle={() => onToggle(flat)}
          toggleLoading={!!toggleLoading[flat.id]}
        />
      ))}
    </div>
  );
}