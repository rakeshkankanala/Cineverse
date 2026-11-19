import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Watchlist from "./pages/Watchlist";
import MovieDetails from "./pages/MovieDetails";

function NotFound() {
  return <main className="page-shell inner-page empty-state"><h1>404</h1><h2>This scene doesn't exist.</h2><a className="primary-btn" href="/">Back to discovery</a></main>;
}
export default function App() {
  return <><Header /><Routes><Route path="/" element={<Home />} /><Route path="/search" element={<Search />} /><Route path="/watchlist" element={<Watchlist />} /><Route path="/movie/:id" element={<MovieDetails />} /><Route path="*" element={<NotFound />} /></Routes><footer className="site-footer"><span className="brand">cine<span>verse</span></span><p>Made for the love of movies.</p><small>Movie data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</small></footer></>;
}
