// import type { FeatureType } from "../../types";

// type Props = {
//   data: FeatureType;
// };

// const FeatureBox = ({ data }: Props) => {
//   return (
//     <div className="bg-gray-100 rounded-xl p-5 flex gap-4 items-start hover:shadow-md transition">
      
//       {/* Icon */}
//       <div className="bg-green-200 p-3 rounded-lg text-green-700 text-xl">
//         <i className="fas fa-search"></i>
//       </div>

//       <div>
//         <h3 className="font-semibold text-gray-900">
//           {data.title}
//         </h3>

//         <p className="text-sm text-gray-600 mt-1">
//           {data.description}
//         </p>

//         <span className="text-blue-600 text-sm mt-2 inline-block">
//           Search now
//         </span>
//       </div>
//     </div>
//   );
// };

// export default FeatureBox;











import type { FeatureType } from "../../types";

type Props = {
  data: FeatureType & { icon?: string; cta?: string; bg?: string };
};

const FeatureBox = ({ data }: Props) => {
  return (
    <div className="group relative overflow-hidden bg-white border border-[#E2E8F0] rounded-2xl p-6 hover:border-[#BFDBFE] hover:shadow-lg transition-all duration-300 cursor-pointer">
      {/* Gradient accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-50 to-transparent rounded-bl-full opacity-60 group-hover:opacity-100 transition-opacity" />

      <div className="relative">
        {/* Icon */}
        <div className="w-11 h-11 rounded-xl bg-[#EFF6FF] flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform duration-200">
          {data.icon || "🏠"}
        </div>

        <h3 className="text-[#0F172A] font-bold text-base mb-2 group-hover:text-[#2563EB] transition-colors">
          {data.title}
        </h3>
        <p className="text-[#64748B] text-sm leading-relaxed mb-4">
          {data.description}
        </p>

        <span className="text-[#2563EB] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
          {data.cta || "Learn more"}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </span>
      </div>
    </div>
  );
};

export default FeatureBox;