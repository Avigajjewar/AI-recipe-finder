import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("currentUser"); // Clear the current user from local storage
    navigate("/login"); // Redirect to login page
  };

  return (
    <header className="bg-blue-500 	 text-white p-4">
      <nav className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={"/"}>
        <h1 className="text-xl font-bold">AI Recipe Finder</h1>
        </Link>

        {/* Hamburger Menu Button */}
        <button
          className="block md:hidden transition-all	duration-1000 text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex md:items-center  md:space-x-6`}
        >
          <Link
            to="/"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/recipes"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Recipes
          </Link>
          <Link
            to="/meal-planner"
            className="block md:inline-block py-2 px-4 hover:underline"
            onClick={() => setMenuOpen(false)}
          >
            Meal Planner
          </Link>
          <button
          onClick={handleLogout}
          className="bg-red-500 px-4 py-2 rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
