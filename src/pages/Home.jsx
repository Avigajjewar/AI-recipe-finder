import React from "react";
import { useRecipeContext } from "../context/RecipeContext";
import IngredientInput from "../components/IngredientInput";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { ingredients, setIngredients } = useRecipeContext();
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (ingredients.trim()) {
      navigate("/recipes");
    } else {
      alert("Please enter some ingredients!");
    }
  };

  return (
    <div className=" container mx-auto p-6 flex flex-col items-center text-center">
      <h2 className="text-3xl font-bold mb-6 text-red-700">What's in Your Kitchen?</h2>
      <p className="text-gray-600 mb-4">
        Enter the ingredients you have, and we'll find recipes for you!
      </p>
      <IngredientInput handleSubmit={handleSubmit} value={ingredients} onChange={setIngredients} />
      <button
        className="bg-blue-500 text-white px-6 py-2 mt-4 rounded hover:bg-blue-600 transition"
        onClick={handleSubmit}
      >
        Find Recipes
      </button>
    </div>
  );
};

export default Home;
