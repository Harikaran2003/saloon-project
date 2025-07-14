import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Massage from "../../img/Massage.jpg";

const MassageTherapy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f6fa] text-black py-16 px-6">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-extrabold tracking-wide text-[#C9A660]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Rejuvenating Massage Therapy
        </motion.h1>
        <motion.p
          className="text-[#0e0e0c] mt-4 max-w-xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Experience the ultimate relaxation with our expert massage therapists, designed to relieve stress and rejuvenate your body.
        </motion.p>
      </div>

      {/* Responsive Layout */}
      <div className="max-w-6xl mx-auto mt-12 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Section (At top in mobile, right in desktop) */}
        <motion.img
          src={Massage}
          alt="Massage Therapy"
          className="w-full rounded-xl shadow-lg md:order-2"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        />

        {/* Text Section (Under image in mobile, left in desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#C9A660]">Why Choose Our Massage Therapy?</h2>
          <ul className="mt-4 space-y-3 text-lg text-gray-700">
            <li>🌿 **Relieves stress and tension**</li>
            <li>💆 **Professional & certified therapists**</li>
            <li>🧘 **Customizable massage techniques**</li>
            <li>🕯 **Aromatherapy and soothing ambiance**</li>
            <li>🩹 **Improves blood circulation and muscle recovery**</li>
          </ul>
        </motion.div>
      </div>

      {/* Booking Section */}
      <div className="max-w-6xl mx-auto mt-16 text-center">
        <h2 className="text-3xl font-bold text-[#C9A660]">Book Your Relaxation Session</h2>
        <p className="text-lg text-gray-700 mt-2">Schedule a personalized massage experience with our expert therapists.</p>
        <motion.button
          className="mt-6 px-6 py-3 bg-[#C9A660] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#b38e4a] transition duration-300"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/map")}
        >
          Book Now
        </motion.button>
      </div>
    </div>
  );
};

export default MassageTherapy;
