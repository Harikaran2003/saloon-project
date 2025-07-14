import { useState, useEffect, useRef } from "react";
import { Users, Scissors, Clock, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Login from "../account/Login";
import Signup from "../account/Signup";
import FAQ from "./FAQ";
import Footer from "./Footer";

const Index = () => {
  const [modalState, setModalState] = useState({ login: false, signup: false });
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      navigate("/dashboard"); // Redirect if user is already logged in
    }
  }, [navigate]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    if (isDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isDropdownOpen]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleModalToggle = (type) => {
    setModalState({ login: type === "login", signup: type === "signup" });
  };

  const getInitials = (name) => {
    if (!name) return "";
    const words = name.trim().split(" ");
    if (words.length === 1) return words[0][0].toUpperCase();
    return words[0][0].toUpperCase() + words[1][0].toUpperCase();
  };

  const handleRegisterClick = () => {
    if (user) {
      navigate("/register"); // Redirect to Register page if logged in
    } else {
      setModalState({ login: true, signup: false }); // Show login modal
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="flex justify-between items-center p-6 bg-white shadow-md w-full">
        <div className="text-2xl font-bold text-blue-600">The Cut Point</div>
        <div className="flex items-center gap-6">
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-10 h-10 flex items-center justify-center bg-blue-500 text-black font-bold rounded-full uppercase tracking-wide text-lg"
              >
                {user?.name && user.name.trim() !== "" ? getInitials(user.name) : "N"}
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg p-2 z-50 w-40">
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-500 hover:bg-gray-100 w-full text-left"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              className="px-6 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-md"
              onClick={() => handleModalToggle("login")}
            >
              Login
            </button>
          )}
        </div>
      </header>

      {/* Modals */}
      <Login isOpen={modalState.login} onClose={() => handleModalToggle("")} onSignup={() => handleModalToggle("signup")} />
      <Signup isOpen={modalState.signup} onClose={() => handleModalToggle("")} onLogin={() => handleModalToggle("login")} />

      {/* Hero Section */}
      <div className="flex flex-col justify-center items-center text-center text-white h-[90vh] bg-cover bg-center w-full relative" style={{ backgroundImage: "url('/my-salon-bg.jpg')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        <div className="relative z-10">
          <h1 className="text-5xl font-bold mb-4">Partner with BeautySalon</h1>
          <h2 className="text-3xl font-semibold mb-6">and grow your business</h2>
          <p className="text-lg text-gray-300 mb-6">0% commission for 1st month! Valid for new salon partners in select cities</p>
          <button
            onClick={handleRegisterClick}
            className="bg-yellow-400 text-black px-8 py-3 rounded-lg text-lg font-medium shadow-lg hover:bg-blue-500 transition"
          >
            Register your salon
          </button>
        </div>
      </div>

      {/* Why Partner Section */}
      <div className="text-center py-12 bg-gray-50 w-full">
        <h3 className="text-4xl font-bold text-gray-800 mb-12">Why should you partner with The Cut Point?</h3>
        <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
          <FeatureCard icon={<Users size={32} />} title="Attract new customers" text="Reach millions of people booking services on BeautySalon" />
          <FeatureCard icon={<Scissors size={32} />} title="Showcase your services" text="Display your full range of beauty and salon services" />
          <FeatureCard icon={<Clock size={32} />} title="Flexible scheduling" text="Set your own working hours and appointment slots" />
          <FeatureCard icon={<ShieldCheck size={32} />} title="Secure payments" text="Receive your earnings safely through verified channels" />
        </div>

        <FAQ />
        <Footer />
      </div>
    </div>
  );
};

/* Feature Card */
// eslint-disable-next-line react/prop-types
const FeatureCard = ({ icon = null, title = "", text = "" }) => (
  <div className="flex flex-col items-center p-10 bg-blue-200 rounded-lg shadow-md transform transition duration-300 hover:scale-105 hover:shadow-xl">
    <div className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full mb-4 hover:bg-green-500 transition">
      {icon}
    </div>
    <h4 className="text-xl font-semibold mb-2">{title}</h4>
    <p className="text-gray-600 text-center">{text}</p>
  </div>
);

export default Index;
