// import { useState, useRef } from "react";

// // ── Type ─────────────────────────────────────────────────────────────────────
// export type UpdateFlat = {
//   id: number;
//   title: string;
//   description: string;
//   address: string;
//   city: string;
//   state: string;
//   pincode: string;
//   rentAmount: number;
//   bedrooms: number;
//   bathrooms: number;
//   areaSqft: number;
//   flatType: string;
//   furnishingStatus: string;
//   petsAllowed: boolean;
//   parkingAvailable: boolean;
//   available: boolean;
//   images: string[];
//   ownerName?: string;
//   ownerContact?: string;
//   createdAt: string | null;
//   updatedAt: string | null;
// };

// // ── Constants ────────────────────────────────────────────────────────────────
// const FLAT_TYPES = ["STUDIO", "1BHK", "2BHK", "3BHK", "4BHK", "PENTHOUSE", "VILLA"];
// const FURNISHING_OPTIONS = [
//   { value: "FURNISHED",      label: "Fully Furnished" },
//   { value: "SEMI_FURNISHED", label: "Semi Furnished" },
//   { value: "UNFURNISHED",    label: "Unfurnished" },
// ];

// // ── Props ────────────────────────────────────────────────────────────────────
// interface UpdateFlatFormProps {
//   flat: UpdateFlat;
//   onSuccess?: (updated: UpdateFlat) => void;
//   onCancel?: () => void;
// }

// // ── Component ────────────────────────────────────────────────────────────────
// export default function UpdateFlatForm({ flat, onSuccess, onCancel }: UpdateFlatFormProps) {
//   const [form, setForm] = useState<UpdateFlat>({ ...flat });
//   const [saving, setSaving]       = useState(false);
//   const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
//   const [errorMsg, setErrorMsg]   = useState("");
//   const [newImages, setNewImages] = useState<File[]>([]);
//   const [newPreviews, setNewPreviews] = useState<string[]>([]);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // ── Helpers ─────────────────────────────────────────────────────────────
//   const set = (key: keyof UpdateFlat, value: unknown) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const handleFiles = (files: FileList | null) => {
//     if (!files) return;
//     const arr = Array.from(files);
//     setNewImages((prev) => [...prev, ...arr]);
//     setNewPreviews((prev) => [...prev, ...arr.map((f) => URL.createObjectURL(f))]);
//   };

//   const removeNewImage = (idx: number) => {
//     URL.revokeObjectURL(newPreviews[idx]);
//     setNewImages((prev) => prev.filter((_, i) => i !== idx));
//     setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
//   };

//   // ── Submit ───────────────────────────────────────────────────────────────
//   const handleSubmit = async () => {
//     setSaving(true);
//     setErrorMsg("");
//     setSaveStatus("idle");

//     try {
//       // 1️⃣ PUT flat details (JSON)
//       const payload: Partial<UpdateFlat> = {
//         title:           form.title,
//         description:     form.description,
//         address:         form.address,
//         city:            form.city,
//         state:           form.state,
//         pincode:         form.pincode,
//         rentAmount:      form.rentAmount,
//         bedrooms:        form.bedrooms,
//         bathrooms:       form.bathrooms,
//         areaSqft:        form.areaSqft,
//         flatType:        form.flatType,
//         furnishingStatus: form.furnishingStatus,
//         petsAllowed:     form.petsAllowed,
//         parkingAvailable: form.parkingAvailable,
//         available:       form.available,
//         ownerName:       form.ownerName,
//         ownerContact:    form.ownerContact,
//       };

//       const res = await fetch(`http://localhost:8080/api/flats/${flat.id}`, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) {
//         const err = await res.json().catch(() => null);
//         throw new Error(err?.message || `Error ${res.status}`);
//       }

//       const updated: UpdateFlat = await res.json();

//       // 2️⃣ Upload new images if any
//       if (newImages.length > 0) {
//         await Promise.allSettled(
//           newImages.map((file) => {
//             const fd = new FormData();
//             fd.append("image", file);
//             return fetch(`http://localhost:8080/api/flats/${flat.id}/images`, {
//               method: "POST",
//               body: fd,
//             });
//           })
//         );
//       }

//       setSaveStatus("success");
//       onSuccess?.(updated);
//     } catch (err: unknown) {
//       setSaveStatus("error");
//       setErrorMsg(err instanceof Error ? err.message : "Update failed");
//     } finally {
//       setSaving(false);
//     }
//   };

//   // ── Metadata display ─────────────────────────────────────────────────────
//   const fmtDate = (d: string | null) =>
//     d ? new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }) : "—";

//   // ── UI ───────────────────────────────────────────────────────────────────
//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/50">

//       {/* Background decoration */}
//       <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
//         <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100/60 rounded-full blur-3xl" />
//         <div className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl" />
//       </div>

//       {/* ── Header ── */}
//       <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
//         <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
//           {/* Brand */}
//           <div className="flex items-center gap-3">
//             <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200">
//               <svg className="w-[17px] h-[17px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
//               </svg>
//             </div>
//             <div className="hidden sm:block">
//               <p className="text-xs font-bold text-gray-900 leading-none">RightMove</p>
//               <p className="text-[10px] text-green-600 font-semibold leading-none mt-0.5">Admin · Edit Flat</p>
//             </div>
//           </div>

//           {/* Breadcrumb */}
//           <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 font-medium">
//             <a href="/admin/manage-flats" className="hover:text-green-600 transition-colors">Manage Flats</a>
//             <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/></svg>
//             <span className="text-green-700 font-semibold line-clamp-1 max-w-[180px]">{flat.title}</span>
//           </div>

//           {/* Back */}
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-green-200 bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 hover:border-green-400 transition-all"
//             >
//               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
//               Back
//             </button>
//           )}
//         </div>
//       </header>

//       <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24">

//         {/* ── Page title ── */}
//         <div className="mb-7">
//           <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 mb-3">
//             <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
//             <span className="text-[10.5px] font-black uppercase tracking-[2px] text-green-700">Edit Listing</span>
//           </div>
//           <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
//             Update{" "}
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
//               Flat #{flat.id}
//             </span>
//           </h1>
//           <p className="text-sm text-gray-400 mt-1.5 font-medium">Changes are saved via PUT to <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-600 font-mono">/api/flats/{flat.id}</code></p>

//           {/* Metadata row */}
//           <div className="flex flex-wrap gap-3 mt-3">
//             {[
//               { label: "Created", value: fmtDate(flat.createdAt) },
//               { label: "Updated", value: fmtDate(flat.updatedAt) },
//             ].map((m) => (
//               <div key={m.label} className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
//                 <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
//                 <span className="font-semibold text-gray-500">{m.label}:</span> {m.value}
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── SUCCESS / ERROR banners ── */}
//         {saveStatus === "success" && (
//           <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-green-50 border border-green-300 text-green-800 text-sm font-semibold mb-6 shadow-sm">
//             <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
//               <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//             </div>
//             Flat updated successfully!
//           </div>
//         )}
//         {saveStatus === "error" && (
//           <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold mb-6">
//             <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/></svg>
//             {errorMsg}
//           </div>
//         )}

//         {/* ════════════════════════════════════════════
//             SECTION 1 — Owner & Basic Info
//         ════════════════════════════════════════════ */}
//         <Section icon="👤" title="Owner & Basic Info">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <Field label="Owner Name">
//               <input type="text" value={form.ownerName ?? ""} onChange={(e) => set("ownerName", e.target.value)} placeholder="Full name of the owner" className={inputCls()} />
//             </Field>
//             <Field label="Owner Contact">
//               <input type="tel" value={form.ownerContact ?? ""} onChange={(e) => set("ownerContact", e.target.value)} placeholder="10-digit mobile number" className={inputCls()} />
//             </Field>
//           </div>
//           <Field label="Listing Title" required>
//             <input type="text" value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Bright 2BHK near Metro" className={inputCls()} />
//           </Field>
//           <Field label="Description" required>
//             <textarea rows={3} value={form.description} onChange={(e) => set("description", e.target.value)} placeholder="Describe the flat's highlights..." className={`${inputCls()} resize-none leading-relaxed`} />
//           </Field>
//         </Section>

//         {/* ════════════════════════════════════════════
//             SECTION 2 — Location
//         ════════════════════════════════════════════ */}
//         <Section icon="📍" title="Location">
//           <Field label="Street Address" required>
//             <input type="text" value={form.address} onChange={(e) => set("address", e.target.value)} placeholder="Building name, street, landmark" className={inputCls()} />
//           </Field>
//           <div className="grid grid-cols-3 gap-3">
//             <Field label="City" required>
//               <input type="text" value={form.city} onChange={(e) => set("city", e.target.value)} placeholder="Bangalore" className={inputCls()} />
//             </Field>
//             <Field label="State" required>
//               <input type="text" value={form.state} onChange={(e) => set("state", e.target.value)} placeholder="Karnataka" className={inputCls()} />
//             </Field>
//             <Field label="Pincode">
//               <input type="text" value={form.pincode} onChange={(e) => set("pincode", e.target.value)} placeholder="560001" className={inputCls()} />
//             </Field>
//           </div>
//         </Section>

//         {/* ════════════════════════════════════════════
//             SECTION 3 — Flat Type
//         ════════════════════════════════════════════ */}
//         <Section icon="🏠" title="Flat Type">
//           <div className="flex flex-wrap gap-2.5">
//             {FLAT_TYPES.map((t) => (
//               <button
//                 key={t}
//                 type="button"
//                 onClick={() => set("flatType", t)}
//                 className={`px-4 py-2 rounded-full text-xs font-bold border-[1.5px] transition-all duration-150
//                   ${form.flatType === t
//                     ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent shadow-md shadow-green-200"
//                     : "bg-gray-50 text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50"
//                   }`}
//               >
//                 {t}
//               </button>
//             ))}
//           </div>
//         </Section>

//         {/* ════════════════════════════════════════════
//             SECTION 4 — Pricing & Specs
//         ════════════════════════════════════════════ */}
//         <Section icon="₹" title="Pricing & Specs">
//           <div className="grid grid-cols-2 gap-4">
//             <Field label="Monthly Rent (₹)" required>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">₹</span>
//                 <input type="number" min={0} value={form.rentAmount} onChange={(e) => set("rentAmount", Number(e.target.value))} placeholder="25000" className={`${inputCls()} pl-7`} />
//               </div>
//             </Field>
//             <Field label="Area (sq ft)">
//               <input type="number" min={0} value={form.areaSqft} onChange={(e) => set("areaSqft", Number(e.target.value))} placeholder="950" className={inputCls()} />
//             </Field>
//             <Field label="Bedrooms" required>
//               <input type="number" min={1} value={form.bedrooms} onChange={(e) => set("bedrooms", Number(e.target.value))} className={inputCls()} />
//             </Field>
//             <Field label="Bathrooms">
//               <input type="number" min={0} value={form.bathrooms} onChange={(e) => set("bathrooms", Number(e.target.value))} className={inputCls()} />
//             </Field>
//           </div>
//         </Section>

//         {/* ════════════════════════════════════════════
//             SECTION 5 — Furnishing + Options
//         ════════════════════════════════════════════ */}
//         <Section icon="🛋️" title="Furnishing & Options">
//           <Field label="Furnishing Status">
//             <select value={form.furnishingStatus} onChange={(e) => set("furnishingStatus", e.target.value)}
//               className={`${inputCls()} cursor-pointer`}
//               style={{
//                 backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
//                 backgroundRepeat: "no-repeat",
//                 backgroundPosition: "right 14px center",
//                 paddingRight: "36px",
//                 appearance: "none",
//               }}
//             >
//               <option value="">Select furnishing status</option>
//               {FURNISHING_OPTIONS.map((o) => (
//                 <option key={o.value} value={o.value}>{o.label}</option>
//               ))}
//             </select>
//           </Field>

//           <div className="flex flex-col sm:flex-row gap-3 mt-1">
//             {([
//               { key: "available",        emoji: "✅", label: "Available",        desc: "Flat is listed as available" },
//               { key: "petsAllowed",      emoji: "🐾", label: "Pets Allowed",     desc: "Tenants can bring pets" },
//               { key: "parkingAvailable", emoji: "🚗", label: "Parking",          desc: "Parking spot included" },
//             ] as const).map(({ key, emoji, label, desc }) => (
//               <div
//                 key={key}
//                 onClick={() => set(key, !form[key])}
//                 className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-xl border-[1.5px] cursor-pointer transition-all duration-200 select-none
//                   ${form[key]
//                     ? "bg-green-50 border-green-300 text-green-800 shadow-sm"
//                     : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
//                   }`}
//               >
//                 <span className="text-lg leading-none">{emoji}</span>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs font-bold leading-none">{label}</p>
//                   <p className="text-[10px] text-gray-400 mt-0.5 leading-none hidden sm:block">{desc}</p>
//                 </div>
//                 {/* Toggle track */}
//                 <div className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200 ${form[key] ? "bg-green-500" : "bg-gray-300"}`}>
//                   <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form[key] ? "translate-x-4" : "translate-x-0.5"}`} />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </Section>

//         {/* ════════════════════════════════════════════
//             SECTION 6 — Existing Images
//         ════════════════════════════════════════════ */}
//         {flat.images.length > 0 && (
//           <Section icon="🖼️" title="Current Images">
//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
//               {flat.images.map((src, i) => (
//                 <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-green-100 group">
//                   <img
//                     src={src.startsWith("/") ? `http://localhost:8080${src}` : src}
//                     alt={`flat-image-${i}`}
//                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
//                   />
//                   <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
//                     <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold transition-opacity">{i + 1}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </Section>
//         )}

//         {/* ════════════════════════════════════════════
//             SECTION 7 — Add New Images
//         ════════════════════════════════════════════ */}
//         <Section icon="📸" title="Add New Images">
//           {/* Drop zone */}
//           <div
//             onClick={() => fileInputRef.current?.click()}
//             onDragOver={(e) => e.preventDefault()}
//             onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
//             className="border-2 border-dashed border-green-200 rounded-2xl bg-green-50/60 py-8 px-4 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
//           >
//             <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform shadow-lg shadow-green-200">
//               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             </div>
//             <p className="text-sm font-bold text-green-800">Drop images here or click to browse</p>
//             <p className="text-xs text-green-500 font-medium mt-1">JPG, PNG, WEBP · Multiple allowed</p>
//             <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => handleFiles(e.target.files)} />
//           </div>

//           {/* New image previews */}
//           {newPreviews.length > 0 && (
//             <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
//               {newPreviews.map((src, i) => (
//                 <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-green-300 group">
//                   <img src={src} alt={`new-${i}`} className="w-full h-full object-cover" />
//                   <button
//                     type="button"
//                     onClick={() => removeNewImage(i)}
//                     className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
//                   >
//                     <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
//                   </button>
//                   <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-1.5 px-2">
//                     <p className="text-[9px] text-white font-semibold truncate">{newImages[i]?.name}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}
//         </Section>

//         {/* ── Bottom action bar ── */}
//         <div className="flex items-center justify-between mt-8 pt-6 border-t border-green-100">
//           {onCancel && (
//             <button
//               type="button"
//               onClick={onCancel}
//               className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-semibold hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all"
//             >
//               <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
//               Cancel
//             </button>
//           )}
//           <button
//             type="button"
//             onClick={handleSubmit}
//             disabled={saving}
//             className="ml-auto flex items-center gap-2.5 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-black shadow-lg shadow-green-200 hover:shadow-green-300 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
//           >
//             {saving ? (
//               <>
//                 <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
//                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                 </svg>
//                 Saving...
//               </>
//             ) : (
//               <>
//                 <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
//                 Save Changes
//               </>
//             )}
//           </button>
//         </div>
//       </main>

//       {/* Bottom progress bar */}
//       <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-green-100 z-40">
//         <div className={`h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ${saving ? "w-3/4" : saveStatus === "success" ? "w-full" : "w-0"}`} />
//       </div>
//     </div>
//   );
// }

// // ── Sub-components ──────────────────────────────────────────────────────────

// function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
//   return (
//     <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden mb-4 transition-shadow hover:shadow-md hover:shadow-green-50">
//       <div className="flex items-center gap-2.5 px-6 py-4 border-b border-green-50 bg-gradient-to-r from-green-50/60 to-white">
//         <span className="text-base leading-none">{icon}</span>
//         <span className="text-[10.5px] font-black uppercase tracking-[2px] text-green-700">{title}</span>
//       </div>
//       <div className="px-6 py-5 flex flex-col gap-4">{children}</div>
//     </div>
//   );
// }

// function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
//   return (
//     <div className="flex flex-col gap-1.5">
//       <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
//         {label}{required && <span className="text-green-500 ml-0.5">*</span>}
//       </label>
//       {children}
//     </div>
//   );
// }

// function inputCls() {
//   return "w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/15 hover:border-green-300";

// }



import { useState, useRef } from "react";


// ── Type ─────────────────────────────────────────────────────────────────────
export type UpdateFlat = {
  id: number;
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  rentAmount: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  flatType: string;
  furnishingStatus: string;
  petsAllowed: boolean;
  parkingAvailable: boolean;
  available: boolean;
  images: string[];
  ownerName?: string;
  ownerContact?: string;
  createdAt: string | null;
  updatedAt: string | null;
};

// ── Constants ────────────────────────────────────────────────────────────────
const FLAT_TYPES = ["STUDIO", "1BHK", "2BHK", "3BHK", "4BHK", "PENTHOUSE", "VILLA"];
const FURNISHING_OPTIONS = [
  { value: "FURNISHED",      label: "Fully Furnished" },
  { value: "SEMI_FURNISHED", label: "Semi Furnished" },
  { value: "UNFURNISHED",    label: "Unfurnished" },
];

// ── Props ────────────────────────────────────────────────────────────────────
interface UpdateFlatFormProps {
  flat?: UpdateFlat | null;  // ✅ allow undefined/null from parent
  onSuccess?: (updated: UpdateFlat) => void;
  onCancel?: () => void;
}

// ── Blank default so hooks always have a stable initial value ─────────────────
const EMPTY_FLAT: UpdateFlat = {
  id: 0,
  title: "",
  description: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  rentAmount: 0,
  bedrooms: 1,
  bathrooms: 1,
  areaSqft: 0,
  flatType: "",
  furnishingStatus: "",
  petsAllowed: false,
  parkingAvailable: false,
  available: true,
  images: [],
  ownerName: "",
  ownerContact: "",
  createdAt: null,
  updatedAt: null,
};

// ── Component ────────────────────────────────────────────────────────────────
export default function UpdateFlatForm({ flat, onSuccess, onCancel }: UpdateFlatFormProps) {
  // ✅ Always call hooks unconditionally — use EMPTY_FLAT as safe fallback
  const [form, setForm] = useState<UpdateFlat>(flat ?? EMPTY_FLAT);
  const [saving, setSaving]         = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg]     = useState("");
  const [newImages, setNewImages]   = useState<File[]>([]);
  const [newPreviews, setNewPreviews] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // ✅ Guard AFTER all hooks — never before
  if (!flat) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm text-gray-400 font-medium">Loading flat data...</p>
        </div>
      </div>
    );
  }

  // ── Helpers ──────────────────────────────────────────────────────────────
  const set = (key: keyof UpdateFlat, value: unknown) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const handleFiles = (files: FileList | null) => {
    if (!files) return;
    const arr = Array.from(files);
    setNewImages((prev) => [...prev, ...arr]);
    setNewPreviews((prev) => [...prev, ...arr.map((f) => URL.createObjectURL(f))]);
  };

  const removeNewImage = (idx: number) => {
    URL.revokeObjectURL(newPreviews[idx]);
    setNewImages((prev) => prev.filter((_, i) => i !== idx));
    setNewPreviews((prev) => prev.filter((_, i) => i !== idx));
  };

  // ── Submit ───────────────────────────────────────────────────────────────
  const handleSubmit = async () => {
    setSaving(true);
    setErrorMsg("");
    setSaveStatus("idle");

    try {
      // 1️⃣ PUT flat details (JSON)
      const payload: Partial<UpdateFlat> = {
        title:            form.title,
        description:      form.description,
        address:          form.address,
        city:             form.city,
        state:            form.state,
        pincode:          form.pincode,
        rentAmount:       form.rentAmount,
        bedrooms:         form.bedrooms,
        bathrooms:        form.bathrooms,
        areaSqft:         form.areaSqft,
        flatType:         form.flatType,
        furnishingStatus: form.furnishingStatus,
        petsAllowed:      form.petsAllowed,
        parkingAvailable: form.parkingAvailable,
        available:        form.available,
        ownerName:        form.ownerName,
        ownerContact:     form.ownerContact,
      };

      const res = await fetch(`http://localhost:8080/api/flats/${flat.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => null);
        throw new Error(err?.message || `Error ${res.status}`);
      }

      const updated: UpdateFlat = await res.json();

      // 2️⃣ Upload new images if any — ✅ correct endpoint with "images" (plural)
      if (newImages.length > 0) {
        const fd = new FormData();
        newImages.forEach((file) => fd.append("images", file));
        await fetch(`http://localhost:8080/api/flats/${flat.id}/images`, {
          method: "POST",
          body: fd,
        });
      }

      setSaveStatus("success");
      onSuccess?.(updated);
    } catch (err: unknown) {
      setSaveStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Update failed");
    } finally {
      setSaving(false);
    }
  };

  // ── Metadata display ─────────────────────────────────────────────────────
  const fmtDate = (d: string | null) =>
    d
      ? new Date(d).toLocaleDateString("en-IN", {
          day: "numeric", month: "short", year: "numeric",
          hour: "2-digit", minute: "2-digit",
        })
      : "—";

  // ── UI ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50/50">

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-100/60 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-20 w-80 h-80 bg-emerald-100/40 rounded-full blur-3xl" />
      </div>

      {/* ── Header ── */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-green-100 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-md shadow-green-200">
              <svg className="w-[17px] h-[17px] text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-bold text-gray-900 leading-none">RightMove</p>
              <p className="text-[10px] text-green-600 font-semibold leading-none mt-0.5">Admin · Edit Flat</p>
            </div>
          </div>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-gray-400 font-medium">
            <a href="/admin/manage-flats" className="hover:text-green-600 transition-colors">Manage Flats</a>
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
            <span className="text-green-700 font-semibold line-clamp-1 max-w-[180px]">{flat.title}</span>
          </div>

          {/* Back */}
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-green-200 bg-green-50 text-green-700 text-xs font-bold hover:bg-green-100 hover:border-green-400 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Back
            </button>
          )}
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 pb-24">

        {/* ── Page title ── */}
        <div className="mb-7">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-100 border border-green-200 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10.5px] font-black uppercase tracking-[2px] text-green-700">Edit Listing</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight leading-tight">
            Update{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-emerald-600">
              Flat #{flat.id}
            </span>
          </h1>
          <p className="text-sm text-gray-400 mt-1.5 font-medium">
            Changes are saved via PUT to{" "}
            <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs text-gray-600 font-mono">
              /api/flats/{flat.id}
            </code>
          </p>

          {/* Metadata row */}
          <div className="flex flex-wrap gap-3 mt-3">
            {[
              { label: "Created", value: fmtDate(flat.createdAt) },
              { label: "Updated", value: fmtDate(flat.updatedAt) },
            ].map((m) => (
              <div key={m.label} className="flex items-center gap-1.5 text-xs text-gray-400 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-lg">
                <svg className="w-3 h-3 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                </svg>
                <span className="font-semibold text-gray-500">{m.label}:</span> {m.value}
              </div>
            ))}
          </div>
        </div>

        {/* ── SUCCESS / ERROR banners ── */}
        {saveStatus === "success" && (
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-green-50 border border-green-300 text-green-800 text-sm font-semibold mb-6 shadow-sm">
            <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
              </svg>
            </div>
            Flat updated successfully!
          </div>
        )}
        {saveStatus === "error" && (
          <div className="flex items-center gap-3 px-4 py-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-sm font-semibold mb-6">
            <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"/>
            </svg>
            {errorMsg}
          </div>
        )}

        {/* SECTION 1 — Owner & Basic Info */}
        <Section icon="👤" title="Owner & Basic Info">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Field label="Owner Name">
              <input
                type="text"
                value={form.ownerName ?? ""}
                onChange={(e) => set("ownerName", e.target.value)}
                placeholder="Full name of the owner"
                className={inputCls()}
              />
            </Field>
            <Field label="Owner Contact">
              <input
                type="tel"
                value={form.ownerContact ?? ""}
                onChange={(e) => set("ownerContact", e.target.value)}
                placeholder="10-digit mobile number"
                className={inputCls()}
              />
            </Field>
          </div>
          <Field label="Listing Title" required>
            <input
              type="text"
              value={form.title}
              onChange={(e) => set("title", e.target.value)}
              placeholder="e.g. Bright 2BHK near Metro"
              className={inputCls()}
            />
          </Field>
          <Field label="Description" required>
            <textarea
              rows={3}
              value={form.description}
              onChange={(e) => set("description", e.target.value)}
              placeholder="Describe the flat's highlights..."
              className={`${inputCls()} resize-none leading-relaxed`}
            />
          </Field>
        </Section>

        {/* SECTION 2 — Location */}
        <Section icon="📍" title="Location">
          <Field label="Street Address" required>
            <input
              type="text"
              value={form.address}
              onChange={(e) => set("address", e.target.value)}
              placeholder="Building name, street, landmark"
              className={inputCls()}
            />
          </Field>
          <div className="grid grid-cols-3 gap-3">
            <Field label="City" required>
              <input
                type="text"
                value={form.city}
                onChange={(e) => set("city", e.target.value)}
                placeholder="Bangalore"
                className={inputCls()}
              />
            </Field>
            <Field label="State" required>
              <input
                type="text"
                value={form.state}
                onChange={(e) => set("state", e.target.value)}
                placeholder="Karnataka"
                className={inputCls()}
              />
            </Field>
            <Field label="Pincode">
              <input
                type="text"
                value={form.pincode}
                onChange={(e) => set("pincode", e.target.value)}
                placeholder="560001"
                className={inputCls()}
              />
            </Field>
          </div>
        </Section>

        {/* SECTION 3 — Flat Type */}
        <Section icon="🏠" title="Flat Type">
          <div className="flex flex-wrap gap-2.5">
            {FLAT_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => set("flatType", t)}
                className={`px-4 py-2 rounded-full text-xs font-bold border-[1.5px] transition-all duration-150
                  ${form.flatType === t
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white border-transparent shadow-md shadow-green-200"
                    : "bg-gray-50 text-gray-500 border-gray-200 hover:border-green-300 hover:text-green-700 hover:bg-green-50"
                  }`}
              >
                {t}
              </button>
            ))}
          </div>
        </Section>

        {/* SECTION 4 — Pricing & Specs */}
        <Section icon="₹" title="Pricing & Specs">
          <div className="grid grid-cols-2 gap-4">
            <Field label="Monthly Rent (₹)" required>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm pointer-events-none">₹</span>
                <input
                  type="number"
                  min={0}
                  value={form.rentAmount}
                  onChange={(e) => set("rentAmount", Number(e.target.value))}
                  placeholder="25000"
                  className={`${inputCls()} pl-7`}
                />
              </div>
            </Field>
            <Field label="Area (sq ft)">
              <input
                type="number"
                min={0}
                value={form.areaSqft}
                onChange={(e) => set("areaSqft", Number(e.target.value))}
                placeholder="950"
                className={inputCls()}
              />
            </Field>
            <Field label="Bedrooms" required>
              <input
                type="number"
                min={1}
                value={form.bedrooms}
                onChange={(e) => set("bedrooms", Number(e.target.value))}
                className={inputCls()}
              />
            </Field>
            <Field label="Bathrooms">
              <input
                type="number"
                min={0}
                value={form.bathrooms}
                onChange={(e) => set("bathrooms", Number(e.target.value))}
                className={inputCls()}
              />
            </Field>
          </div>
        </Section>

        {/* SECTION 5 — Furnishing & Options */}
        <Section icon="🛋️" title="Furnishing & Options">
          <Field label="Furnishing Status">
            <select
              value={form.furnishingStatus}
              onChange={(e) => set("furnishingStatus", e.target.value)}
              className={`${inputCls()} cursor-pointer`}
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%239ca3af' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "right 14px center",
                paddingRight: "36px",
                appearance: "none",
              }}
            >
              <option value="">Select furnishing status</option>
              {FURNISHING_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>

          <div className="flex flex-col sm:flex-row gap-3 mt-1">
            {([
              { key: "available",        emoji: "✅", label: "Available",    desc: "Flat is listed as available" },
              { key: "petsAllowed",      emoji: "🐾", label: "Pets Allowed", desc: "Tenants can bring pets" },
              { key: "parkingAvailable", emoji: "🚗", label: "Parking",      desc: "Parking spot included" },
            ] as const).map(({ key, emoji, label, desc }) => (
              <div
                key={key}
                onClick={() => set(key, !form[key])}
                className={`flex items-center gap-3 flex-1 px-4 py-3 rounded-xl border-[1.5px] cursor-pointer transition-all duration-200 select-none
                  ${form[key]
                    ? "bg-green-50 border-green-300 text-green-800 shadow-sm"
                    : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                  }`}
              >
                <span className="text-lg leading-none">{emoji}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold leading-none">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-none hidden sm:block">{desc}</p>
                </div>
                <div className={`relative w-9 h-5 rounded-full flex-shrink-0 transition-colors duration-200 ${form[key] ? "bg-green-500" : "bg-gray-300"}`}>
                  <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${form[key] ? "translate-x-4" : "translate-x-0.5"}`} />
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* SECTION 6 — Existing Images */}
        {flat.images.length > 0 && (
          <Section icon="🖼️" title="Current Images">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
              {flat.images.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-green-100 group">
                  <img
                    src={src.startsWith("/") ? `http://localhost:8080${src}` : src}
                    alt={`flat-image-${i}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-xs font-bold transition-opacity">{i + 1}</span>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        )}

        {/* SECTION 7 — Add New Images */}
        <Section icon="📸" title="Add New Images">
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => { e.preventDefault(); handleFiles(e.dataTransfer.files); }}
            className="border-2 border-dashed border-green-200 rounded-2xl bg-green-50/60 py-8 px-4 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-200 group"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center mx-auto mb-3 group-hover:scale-105 transition-transform shadow-lg shadow-green-200">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm font-bold text-green-800">Drop images here or click to browse</p>
            <p className="text-xs text-green-500 font-medium mt-1">JPG, PNG, WEBP · Multiple allowed</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              className="hidden"
              onChange={(e) => handleFiles(e.target.files)}
            />
          </div>

          {newPreviews.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mt-4">
              {newPreviews.map((src, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden border-2 border-green-300 group">
                  <img src={src} alt={`new-${i}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeNewImage(i)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                  >
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                  </button>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent py-1.5 px-2">
                    <p className="text-[9px] text-white font-semibold truncate">{newImages[i]?.name}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* ── Bottom action bar ── */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-green-100">
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 bg-white text-gray-500 text-sm font-semibold hover:border-gray-300 hover:text-gray-700 hover:bg-gray-50 transition-all"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
              </svg>
              Cancel
            </button>
          )}
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="ml-auto flex items-center gap-2.5 px-8 py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white text-sm font-black shadow-lg shadow-green-200 hover:shadow-green-300 hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:-translate-y-0.5"
          >
            {saving ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
                Saving...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
                Save Changes
              </>
            )}
          </button>
        </div>
      </main>

      {/* Bottom progress bar */}
      <div className="fixed bottom-0 left-0 right-0 h-0.5 bg-green-100 z-40">
        <div className={`h-full bg-gradient-to-r from-green-400 to-emerald-500 transition-all duration-700 ${saving ? "w-3/4" : saveStatus === "success" ? "w-full" : "w-0"}`} />
      </div>
    </div>
  );
}

// ── Sub-components ────────────────────────────────────────────────────────────

function Section({ icon, title, children }: { icon: string; title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden mb-4 transition-shadow hover:shadow-md hover:shadow-green-50">
      <div className="flex items-center gap-2.5 px-6 py-4 border-b border-green-50 bg-gradient-to-r from-green-50/60 to-white">
        <span className="text-base leading-none">{icon}</span>
        <span className="text-[10.5px] font-black uppercase tracking-[2px] text-green-700">{title}</span>
      </div>
      <div className="px-6 py-5 flex flex-col gap-4">{children}</div>
    </div>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-bold uppercase tracking-wide text-gray-500">
        {label}{required && <span className="text-green-500 ml-0.5">*</span>}
      </label>
      {children}
    </div>
  );
}

function inputCls() {
  return "w-full px-3.5 py-2.5 rounded-xl border-[1.5px] border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 placeholder-gray-400 outline-none transition-all duration-150 focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-500/15 hover:border-green-300";
}