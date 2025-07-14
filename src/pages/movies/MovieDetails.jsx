import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { getMovieDetails } from "../../services/movieService";
import { saveToWatchlist } from "../../services/watchlistService";
import { AuthContext } from "../../context/AuthContext";
import { Heart, Bookmark } from "lucide-react";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSaved, setIsSaved] = useState(false);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!user) {
      toast.error("Please login to view movie details");
      navigate("/login");
    }
  }, [user, navigate]);

  console.log("👤 User context:", user);

  // ✅ Fetch movie only if user is logged in
  useEffect(() => {
    const fetchMovie = async () => {
      if (!user) return; // Prevent running before redirect

      try {
        const data = await getMovieDetails(id, user.token);
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie:", error);
        toast.error("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id, user]);

  const handleSave = async () => {
    if (!user?.token) {
      toast.error("Please login to save movies");
      return;
    }

    try {
      console.log("💾 Token inside handleSave:", user.token);
      await saveToWatchlist(
        {
          movieId: movie.id,
          title: movie.title,
          overview: movie.overview,
          poster_path: movie.poster_path,
          backdrop_path: movie.backdrop_path,
          release_date: movie.release_date,
          genre_ids: movie.genres?.map((g) => g.id) || [],
        },
        user.token
      );

      toast.success("Movie saved to watchlist!");
      setIsSaved(true); // ✅ Disable button
    } catch (error) {
      const message = error?.response?.data?.message || "Error saving movie";
      toast.error(message);

      // Still disable button if already saved
      if (message.includes("already")) setIsSaved(true);
    }
  };

  if (loading) return <Spinner />;
  if (!movie)
    return <p className="text-center p-4 text-red-500">Movie not found.</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-6">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="w-full md:w-1/3 rounded shadow"
        />
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            {movie.title}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {movie.release_date?.slice(0, 4)} • {movie.runtime} mins
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            {movie.overview}
          </p>
          <div className="flex items-center gap-4">
            <button
              onClick={handleSave}
              disabled={isSaved}
              className={`flex items-center gap-1 px-4 py-2 rounded shadow ${
                isSaved
                  ? "bg-gray-400 text-white cursor-not-allowed"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              <Bookmark className="w-4 h-4" />
              {isSaved ? "Saved" : "Save"}
            </button>

            <button
              disabled
              className="flex items-center gap-1 text-pink-600 px-4 py-2 border border-pink-600 rounded hover:bg-pink-50"
            >
              <Heart className="w-4 h-4" />
              Love
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
