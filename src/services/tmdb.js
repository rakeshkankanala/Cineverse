import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 12000,
  params: { api_key: import.meta.env.VITE_TMDB_API_KEY }
});



api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.status_message || error.message || "Something went wrong.";
    return Promise.reject(new Error(message));
  }
);

export const IMAGE_BASE = "https://image.tmdb.org/t/p/";
export const posterUrl = (path, size = "w500") => path ? `${IMAGE_BASE}${size}${path}` : "";
export const getTrending = () => api.get("/trending/movie/week").then(r => r.data.results);
export const getPopular = (page = 1) => api.get("/movie/popular", { params: { page } }).then(r => r.data.results);
export const searchMovies = (query, page = 1) =>api.get("/search/movie", { params: { query, page, include_adult: false } }).then(r => r.data);
export const getMovie = (id) => api.get(`/movie/${id}`, { params: { append_to_response: "credits,videos,recommendations" } }).then(r => r.data);
export const getGenres = () => api.get("/genre/movie/list").then(r => r.data.genres);
