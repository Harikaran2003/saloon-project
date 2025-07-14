import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {useCookies} from "react-cookie";
import axios from "axios";

const Login = ({ isOpen, onClose, onSignup }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [animate, setAnimate] = useState(false);
  const [cookies, setCookie] = useCookies(["salonid"]);


  useEffect(() => {
    if (isOpen) {
      setAnimate(true);
    } else {
      setTimeout(() => setAnimate(false), 300); // Smooth fade-out effect
    }
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden"); // Prevent scrolling
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
  
    try {
      const response = await fetch("http://localhost:5001/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log("data::",data)
       
      if (!response.ok) throw new Error(data.message || "Login failed");
  
      // Save the user data to localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
  
      const userEmail = data.user.email;
      setCookie("email", userEmail, { path: "/" });
  // fetch salon id --->
    // ✅ Correct
// axios.post('http://localhost:5001/salonid', { email: userEmail })
//   .then((resp)=>{
  
//     const id = resp.data.data;
//     console.log(resp.data.user)
//     alert(id)
//     setCookie("salonid", id, { path: "/" }); //
//     }).catch((err)=>{
//    alert("eeorror",err)
//     })


      // Fetch salon data
      const salonResponse = await fetch(`http://localhost:5001/api/salon/email/${userEmail}`);
      const salonData = await salonResponse.json();
  
      if (salonResponse.ok && Array.isArray(salonData)) {
  const matchedSalon = salonData.find((salon) => salon.email === userEmail);
  if (matchedSalon) {
    window.location.href = "/dashboard";
  } else {
    window.location.href = "/";
  }
} else {
  // If the response is not ok (maybe 404), assume no salon found and treat user as new
  window.location.href = "/";
}

  
      const matchedSalon = salonData.find((salon) => salon.email === userEmail);
  
      if (matchedSalon) {
        window.location.href = "/dashboard";
      } else {
        window.location.href = "/";
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  

  if (!isOpen && !animate) return null;

  return (

    <div
  className={`fixed inset-0 flex items-center justify-center bg-opacity-50 transition-opacity duration-300 z-50 ${
    isOpen ? "opacity-100" : "opacity-0"
  }`} onClick={onClose}
>
  <div
    className="relative bg-white p-8 rounded-xl shadow-xl w-[450px] transform transition-all duration-500 z-50
      scale-100 opacity-100 translate-y-0"  onClick={(e) => e.stopPropagation()}
  >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 text-2xl transition-transform transform hover:rotate-90"
        >
          &times;
        </button>

        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Don&apos;t have an account?{" "}
          <button onClick={onSignup} className="text-blue-500 hover:underline font-medium">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

Login.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSignup: PropTypes.func.isRequired,
};

export default Login;
