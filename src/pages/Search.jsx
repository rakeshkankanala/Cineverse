import React from "react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function Search() { 
  
  const [params] = useSearchParams();
  const query = params.get("q") || "";
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    let active = true;
    setLoading(true); setError("");
    if (!query.trim()) { setResults([]); setLoading(false); return; }
    searchMovies(query).then(data => { if (active) setResults(data.results || []); })
      .catch(err => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [query]); 

  return <main className="page-shell inner-page"><div className="page-title"><span className="eyebrow">THE SEARCH IS ON</span><h1>Results for <em>“{query}”</em></h1><p>{results.length} movies found</p></div>
    {loading ? <Loader/> : error ? <div className="state-message error">{error}</div> : results.length ? <div className="movie-grid">{results.map(movie => <MovieCard key={movie.id} movie={movie}/>)}</div> : <div className="empty-state"><span>⌕</span><h2>No movies found</h2><p>Try another title, actor, or keyword.</p></div>}
  </main>;
}
