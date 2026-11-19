// import axios from "axios";

// const api = axios.create({
//   baseURL: "https://api.themoviedb.org/3",
//   timeout: 12000,
//   params: { api_key: import.meta.env.VITE_TMDB_API_KEY }
// });



// api.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const message = error.response?.data?.status_message || error.message || "Something went wrong.";
//     return Promise.reject(new Error(message));
//   }
// );

// export const IMAGE_BASE = "https://image.tmdb.org/t/p/";
// export const posterUrl = (path, size = "w500") => path ? `${IMAGE_BASE}${size}${path}` : "";
// export const getTrending = () => api.get("/trending/movie/week").then(r => r.data.results);
// export const getPopular = (page = 1) => api.get("/movie/popular", { params: { page } }).then(r => r.data.results);
// export const searchMovies = (query, page = 1) =>api.get("/search/movie", { params: { query, page, include_adult: false } }).then(r => r.data);
// export const getMovie = (id) => api.get(`/movie/${id}`, { params: { append_to_response: "credits,videos,recommendations" } }).then(r => r.data);
// export const getGenres = () => api.get("/genre/movie/list").then(r => r.data.genres);



import axios from "axios";

// 1. Get API Key from .env file
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

// 2. Validate API Key
if (!API_KEY) {
  console.error("TMDB API Key is missing! Check your .env file.");
} else {
  console.log("TMDB API Key loaded successfully!");
}

// 3. Create Axios Instance
const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  timeout: 12000,
  params: {
    api_key: API_KEY,
  },
});

// 4. Response Interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let message = "Something went wrong.";

    if (error.response) {
      const status = error.response.status;
      const apiMessage = error.response.data?.status_message;

      if (status === 401) {
        message = "Invalid TMDB API Key. Please check your .env file.";
      } else if (status === 404) {
        message = "Requested movie or resource not found.";
      } else if (status === 429) {
        message = "Too many requests. Please try again later.";
      } else {
        message = apiMessage || error.message;
      }
    } else if (error.request) {
      message = "Unable to connect to TMDB. Check your internet connection.";
    } else {
      message = error.message;
    }

    console.error("TMDB API Error:", message);

    return Promise.reject(new Error(message));
  }
);

// 5. Image Configuration
export const IMAGE_BASE = "https://image.tmdb.org/t/p/";

export const posterUrl = (path, size = "w500") => {
  return path ? `${IMAGE_BASE}${size}${path}` : "";
};

// 6. Get Trending Movies
export const getTrending = () => {
  return api.get("/trending/movie/week").then((response) => {
    return response.data.results;
  });
};

// 7. Get Popular Movies
export const getPopular = (page = 1) => {
  return api.get("/movie/popular", {
    params: { page },
  }).then((response) => {
    return response.data.results;
  });
};

// 8. Search Movies
export const searchMovies = (query, page = 1) => {
  return api.get("/search/movie", {
    params: {
      query,
      page,
      include_adult: false,
    },
  }).then((response) => {
    return response.data;
  });
};

// 9. Get Movie Details
export const getMovie = (id) => {
  return api.get(`/movie/${id}`, {
    params: {
      append_to_response: "credits,videos,recommendations",
    },
  }).then((response) => {
    return response.data;
  });
};

// 10. Get Movie Genres
export const getGenres = () => {
  return api.get("/genre/movie/list").then((response) => {
    return response.data.genres;
  });
};

// 11. Export Axios Instance
export default api;
