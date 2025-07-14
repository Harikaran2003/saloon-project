import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Expert1 from "../../img/Expert1.jpg";
import Expert2 from "../../img/Expert2.jpg";

const ExpertConsultation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-black">
      {/* Hero Section with Premium Background */}
      <div 
        className="relative w-full py-16 px-6 text-white text-center md:text-left"
        style={{
          background: "linear-gradient(to right, #2C3E50, #4CA1AF)", // Premium gradient
        }}
      >
        <motion.div
          className="max-w-6xl mx-auto"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-bold text-[#FDE8C7]">Expert Beauty Consultation</h1>
          <p className="text-lg text-gray-200 mt-4">
            Get personalized beauty & grooming advice from top professionals.
          </p>
          <motion.button
            className="mt-6 px-6 py-3 bg-[#C9A660] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#b38e4a] transition duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/booking")}
          >
            Book a Consultation
          </motion.button>
        </motion.div>
      </div>

      {/* Consultation Details Section */}
      <div className="max-w-6xl mx-auto mt-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - First Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={Expert1}
            alt="Expert Consultation"
            className="rounded-2xl shadow-lg w-[600px] h-auto object-cover"
          />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#C9A660] mb-4">Why Choose Our Experts?</h2>
          <p className="text-gray-700 text-lg">
            Our expert consultants provide tailored solutions for all your beauty needs, including **skincare, haircare, and makeup guidance**. 
            Whether you're preparing for a special event, looking for everyday grooming tips, or seeking a complete makeover, our specialists 
            will guide you with professional insights and scientifically backed advice.
          </p>
          <p className="text-gray-700 text-lg mt-4">
            With years of industry experience, our consultants analyze your unique features, skin type, and preferences to **curate personalized recommendations**.
            We use **advanced technology** and **dermatologically approved methods** to ensure you receive the best consultation.
          </p>
        </motion.div>
      </div>

      {/* Second Section with Reversed Layout */}
      <div className="max-w-6xl mx-auto mt-16 px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Side - Content */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-[#C9A660] mb-4">Exclusive Benefits of Our Consultation</h2>
          <ul className="mt-6 space-y-3 text-gray-700 text-lg">
            <li>✔ Personalized Beauty & Skincare Plans</li>
            <li>✔ Professional Hair & Skin Analysis</li>
            <li>✔ Exclusive Tips from Top Industry Experts</li>
            <li>✔ Virtual & In-Person Consultations Available</li>
            <li>✔ Product Recommendations Tailored to Your Needs</li>
          </ul>
          <motion.button
            className="mt-6 px-6 py-3 bg-[#C9A660] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#b38e4a] transition duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/booking")}
          >
            Schedule Your Consultation
          </motion.button>
        </motion.div>

        {/* Right Side - Second Image */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <img
            src={Expert2}
            alt="Personalized Consultation"
            className="rounded-2xl shadow-lg w-[600px] h-auto object-cover"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ExpertConsultation;
