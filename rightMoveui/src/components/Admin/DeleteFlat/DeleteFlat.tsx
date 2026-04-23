import {  FlatType } from "../../../types/index";

interface ConfirmDeleteProps {
  flat: FlatType;
  onConfirm: () => void;
  onCancel: () => void;
  loading: boolean;
}

export default function ConfirmDelete({
  flat,
  onConfirm,
  onCancel,
  loading,
}: ConfirmDeleteProps) {
  return (
    <div className="flex flex-col gap-5 items-center text-center py-4">
      <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center text-3xl">
        🗑️
      </div>
      <div>
        <h3 className="text-lg font-semibold text-gray-900">Delete Flat?</h3>
        <p className="text-gray-500 text-sm mt-1">
          <strong>{flat.title}</strong> will be permanently removed. This
          action cannot be undone.
        </p>
      </div>
      <div className="flex gap-3 w-full">
        <button
          onClick={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-semibold text-sm hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={loading}
          className="flex-1 py-2.5 rounded-xl bg-red-500 hover:bg-red-600 text-white font-semibold text-sm transition-colors disabled:opacity-60"
        >
          {loading ? "Deleting…" : "Yes, Delete"}
        </button>
      </div>
    </div>
  );
}