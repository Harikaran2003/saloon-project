import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

const Details = () => {
  const { id } = useParams();
  const [salon, setSalon] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSalonDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/partner/salons/${id}`);
        setSalon(response.data);
      } catch (error) {
        console.error("Error fetching salon details:", error);
        setError("Failed to load salon details. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchSalonDetails();
  }, [id]);

  if (loading) return <p className="text-center text-xl mt-24">Loading...</p>;
  if (error) return <p className="text-center text-xl mt-24 text-red-500">{error}</p>;
  if (!salon) return <p className="text-center text-xl mt-24 text-gray-500">Salon not found.</p>;

  const images = salon.uploadedImages?.length > 0 ? salon.uploadedImages : [
    require("../img/picSalon1.jpg"),
    require("../img/picSalon2.jpg"),
    require("../img/picSalon3.jpg")
  ];

  const isSalonOpen = () => {
    const currentDay = new Date().toLocaleString("en-US", { weekday: "long" });
    const currentTime = new Date();
    const hours = salon.openDays?.includes(currentDay) ? salon.timings : null;
    if (!hours) return false;

    const { startTime, endTime } = hours;
    const start = new Date();
    start.setHours(startTime.hour + (startTime.ampm === "PM" && startTime.hour !== 12 ? 12 : 0), startTime.minute, 0);
    
    const end = new Date();
    end.setHours(endTime.hour + (endTime.ampm === "PM" && endTime.hour !== 12 ? 12 : 0), endTime.minute, 0);

    return currentTime >= start && currentTime <= end;
  };

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container mt-24 mx-auto px-6 lg:px-16 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 p-6 rounded-lg shadow-lg"
    >
      <div className="flex flex-col lg:flex-row items-center lg:items-start lg:gap-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full lg:w-3/5 space-y-4"
        >
          <h1 className="text-4xl font-bold text-gray-900">{salon.salonName}</h1>
          <p className="text-gray-700">{salon.description || "No description available."}</p>
          <p className="font-semibold text-gray-800">
            {salon.address?.shopNumber}, {salon.address?.area}, {salon.address?.city}, {salon.address?.state}, {salon.address?.pincode}
          </p>
          <div className="flex gap-6 text-gray-600">
            <span><strong>Phone:</strong> {salon.phone}</span>
            <span><strong>Status:</strong>
              <span className={`ml-1 font-semibold ${isSalonOpen() ? "text-green-500" : "text-red-500"}`}>
                {isSalonOpen() ? "Open" : "Closed"}
              </span>
            </span>
          </div>

          {/* Static Features */}
          <div>
            <h3 className="text-xl font-semibold">Salon Features</h3>
            <ul className="grid grid-cols-2 gap-3 text-gray-700 mt-2">
              {["AC", "WiFi", "Parking", "Card Payment", "Waiting Lounge", "Sanitized Equipment"].map((feature, index) => (
                <li key={index} className="flex items-center gap-2">
                  ✅ {feature}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View Services
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
            >
              Read Reviews
            </motion.button>
          </div>
        </motion.div>

        <div className="hidden lg:block border-l-2 border-gray-400 h-auto"></div>

        <motion.div className="relative w-full lg:w-2/5">
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full text-xl"
            onClick={prevSlide}
          >
            ◀
          </motion.button>
          <motion.img
            key={currentIndex}
            src={images[currentIndex]}
            alt="Salon View"
            className="w-full mt-4 max-w-[600px] h-[400px] object-cover rounded-lg mx-auto"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gray-300 p-2 rounded-full text-xl"
            onClick={nextSlide}
          >
            ▶
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Details;
