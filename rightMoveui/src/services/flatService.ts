// src/services/flatService.ts

import type { FlatType } from "../types";

const BASE_URL = "http://localhost:8080";

export const getAllFlats = async (): Promise<FlatType[]> => {
  const response = await fetch(`${BASE_URL}/api/flats`);
  if (!response.ok) throw new Error("Failed to fetch flats");
  const data: FlatType[] = await response.json();
  console.log("✅ getAllFlats response:", data);
  return data;
};

export const getFlatById = async (id: number | string): Promise<FlatType> => {
  const response = await fetch(`${BASE_URL}/api/flats/${id}`);
  if (!response.ok) throw new Error(`Failed to fetch flat with id: ${id}`);
  const data: FlatType = await response.json();
  console.log(`✅ getFlatById(${id}) response:`, data);
  return data;
};

export const getImageUrl = (imagePath: string): string => {
  return `${BASE_URL}${imagePath}`;
};

export const getAvailableFlats = async (): Promise<FlatType[]> => {
  const response = await fetch(`${BASE_URL}/api/flats/available`);
  if (!response.ok) throw new Error("Failed to fetch available flats");
  const data: FlatType[] = await response.json();
  console.log("✅ getAvailableFlats response:", data);
  return data;
}