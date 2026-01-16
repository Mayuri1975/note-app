import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate(); // ✅ INSIDE component

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register", // 🔧 typo fixed
        { name, email, password }
      );

      if (response.data.success) {
        navigate("/login");
      }

      console.log("Signup success:", response.data);
    } catch (error) {
      console.error("Signup error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="border shadow p-6 w-80 bg-white">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="w-full px-3 py-2 border mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full px-3 py-2 border mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-3 py-2 border mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button className="w-full bg-teal-600 text-white py-2">
            Signup
          </button>

          <p className="text-center mt-2">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
