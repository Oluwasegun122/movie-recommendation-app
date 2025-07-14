import axios from "axios";

const API_URL = "/api/dashboard";

export const getWatchlist = async (token) => {
  const res = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};

export const saveToWatchlist = async (movie, token) => {
  console.log("Saving movie to watchlist:", movie);
  console.log("Using token:", token);
  return await axios.post("http://localhost:5000/api/users/watchlist", movie, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const removeFromWatchlist = async (id, token) => {
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};
