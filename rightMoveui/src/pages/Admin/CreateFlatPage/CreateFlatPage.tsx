import { useState } from "react";
import FlatFormSection, {
  type FlatFormData,
  type FlatFormErrors,
  type FlatType,
} from "../../../components/Admin/CreateFlatForm/FlatForm";
import ImageUploader from "../../../components/Admin/ImageUpload/ImageUpload";
import { flatApi } from "../../../api/api";

const initialForm: FlatFormData = {
  title: "",
  description: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  rentAmount: "",
  bedrooms: "",
  bathrooms: "",
  areaSqft: "",
  flatType: "",
  furnishingStatus: "",
  petsAllowed: false,
  parkingAvailable: false,
  ownerName: "",
  ownerContactNumber: "",
};

type Step = "details" | "images";

export default function CreateFlatPage() {
  const [form, setForm] = useState<FlatFormData>(initialForm);
  const [errors, setErrors] = useState<FlatFormErrors>({});
  const [step, setStep] = useState<Step>("details");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [flatId, setFlatId] = useState<string | null>(null);
  const [serverError, setServerError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleFlatTypeSelect = (type: FlatType) => {
    setForm((prev) => ({ ...prev, flatType: type }));
    setErrors((prev) => ({ ...prev, flatType: undefined }));
  };

  const handleToggle = (field: "petsAllowed" | "parkingAvailable") => {
    setForm((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = (): boolean => {
    const e: FlatFormErrors = {};

    if (!form.title.trim()) e.title = "Title is required";
    if (!form.description.trim()) e.description = "Description is required";
    if (!form.address.trim()) e.address = "Address is required";
    if (!form.city.trim()) e.city = "City is required";
    if (!form.state.trim()) e.state = "State is required";

    if (form.rentAmount === "" || Number(form.rentAmount) < 0) {
      e.rentAmount = "Valid rent amount is required";
    }

    if (form.bedrooms === "" || Number(form.bedrooms) < 1) {
      e.bedrooms = "At least 1 bedroom required";
    }

    if (!form.flatType) {
      e.flatType = "Flat type is required";
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveFlat = async () => {
    if (!validate()) return;

    setStatus("saving");
    setServerError("");

    const payload = {
      ...form,
      rentAmount: Number(form.rentAmount),
      bedrooms: Number(form.bedrooms),
      bathrooms: form.bathrooms !== "" ? Number(form.bathrooms) : undefined,
      areaSqft: form.areaSqft !== "" ? Number(form.areaSqft) : undefined,
      sellAmount: 0, // temporary backend fix for required sell_amount column
    };

    try {
      const data = await flatApi.create(payload);

      setFlatId(String(data.id || data.id || (data as any)?.data?.id || "unknown"));
      setStatus("saved");
      setStep("images");
    } catch (err: unknown) {
      setStatus("error");
      setServerError(err instanceof Error ? err.message : "Something went wrong");
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setStatus("idle");
    setFlatId(null);
    setServerError("");
    setStep("details");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/60 font-sans">
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-green-100/50 blur-3xl" />
        <div className="absolute top-1/2 -left-24 w-72 h-72 rounded-full bg-emerald-100/40 blur-3xl" />
        <div className="absolute -bottom-24 right-1/3 w-80 h-80 rounded-full bg-green-50/60 blur-3xl" />
      </div>

      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm shadow-green-50/60">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200 flex-shrink-0">
              <svg
                className="w-[18px] h-[18px] text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-gray-900 leading-none">RightMove</p>
              <p className="text-[10px] text-green-600 font-semibold leading-none mt-0.5">
                Admin Console
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-400 font-medium">
            <a href="/admin/manage-flats" className="hover:text-green-600 transition-colors">
              Manage Flats
            </a>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-green-700 font-semibold">Create Flat</span>
          </div>

          <a
            href="/admin/manage-flats"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-green-200 bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 hover:border-green-400 transition-all duration-150"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </a>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-20">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10.5px] font-black uppercase tracking-[2px] text-green-700">
              Admin Panel
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight tracking-tight">
            Create a{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              New Flat
            </span>
          </h1>

          <p className="text-sm text-gray-400 mt-2 font-medium">
            Fill in the details, then upload photos to publish the listing.
          </p>
        </div>

        <div className="flex items-center gap-0 bg-white border border-green-100 rounded-2xl p-1.5 shadow-sm mb-8 w-fit">
          <button
            type="button"
            onClick={() => setStep("details")}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
              ${
                step === "details"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-200"
                  : status === "saved"
                  ? "text-green-600 hover:bg-green-50"
                  : "text-gray-400"
              }`}
          >
            <span
              className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center text-[10px] font-black flex-shrink-0
              ${
                step === "details"
                  ? "border-white/50 bg-white/20"
                  : status === "saved"
                  ? "border-green-500"
                  : "border-current"
              }`}
            >
              {status === "saved" && step !== "details" ? "✓" : "1"}
            </span>
            Flat Details
          </button>

          <div className="w-px h-6 bg-green-100 mx-1" />

          <button
            type="button"
            onClick={() => status === "saved" && setStep("images")}
            disabled={status !== "saved"}
            className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-200
              ${
                step === "images"
                  ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-md shadow-green-200"
                  : status === "saved"
                  ? "text-green-600 hover:bg-green-50 cursor-pointer"
                  : "text-gray-300 cursor-not-allowed"
              }`}
          >
            <span
              className={`w-5 h-5 rounded-full border-[1.5px] flex items-center justify-center text-[10px] font-black flex-shrink-0
              ${step === "images" ? "border-white/50 bg-white/20" : "border-current"}`}
            >
              2
            </span>
            Upload Images
          </button>
        </div>

        {step === "details" && (
          <div className="animate-fade-in">
            <FlatFormSection
              form={form}
              errors={errors}
              onChange={handleChange}
              onFlatTypeSelect={handleFlatTypeSelect}
              onToggle={handleToggle}
            />

            {serverError && (
              <div className="mt-5 flex items-center gap-3 px-4 py-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold">
                <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {serverError}
              </div>
            )}

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-green-100">
              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-semibold hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all duration-150"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                  />
                </svg>
                Reset Form
              </button>

              <button
                type="button"
                onClick={handleSaveFlat}
                disabled={status === "saving"}
                className="flex items-center gap-2.5 px-7 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-black shadow-lg shadow-green-200 hover:shadow-green-300 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
              >
                {status === "saving" ? (
                  <>
                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    Save &amp; Continue
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === "images" && (
          <div className="animate-fade-in">
            {flatId && (
              <div className="flex items-center justify-between gap-4 px-5 py-4 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-sm mb-6 flex-wrap">
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200 flex-shrink-0">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-green-900">Flat saved successfully!</p>
                    <p className="text-xs text-green-700 font-semibold font-mono mt-0.5">
                      Flat ID: <span className="bg-green-200/60 px-1.5 py-0.5 rounded">{flatId}</span>
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setStep("details")}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl border border-green-300 bg-white text-green-700 text-xs font-bold hover:bg-green-50 hover:border-green-400 transition-all"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Edit Details
                </button>
              </div>
            )}

            <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-green-50 bg-gradient-to-r from-green-50/60 to-white flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>

                <div>
                  <p className="text-sm font-bold text-gray-900">Upload Flat Images</p>
                  <p className="text-xs text-gray-400 font-medium">
                    Add photos to make the listing stand out
                  </p>
                </div>

                <div className="ml-auto flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 border border-green-200">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[10px] font-bold text-green-700 uppercase tracking-wide">
                    Step 2
                  </span>
                </div>
              </div>

              <div className="p-6">
                <ImageUploader flatId={flatId} />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6 pt-6 border-t border-green-100">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-semibold hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Details
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-black shadow-md shadow-green-200 hover:shadow-green-300 hover:from-green-600 hover:to-emerald-700 transition-all hover:-translate-y-0.5"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Another Flat
              </button>
            </div>
          </div>
        )}
      </main>

      <div className="fixed bottom-0 left-0 right-0 h-1 bg-green-100 z-40">
        <div
          className="h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ease-out"
          style={{ width: step === "images" ? "100%" : status === "saving" ? "55%" : "30%" }}
        />
      </div>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out; }
      `}</style>
    </div>
  );
}