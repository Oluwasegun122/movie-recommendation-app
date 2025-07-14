import axios from "axios";
import { BASE_URL } from "../utils/constants";
const API_KEY = import.meta.env.TMDB_API_KEY;
const API_URL = import.meta.env.BASE_URL;
const BASE_URL_M = "https://api.themoviedb.org/3";
const BASE_URL_T = "http://localhost:5000/api";

export const getWatchlist = async (token) => {
  const { data } = await axios.get("/api/users/watchlist", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const removeFromWatchlist = async (movieId, token) => {
  const { data } = await axios.delete(`/api/users/watchlist/${movieId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

export const getTrendingMovies = async (token) => {
  const res = await axios.get("http://localhost:5000/api/movies/trending", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

// // 🔥 Get trending movies
// export const getTrendingMovies = async () => {
//   const res = await axios.get(`${BASE_URL}/trending/movie/day`, {
//     params: { api_key: TMDB_API_KEY },
//   });
//   return res.data.results;
// };

// ✅ Get single movie details
export const getMovieDetails = async (id, token) => {
  const res = await axios.get(`${BASE_URL_T}/movies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const searchMovies = async (query) => {
  const response = await axios.get(
    `http://localhost:5000/api/movies/search?query=${query}`
  );
  return response.data;
};
