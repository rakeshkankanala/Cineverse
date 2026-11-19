import React from "react";
import { Bookmark, Trash2 } from "lucide-react";
import MovieCard from "../components/MovieCard";
import { useWatchlist } from "../store/watchlist";

export default function Watchlist() {
  const movies = useWatchlist(state => state.movies);
  const clear = useWatchlist(state => state.clearWatchlist);
  return <main className="page-shell inner-page"><div className="page-title title-row"><div>
    <span className="eyebrow">SAVED FOR LATER</span><h1>My <em>watchlist.</em></h1>
    <p>{movies.length} {movies.length === 1 ? "movie" : "movies"} saved on this device</p>
    </div>{movies.length > 0 && <button className="clear-btn" onClick={() => 
      { if (window.confirm("Clear your entire watchlist?")) clear(); }}><Trash2 size={16} /> Clear all</button>}
      </div>
    {movies.length ? <div className="movie-grid">{movies.map(movie => <MovieCard key={movie.id} movie={movie} />)}</div> :
     <div className="empty-state"><Bookmark size={34} /><h2>Your watchlist is waiting</h2><p>Save movies as you explore and they'll be kept here between visits.</p></div>}
  </main>;
}
