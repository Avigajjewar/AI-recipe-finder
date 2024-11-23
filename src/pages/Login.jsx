import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username and password match
    const user = users.find(
      (user) =>
        user.username === credentials.username &&
        user.password === credentials.password
    );

    if (user) {
      localStorage.setItem("currentUser", JSON.stringify(user)); // Save logged-in user to localStorage
      navigate("/"); // Redirect to home
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={credentials.username}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={credentials.password}
          onChange={handleChange}
          className="border border-gray-300 p-2 rounded"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
      <p className="mt-4 text-center">
        Not a user?{" "}
        <Link to="/signup" className="text-blue-500 hover:underline">
          Signup
        </Link>
      </p>
    </div>
  );
};

export default Login;
