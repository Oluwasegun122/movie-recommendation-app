import React, { useState } from 'react';
import SearchBar from '../../components/ui/SearchBar';

export default function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchMovies = async (query) => {
    try {
      setLoading(true);
      const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=YOUR_TMDB_API_KEY&query=${query}`);
      const data = await res.json();
      setMovies(data.results || []);
    } catch (err) {
      console.error('Search failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4">
      <SearchBar onSearch={searchMovies} />
      {loading ? (
        <p className="mt-4 text-center text-gray-500">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-6">
          {movies.map((movie) => (
            <Link
                key={movie.id}
                to={`/movies/${movie.id}`}
                className="border rounded p-3 shadow hover:shadow-md transition block"
            >
                <h3 className="font-semibold mb-1">{movie.title}</h3>
                <p className="text-xs text-gray-600">{movie.release_date}</p>
                <p className="text-sm mt-2 line-clamp-3">{movie.overview}</p>
            </Link>
            ))}
        </div>
      )}
    </div>
  );
}
