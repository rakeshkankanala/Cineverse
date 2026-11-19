import React from "react";
import { Bookmark, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { posterUrl } from "../services/tmdb";
import { useWatchlist } from "../store/watchlist";

export default function MovieCard({ movie }) { 

  console.log("movie",movie) 
  
  const saved = useWatchlist(state => state.movies.some(item => item.id === movie.id));
  const addMovie = useWatchlist(state => state.addMovie);
  const removeMovie = useWatchlist(state => state.removeMovie);
  const toggle = (e) => {
    e.preventDefault(); e.stopPropagation();
    saved ? removeMovie(movie.id) : addMovie(movie);
  };
  return <article className="movie-card">
    <Link to={`/movie/${movie.id}`} className="poster-link">
      <div className="poster-frame">
        {movie.poster_path ? <img src={posterUrl(movie.poster_path)} alt={`${movie.title} poster`} loading="lazy"/> : <div className="poster-placeholder"><span>🎬</span><small>No poster</small></div>}
        <button className={`save-btn ${saved ? "is-saved" : ""}`} onClick={toggle} aria-label={saved ? "Remove from watchlist" : "Add to watchlist"}><Bookmark size={17} fill={saved ? "currentColor" : "none"}/></button>
        <span className="rating"><Star size={13} fill="currentColor"/> {movie.vote_average ? movie.vote_average.toFixed(1) : "—"}</span>
      </div>
      <div className="movie-meta"><h3>{movie.title || movie.name}</h3><p>{movie.release_date?.slice(0,4) || "Release date TBA"}</p></div>
    </Link>
  </article>;
}
