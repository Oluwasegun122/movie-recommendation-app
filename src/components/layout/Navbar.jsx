// src/components/layout/Navbar.jsx
import { Menu, X, Home, Film, Heart, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import ThemeToggle from "../ui/ThemeToggle";
import { AuthContext } from "../../context/AuthContext";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser && storedUser !== "undefined") {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing stored user:", error);
        localStorage.removeItem("user");
      }
    }
    console.log("🧠 Auth User:", user);
  }, []);

  const navItems = [
    { label: "Home", icon: <Home className="w-4 h-4" />, path: "/" },
    { label: "Movies", icon: <Film className="w-4 h-4" />, path: "/movies" },
    {
      label: "Watchlist",
      icon: <Heart className="w-4 h-4" />,
      path: "/dashboard/watchlist",
    },
    {
      label: "Profile",
      icon: <User className="w-4 h-4" />,
      path: "/dashboard/profile",
    },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-900 fixed top-0 left-0 right-0 z-50 shadow-md">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <h1 className="text-xl font-bold text-blue-600">🎬 MovieApp</h1>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 items-center">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-1 font-medium transition-colors ${
                isActive(item.path)
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-300 hover:text-blue-500"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          {user ? (
            <>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Hello,{" "}
                <span className="font-semibold">{user.name.split(" ")[0]}</span>
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="text-sm text-blue-600 hover:underline">
              Login
            </Link>
          )}

          <ThemeToggle />
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-gray-700 dark:text-gray-200"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden px-4 pb-4 bg-white dark:bg-gray-800 shadow-md transition-all duration-300 ease-in-out ${
          open
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="space-y-3 pt-3">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-2 text-sm font-medium ${
                isActive(item.path)
                  ? "text-blue-600"
                  : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
              }`}
            >
              {item.icon}
              {item.label}
            </Link>
          ))}

          {user ? (
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-700 dark:text-gray-300 text-sm">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="text-red-500 text-sm hover:underline"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login" className="block text-blue-600 hover:underline">
              Login
            </Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
