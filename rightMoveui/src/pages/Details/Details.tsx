// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Navbar from "../../components/Navbar/Navbar";
// import { getFlatById, getImageUrl } from "../../services/flatService";
// import type { FlatType } from "../../types";

// const FALLBACK_IMAGE =
//   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop";

// const FALLBACK_IMAGES = [
//   "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
//   "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop",
// ];

// const Details = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [flat, setFlat] = useState<FlatType | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [activeImage, setActiveImage] = useState("");
//   const [showModal, setShowModal] = useState(false);
//   const [activeTab, setActiveTab] = useState<"overview" | "details" | "amenities">("overview");
//   const [imageLoaded, setImageLoaded] = useState(false);
//   const [viewed] = useState(Math.floor(Math.random() * 80) + 40);

//   useEffect(() => {
//     if (!id) return;
//     const fetchFlat = async () => {
//       try {
//         const data = await getFlatById(id);
//         setFlat(data);
//         const firstImage =
//           data.images?.length > 0 ? getImageUrl(data.images[0]) : FALLBACK_IMAGE;
//         setActiveImage(firstImage);
//       } catch (err) {
//         console.error(err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFlat();
//   }, [id]);

//   if (loading) {
//     return (
//       <>
//         <style>{GLOBAL_STYLES}</style>
//         <div className="d-loading-screen">
//           <div className="d-loading-inner">
//             <div className="d-spinner" />
//             <p className="d-loading-text">Finding your property…</p>
//           </div>
//         </div>
//       </>
//     );
//   }

//   if (!flat) {
//     return (
//       <>
//         <style>{GLOBAL_STYLES}</style>
//         <div className="d-loading-screen">
//           <p style={{ color: "#64748B", fontSize: 16 }}>Property not found.</p>
//         </div>
//       </>
//     );
//   }

//   const phone = flat.ownerContact || flat.owner_contact || "9876543210";
//   const ownerName = flat.ownerName || flat.owner_name || "Owner";
//   const whatsappLink = `https://wa.me/91${phone}`;

//   const displayImages =
//     flat.images?.length > 0
//       ? flat.images.map((img: string) => getImageUrl(img))
//       : FALLBACK_IMAGES;

//   const amenities = [
//     { icon: "🐾", label: "Pets Allowed", active: flat.petsAllowed },
//     { icon: "🚗", label: "Parking", active: flat.parkingAvailable },
//     { icon: "✅", label: "Available Now", active: flat.available },
//     { icon: "🔒", label: "Gated Society", active: true },
//     { icon: "💡", label: "Power Backup", active: true },
//     { icon: "🌊", label: "Water Supply 24/7", active: true },
//     { icon: "🛗", label: "Elevator", active: false },
//     { icon: "🏋️", label: "Gym", active: false },
//   ];

//   return (
//     <>
//       <style>{GLOBAL_STYLES}</style>

//       <div className="d-root">
//         <Navbar />

//         {/* TOP BAR */}
//         <div className="d-topbar">
//           <div className="d-container d-topbar-inner">
//             <button className="d-back-btn" onClick={() => navigate(-1)}>
//               <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 12H5M12 5l-7 7 7 7" />
//               </svg>
//               Back to listings
//             </button>
//             <div className="d-breadcrumb">
//               <span>Home</span>
//               <span className="d-bc-sep">›</span>
//               <span>{flat.city}</span>
//               <span className="d-bc-sep">›</span>
//               <span className="d-bc-active">{flat.title}</span>
//             </div>
//           </div>
//         </div>

//         <div className="d-container d-main-grid">

//           {/* LEFT COLUMN */}
//           <div className="d-left">

//             {/* HERO IMAGE */}
//             <div className="d-hero-wrap">
//               <div className={`d-hero-img-box ${imageLoaded ? "loaded" : ""}`}>
//                 <img
//                   src={activeImage}
//                   alt={flat.title}
//                   className="d-hero-img"
//                   onLoad={() => setImageLoaded(true)}
//                 />
//                 <div className="d-img-badges">
//                   <span className={`d-badge-pill ${flat.available ? "green" : "red"}`}>
//                     <span className="d-badge-dot" />
//                     {flat.available ? "Available Now" : "Not Available"}
//                   </span>
//                   <span className="d-badge-pill blue">
//                     <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                     </svg>
//                     Verified Listing
//                   </span>
//                 </div>
//                 <div className="d-img-count">📷 {displayImages.length} Photos</div>
//               </div>

//               {displayImages.length > 1 && (
//                 <div className="d-thumbs">
//                   {displayImages.map((src: string, i: number) => (
//                     <button
//                       key={i}
//                       className={`d-thumb ${activeImage === src ? "active" : ""}`}
//                       onClick={() => { setActiveImage(src); setImageLoaded(false); }}
//                     >
//                       <img src={src} alt={`Photo ${i + 1}`} />
//                       {activeImage === src && <div className="d-thumb-active-bar" />}
//                     </button>
//                   ))}
//                 </div>
//               )}
//             </div>

//             {/* TITLE BLOCK */}
//             <div className="d-title-block">
//               <div className="d-title-row">
//                 <h1 className="d-title">{flat.title}</h1>
//                 <div className="d-price-mobile">
//                   ₹{Number(flat.rentAmount).toLocaleString("en-IN")}
//                   <span>/mo</span>
//                 </div>
//               </div>
//               <div className="d-location-row">
//                 <svg className="d-loc-icon" width="15" height="15" fill="none" stroke="#2563EB" strokeWidth="2.2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
//                 </svg>
//                 {flat.address}, {flat.city}, {flat.state} – {flat.pincode}
//               </div>
//               <div className="d-tag-row">
//                 <span className="d-tag">{flat.bedrooms} BHK</span>
//                 <span className="d-tag">{flat.flatType}</span>
//                 <span className="d-tag">{flat.furnishingStatus?.replace(/_/g, " ")}</span>
//                 <span className="d-tag">{flat.areaSqft} sqft</span>
//                 {flat.petsAllowed && <span className="d-tag green-tag">🐾 Pets OK</span>}
//                 {flat.parkingAvailable && <span className="d-tag green-tag">🚗 Parking</span>}
//               </div>
//             </div>

//             {/* TABS */}
//             <div className="d-tabs">
//               {(["overview", "details", "amenities"] as const).map((t) => (
//                 <button
//                   key={t}
//                   className={`d-tab-btn ${activeTab === t ? "active" : ""}`}
//                   onClick={() => setActiveTab(t)}
//                 >
//                   {t.charAt(0).toUpperCase() + t.slice(1)}
//                   {activeTab === t && <div className="d-tab-underline" />}
//                 </button>
//               ))}
//             </div>

//             {/* OVERVIEW TAB */}
//             {activeTab === "overview" && (
//               <div className="d-tab-content">
//                 <div className="d-section-card">
//                   <h2 className="d-section-title">About this property</h2>
//                   <p className="d-description">
//                     {flat.description || "A well-maintained property in a prime location. This flat offers excellent connectivity, natural light, and modern amenities. Perfect for families and working professionals."}
//                   </p>
//                 </div>
//                 <div className="d-highlights-grid">
//                   {[
//                     { icon: "🛏", label: "Bedrooms", val: `${flat.bedrooms} BHK` },
//                     { icon: "🛁", label: "Bathrooms", val: `${flat.bathrooms}` },
//                     { icon: "📐", label: "Area", val: `${flat.areaSqft} sqft` },
//                     { icon: "🏢", label: "Type", val: flat.flatType },
//                     { icon: "🪑", label: "Furnishing", val: flat.furnishingStatus?.replace(/_/g, " ") },
//                     { icon: "📍", label: "City", val: flat.city },
//                   ].map((item, i) => (
//                     <div className="d-highlight-card" key={i}>
//                       <div className="d-hl-icon">{item.icon}</div>
//                       <div className="d-hl-label">{item.label}</div>
//                       <div className="d-hl-val">{item.val}</div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* DETAILS TAB */}
//             {activeTab === "details" && (
//               <div className="d-tab-content">
//                 <div className="d-section-card">
//                   <h2 className="d-section-title">Property Details</h2>
//                   <div className="d-details-table">
//                     {[
//                       ["Flat Type", flat.flatType],
//                       ["Furnishing", flat.furnishingStatus?.replace(/_/g, " ")],
//                       ["Bedrooms", `${flat.bedrooms} BHK`],
//                       ["Bathrooms", `${flat.bathrooms}`],
//                       ["Area", `${flat.areaSqft} sq ft`],
//                       ["City", flat.city],
//                       ["State", flat.state],
//                       ["Pincode", flat.pincode],
//                       ["Available", flat.available ? "Yes" : "No"],
//                     ].map(([k, v], i) => (
//                       <div className={`d-detail-row ${i % 2 === 0 ? "even" : ""}`} key={k}>
//                         <span className="d-detail-key">{k}</span>
//                         <span className="d-detail-val">{v}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* AMENITIES TAB */}
//             {activeTab === "amenities" && (
//               <div className="d-tab-content">
//                 <div className="d-section-card">
//                   <h2 className="d-section-title">Amenities & Features</h2>
//                   <div className="d-amenities-grid">
//                     {amenities.map((a, i) => (
//                       <div className={`d-amenity-card ${a.active ? "active" : "inactive"}`} key={i}>
//                         <span className="d-amenity-icon">{a.icon}</span>
//                         <span className="d-amenity-label">{a.label}</span>
//                         {a.active
//                           ? <span className="d-amenity-check">✓</span>
//                           : <span className="d-amenity-cross">✗</span>
//                         }
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}

//           </div>

//           {/* RIGHT STICKY CARD */}
//           <div className="d-right">
//             <div className="d-sticky-card">
//               <div className="d-card-price-block">
//                 <div className="d-card-price">
//                   ₹{Number(flat.rentAmount).toLocaleString("en-IN")}
//                   <span>/month</span>
//                 </div>
//                 <div className="d-card-deposit">
//                   Security Deposit: ₹{Number(flat.rentAmount * 2).toLocaleString("en-IN")}
//                 </div>
//               </div>

//               <div className="d-trust-row">
//                 <div className="d-trust-item">
//                   <svg width="13" height="13" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                   </svg>
//                   Verified Listing
//                 </div>
//                 <div className="d-trust-item">
//                   <svg width="13" height="13" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z"/>
//                   </svg>
//                   Quick Response
//                 </div>
//                 <div className="d-trust-item">
//                   <svg width="13" height="13" fill="none" stroke="#16A34A" strokeWidth="2.5" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
//                   </svg>
//                   {viewed}+ people viewed
//                 </div>
//               </div>

//               <div className="d-card-divider" />

//               <div className="d-owner-block">
//                 <div className="d-owner-avatar">{ownerName[0].toUpperCase()}</div>
//                 <div className="d-owner-info">
//                   <span className="d-owner-sublabel">Listed by owner</span>
//                   <span className="d-owner-name">{ownerName}</span>
//                   <span className="d-owner-phone">📱 +91 {phone}</span>
//                 </div>
//               </div>

//               <div className="d-card-divider" />

//               <div className="d-cta-stack">
//                 <button className="d-btn-primary" onClick={() => setShowModal(true)}>
//                   <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
//                   </svg>
//                   Contact Owner
//                 </button>
//                 <a className="d-btn-whatsapp" href={whatsappLink} target="_blank" rel="noreferrer">
//                   <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
//                     <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                   </svg>
//                   WhatsApp Owner
//                 </a>
//               </div>

//               <p className="d-safety-note">🔒 Never pay token before visiting the property</p>
//             </div>
//           </div>

//         </div>

//         {/* MOBILE STICKY BOTTOM BAR */}
//         <div className="d-mobile-cta-bar">
//           <div className="d-mob-price">
//             ₹{Number(flat.rentAmount).toLocaleString("en-IN")}<span>/mo</span>
//           </div>
//           <div className="d-mob-btns">
//             <a className="d-mob-wa" href={whatsappLink} target="_blank" rel="noreferrer">💬</a>
//             <button className="d-mob-contact" onClick={() => setShowModal(true)}>Contact Owner</button>
//           </div>
//         </div>

//       </div>

//       {/* CONTACT MODAL */}
//       {showModal && (
//         <div className="d-modal-overlay" onClick={() => setShowModal(false)}>
//           <div className="d-modal" onClick={(e) => e.stopPropagation()}>
//             <button className="d-modal-close" onClick={() => setShowModal(false)}>
//               <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
//               </svg>
//             </button>

//             <div className="d-modal-header">
//               <div className="d-modal-avatar">{ownerName[0].toUpperCase()}</div>
//               <div>
//                 <div className="d-modal-owner-name">{ownerName}</div>
//                 <div className="d-modal-owner-tag">✓ Verified Property Owner</div>
//               </div>
//             </div>

//             <div className="d-modal-prop-info">
//               <div className="d-modal-prop-title">{flat.title}</div>
//               <div className="d-modal-prop-loc">📍 {flat.city}, {flat.state}</div>
//               <div className="d-modal-prop-price">₹{Number(flat.rentAmount).toLocaleString("en-IN")}/month</div>
//             </div>

//             <div className="d-modal-phone-box">
//               <span className="d-modal-phone-label">Contact Number</span>
//               <span className="d-modal-phone">+91 {phone}</span>
//             </div>

//             <div className="d-modal-actions">
//               <a href={`tel:${phone}`} className="d-modal-btn call">
//                 <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
//                 </svg>
//                 Call Now
//               </a>
//               <a href={whatsappLink} target="_blank" rel="noreferrer" className="d-modal-btn whatsapp">
//                 <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
//                 </svg>
//                 WhatsApp
//               </a>
//             </div>

//             <p className="d-modal-note">🔒 Share your number only after visiting the property in person</p>
//           </div>
//         </div>
//       )}
//     </>
//   );
// };

// const GLOBAL_STYLES = `
//   @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Outfit:wght@300;400;500;600;700&display=swap');

//   *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//   .d-root {
//     font-family: 'Outfit', sans-serif;
//     background: #F8FAFC;
//     min-height: 100vh;
//     padding-bottom: 80px;
//   }

//   .d-loading-screen {
//     min-height: 100vh;
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     background: #F8FAFC;
//   }
//   .d-loading-inner { display: flex; flex-direction: column; align-items: center; gap: 14px; }
//   .d-spinner {
//     width: 42px; height: 42px;
//     border: 3px solid #E2E8F0;
//     border-top-color: #2563EB;
//     border-radius: 50%;
//     animation: d-spin 0.75s linear infinite;
//   }
//   @keyframes d-spin { to { transform: rotate(360deg); } }
//   .d-loading-text { font-size: 14px; color: #94A3B8; font-weight: 500; letter-spacing: 0.3px; }

//   .d-topbar { background: #fff; border-bottom: 1px solid #E2E8F0; padding: 12px 0; }
//   .d-container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }
//   .d-topbar-inner { display: flex; align-items: center; justify-content: space-between; }

//   .d-back-btn {
//     display: inline-flex; align-items: center; gap: 7px;
//     background: none; border: none; cursor: pointer;
//     font-family: 'Outfit', sans-serif; font-size: 13.5px; font-weight: 500;
//     color: #475569; padding: 6px 12px 6px 8px; border-radius: 8px;
//     transition: background 0.15s, color 0.15s;
//   }
//   .d-back-btn:hover { background: #F1F5F9; color: #1E293B; }

//   .d-breadcrumb { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #94A3B8; font-weight: 500; }
//   .d-bc-sep { color: #CBD5E1; }
//   .d-bc-active { color: #2563EB; font-weight: 600; }

//   .d-main-grid {
//     display: grid;
//     grid-template-columns: 1fr 360px;
//     gap: 28px;
//     padding-top: 28px;
//     align-items: start;
//   }
//   @media (max-width: 960px) {
//     .d-main-grid { grid-template-columns: 1fr; }
//     .d-right { display: none; }
//   }

//   .d-hero-img-box {
//     position: relative; border-radius: 16px; overflow: hidden;
//     aspect-ratio: 16/9; background: #E2E8F0;
//   }
//   .d-hero-img {
//     width: 100%; height: 100%; object-fit: cover; display: block;
//     transition: transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94), opacity 0.35s;
//     opacity: 0;
//   }
//   .d-hero-img-box.loaded .d-hero-img { opacity: 1; }
//   .d-hero-img-box:hover .d-hero-img { transform: scale(1.02); }

//   .d-img-badges { position: absolute; top: 14px; left: 14px; display: flex; gap: 8px; }
//   .d-badge-pill {
//     display: inline-flex; align-items: center; gap: 5px;
//     padding: 5px 12px; border-radius: 100px;
//     font-size: 11.5px; font-weight: 600; letter-spacing: 0.2px;
//     backdrop-filter: blur(10px);
//   }
//   .d-badge-pill.green { background: rgba(22,163,74,0.2); color: #fff; border: 1px solid rgba(22,163,74,0.4); }
//   .d-badge-pill.red { background: rgba(220,38,38,0.2); color: #fff; border: 1px solid rgba(220,38,38,0.4); }
//   .d-badge-pill.blue { background: rgba(37,99,235,0.22); color: #fff; border: 1px solid rgba(37,99,235,0.38); }
//   .d-badge-dot {
//     width: 7px; height: 7px; border-radius: 50%; background: #4ADE80;
//     box-shadow: 0 0 0 2px rgba(74,222,128,0.35);
//     animation: d-pulse 2s infinite;
//   }
//   @keyframes d-pulse { 0%,100%{opacity:1} 50%{opacity:0.4} }

//   .d-img-count {
//     position: absolute; bottom: 14px; right: 14px;
//     background: rgba(0,0,0,0.55); color: #fff;
//     font-size: 12px; font-weight: 500;
//     padding: 5px 12px; border-radius: 100px; backdrop-filter: blur(8px);
//   }

//   .d-thumbs {
//     display: flex; gap: 10px; margin-top: 12px;
//     overflow-x: auto; padding-bottom: 2px; scrollbar-width: none;
//   }
//   .d-thumbs::-webkit-scrollbar { display: none; }
//   .d-thumb {
//     position: relative; width: 80px; height: 58px; flex-shrink: 0;
//     border-radius: 10px; overflow: hidden; border: 2px solid transparent;
//     cursor: pointer; background: none; padding: 0;
//     transition: border-color 0.2s, transform 0.2s;
//   }
//   .d-thumb:hover { transform: translateY(-2px); }
//   .d-thumb.active { border-color: #2563EB; }
//   .d-thumb img { width: 100%; height: 100%; object-fit: cover; display: block; }
//   .d-thumb-active-bar { position: absolute; bottom: 0; left: 0; right: 0; height: 3px; background: #2563EB; }

//   .d-title-block { margin-top: 22px; padding-bottom: 20px; border-bottom: 1px solid #E2E8F0; }
//   .d-title-row { display: flex; align-items: flex-start; justify-content: space-between; gap: 16px; margin-bottom: 8px; }
//   .d-title { font-family: 'Playfair Display', serif; font-size: 26px; font-weight: 700; color: #0F172A; line-height: 1.25; flex: 1; }

//   .d-price-mobile { display: none; font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700; color: #2563EB; white-space: nowrap; }
//   .d-price-mobile span { font-size: 13px; font-weight: 500; color: #94A3B8; font-family: 'Outfit', sans-serif; }
//   @media (max-width: 960px) { .d-price-mobile { display: block; } }

//   .d-location-row { display: flex; align-items: center; gap: 6px; color: #475569; font-size: 13.5px; font-weight: 400; margin-bottom: 14px; }
//   .d-loc-icon { flex-shrink: 0; }

//   .d-tag-row { display: flex; flex-wrap: wrap; gap: 8px; }
//   .d-tag { padding: 4px 12px; background: #F1F5F9; border: 1px solid #E2E8F0; border-radius: 100px; font-size: 12px; font-weight: 600; color: #334155; }
//   .d-tag.green-tag { background: #F0FDF4; border-color: #BBF7D0; color: #15803D; }

//   .d-tabs { display: flex; gap: 4px; margin-top: 24px; border-bottom: 2px solid #E2E8F0; }
//   .d-tab-btn {
//     position: relative; padding: 10px 20px 12px;
//     background: none; border: none; cursor: pointer;
//     font-family: 'Outfit', sans-serif; font-size: 14px; font-weight: 600;
//     color: #94A3B8; border-radius: 8px 8px 0 0;
//     transition: color 0.2s, background 0.2s;
//   }
//   .d-tab-btn:hover { color: #475569; background: #F8FAFC; }
//   .d-tab-btn.active { color: #2563EB; }
//   .d-tab-underline {
//     position: absolute; bottom: -2px; left: 0; right: 0;
//     height: 2px; background: #2563EB; border-radius: 2px 2px 0 0;
//     animation: d-tab-in 0.2s ease;
//   }
//   @keyframes d-tab-in { from { transform: scaleX(0.3); opacity: 0; } to { transform: scaleX(1); opacity: 1; } }

//   .d-tab-content { padding-top: 20px; display: flex; flex-direction: column; gap: 16px; }
//   .d-section-card { background: #fff; border: 1px solid #E2E8F0; border-radius: 14px; padding: 22px 24px; }
//   .d-section-title { font-family: 'Playfair Display', serif; font-size: 18px; font-weight: 700; color: #0F172A; margin-bottom: 14px; }
//   .d-description { font-size: 14.5px; color: #475569; line-height: 1.8; font-weight: 400; }

//   .d-highlights-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }
//   @media (max-width: 600px) { .d-highlights-grid { grid-template-columns: repeat(2,1fr); } }

//   .d-highlight-card {
//     background: #fff; border: 1px solid #E2E8F0; border-radius: 12px; padding: 16px;
//     display: flex; flex-direction: column; gap: 4px;
//     transition: box-shadow 0.2s, transform 0.2s, border-color 0.2s; cursor: default;
//   }
//   .d-highlight-card:hover { box-shadow: 0 4px 20px rgba(37,99,235,0.08); transform: translateY(-2px); border-color: #BFDBFE; }
//   .d-hl-icon { font-size: 22px; margin-bottom: 2px; }
//   .d-hl-label { font-size: 10.5px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.7px; font-weight: 600; }
//   .d-hl-val { font-size: 14px; font-weight: 700; color: #0F172A; }

//   .d-details-table { display: flex; flex-direction: column; }
//   .d-detail-row { display: flex; justify-content: space-between; align-items: center; padding: 11px 0; border-bottom: 1px solid #F1F5F9; font-size: 14px; }
//   .d-detail-row.even { background: #FAFBFC; margin: 0 -24px; padding: 11px 24px; }
//   .d-detail-row:last-child { border-bottom: none; }
//   .d-detail-key { color: #64748B; font-weight: 500; }
//   .d-detail-val { color: #0F172A; font-weight: 600; }

//   .d-amenities-grid { display: grid; grid-template-columns: repeat(2,1fr); gap: 10px; }
//   @media (max-width: 500px) { .d-amenities-grid { grid-template-columns: 1fr; } }
//   .d-amenity-card { display: flex; align-items: center; gap: 10px; padding: 12px 14px; border-radius: 10px; border: 1px solid #E2E8F0; font-size: 13.5px; font-weight: 500; }
//   .d-amenity-card.active { border-color: #BBF7D0; background: #F0FDF4; color: #15803D; }
//   .d-amenity-card.inactive { background: #FAFAFA; color: #94A3B8; }
//   .d-amenity-icon { font-size: 18px; }
//   .d-amenity-label { flex: 1; }
//   .d-amenity-check { font-size: 13px; font-weight: 700; color: #16A34A; }
//   .d-amenity-cross { font-size: 13px; font-weight: 700; color: #CBD5E1; }

//   .d-sticky-card {
//     position: sticky; top: 20px;
//     background: #fff; border: 1px solid #E2E8F0; border-radius: 18px; padding: 24px;
//     box-shadow: 0 4px 30px rgba(15,23,42,0.07);
//   }
//   .d-card-price-block { margin-bottom: 16px; }
//   .d-card-price { font-family: 'Playfair Display', serif; font-size: 32px; font-weight: 700; color: #0F172A; line-height: 1.1; }
//   .d-card-price span { font-size: 14px; color: #94A3B8; font-weight: 400; font-family: 'Outfit', sans-serif; }
//   .d-card-deposit { font-size: 12px; color: #94A3B8; font-weight: 500; margin-top: 4px; }

//   .d-trust-row { display: flex; flex-direction: column; gap: 7px; margin-bottom: 18px; }
//   .d-trust-item { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: #15803D; font-weight: 600; }

//   .d-card-divider { height: 1px; background: #F1F5F9; margin: 18px 0; }

//   .d-owner-block { display: flex; align-items: center; gap: 13px; }
//   .d-owner-avatar {
//     width: 46px; height: 46px; border-radius: 50%;
//     background: linear-gradient(135deg, #2563EB, #1D4ED8);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700;
//     color: #fff; flex-shrink: 0; box-shadow: 0 4px 12px rgba(37,99,235,0.25);
//   }
//   .d-owner-info { display: flex; flex-direction: column; gap: 2px; }
//   .d-owner-sublabel { font-size: 10.5px; color: #94A3B8; text-transform: uppercase; letter-spacing: 0.6px; font-weight: 600; }
//   .d-owner-name { font-size: 15px; font-weight: 700; color: #0F172A; }
//   .d-owner-phone { font-size: 12px; color: #64748B; font-weight: 500; margin-top: 1px; }

//   .d-cta-stack { display: flex; flex-direction: column; gap: 10px; }

//   .d-btn-primary {
//     display: flex; align-items: center; justify-content: center; gap: 9px;
//     width: 100%; padding: 13px 20px; background: #2563EB; color: #fff;
//     border: none; border-radius: 12px; font-family: 'Outfit', sans-serif;
//     font-size: 15px; font-weight: 700; cursor: pointer; letter-spacing: 0.2px;
//     box-shadow: 0 4px 16px rgba(37,99,235,0.3);
//     transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
//   }
//   .d-btn-primary:hover { background: #1D4ED8; transform: translateY(-1px); box-shadow: 0 6px 22px rgba(37,99,235,0.38); }
//   .d-btn-primary:active { transform: translateY(0); }

//   .d-btn-whatsapp {
//     display: flex; align-items: center; justify-content: center; gap: 9px;
//     width: 100%; padding: 12px 20px; background: #fff; color: #16A34A;
//     border: 1.5px solid #BBF7D0; border-radius: 12px;
//     font-family: 'Outfit', sans-serif; font-size: 15px; font-weight: 700;
//     text-decoration: none; letter-spacing: 0.2px;
//     transition: background 0.2s, border-color 0.2s, transform 0.15s;
//   }
//   .d-btn-whatsapp:hover { background: #F0FDF4; border-color: #86EFAC; transform: translateY(-1px); }

//   .d-safety-note { margin-top: 14px; font-size: 11.5px; color: #94A3B8; text-align: center; line-height: 1.5; }

//   .d-mobile-cta-bar {
//     display: none; position: fixed; bottom: 0; left: 0; right: 0;
//     background: #fff; border-top: 1px solid #E2E8F0; padding: 12px 20px;
//     align-items: center; justify-content: space-between; z-index: 50;
//     box-shadow: 0 -4px 20px rgba(0,0,0,0.06);
//   }
//   @media (max-width: 960px) { .d-mobile-cta-bar { display: flex; } }

//   .d-mob-price { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #0F172A; }
//   .d-mob-price span { font-size: 12px; color: #94A3B8; font-family: 'Outfit', sans-serif; font-weight: 500; }
//   .d-mob-btns { display: flex; align-items: center; gap: 10px; }
//   .d-mob-wa {
//     width: 42px; height: 42px; background: #F0FDF4; border: 1.5px solid #BBF7D0;
//     border-radius: 10px; display: flex; align-items: center; justify-content: center;
//     font-size: 20px; text-decoration: none;
//   }
//   .d-mob-contact {
//     padding: 11px 22px; background: #2563EB; color: #fff; border: none;
//     border-radius: 10px; font-family: 'Outfit', sans-serif; font-size: 14px;
//     font-weight: 700; cursor: pointer; box-shadow: 0 4px 12px rgba(37,99,235,0.28);
//   }

//   .d-modal-overlay {
//     position: fixed; inset: 0; background: rgba(15,23,42,0.5); backdrop-filter: blur(5px);
//     display: flex; align-items: center; justify-content: center; z-index: 999;
//     padding: 20px; animation: d-fade-in 0.2s ease;
//   }
//   @keyframes d-fade-in { from { opacity: 0; } to { opacity: 1; } }

//   .d-modal {
//     background: #fff; border-radius: 20px; width: 100%; max-width: 420px;
//     padding: 28px; position: relative;
//     animation: d-slide-up 0.25s cubic-bezier(0.34,1.56,0.64,1);
//     box-shadow: 0 24px 60px rgba(15,23,42,0.18);
//   }
//   @keyframes d-slide-up { from { transform: translateY(24px) scale(0.97); opacity: 0; } to { transform: translateY(0) scale(1); opacity: 1; } }

//   .d-modal-close {
//     position: absolute; top: 16px; right: 16px;
//     width: 30px; height: 30px; border-radius: 50%; background: #F1F5F9;
//     border: none; cursor: pointer; display: flex; align-items: center; justify-content: center;
//     color: #64748B; transition: background 0.15s, color 0.15s;
//   }
//   .d-modal-close:hover { background: #E2E8F0; color: #0F172A; }

//   .d-modal-header { display: flex; align-items: center; gap: 14px; margin-bottom: 18px; }
//   .d-modal-avatar {
//     width: 52px; height: 52px; border-radius: 50%;
//     background: linear-gradient(135deg, #2563EB, #1D4ED8);
//     display: flex; align-items: center; justify-content: center;
//     font-family: 'Playfair Display', serif; font-size: 22px; font-weight: 700;
//     color: #fff; flex-shrink: 0; box-shadow: 0 4px 14px rgba(37,99,235,0.25);
//   }
//   .d-modal-owner-name { font-size: 17px; font-weight: 700; color: #0F172A; margin-bottom: 2px; }
//   .d-modal-owner-tag { font-size: 12px; color: #16A34A; font-weight: 600; }

//   .d-modal-prop-info { background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 12px; padding: 14px 16px; margin-bottom: 16px; }
//   .d-modal-prop-title { font-size: 14px; font-weight: 700; color: #0F172A; margin-bottom: 4px; }
//   .d-modal-prop-loc { font-size: 12.5px; color: #64748B; font-weight: 500; margin-bottom: 6px; }
//   .d-modal-prop-price { font-family: 'Playfair Display', serif; font-size: 20px; font-weight: 700; color: #2563EB; }

//   .d-modal-phone-box {
//     display: flex; align-items: center; justify-content: space-between;
//     background: #F0F9FF; border: 1px solid #BAE6FD; border-radius: 10px;
//     padding: 12px 16px; margin-bottom: 16px;
//   }
//   .d-modal-phone-label { font-size: 11.5px; color: #0284C7; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }
//   .d-modal-phone { font-size: 16px; font-weight: 700; color: #0F172A; letter-spacing: 0.5px; }

//   .d-modal-actions { display: flex; gap: 10px; margin-bottom: 16px; }
//   .d-modal-btn {
//     flex: 1; display: flex; align-items: center; justify-content: center; gap: 8px;
//     padding: 13px; border-radius: 11px; font-family: 'Outfit', sans-serif;
//     font-size: 14.5px; font-weight: 700; text-decoration: none;
//     transition: opacity 0.2s, transform 0.15s; letter-spacing: 0.2px;
//   }
//   .d-modal-btn:hover { opacity: 0.9; transform: translateY(-1px); }
//   .d-modal-btn.call { background: #2563EB; color: #fff; box-shadow: 0 4px 12px rgba(37,99,235,0.25); }
//   .d-modal-btn.whatsapp { background: #25D366; color: #fff; box-shadow: 0 4px 12px rgba(37,211,102,0.25); }

//   .d-modal-note { font-size: 11.5px; color: #94A3B8; text-align: center; line-height: 1.5; }
// `;

// export default Details;








import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import ContactOwnerModal from "../../components/ContactOwnerModal/ContactOwnerModal";
import { getFlatById, getImageUrl } from "../../services/flatService";
import type { FlatType } from "../../types";

const FALLBACK_IMAGE = "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80";

// ── Skeleton ──────────────────────────────────────────
const DetailSkeleton = () => (
  <div className="animate-pulse max-w-7xl mx-auto px-4 md:px-6 py-8">
    <div className="h-4 w-32 bg-gray-200 rounded mb-6" />
    <div className="w-full h-[420px] bg-gray-200 rounded-2xl mb-4" />
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        <div className="h-8 bg-gray-200 rounded w-2/3" />
        <div className="h-4 bg-gray-100 rounded w-1/2" />
        <div className="h-4 bg-gray-100 rounded w-full" />
        <div className="h-4 bg-gray-100 rounded w-4/5" />
      </div>
      <div className="h-64 bg-gray-200 rounded-2xl" />
    </div>
  </div>
);

// ── Info Row ──────────────────────────────────────────
const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string | number | boolean | null | undefined }) => {
  if (value === null || value === undefined || value === "") return null;
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : String(value);
  return (
    <div className="flex items-start gap-3 py-3 border-b border-[#F1F5F9] last:border-0">
      <span className="text-lg shrink-0">{icon}</span>
      <div className="min-w-0">
        <p className="text-[#64748B] text-xs font-medium mb-0.5">{label}</p>
        <p className="text-[#0F172A] text-sm font-semibold">{display}</p>
      </div>
    </div>
  );
};

// ── Amenity Pill ──────────────────────────────────────
const AmenityPill = ({ icon, label, available }: { icon: string; label: string; available: boolean }) => (
  <div className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-medium ${
    available
      ? "bg-green-50 border-green-200 text-green-700"
      : "bg-gray-50 border-gray-200 text-gray-400 line-through"
  }`}>
    <span>{icon}</span>
    <span>{label}</span>
    {available && <span className="ml-auto text-green-500">✓</span>}
  </div>
);

// ── Main Component ─────────────────────────────────────
const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [flat,         setFlat]         = useState<FlatType | null>(null);
  const [loading,      setLoading]      = useState(true);
  const [error,        setError]        = useState<string | null>(null);
  const [activeImg,    setActiveImg]    = useState(0);
  const [imgError,     setImgError]     = useState(false);
  const [activeTab,    setActiveTab]    = useState<"overview" | "details" | "amenities">("overview");
  const [showModal,    setShowModal]    = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchFlat = async () => {
      try {
        setLoading(true);
        const data = await getFlatById(Number(id));
        setFlat(data);
      } catch {
        setError("Failed to load property. It may have been removed.");
      } finally {
        setLoading(false);
      }
    };
    fetchFlat();
  }, [id]);

  if (loading) return <><Navbar /><DetailSkeleton /><Footer /></>;

  if (error || !flat) return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="text-5xl mb-4">🏚️</div>
        <h2 className="text-xl font-bold text-[#0F172A] mb-2">Property Not Found</h2>
        <p className="text-[#64748B] mb-6">{error}</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-2.5 bg-[#2563EB] text-white rounded-xl font-semibold text-sm"
        >
          ← Back to Listings
        </button>
      </div>
      <Footer />
    </>
  );

  // ── Images: apply getImageUrl to resolve full URLs ──
  const images = flat.images && flat.images.length > 0
    ? flat.images.map((img) => getImageUrl(img))
    : [FALLBACK_IMAGE];
  const mainImage = !imgError ? images[activeImg] : FALLBACK_IMAGE;

  const ownerName    = flat.ownerName    ||  "Property Owner";
  const ownerContact = flat.ownerContactNumber || "8619337518";

const formattedRent = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
  maximumFractionDigits: 0,
}).format(flat.rentAmount);
  const formatDate = (d: string | null) =>
    d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

  const tabs = ["overview", "details", "amenities"] as const;

  return (
    <>
      <Navbar />

      <div className="bg-[#F8FAFC] min-h-screen">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-[#64748B] mb-5">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-1.5 hover:text-[#2563EB] font-medium transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              All Listings
            </button>
            <span>/</span>
            <span className="text-[#0F172A] font-medium truncate">{flat.title}</span>
          </div>

          {/* Gallery */}
          <div className="mb-6">
            <div className="relative w-full h-[300px] sm:h-[420px] rounded-2xl overflow-hidden bg-gray-200 shadow-md">
              {!flat.available && (
                <div className="absolute inset-0 bg-black/40 z-10 flex items-center justify-center">
                  <span className="bg-gray-900/80 text-white font-bold px-6 py-2 rounded-full text-sm">
                    Not Available
                  </span>
                </div>
              )}
              <img
                src={mainImage}
                alt={flat.title}
                onError={() => setImgError(true)}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 mt-3 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => { setActiveImg(idx); setImgError(false); }}
                    className={`shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImg === idx ? "border-[#2563EB] scale-105" : "border-transparent opacity-60 hover:opacity-100"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Split Layout */}
          <div className="grid lg:grid-cols-3 gap-6">

            {/* ── Left: Content ─────────────────────── */}
            <div className="lg:col-span-2 space-y-5">

              {/* Property Header Card */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div className="min-w-0">
                    <h1 className="text-xl font-extrabold text-[#0F172A] leading-tight mb-1.5">
                      {flat.title}
                    </h1>
                    <div className="flex items-center gap-1.5 text-[#64748B] text-sm mb-3">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
                        <circle cx="12" cy="10" r="3"/>
                      </svg>
                      <span>{flat.address}, {flat.city}, {flat.state} – {flat.pincode}</span>
                    </div>
                  </div>
                  {flat.available ? (
                    <span className="shrink-0 bg-green-100 text-green-700 text-xs font-bold px-3 py-1 rounded-full border border-green-200">
                      ✓ Available
                    </span>
                  ) : (
                    <span className="shrink-0 bg-red-50 text-red-600 text-xs font-bold px-3 py-1 rounded-full border border-red-200">
                      Unavailable
                    </span>
                  )}
                </div>

                {/* Stats row */}
                <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#64748B] pt-3 border-t border-[#F1F5F9]">
                  <span><strong className="text-[#0F172A]">{flat.bedrooms}</strong> Bedrooms</span>
                  <span className="text-[#E2E8F0]">|</span>
                  <span><strong className="text-[#0F172A]">{flat.bathrooms}</strong>  Washrooms</span>
                  <span className="text-[#E2E8F0]">|</span>
                  <span><strong className="text-[#0F172A]">{flat.areaSqft}</strong> sqft</span>
                  <span className="text-[#E2E8F0]">|</span>
                  <span>{flat.furnishingStatus}</span>
                  <span className="text-[#E2E8F0]">|</span>
                  <span>{flat.flatType}</span>
                </div>

                
              </div>

              {/* Tabs */}
              <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm overflow-hidden">
                <div className="flex border-b border-[#E2E8F0]">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-3.5 text-sm font-semibold capitalize transition-colors ${
                        activeTab === tab
                          ? "text-[#2563EB] border-b-2 border-[#2563EB] bg-blue-50/50"
                          : "text-[#64748B] hover:text-[#0F172A] hover:bg-[#F8FAFC]"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                <div className="p-5">
                  {/* Overview */}
                  {activeTab === "overview" && (
                    <div>
                      <h3 className="font-bold text-[#0F172A] mb-3">About this property</h3>
                      {flat.description ? (
                        <p className="text-[#64748B] text-sm leading-relaxed">{flat.description}</p>
                      ) : (
                        <p className="text-[#94A3B8] text-sm italic">No description provided.</p>
                      )}
                    </div>
                  )}

                  {/* Details */}
                  {activeTab === "details" && (
                    <div>
                      <h3 className="font-bold text-[#0F172A] mb-2">Property Details</h3>
                      <InfoRow icon="🛏" label="Bedrooms" value={flat.bedrooms} />
                      <InfoRow icon="🚿" label="Washrooms" value={flat.bathrooms} />
                      <InfoRow icon="📐" label="Area" value={`${flat.areaSqft} sqft`} />
                      <InfoRow icon="🏢" label="Flat Type" value={flat.flatType} />
                      <InfoRow icon="🪑" label="Furnishing" value={flat.furnishingStatus} />
                      <InfoRow icon="🏙" label="City" value={flat.city} />
                 
                      <InfoRow icon="📮" label="Pincode" value={flat.pincode} />
                   
                    </div>
                  )}

                  {/* Amenities */}
                  {activeTab === "amenities" && (
                    <div>
                      <h3 className="font-bold text-[#0F172A] mb-4">Amenities & Features</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <AmenityPill icon="" label="Pets Allowed"       available={flat.petsAllowed} />
                        <AmenityPill icon="" label="Parking Available"  available={flat.parkingAvailable} />
                        <AmenityPill icon="" label="Available Now"       available={flat.available} />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* ── Right: Sticky Price + Contact Card ── */}
            <div className="lg:col-span-1">
              <div className="sticky top-28">
                <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-md overflow-hidden">
                  {/* Rent header */}
                  <div className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] px-5 py-5">
                    <p className="text-white/70 text-xs font-medium mb-1">Monthly Rent</p>
                    <p className="text-white text-3xl font-extrabold">{formattedRent}</p>
                    <p className="text-white/60 text-xs">+ taxes as applicable</p>
                  </div>

                  <div className="p-5">
                    {/* Key Pills */}
                    <div className="grid grid-cols-2 gap-2 mb-5">
                      {[
                        { label: "Bedrooms", val: `${flat.bedrooms} BHK` },
                        { label: "Area",     val: `${flat.areaSqft} sqft` },
                        { label: "Pets",     val: flat.petsAllowed ? "Allowed" : "Not Allowed" },
                        { label: "Parking",  val: flat.parkingAvailable ? "Available" : "None" },
                      ].map(({ label, val }) => (
                        <div key={label} className="bg-[#F8FAFC] rounded-xl px-3 py-2.5 border border-[#E2E8F0]">
                          <p className="text-[#64748B] text-[10px] font-medium">{label}</p>
                          <p className="text-[#0F172A] text-xs font-bold mt-0.5">{val}</p>
                        </div>
                      ))}
                    </div>

                    {/* Owner section */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] mb-4">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] flex items-center justify-center text-white font-bold text-sm">
                        {ownerName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-[#64748B] text-[10px] font-medium">Listed by Owner</p>
                        <p className="text-[#0F172A] text-sm font-bold">{ownerName}</p>
                      </div>
                    </div>

                    {/* CTAs */}
                    {flat.available ? (
                      <>
                        <button
                          onClick={() => setShowModal(true)}
                          className="w-full py-3 mb-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-[#1D4ED8] hover:to-[#1E40AF] transition-all duration-200 active:scale-95"
                        >
                          Contact Owner
                        </button>

                        {ownerContact && (
                          <button
                            onClick={() => {
                              const msg = encodeURIComponent(`Hi, I'm interested in "${flat.title}". Please share more details.`);
                              window.open(`https://wa.me/${ownerContact.replace(/\D/g, "")}?text=${msg}`, "_blank");
                            }}
                            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                            </svg>
                            WhatsApp
                          </button>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-4 bg-gray-50 rounded-xl border border-gray-200">
                        <p className="text-gray-500 text-sm font-medium">This property is currently unavailable</p>
                      </div>
                    )}

                    {/* Trust badges */}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Sticky CTA */}
        {flat.available && (
          <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E2E8F0] px-4 py-3 shadow-2xl">
            <div className="flex gap-2">
              <button
                onClick={() => setShowModal(true)}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-semibold text-sm"
              >
                Contact Owner
              </button>
              {ownerContact && (
                <button
                  onClick={() => {
                    const msg = encodeURIComponent(`Hi, I'm interested in "${flat.title}".`);
                    window.open(`https://wa.me/${ownerContact.replace(/\D/g, "")}?text=${msg}`, "_blank");
                  }}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-semibold text-sm flex items-center justify-center gap-1.5"
                >
                  WhatsApp
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      <div className={flat.available ? "pb-20 lg:pb-0" : ""}>
        <Footer />
      </div>

      {/* Contact Modal */}
      {showModal && flat && (
        <ContactOwnerModal flat={flat} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default Details;