import React from "react";
import { Film, Search, Bookmark } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useWatchlist } from "../store/watchlist";

export default function Header() {
  const [query, setQuery] = useState("");
  const count = useWatchlist(state => state.movies.length);
  const navigate = useNavigate();
  function submit(e) {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  }
  return <header className="site-header">
    <div className="nav-wrap">
      <NavLink to="/" className="brand"><span className="brand-icon"><Film size={21}/></span>cine<span>verse</span></NavLink>
      <nav className="main-nav">
        <NavLink to="/" end>Discover</NavLink>
        <NavLink to="/watchlist">My Watchlist</NavLink>
      </nav>
      <form className="nav-search" onSubmit={submit}>
        <Search size={17}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search movies..." aria-label="Search movies"/>
      </form>
      <NavLink to="/watchlist" className="watchlist-shortcut" aria-label={`Watchlist, ${count} movies`}><Bookmark size={19}/><span>{count}</span></NavLink>
    </div>
  </header>;
}
