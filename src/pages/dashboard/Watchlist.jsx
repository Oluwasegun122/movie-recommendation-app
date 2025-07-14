import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import {
  getWatchlist,
  removeFromWatchlist,
} from "../../services/watchlistService";
import Spinner from "../../components/ui/Spinner";
import toast from "react-hot-toast";

const Watchlist = () => {
  const { user } = useContext(AuthContext);
  const [watchlist, setWatchlist] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchWatchlist = async () => {
    try {
      const data = await getWatchlist(user.token);
      setWatchlist(data);
    } catch (error) {
      toast.error("Failed to fetch watchlist.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user?.token) {
      fetchWatchlist();
    }
  }, [user]);

  const handleRemove = async (id) => {
    try {
      await removeFromWatchlist(id, user.token);
      setWatchlist((prev) => prev.filter((movie) => movie._id !== id));
      toast.success("Removed from watchlist");
    } catch (error) {
      toast.error("Failed to remove movie.");
    }
  };

  if (!user?.token)
    return (
      <p className="text-center mt-10 text-red-500">
        Please log in to view your watchlist.
      </p>
    );
  if (loading) return <Spinner />;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 dark:text-white">
        My Watchlist
      </h2>
      {watchlist.length === 0 ? (
        <p className="text-gray-600 dark:text-gray-300">
          Your watchlist is empty.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {watchlist.map((movie) => (
            <div
              key={movie._id}
              className="bg-white dark:bg-gray-800 rounded shadow p-4"
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="rounded"
              />
              <h3 className="mt-2 text-lg font-semibold">{movie.title}</h3>
              <button
                onClick={() => handleRemove(movie._id)}
                className="mt-2 text-red-500 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Watchlist;
