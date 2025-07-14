import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Services = () => {
  const navigate = useNavigate();

  const handleNavigate = (title) => {
    switch (title) {
      case "Haircuts":
        navigate("/map");
        break;
      case "AI Hairstyle Suggestions":
        navigate("/ai-hairstyle");
        break;
      case "Makeup Services":
        navigate("/makeup");
        break;
      case "Hair Coloring":
        navigate("/hair-coloring");
        break;
      case "Convenient Scheduling":
        navigate("/scheduling");
        break;
      case "Bridal Packages":
        navigate("/bridal");
        break;
      case "Facial Treatments":
        navigate("/facial");
        break;
      case "E-commerce":
        navigate("/ecommerce");
        break;
      case "Expert Consultation":
        navigate("/consultation");
        break;
      case "Massage Therapy":
        navigate("/massage");
        break;
      case "Skin Care":
        navigate("/skin-care");
        break;
      default:
        navigate(`/service/${title.toLowerCase().replace(/\s+/g, "-")}`);
        break;
    }
  };

  return (
    <div className="min-h-screen bg-[#f9f6fa] text-black py-16 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <motion.h1
          className="text-5xl font-extrabold tracking-wide text-[#C9A660]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Our Premium Services
        </motion.h1>
        <motion.p
          className="text-[#0e0e0c] mt-4 max-w-xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Elevate your beauty experience with our exclusive services.
        </motion.p>
      </div>

      {/* Boys' Services Section */}
      <div className="max-w-6xl mx-auto mt-12">
        <h2 className="text-3xl font-bold text-[#C9A660] text-center mb-6">Boys' Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ServiceCard title="Haircuts" icon="fas fa-cut" description="Professional and trendy haircuts tailored to your style." navigate={handleNavigate} />
          <ServiceCard title="AI Hairstyle Suggestions" icon="fas fa-robot" description="AI-powered hairstyle suggestions based on your face shape." navigate={handleNavigate} />
          <ServiceCard title="Hair Coloring" icon="fas fa-paint-brush" description="Vibrant and long-lasting hair coloring services." navigate={handleNavigate} />
          <ServiceCard title="Expert Consultation" icon="fas fa-user-tie" description="Get personalized advice from beauty and style professionals." navigate={handleNavigate} />
          <ServiceCard title="Massage Therapy" icon="fas fa-hand-holding-heart" description="Relaxing and therapeutic massages to ease tension." navigate={handleNavigate} />
          <ServiceCard title="Skin Care" icon="fas fa-leaf" description="Advanced skin care treatments for radiant skin." navigate={handleNavigate} />
        </div>
      </div>

      {/* Girls' Services Section */}
      <div className="max-w-6xl mx-auto mt-16">
        <h2 className="text-3xl font-bold text-[#C9A660] text-center mb-6">Girls' Services</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          <ServiceCard title="Makeup Services" icon="fas fa-magic" description="Get the perfect look with our professional makeup services." navigate={handleNavigate} />
          <ServiceCard title="Bridal Packages" icon="fas fa-ring" description="Exclusive bridal packages for your special day." navigate={handleNavigate} />
          <ServiceCard title="Facial Treatments" icon="fas fa-spa" description="Rejuvenate your skin with our facial treatments." navigate={handleNavigate} />
          <ServiceCard title="E-commerce" icon="fas fa-shopping-cart" description="Shop beauty products and services through our platform." navigate={handleNavigate} />
          <ServiceCard title="Convenient Scheduling" icon="fas fa-calendar-alt" description="Easily book your appointments at your convenience." navigate={handleNavigate} />
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ title, icon, description, navigate }) => (
  <motion.div
    className="bg-[#333339] p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 cursor-pointer flex flex-col items-center text-center border border-[#C9A660]"
    whileHover={{ scale: 1.05 }}
    onClick={() => navigate(title)}
  >
    <div className="text-4xl text-[#C9A660] mb-4">
      <i className={icon}></i>
    </div>
    <h3 className="text-xl font-semibold text-[#F4EFE6]">{title}</h3>
    <p className="text-gray-300 text-sm mt-2">{description}</p>
    <div className="mt-4 text-[#C9A660] text-lg">
      <i className="fas fa-arrow-right"></i>
    </div>
  </motion.div>
);

export default Services;
