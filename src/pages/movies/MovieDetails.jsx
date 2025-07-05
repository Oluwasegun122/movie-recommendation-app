import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/ui/Spinner';

export default function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_TMDB_API_KEY`
        );
        const data = await res.json();
        setMovie(data);
      } catch (err) {
        console.error('Error fetching movie:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  if (loading) return <Spinner />;
  if (!movie) return <p className="text-center text-red-500">Movie not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-2">{movie.title}</h1>
      <p className="text-sm text-gray-600 mb-4">{movie.release_date}</p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
        className="w-full max-w-xs mb-4"
      />
      <p className="text-gray-700 leading-relaxed">{movie.overview}</p>
    </div>
  );
}
