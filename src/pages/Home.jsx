
import React from "react";
import { useEffect, useState } from "react";
import { getPopular, getTrending } from "../services/tmdb";
import MovieCard from "../components/MovieCard";
import Loader from "../components/Loader";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(""); 

  useEffect(() => {
    let active = true;
    Promise.all([getTrending(), getPopular()])
      .then(([t, p]) => { if (active) { setTrending(t); setPopular(p); } })
      .catch(err => { if (active) setError(err.message); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);
  if (loading) return <Loader />;
  if (error) return <div className="state-message error"><h2>Unable to load movies</h2><p>{error}</p><p>Check your TMDB API key in the .env file and try again.</p></div>;
  return <main className="page-shell">
    <section className="hero">
      <div className="hero-copy"><span className="eyebrow">YOUR MOVIE UNIVERSE</span><h1>Find your next<br /><em>favourite film.</em></h1><p>Explore trending stories, hidden gems, and timeless favourites — all in one place.</p><a className="primary-btn" href="#trending">Explore movies <span>↘</span></a></div>
      <div className="hero-art"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="film-reel">✦</div><div className="hero-caption">A world of stories<br /><b>starts here.</b></div></div>
      <div className="hero-index">01 <span></span></div>
    </section>
    <MovieSection id="trending" title="Trending this week" subtitle="The stories everyone's talking about" movies={trending} />
    <MovieSection title="Popular right now" subtitle="Crowd favourites worth your time" movies={popular} />
  </main>;
}
function MovieSection({ id, title, subtitle, movies }) {
  return <section className="movie-section" id={id}><div className="section-heading"><div>
    <span className="eyebrow">CURATED FOR YOU</span><h2>{title}</h2><p>{subtitle}</p></div></div><div className="movie-grid">{movies?.slice(0, 10).map(movie => <MovieCard key={movie.id} movie={movie} />)}</div></section>;
}
