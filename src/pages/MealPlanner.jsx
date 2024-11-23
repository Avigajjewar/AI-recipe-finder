import React, { useState, useEffect } from "react";
import { useRecipeContext } from "../context/RecipeContext";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const MealPlanner = () => {
  const { recipes } = useRecipeContext(); // Use recipes from context
  const [mealPlan, setMealPlan] = useState(() => {
    // Load saved meal plan from local storage
    const savedPlan = localStorage.getItem("mealPlan");
    return savedPlan ? JSON.parse(savedPlan) : {};
  });

  const [selectedRecipe, setSelectedRecipe] = useState(null);

  useEffect(() => {
    // Save meal plan to local storage whenever it changes
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  }, [mealPlan]);

  const assignRecipeToDay = (day) => {
    if (selectedRecipe) {
      setMealPlan((prev) => ({
        ...prev,
        [day]: selectedRecipe,
      }));
      setSelectedRecipe(null);
    }
  };

  const clearDay = (day) => {
    setMealPlan((prev) => {
      const updatedPlan = { ...prev };
      delete updatedPlan[day];
      return updatedPlan;
    });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Weekly Meal Planner
      </h1>

      {/* Recipe Selection */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold mb-4">Select a Recipe</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className={`border p-4 rounded shadow hover:shadow-lg transition cursor-pointer ${
                selectedRecipe?.id === recipe.id ? "bg-blue-100" : ""
              }`}
              onClick={() => setSelectedRecipe(recipe)}
            >
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h3 className="text-lg font-bold text-center">{recipe.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Planner */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Plan Your Meals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="border p-4 rounded shadow">
              <h3 className="text-lg font-bold mb-2">{day}</h3>
              {mealPlan[day] ? (
                <div>
                  <img
                    src={mealPlan[day].image}
                    alt={mealPlan[day].title}
                    className="w-full h-32 object-cover rounded mb-2"
                  />
                  <p>{mealPlan[day].title}</p>
                  <button
                    className="bg-red-500 text-white px-4 py-2 mt-2 rounded hover:bg-red-600"
                    onClick={() => clearDay(day)}
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  onClick={() => assignRecipeToDay(day)}
                >
                  Add Recipe
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MealPlanner;
