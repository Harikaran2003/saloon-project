import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCut, faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEmail } from "../hooks/UserProvider";

const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [firstLetter, setFirstLetter] = useState("");
  const navigate = useNavigate();
  const { mail } = useEmail();

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);

    const fetchUserData = async () => {
      try {
        const response = await axios.post("http://localhost:5000/api/user/find", {
          email: mail,
        });
        setFirstLetter(response.data.user.name.charAt(0).toUpperCase());
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    if (user) fetchUserData();
    if (user && window.location.pathname === "/login") navigate("/profile");
  }, [isAuthenticated, navigate, mail]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleProfile = () => {
    navigate("/profile");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-50 backdrop-blur-md shadow-md bg-transparent">
      <div className="flex items-center justify-between p-4 md:px-20">
        
        {/* Left: Hamburger Menu (Mobile) & Logo (Desktop) */}
        <div className="flex items-center">
          <button className="md:hidden text-black text-2xl mr-4" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
          <h2 className="text-black text-2xl font-bold md:mr-10">
            TheCut <span className="text-red-600"><FontAwesomeIcon icon={faCut} /></span> Point
          </h2>
        </div>

        {/* Middle: Navigation Menu (Only Desktop) */}
        <ul className="hidden md:flex justify-center space-x-8 text-black font-bold flex-1">
          <li><Link to="/" className="hover:text-red-600">Home</Link></li>
          <li><Link to="/services" className="hover:text-red-600">Services</Link></li>
          <li><Link to="/about" className="hover:text-red-600">About Us</Link></li>
          <li><Link to="/blogs" className="hover:text-red-600">Blogs</Link></li>
        </ul>

        {/* Right: Profile Button */}
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <div className="relative">
              <button 
                onClick={toggleDropdown} 
                className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center hover:bg-red-600 transition duration-300"
              >
                <span className="text-black text-lg font-bold">{firstLetter}</span>
              </button>
              {isDropdownOpen && (
                <ul className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg">
                  <li><button onClick={handleProfile} className="w-full text-left px-4 py-2 hover:bg-red-100">See Profile</button></li>
                  <li><button onClick={handleProfile} className="w-full text-left px-4 py-2 hover:bg-red-100">My Booking</button></li>
                  <li><button onClick={handleLogout} className="w-full text-left px-4 py-2 hover:bg-red-100">Logout</button></li>
                </ul>
              )}
            </div>
          ) : (
            <>
              <Link to="/login">
                <button className="text-black border-2 border-black px-4 py-2 font-bold rounded-lg hover:text-red-600">
                  Login
                </button>
              </Link>
              <Link to="/register">
                <button className="text-black border-2 border-black px-4 py-2 font-bold rounded-lg hover:text-red-600">
                  Register
                </button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <ul className={`absolute md:hidden top-16 left-0 w-full bg-white shadow-lg transition-all duration-300 ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <li className="border-b"><Link to="/" className="block px-5 py-3 text-black font-bold hover:text-red-600">Home</Link></li>
        <li className="border-b"><Link to="/services" className="block px-5 py-3 text-black font-bold hover:text-red-600">Services</Link></li>
        <li className="border-b"><Link to="/about" className="block px-5 py-3 text-black font-bold hover:text-red-600">About Us</Link></li>
        <li className="border-b"><Link to="/blogs" className="block px-5 py-3 text-black font-bold hover:text-red-600">Blogs</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
