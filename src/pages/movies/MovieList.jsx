import { useEffect, useState, useContext } from "react";
import ThemeCard from "../../components/ui/ThemeCard";
import BackgroundSection from "../../components/ui/BackgroundSection";
import Spinner from "../../components/ui/Spinner";
import { getTrendingMovies, searchMovies } from "../../services/movieService";
import { saveToWatchlist } from "../../services/watchlistService";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import SearchBar from "../../components/ui/SearchBar";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const data = await getTrendingMovies(user?.token);
        console.log("Fetched movies:", data);
        setMovies(data);
      } catch (error) {
        console.error("Failed to fetch movies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleSearch = async (query) => {
    try {
      setLoading(true);
      const data = await searchMovies(query);
      setMovies(data);
    } catch (err) {
      console.error("Search failed:", err);
    } finally {
      setLoading(false);
    }
  };

  const getMoviesId = movies.map((movie) => movie.id);
  console.log("Movies IDs:", getMoviesId);

  const handleSave = async (movie) => {
    if (!user?.token) {
      toast.error("Please login to save movies");
      return;
    }

    try {
      await saveToWatchlist(movie, user.token);
      toast.success("Saved to Watchlist!");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Error saving movie");
    }
  };

  return (
    <BackgroundSection>
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800 dark:text-white">
        Trending Movies
      </h1>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <div className="flex justify-center">
          <Spinner />
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {movies.map((movie) => (
            <ThemeCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              description={movie.overview.slice(0, 100) + "..."}
              imageUrl={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              onSave={() =>
                handleSave({
                  movieId: movie.id,
                  title: movie.title,
                  overview: movie.overview,
                  poster_path: movie.poster_path,
                  backdrop_path: movie.backdrop_path,
                  release_date: movie.release_date,
                  genre_ids: movie.genre_ids,
                })
              }
            />
          ))}
        </div>
      )}
    </BackgroundSection>
  );
};

export default MovieList;
