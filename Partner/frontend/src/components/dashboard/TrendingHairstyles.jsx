import { motion } from "framer-motion";
import Navbar from "./Navbar";

// Image data (public folder paths)
const trendingMaleHairstyles = [
  { name: "Buzz Cut", image: "/img/Buzz_Cut.jpg" },
  { name: "Crew Cut", image: "/img/Crew_Cut.jpeg" },
  { name: "Fade Cut", image: "/img/Fade_Cut.jpg" },
  { name: "Pompadour", image: "/img/Pompadour.jpg" },
  { name: "Quiff", image: "/img/Quiff.jpg" },
  { name: "Caesar Cut", image: "/img/Caesar_Cut.jpg" },
  { name: "Textured Crop", image: "/img/Textured_Crop.jpg" },
  { name: "Side Part", image: "/img/Side_Part.jpeg" },
];

const TrendingHairstyles = () => {
  return (
    <>
    <Navbar/>
    <div className="bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] py-16 mt-20 mx-4 lg:mx-10 rounded-lg shadow-lg">
      {/* Header Section */}
      <motion.div
        className="max-w-7xl mx-auto text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1
          className="text-5xl font-extrabold text-[#C9A660] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Top 10 Trending Male Hairstyles
        </motion.h1>
        <p className="text-lg text-gray-600 mb-6">
          Stay ahead of the curve with these top hairstyles trending this year.
        </p>
        <a
          href="#"
          className="text-[#C9A660] hover:text-[#d4af37] font-semibold transition"
        >
          Discover AI-Powered Hairstyle Suggestions.
        </a>
      </motion.div>

      {/* Hairstyle Grid */}
      <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {trendingMaleHairstyles.map((hairstyle, index) => (
          <motion.div 
            key={index} 
            className="bg-white rounded-2xl shadow-xl overflow-hidden transition transform hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <div className="relative">
              <img
                src={hairstyle.image}
                alt={hairstyle.name}
                className="w-full h-auto max-h-[350px] object-cover rounded-t-2xl"
              />
              <div className="absolute bottom-0 w-full bg-[#C9A660] text-white text-center py-2 font-bold">
                {hairstyle.name}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Hair Care Tips Section */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-semibold text-[#C9A660] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Hair Care Tips
        </motion.h2>
        <p className="text-lg text-gray-600 mb-8">
          Keep your hair looking sharp with these expert care tips.
        </p>
        <ul className="list-disc text-left mx-auto w-4/5 text-gray-700 space-y-3">
          <li>Use sulfate-free shampoos for gentle cleansing.</li>
          <li>Deep condition regularly for smooth, hydrated hair.</li>
          <li>Trim your hair every 6-8 weeks to maintain health.</li>
          <li>Avoid excessive heat styling to prevent damage.</li>
        </ul>
      </motion.div>

      {/* Hair Color Trends */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-semibold text-[#C9A660] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Hair Color Trends
        </motion.h2>
        <p className="text-lg text-gray-600 mb-8">
          Explore this year’s hottest hair color trends!
        </p>
        <ul className="list-disc text-left mx-auto w-4/5 text-gray-700 space-y-3">
          <li>Sun-kissed blonde highlights for a natural glow.</li>
          <li>Vibrant reds for a bold and confident look.</li>
          <li>Soft pastels for a unique, creative style.</li>
          <li>Rich brunettes with caramel balayage.</li>
        </ul>
      </motion.div>

      {/* Celebrity Hairstyles */}
      <motion.div
        className="max-w-7xl mx-auto mt-16 text-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h2
          className="text-3xl font-semibold text-[#C9A660] mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          Celebrity Hairstyles to Inspire You
        </motion.h2>
        <p className="text-lg text-gray-600 mb-8">
          Get inspired by the hottest celebrity hairstyles of the year.
        </p>
        <ul className="list-disc text-left mx-auto w-4/5 text-gray-700 space-y-3">
          <li>Ryan Gosling’s sleek side part.</li>
          <li>David Beckham’s textured crop.</li>
          <li>Brad Pitt’s messy quiff.</li>
          <li>Chris Hemsworth’s long, tousled look.</li>
        </ul>
      </motion.div>
    </div>
    </>
  );
};

export default TrendingHairstyles;
