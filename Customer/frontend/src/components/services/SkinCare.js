import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const SkinCare = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen text-black">
      {/* Hero Section with Premium Gradient Background */}
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
          <h1 className="text-5xl font-bold text-[#FDE8C7]">Luxury Skin Care Treatments</h1>
          <p className="text-lg text-gray-200 mt-4">
            Experience the ultimate skin rejuvenation with expert care and premium organic products.
          </p>
          <motion.button
            className="mt-6 px-6 py-3 bg-[#C9A660] text-white text-lg font-semibold rounded-lg shadow-md hover:bg-[#b38e4a] transition duration-300"
            whileHover={{ scale: 1.05 }}
            onClick={() => navigate("/map")}
          >
            Book Your Glow
          </motion.button>
        </motion.div>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto mt-16 px-6">
        <h2 className="text-3xl font-bold text-[#C9A660] text-center">Our Exclusive Treatments</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {[
            { title: "Hydrating Facial", description: "Deep hydration for a radiant glow.", icon: "💧" },
            { title: "Anti-Aging Therapy", description: "Reduce wrinkles and fine lines.", icon: "🌿" },
            { title: "Acne Treatment", description: "Clear & smooth skin solutions.", icon: "✨" },
            { title: "Collagen Boost", description: "Firm and youthful skin renewal.", icon: "💆‍♀️" },
            { title: "Luxury Spa Detox", description: "A full skincare detox experience.", icon: "🧖‍♀️" },
            { title: "Brightening Treatment", description: "Revive dull skin with instant glow.", icon: "🌟" },
          ].map((service, index) => (
            <motion.div 
              key={index} 
              className="p-6 bg-white shadow-lg rounded-xl flex flex-col items-center text-center transition duration-300 hover:shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <div className="text-5xl">{service.icon}</div>
              <h3 className="text-xl font-semibold text-[#C9A660] mt-4">{service.title}</h3>
              <p className="text-gray-700 mt-2">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkinCare;
