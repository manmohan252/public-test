// // export type CardType = {
// //   id: number;
// //   title: string;
// //   description: string;
// //   image: string;
// // };

// export type FeatureType = {
//   id: number;
//   title: string;
//   description: string;
// };

// // src/types/index.ts

// export type CardType = {
//   id: number;
//   image: string;
//   title: string;
//   description: string;
// };

// export type FlatType = {
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
//   images: string[]; // e.g. ["/api/flats/images/1"]
//    owner_name?: string;
//   owner_contact?: string;
//   createdAt: string | null;
//   updatedAt: string | null;
// };


// export type Tab = "all" | "available" | "unavailable";


export type FeatureType = {
  id: number;
  title: string;
  description: string;
};

export type CardType = {
  id: number;
  image: string;
  title: string;
  description: string;
};

export type FlatType = {
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

  // ✅ camelCase — what Spring Boot actually returns
  ownerName?: string;
  ownerContactNumber?: string;


  createdAt: string | null;
  updatedAt: string | null;
};

export type Tab = "all" | "available" | "unavailable";

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
  images: string[]; // e.g. ["/api/flats/images/1"]
  ownerName?: string;
  ownerContact?: string;
  createdAt: string | null;
  updatedAt: string | null;
};