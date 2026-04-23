import { type FlatType } from "../types/index";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:8080";
const BASE = `${API_BASE_URL}/api/flats`;

export const flatApi = {
  getAll: async (): Promise<FlatType[]> => {
    const res = await fetch(BASE);

    if (!res.ok) {
      throw new Error("Failed to load flats");
    }

    const data = await res.json();
    return Array.isArray(data) ? data : data.flats ?? [];
  },

  getById: async (id: number): Promise<FlatType> => {
    const res = await fetch(`${BASE}/${id}`);

    if (!res.ok) {
      throw new Error(`Failed to load flat: ${res.status}`);
    }

    return res.json();
  },

  create: async (data: Partial<FlatType>): Promise<FlatType> => {
    const res = await fetch(BASE, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to create flat");
    }

    return res.json();
  },

  update: async (id: number, data: Partial<FlatType>): Promise<FlatType> => {
    const res = await fetch(`${BASE}/updated/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error("Failed to update flat");
    }

    return res.json();
  },

  updateWithFormData: async (id: string | number, formData: FormData): Promise<FlatType> => {
    const res = await fetch(`${BASE}/update/${id}`, {
      method: "PUT",
      body: formData,
    });

    if (!res.ok) {
      throw new Error("Failed to update flat");
    }

    return res.json();
  },

  toggleAvailability: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE}/${id}/toggle-availability`, {
      method: "PUT",
    });

    if (!res.ok) {
      throw new Error("Failed to toggle availability");
    }
  },

  delete: async (id: number): Promise<void> => {
    const res = await fetch(`${BASE}/delete-flat/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete flat");
    }
  },
};