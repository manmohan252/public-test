interface ToggleProps {
  checked: boolean;
  onChange: () => void;
  loading: boolean;
}

export default function Toggle({ checked, onChange, loading }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      disabled={loading}
      title={checked ? "Mark Unavailable" : "Mark Available"}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-1 disabled:opacity-50 ${
        checked ? "bg-green-500" : "bg-gray-300"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}