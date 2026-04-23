import { useEffect } from "react";
import type { FlatType } from "../../types";

type Props = {
  flat: FlatType;
  onClose: () => void;
};

const ContactOwnerModal = ({ flat, onClose }: Props) => {
  const ownerName = flat.ownerName || "Property Owner";
  const ownerContact = flat.ownerContactNumber || null;

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleCall = () => {
    if (ownerContact) window.location.href = `tel:${ownerContact}`;
  };

  const handleWhatsApp = () => {
    if (ownerContact) {
      const msg = encodeURIComponent(
        `Hi, I'm interested in your property: "${flat.title}". Please let me know more details.`
      );
      window.open(`https://wa.me/${ownerContact.replace(/\D/g, "")}?text=${msg}`, "_blank");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-[#0F172A]/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative z-10 bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl shadow-2xl overflow-hidden animate-slide-up">

        {/* Header */}
        <div className="bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] px-6 pt-6 pb-8">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center text-white transition-colors"
            aria-label="Close"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-white/20 flex items-center justify-center border-2 border-white/40">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="white" opacity="0.9">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </div>
            <div>
              <p className="text-white/70 text-xs font-medium mb-0.5">Listed by Owner</p>
              <p className="text-white font-bold text-lg leading-tight">{ownerName}</p>
            </div>
          </div>
        </div>

        {/* Property context */}
        <div className="mx-6 -mt-4 bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#EFF6FF] flex items-center justify-center shrink-0">
            🏠
          </div>
          <div className="min-w-0">
            <p className="text-[#0F172A] text-xs font-semibold truncate">{flat.title}</p>
            <p className="text-[#64748B] text-xs truncate">{flat.city}, {flat.state}</p>
          </div>
          <span className="ml-auto shrink-0 text-sm font-bold text-[#2563EB]">
            £{new Intl.NumberFormat("en-IN").format(flat.rentAmount)}/mo
          </span>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          {ownerContact ? (
            <>
              <div className="bg-[#F8FAFC] rounded-xl p-4 flex items-center justify-between mb-4 border border-[#E2E8F0]">
                <div>
                  <p className="text-[#64748B] text-xs mb-1">Contact Number</p>
                  <p className="text-[#0F172A] font-bold text-base tracking-wide">{ownerContact}</p>
                </div>
                <div className="w-9 h-9 bg-green-50 rounded-full flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 013 2.18 2 2 0 015.18 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L9.91 7.09a16 16 0 006 6l.49-.49a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                </div>
              </div>

              {/* CTA Buttons */}
              <button
                onClick={handleCall}
                className="w-full py-3 mb-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#1D4ED8] text-white font-semibold text-sm shadow-md hover:shadow-lg hover:from-[#1D4ED8] hover:to-[#1E40AF] transition-all duration-200 active:scale-95"
              >
                📞 Call Now
              </button>

              <button
                onClick={handleWhatsApp}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#16A34A] to-[#15803D] text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-200 active:scale-95 flex items-center justify-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Chat on WhatsApp
              </button>
            </>
          ) : (
            <div className="text-center py-4">
              <p className="text-[#64748B] text-sm">Contact information not available</p>
            </div>
          )}

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-4 text-[#64748B] text-xs">
            <span className="flex items-center gap-1">✅ Verified Listing</span>
            <span className="flex items-center gap-1">⚡ Quick Response</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slide-up {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-up { animation: slide-up 0.25s ease-out; }
      `}</style>
    </div>
  );
};

export default ContactOwnerModal;