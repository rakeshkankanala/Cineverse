# CineVerse — Movie Discovery SPA

A responsive React single-page movie discovery app using React Router, Axios, Zustand, and LocalStorage persistence.

## Features
- Trending and popular movie discovery
- Movie search via TMDB REST API
- Movie details, genres, ratings, runtime, trailer link, and recommendations
- Persistent watchlist stored in browser LocalStorage
- Client-side routes: `/`, `/search?q=...`, `/movie/:id`, `/watchlist`
- Loading, error, empty, and missing-poster states
- Responsive layout and accessible labels for key controls

## Requirements
- Node.js 18+
- A TMDB API key (free developer account)

## Setup
1. Extract the project and open the folder in VS Code.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy `.env.example` to `.env` and add your API key:
   ```env
   VITE_TMDB_API_KEY=your_actual_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Create a production build:
   ```bash
   npm run build
   npm run preview
   ```

## API
This project uses The Movie Database (TMDB) API:
- `/trending/movie/week`
- `/movie/popular`
- `/search/movie`
- `/movie/{movie_id}?append_to_response=credits,videos,recommendations`

Get an API key from https://www.themoviedb.org/settings/api.

## Production notes
- Do not commit `.env`; add it to `.gitignore`.
- Browser-based API keys are visible to users. TMDB's API key is suitable for a public client app subject to its terms, but a production commercial application should proxy API requests through a backend and apply rate limiting/caching.
- Configure your hosting provider to rewrite unknown paths to `index.html` so BrowserRouter routes work on refresh.
- Add tests, monitoring, and a backend proxy before treating this as a high-traffic production deployment.
- TMDB attribution: This product uses the TMDB API but is not endorsed or certified by TMDB.
