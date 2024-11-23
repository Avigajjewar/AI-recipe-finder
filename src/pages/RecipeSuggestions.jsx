import React, { useState, useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";

const RecipeSuggestions = () => {
  const { ingredients, recipes, setRecipes } = useRecipeContext();
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("veg"); // "veg" or "non-veg"

  const fetchRecipes = async (preference) => {
    setLoading(true);
    try {
      const response = await axios.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        {
          params: {
            query: ingredients,
            diet: preference === "veg" ? "vegetarian" : undefined, // API filter for vegetarian
            apiKey: "edb80d5240f44fcfa92985e774feabee",  
          },
        }
      );
      setRecipes(response.data.results);
    } catch (error) {
      console.error("Error fetching recipes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (ingredients) {
      fetchRecipes(filter);
    }
  }, [ingredients, filter]);

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  if (loading) {
    return <p className="text-center mt-10">Loading recipes...</p>;
  }

  if (!recipes.length) {
    return <p className="text-center mt-10">No recipes found. Try a different filter!</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Recipes Based on Your Ingredients
      </h2>

      {/* Veg/Non-Veg Buttons */}
      <div className="flex justify-center mb-6">
        <button
          className={`px-4 py-2 rounded-l-lg ${
            filter === "veg" ? "bg-green-500 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => handleFilterChange("veg")}
        >
          Veg
        </button>
        <button
          className={`px-4 py-2 rounded-r-lg ${
            filter === "non-veg" ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
          onClick={() => handleFilterChange("non-veg")}
        >
          Non-Veg
        </button>
      </div>

      {/* Recipe List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  );
};

export default RecipeSuggestions;
