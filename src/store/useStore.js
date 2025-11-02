import { create } from "zustand";
import { persist } from "zustand/middleware";

const useStore = create(
  persist(
    (set) => ({
      unit: "C",
      toggleUnit: () =>
        set((state) => ({ unit: state.unit === "C" ? "F" : "C" })),
      setUnit: (unit) => set({ unit }),
    }),
    { name: "unit-storage" }
  )
);

export default useStore;
