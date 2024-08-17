import axios from "axios";
import { create } from "zustand";

export const useProductStore = create((set) => ({
  loading: false,
  products: [],
  error: "",
  fetchProducts: async () => {
    set((state: { loading: boolean; products: unknown[]; error: string }) => ({
      ...state,
      loading: true,
    }));
    try {
      const res = await axios.get("http://localhost:3000/products");
      const data = await res.data;
      set(() => ({
        loading: false,
        products: data,
        error: "",
      }));
    } catch (err) {
      set(() => ({
        loading: false,
        products: [],
        error: err instanceof Error ? err.message : String(err),
      }));
    }
  },
}));
