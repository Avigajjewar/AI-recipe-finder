import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Check local storage for user session
  useEffect(() => {
    const loggedInUser = localStorage.getItem("currentUser");
    if (loggedInUser) {
      setIsAuthenticated(true);
      setCurrentUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user));
      return true;
    } else {
      return false;
    }
  };

  const signup = (username, password) => {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    if (users.find((u) => u.username === username)) {
      return false; // User already exists
    }

    const newUser = { username, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    return true;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, currentUser, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
