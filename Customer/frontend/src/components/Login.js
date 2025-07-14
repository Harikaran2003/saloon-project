import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEmail } from "../hooks/UserProvider";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mail, setMail } = useEmail();

  // Log updated mail whenever it changes
  useEffect(() => {
    console.log("Updated mail in context:", mail);
  }, [mail]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    // Log email value before setting mail in context
    console.log("Setting mail with email:", email);

    setMail(email);  // Set mail in context with the email value

    try {
      const response = await fetch("http://localhost:5000/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data)); // Store user data
        navigate("/profile"); // Redirect to homepage
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (error) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white p-8 rounded-lg shadow-md"
      >
        <h1 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h1>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <i className="fas fa-user text-gray-400 mr-2"></i>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 focus:outline-none"
                type="email"
                placeholder="Type your email"
                aria-label="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Password
            </label>
            <div className="flex items-center border-b border-gray-300 py-2">
              <i className="fas fa-lock text-gray-400 mr-2"></i>
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 py-1 px-2 focus:outline-none"
                type="password"
                placeholder="Type your password"
                aria-label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="text-right mb-4">
            <a href="#" className="text-sm text-gray-500">Forgot password?</a>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mb-4"
          >
            LOGIN
          </motion.button>
        </form>
        <div className="text-center text-gray-500 mb-4">Or Login Using</div>
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="text-blue-600 text-xl"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-blue-400 text-xl"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-red-600 text-xl"><i className="fab fa-google"></i></a>
        </div>
        <div className="text-center text-gray-500">
          Don't have an account? <a href="/register" className="text-blue-600 font-bold">SIGN UP</a>
        </div>
      </motion.div>
    </div>
  );
}

export default Login;
