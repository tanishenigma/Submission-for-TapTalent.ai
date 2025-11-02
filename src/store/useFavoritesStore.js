import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useFavoritesStore = create(
  persist(
    (set, get) => ({
      favorites: [],

      addFavorite: (cityData) => {
        if (!cityData?.id || !cityData?.name || !cityData?.main) {
          console.error("Invalid city data:", cityData);
          return;
        }

        set((state) => {
          const exists = state.favorites.some((fav) => fav.id === cityData.id);
          if (exists) return state;

          const favCity = {
            id: cityData.id,
            name: cityData.name,
            country: cityData.sys?.country,
            data: cityData,
          };

          return {
            favorites: [...state.favorites, favCity],
          };
        });
      },

      removeFavorite: (cityId) => {
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== cityId),
        }));
      },

      isFavorite: (cityId) => {
        if (!cityId) return false;
        return get().favorites.some((fav) => fav.id === cityId);
      },

      getFavorites: () => {
        const validFavorites = get().favorites.filter(
          (fav) => fav?.data?.id && fav?.data?.name && fav?.data?.main
        );
        return validFavorites;
      },

      clearFavorites: () => set({ favorites: [] }),
    }),
    {
      name: "favorites-storage",
      partialize: (state) => ({
        favorites: state.favorites.filter(
          (fav) => fav?.data?.id && fav?.data?.name && fav?.data?.main
        ),
      }),
    }
  )
);
