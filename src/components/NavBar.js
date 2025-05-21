import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { lessons } from "../data/lessons";
import { getProgress } from "../data/progress";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [progressCount, setProgressCount] = useState(0);

  useEffect(() => {
    const savedMode = localStorage.getItem("germanDarkMode") === "true";
    setDarkMode(savedMode);
    const progress = getProgress();
    const count = Object.values(progress).filter(Boolean).length;
    setProgressCount(count);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("germanDarkMode", darkMode);
  }, [darkMode]);

  const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <nav className="bg-blue-600 text-white p-4 mb-6 sticky top-0 z-50 shadow">
      <div className="max-w-3xl mx-auto flex justify-between items-center">
        <Link to="/" className="font-bold text-lg">German Learner</Link>
        <div className="space-x-4 flex items-center">
          <Link to="/" className="hover:underline">Home</Link>
          <Link to="/profile" className="hover:underline">My Progress</Link>
          <span className="text-sm">✓ {progressCount}/{lessons.length}</span>
          <button
            onClick={toggleDarkMode}
            className="ml-2 text-sm px-2 py-1 border rounded hover:bg-white hover:text-blue-600"
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;