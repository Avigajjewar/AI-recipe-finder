import React from "react";
import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <div className="border p-4 rounded shadow hover:shadow-lg transition transform hover:scale-105">
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-40 object-cover rounded mb-4"
      />
      <h3 className="text-lg font-bold text-center">{recipe.title}</h3>
      <Link
        to={`/recipe/${recipe.id}`}
        className="block text-center mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        View Details
      </Link>
    </div>
  );
};

export default RecipeCard;
