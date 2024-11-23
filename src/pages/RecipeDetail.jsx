import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const RecipeDetail = () => {
  const { id } = useParams(); // Get the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information`,
          {
            params: {
              includeNutrition: true, // Include nutrition data
              apiKey: "edb80d5240f44fcfa92985e774feabee", // Replace with your Spoonacular API key
            },
          }
        );
        setRecipe(response.data);
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading recipe details...</p>;
  }

  if (!recipe) {
    return <p className="text-center mt-10">Recipe not found.</p>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full max-w-2xl mx-auto rounded mb-6"
      />

      {/* Ingredients and Making Process */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Ingredients */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Ingredients</h2>
          <ul className="list-disc ml-6">
            {recipe.extendedIngredients.map((ingredient) => (
              <li key={ingredient.id} className="mb-2">
                {ingredient.original}
              </li>
            ))}
          </ul>
        </div>

        {/* Instructions */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Making Process</h2>
          <ol className="list-decimal ml-6">
            {recipe.analyzedInstructions.length > 0
              ? recipe.analyzedInstructions[0].steps.map((step) => (
                  <li key={step.number} className="mb-2">
                    {step.step}
                  </li>
                ))
              : "No instructions available."}
          </ol>
        </div>
      </div>

      {/* Nutrition Insights */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Nutrition & Health Insights</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipe.nutrition.nutrients.map((nutrient) => (
            <div
              key={nutrient.name}
              className="border p-4 rounded shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-bold">{nutrient.name}</h3>
              <p>{nutrient.amount} {nutrient.unit}</p>
              <p className="text-gray-500">Daily Value: {nutrient.percentOfDailyNeeds}%</p>
            </div>
          ))}
        </div>
      </div>

      {/* Description */}
      <div className="mt-6">
        <h2 className="text-2xl font-bold mb-4">Description</h2>
        <p>{recipe.summary.replace(/<[^>]*>/g, "")}</p>
      </div>
    </div>
  );
};

export default RecipeDetail;
