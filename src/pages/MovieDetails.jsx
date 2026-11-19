import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Bookmark, Star, CalendarDays, Clock3 } from "lucide-react";
import { getMovie, posterUrl } from "../services/tmdb";
import { useWatchlist } from "../store/watchlist";
import Loader from "../components/Loader";
import MovieCard from "../components/MovieCard";

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const saved = useWatchlist(state => state.movies.some(item => item.id === Number(id)));
  const add = useWatchlist(state => state.addMovie);
  const remove = useWatchlist(state => state.removeMovie);
  useEffect(() => {
    let active = true; setLoading(true);
    getMovie(id).then(data => { if (active) setMovie(data); })
      .catch(err => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [id]);
  if (loading) return <Loader/>;
  if (error || !movie) return <div className="state-message error">{error || "Movie not found."}</div>;
  const trailer = movie.videos?.results?.find(v => v.site === "YouTube" && v.type === "Trailer");
  return <main className="page-shell inner-page">
    <section className="detail-layout">
      <div className="detail-poster">{movie.poster_path ? <img src={posterUrl(movie.poster_path, "w780")} alt={`${movie.title} poster`}/> : <div className="poster-placeholder">🎬</div>}</div>
      <div className="detail-copy"><span className="eyebrow">MOVIE SPOTLIGHT</span><h1>{movie.title}</h1><p className="tagline">{movie.tagline}</p>
        <div className="detail-stats"><span><Star size={16} fill="currentColor"/> {movie.vote_average?.toFixed(1)} / 10</span><span><CalendarDays size={16}/> {movie.release_date || "TBA"}</span><span><Clock3 size={16}/> {movie.runtime ? `${movie.runtime} min` : "Runtime TBA"}</span></div>
        <div className="genre-list">{movie.genres?.map(g => <span key={g.id}>{g.name}</span>)}</div>
        <h2>Overview</h2><p className="overview">{movie.overview || "No overview is available for this title."}</p>
        <button className="primary-btn" onClick={() => saved ? remove(movie.id) : add(movie)}><Bookmark size={17} fill={saved ? "currentColor" : "none"}/>{saved ? "Remove from watchlist" : "Add to watchlist"}</button>
        {trailer && <a className="trailer-link" href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noreferrer">Watch trailer ↗</a>}
      </div>
    </section>
    {movie.recommendations?.results?.length > 0 && <section className="movie-section"><div className="section-heading"><div><span className="eyebrow">KEEP EXPLORING</span><h2>You might also like</h2></div></div><div className="movie-grid">{movie.recommendations.results.slice(0,5).map(item => <MovieCard key={item.id} movie={item}/>)}</div></section>}
  </main>;
}
