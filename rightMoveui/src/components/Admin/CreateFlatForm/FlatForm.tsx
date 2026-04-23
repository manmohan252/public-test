import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../pages/Admin/CreateFlatPage/CreateFlatPage.css";

export type FurnishingStatus = "FURNISHED" | "SEMI_FURNISHED" | "UNFURNISHED";
export type FlatType = "1BHK" | "2BHK" | "3BHK" | "4BHK" | "STUDIO" | "PENTHOUSE" | "VILLA";

export interface FlatFormData {
  title: string;
  description: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  rentAmount: number | "";
  bedrooms: number | "";
  bathrooms: number | "";
  areaSqft: number | "";
  flatType: FlatType | "";
  furnishingStatus: FurnishingStatus | "";
  petsAllowed: boolean;
  parkingAvailable: boolean;

  // ✅ Added
  ownerName: string;
  ownerContactNumber: string;
}

export type FlatFormErrors = Partial<Record<keyof FlatFormData, string>>;

interface FlatFormSectionProps {
  form: FlatFormData;
  errors: FlatFormErrors;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onFlatTypeSelect: (type: FlatType) => void;
  onToggle: (field: "petsAllowed" | "parkingAvailable") => void;
}

const FLAT_TYPES: FlatType[] = ["STUDIO", "1BHK", "2BHK", "3BHK", "4BHK", "PENTHOUSE", "VILLA"];
const FURNISHING_OPTIONS: { value: FurnishingStatus; label: string }[] = [
  { value: "FURNISHED", label: "Fully Furnished" },
  { value: "SEMI_FURNISHED", label: "Semi Furnished" },
  { value: "UNFURNISHED", label: "Unfurnished" },
];

export default function FlatFormSection({
  form, errors, onChange, onFlatTypeSelect, onToggle,
}: FlatFormSectionProps) {

  const navigate = useNavigate();

  return (
    <div className="form-sections">

      

      {/* Basic Info */}
      <div className="card">
        <div className="card-label">
          <span className="label-dot" />
          Basic Information
        </div>

        <div className="field-stack">

          {/* ✅ Owner Details Added */}
          <div className="grid-2">
          <div className="field">
            <label>Owner Name <span className="req">*</span></label>
            <input
              type="text"
              name="ownerName"
              value={form.ownerName}
              onChange={onChange}
              placeholder="Owner full name"
              className={errors.ownerName ? "err" : ""}
            />
            {errors.ownerName && <span className="field-err">⚠ {errors.ownerName}</span>}
          </div>
            <div className="field">
            <label>Owner Contact <span className="req">*</span></label>
            <input
               type="number"
              name="ownerContactNumber"
              value={form.ownerContactNumber}
              onChange={onChange}
              placeholder="Owner contact number"
              className={errors.ownerContactNumber ? "err" : ""}
            />
            {errors.ownerContactNumber && <span className="field-err">⚠ {errors.ownerContactNumber}</span>}
          </div>

</div>
          {/* Existing fields unchanged */}
          <div className="field">
            <label>Listing Title <span className="req">*</span></label>
            <input
              type="text" name="title" value={form.title} onChange={onChange}
              placeholder="e.g. Bright 2BHK with Garden View, Indiranagar"
              className={errors.title ? "err" : ""}
            />
            {errors.title && <span className="field-err">⚠ {errors.title}</span>}
          </div>

          <div className="field">
            <label>Description <span className="req">*</span></label>
            <textarea
              name="description" value={form.description} onChange={onChange}
              placeholder="Describe the flat's highlights, nearby metro, amenities..."
              className={errors.description ? "err" : ""}
            />
            {errors.description && <span className="field-err">⚠ {errors.description}</span>}
          </div>
        </div>
      </div>

      {/* बाकी पूरा code SAME as it is */}

      {/* Location */}
      <div className="card">
        <div className="card-label"><span className="label-dot" />Location</div>
        <div className="field-stack">
          <div className="field">
            <label>Street Address <span className="req">*</span></label>
            <input
              type="text" name="address" value={form.address} onChange={onChange}
              placeholder="Building name, street, landmark"
              className={errors.address ? "err" : ""}
            />
            {errors.address && <span className="field-err">⚠ {errors.address}</span>}
          </div>
          <div className="grid-3">
            <div className="field">
              <label>City <span className="req">*</span></label>
              <input type="text" name="city" value={form.city} onChange={onChange}
                placeholder="Enter city" className={errors.city ? "err" : ""} />
              {errors.city && <span className="field-err">⚠ {errors.city}</span>}
            </div>
            <div className="field">
              <label>State <span className="req">*</span></label>
              <input type="text" name="state" value={form.state} onChange={onChange}
                placeholder="Enter state" className={errors.state ? "err" : ""} />
              {errors.state && <span className="field-err">⚠ {errors.state}</span>}
            </div>
            <div className="field">
              <label>Pincode</label>
              <input type="text" name="pincode" value={form.pincode} onChange={onChange} placeholder="560001" />
            </div>
          </div>
        </div>
      </div>

      {/* Flat Type */}
      <div className="card">
        <div className="card-label"><span className="label-dot" />Flat Type <span className="req">*</span></div>
        <div className="type-pills">
          {FLAT_TYPES.map((t) => (
            <button
              key={t} type="button"
              className={`pill${form.flatType === t ? " pill-active" : ""}${errors.flatType ? " pill-err" : ""}`}
              onClick={() => onFlatTypeSelect(t)}
            >{t}</button>
          ))}
        </div>
        {errors.flatType && <span className="field-err" style={{ marginTop: 8, display: "block" }}>⚠ {errors.flatType}</span>}
      </div>

      {/* Pricing & Specs */}
      <div className="card">
        <div className="card-label"><span className="label-dot" />Pricing & Specs</div>
        <div className="grid-2">
          <div className="field">
            <label>Monthly Rent (£) <span className="req">*</span></label>
            <div className="input-prefix">
              <span>£</span>
              <input type="number" name="rentAmount" value={form.rentAmount} onChange={onChange}
                placeholder="25000" min={0} className={errors.rentAmount ? "err" : ""} style={{ paddingLeft: 36 }} />
            </div>
            {errors.rentAmount && <span className="field-err">⚠ {errors.rentAmount}</span>}
          </div>
          <div className="field">
            <label>Area (sq ft)</label>
            <input type="number" name="areaSqft" value={form.areaSqft} onChange={onChange} placeholder="950" min={0} />
          </div>
          <div className="field">
            <label>Bedrooms <span className="req">*</span></label>
            <input type="number" name="bedrooms" value={form.bedrooms} onChange={onChange}
              placeholder="2" min={1} className={errors.bedrooms ? "err" : ""} />
            {errors.bedrooms && <span className="field-err">⚠ {errors.bedrooms}</span>}
          </div>
          <div className="field">
            <label>Bathrooms</label>
            <input type="number" name="bathrooms" value={form.bathrooms} onChange={onChange} placeholder="2" min={0} />
          </div>
        </div>
      </div>

      {/* Furnishing */}
      <div className="card">
        <div className="card-label"><span className="label-dot" />Furnishing Status</div>
        <select name="furnishingStatus" value={form.furnishingStatus} onChange={onChange}>
          <option value="">Select furnishing status</option>
          {FURNISHING_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Amenities */}
      <div className="card">
        <div className="card-label"><span className="label-dot" />Amenities</div>
        <div className="toggle-row">
          {(["petsAllowed", "parkingAvailable"] as const).map((field) => (
            <div
              key={field}
              className={`toggle-chip${form[field] ? " on" : ""}`}
              onClick={() => onToggle(field)}
            >
              <div className="chip-track">
                <div className="chip-thumb" />
              </div>
              <span>{field === "petsAllowed" ? "🐾 Pets Allowed" : "🚗 Parking Available"}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}