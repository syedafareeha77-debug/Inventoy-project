import React, { useState } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { signup } from "../services/api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await signup({ name, email, password });
      alert(res.message || "Signup successful!");
      navigate("/login");
    } catch (err) {
      setError(err.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-800 via-indigo-800 to-blue-800">
      {/* Glassmorphism Card */}
      <div className="bg-white/20 backdrop-blur-md rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">Sign Up</h2>

        {error && (
          <div className="bg-red-100 text-red-700 p-3 rounded mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Full Name */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300">
            <FaUser className="text-white mr-3" />
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full bg-transparent focus:outline-none placeholder-white text-white"
            />
          </div>

          {/* Email */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300">
            <FaEnvelope className="text-white mr-3" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-transparent focus:outline-none placeholder-white text-white"
            />
          </div>

          {/* Password */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-transparent focus:outline-none placeholder-white text-white"
            />
          </div>

          {/* Confirm Password */}
          <div className="flex items-center bg-white/20 rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-indigo-300">
            <FaLock className="text-white mr-3" />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="w-full bg-transparent focus:outline-none placeholder-white text-white"
            />
          </div>

          {/* Sign Up Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition"
          >
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-white mt-4 text-sm">
          Already have an account?{" "}
          <span
            className="font-semibold underline cursor-pointer"
            onClick={() => navigate("/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;

