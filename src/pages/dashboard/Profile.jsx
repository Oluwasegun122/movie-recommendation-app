// Let's start building the frontend of the Movie Recommendation App

// Step 1: Setup for the Profile Page (dashboard/Profile.jsx)
// This component will show the user's basic info and action buttons

// src/pages/dashboard/Profile.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto p-4 mt-10 shadow-md rounded-lg bg-white dark:bg-gray-900 text-gray-800 dark:text-white">
      <h2 className="text-2xl font-bold mb-4">👤 User Profile</h2>
      <div className="space-y-4">
        <div className="border-b pb-2">
          <strong>Name:</strong> {user.name}
        </div>
        <div className="border-b pb-2">
          <strong>Email:</strong> {user.email}
        </div>
      </div>
      <button
        className="mt-6 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        onClick={() => {
          localStorage.removeItem("user");
          navigate("/login");
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Profile;
