import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useComponentStore = create((set, get) => ({
  components: [],
  isLoading: false,
  error: null,

  fetchComponents: async (page = 1, limit = 20) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.get(`/components?page=${page}&limit=${limit}`);
      set({ components: res.data.components });
    } catch (error) {
      set({ error: error.response?.data?.message || "Error fetching components" });
      toast.error(get().error);
    } finally {
      set({ isLoading: false });
    }
  },

  uploadComponent: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axiosInstance.post("/components", data);
      set((state) => ({ components: [res.data, ...state.components] }));
      toast.success("Componente subido!");
    } catch (error) {
      set({ error: error.response?.data?.message || "Error uploading component" });
      toast.error(get().error);
    } finally {
      set({ isLoading: false });
    }
  },
}));