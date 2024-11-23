import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Get existing users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Check if username already exists
    if (users.some((user) => user.username === credentials.username)) {
      setError("Username already exists");
      return;
    }

    // Add new user to the users array
    users.push(credentials);
    localStorage.setItem("users", JSON.stringify(users)); // Save users to localStorage

    setShowPopup(true); // Show success popup
    setTimeout(() => {
      setShowPopup(false);
      navigate("/login"); // Redirect to login after 2 seconds
    }, 2000);
  };

  return (
    <div className="container mx-auto p-6 max-w-md">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
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
          Signup
        </button>
      </form>
      <p className="mt-4 text-center">
        Already a user?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-lg text-center">
            <h3 className="text-xl font-bold mb-2">Account Created Successfully!</h3>
            <p>You will be redirected to the login page shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Signup;
