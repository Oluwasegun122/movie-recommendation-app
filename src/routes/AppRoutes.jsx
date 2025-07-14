import { Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import MovieList from "../pages/movies/MovieList";
import MovieDetails from "../pages/movies/MovieDetails";
import Watchlist from "../pages/dashboard/Watchlist";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MovieList />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/movies" element={<MovieList />} />
      <Route path="/movies/:id" element={<MovieDetails />} />
      <Route path="/watchlist" element={<Watchlist />} />

      {/* Add more routes as needed */}
    </Routes>
  );
};

export default AppRoutes;
