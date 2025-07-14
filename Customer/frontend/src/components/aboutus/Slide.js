import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Slide = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      bgColor: 'bg-gradient-to-r from-blue-600 to-purple-600',
      title: 'Revolutionize Your Salon Experience',
      description: 'Discover the power of 3D face recognition and hairstyle suggestions tailored just for you. At The Cut Point, we blend technology with style.',
      buttonText: 'Explore More',
      buttonLink: '#',
    },
    {
      bgColor: 'bg-gradient-to-r from-green-500 to-teal-500',
      title: 'Find Your Perfect Look',
      description: 'Our mission is to help you find the ideal hairstyle effortlessly. Experience the ease of booking appointments with advanced face shape recognition.',
      buttonText: 'Learn More',
      buttonLink: '#',
    },
    {
      bgColor: 'bg-gradient-to-r from-red-500 to-pink-500',
      title: 'Personalized Styling Experience',
      description: 'We offer a unique salon journey by suggesting hairstyles that perfectly match your face shape. Embrace the future of beauty at The Cut Point.',
      buttonText: 'Book Now',
      buttonLink: '#',
    }
  ];

  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 4000);

    return () => clearInterval(slideInterval);
  }, [slides.length]);

  const handleDotClick = (index) => {
    setCurrentSlide(index);
  };

  return (
    <div className="container mx-auto mt-20 px-4">
      <div className="relative w-full h-[50vh] md:h-[80vh] overflow-hidden rounded-lg shadow-lg">
        <div className="absolute inset-0">
          <AnimatePresence>
            {slides.map((slide, index) => (
              index === currentSlide && (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 1 }}
                  className={`absolute inset-0 flex flex-col items-center justify-center text-center px-4 ${slide.bgColor} rounded-lg`}
                >
                  <div className="text-white max-w-xl">
                    <motion.h1
                      className="text-3xl md:text-5xl font-bold mb-4"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.8 }}
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p
                      className="text-base md:text-lg mb-6"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4, duration: 0.8 }}
                    >
                      {slide.description}
                    </motion.p>
                    <motion.a
                      href={slide.buttonLink}
                      className="inline-block py-2 md:py-3 px-5 md:px-6 bg-yellow-500 text-black text-sm md:text-lg rounded-md hover:bg-yellow-600 transition-colors duration-300"
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    >
                      {slide.buttonText}
                    </motion.a>
                  </div>
                </motion.div>
              )
            ))}
          </AnimatePresence>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3">
          {slides.map((_, index) => (
            <motion.span
              key={index}
              className={`h-2 w-2 md:h-3 md:w-3 rounded-full cursor-pointer transition-all duration-300 ${currentSlide === index ? 'bg-yellow-500 scale-110' : 'bg-white bg-opacity-50'}`}
              onClick={() => handleDotClick(index)}
              whileHover={{ scale: 1.2 }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slide;
