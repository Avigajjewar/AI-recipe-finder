import React, { createContext, useContext, useState } from "react";

const RecipeContext = createContext();

export const RecipeProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState("");
  const [recipes, setRecipes] = useState([]);

  return (
    <RecipeContext.Provider value={{ ingredients, setIngredients, recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>
  );
};

export const useRecipeContext = () => {
  return useContext(RecipeContext);
};
