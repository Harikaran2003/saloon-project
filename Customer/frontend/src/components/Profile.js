import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEmail } from "../hooks/UserProvider";
import { motion } from "framer-motion";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { mail } = useEmail();
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.post(`${API_URL}/api/user/find`, { email: mail });
        setUser(response.data.user);
      } catch (err) {
        setError("Failed to fetch user data.");
      } finally {
        setLoading(false);
      }
    };

    if (mail) {
      fetchUserData();
    }
  }, [mail]);

  const firstLetter = user?.name ? user.name.charAt(0).toUpperCase() : "";

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">{error}</p>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-300 flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-lg rounded-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 hover:shadow-2xl transition duration-300"
      >
        <div className="flex flex-col items-center">
          <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center mb-4 shadow-md">
            <span className="text-6xl text-white font-bold">{firstLetter}</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">{user?.name || "Name not available"}</h2>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.3 }}
            className="mt-4 flex items-center text-gray-600"
          >
            <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-blue-500" />
            <span>{user?.email || "Email not available"}</span>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.6 }}
            className="mt-2 flex items-center text-gray-600"
          >
            <FontAwesomeIcon icon={faPhone} className="mr-2 text-green-500" />
            <span>{user?.phone || "Mobile not available"}</span>
          </motion.div>
        </div>

        <div className="mt-6 flex justify-end">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleEditProfile}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-300 flex items-center"
          >
            <FontAwesomeIcon icon={faUserEdit} className="mr-2" />
            Edit Profile
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;