import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Balayage from "../../img/Balayage.jpg";
import Ombre from "../../img/Ombre.jpeg";
import Highlights from "../../img/Highlights.jpg";
import Lowlights from "../../img/Lowlights.jpg";
import FullColor from "../../img/Full_Color.jpg";
import RootTouchUp from "../../img/Root_Touch_Up.jpeg";

const HairColoring = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#f9f6fa] text-black py-16 px-6 mt-14">
      {/* Hero Section */}
      <div className="relative text-center max-w-6xl mx-auto">
        <motion.h1
          className="text-4xl md:text-5xl font-extrabold text-[#C9A660] leading-tight"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Elevate Your Look with Professional Hair Coloring
        </motion.h1>
        <p className="text-lg text-gray-700 mt-4 max-w-2xl mx-auto">
          Achieve the perfect shade with expert techniques and high-quality products for long-lasting, vibrant color.
        </p>
        <motion.button
          className="mt-6 bg-[#C9A660] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#b28e4f] transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/map")}
        >
          Book Your Appointment
        </motion.button>
      </div>

      {/* Services Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-[#C9A660] text-center">Our Hair Coloring Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-10">
          <ServiceCard title="Balayage" image={Balayage} description="A natural, sun-kissed hair color blend for effortless beauty." />
          <ServiceCard title="Ombre" image={Ombre} description="A seamless gradient effect from dark to light, creating depth and style." />
          <ServiceCard title="Full Color" image={FullColor} description="A bold and vibrant transformation tailored to your personality." />
          <ServiceCard title="Root Touch-Up" image={RootTouchUp} description="Maintain your perfect shade with expert root blending." />
          <ServiceCard title="Highlights" image={Highlights} description="Add dimension and brightness with precisely placed highlights." />
          <ServiceCard title="Lowlights" image={Lowlights} description="Enhance your hair’s depth with subtle, rich tones." />
        </div>
      </div>

      {/* Hair Coloring Benefits Section */}
      <div className="max-w-6xl mx-auto mt-24 bg-white shadow-xl rounded-2xl p-10 border border-[#C9A660]">
        <h2 className="text-4xl font-bold text-[#C9A660] text-center">Why Choose Professional Hair Coloring?</h2>
        <p className="text-lg text-gray-700 text-center mt-4">
          Professional hair coloring isn't just about changing your shade—it's about ensuring 
          <strong> healthy, shiny, and beautifully colored hair</strong> that suits your personality and lifestyle.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-10">
          <BenefitCard title="✔ Long-Lasting Results" description="We use high-quality, ammonia-free products that keep your hair vibrant for weeks." />
          <BenefitCard title="✔ Safe & Damage-Free" description="Our expert stylists ensure your hair remains healthy while achieving your dream color." />
          <BenefitCard title="✔ Customized Shades" description="We tailor the perfect shade to match your skin tone and enhance your natural beauty." />
          <BenefitCard title="✔ Professional Techniques" description="From balayage to ombre, we use the latest industry techniques for a flawless look." />
        </div>
      </div>

      {/* Call to Action */}
      <div className="text-center mt-16">
        <motion.button
          className="bg-[#C9A660] text-white px-6 py-3 rounded-full text-lg font-semibold shadow-md hover:bg-[#b28e4f] transition"
          whileHover={{ scale: 1.05 }}
          onClick={() => navigate("/map")}
        >
          Schedule Your Consultation
        </motion.button>
      </div>
    </div>
  );
};

// Service Card Component (Larger and More Premium)
const ServiceCard = ({ title, image, description }) => (
  <motion.div
    className="bg-white p-6 rounded-xl shadow-xl text-center border border-[#C9A660] hover:shadow-2xl transition cursor-pointer"
    whileHover={{ scale: 1.05 }}
  >
    <img src={image} alt={title} className="w-full h-[300px] object-cover rounded-md" />
    <h3 className="text-xl font-semibold mt-4 text-[#C9A660]">{title}</h3>
    <p className="text-gray-700 mt-2 text-base">{description}</p>
  </motion.div>
);

// Benefit Card Component
const BenefitCard = ({ title, description }) => (
  <motion.div
    className="p-6 bg-[#f9f6fa] rounded-xl shadow-lg"
    whileHover={{ scale: 1.05 }}
  >
    <h3 className="text-2xl font-bold text-[#C9A660]">{title}</h3>
    <p className="text-gray-700 mt-2">{description}</p>
  </motion.div>
);

export default HairColoring;
