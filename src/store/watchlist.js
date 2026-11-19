import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useWatchlist = create(
  persist(
    (set, get) => ({
      movies: [],
      addMovie: (movie) => {
        if (get().movies.some(item => item.id === movie.id)) return;
        set(state => ({ movies: [movie, ...state.movies] }));
      },
      removeMovie: (id) => set(state => ({ movies: state.movies.filter(movie => movie.id !== id) })),
      hasMovie: (id) => get().movies.some(movie => movie.id === id),
      clearWatchlist: () => set({ movies: [] })
    }),
    { name: "cineverse-watchlist", storage: createJSONStorage(() => localStorage) }
  )
);
