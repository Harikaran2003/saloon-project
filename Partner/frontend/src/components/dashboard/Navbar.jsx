import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [userInitial, setUserInitial] = useState("A");
  const [showDropdown, setShowDropdown] = useState(false);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email) {
      setUserInitial(user.email.charAt(0).toUpperCase());  // Display first letter of user's email as initial
      setUserId(user._id || null);  // Fallback in case _id is missing
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");  // Redirect to home or login page
  };

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="text-2xl font-bold text-blue-600">TheCut✂️ Point</div>

      {/* Center Links */}
      <ul className="flex-1 flex justify-center gap-10 text-gray-700 font-medium">
        <li>
          <Link to="/dashboard" className="hover:text-blue-600 transition">Dashboard</Link>
        </li>
        <li>
          <Link to="/blogs" className="hover:text-blue-600 transition">Blogs</Link>
        </li>
        <li>
          <Link to="/articles" className="hover:text-blue-600 transition">Articles</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-blue-600 transition">About Us</Link>
        </li>
      </ul>

      {/* User Dropdown */}
      <div className="relative">
        <button
          onClick={() => setShowDropdown((prev) => !prev)}  // Toggle dropdown
          className="w-10 h-10 flex items-center justify-center bg-blue-600 text-white font-semibold rounded-full"
        >
          {userInitial} {/* Display user initial */}
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-36 bg-white border rounded-md shadow-lg z-50">
            <Link
              to={`/profile`}
              className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              onClick={() => setShowDropdown(false)}  // Close dropdown after click
            >
              My Profile
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
