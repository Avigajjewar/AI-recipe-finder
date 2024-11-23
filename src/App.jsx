import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import RecipeSuggestions from "./pages/RecipeSuggestions";
import MealPlanner from "./pages/MealPlanner";
import RecipeDetail from "./pages/RecipeDetail";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectedRoute";

 
  

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipes"
            element={
              <ProtectedRoute>
                <RecipeSuggestions />
              </ProtectedRoute>
            }
          />
          <Route
            path="/meal-planner"
            element={
              <ProtectedRoute>
                <MealPlanner />
              </ProtectedRoute>
            }
          />
          <Route
            path="/recipe/:id"
            element={
              <ProtectedRoute>
                <RecipeDetail />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
