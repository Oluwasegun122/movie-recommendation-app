import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">🎬 MovieRec</Link>
      <div className="space-x-4 text-sm">
        <Link to="/" className="hover:text-blue-400">Home</Link>
        <Link to="/login" className="hover:text-blue-400">Login</Link>
        <Link to="/register" className="hover:text-blue-400">Register</Link>
      </div>
    </nav>
  );
}
