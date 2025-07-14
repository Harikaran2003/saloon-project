import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Services from './Services';
import Footer from './Footer';
import 'leaflet/dist/leaflet.css';
import { useEmail } from '../hooks/UserProvider';

const Index = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [nextIndex, setNextIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);
  const navigate = useNavigate();
  const { mail, setMail } = useEmail();

  const images = [
    require('../img/picSalon1.jpg'),
    require('../img/picSalon2.jpg'),
    require('../img/picSalon3.jpg'),
    require('../img/picSalon5.jpg'),
    require('../img/picSalon7.jpg'),
  ];

  useEffect(() => {
    const changeBackground = () => {
      setNextIndex((prevIndex) => (prevIndex + 1) % images.length);
      setIsFading(true);
    };

    const intervalId = setInterval(changeBackground, 7000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (isFading) {
      setTimeout(() => {
        setCurrentIndex(nextIndex);
        setIsFading(false);
      }, 1000);
    }
  }, [isFading, nextIndex]);

  const handleBookAppointment = () => {
    const user = localStorage.getItem('user'); 
    if (user) {
      navigate('/map'); 
    } else {
      navigate('/login'); 
    }
  };

  return (
    <>
      {/* ✅ Fixed Wrapper to Remove Unwanted Space */}
      <div className="relative w-screen max-w-full overflow-hidden">
        {/* Background Image Layers */}
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            isFading ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: `url(${images[currentIndex]})` }}
        ></div>
        <div
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
            isFading ? 'opacity-100' : 'opacity-0'
          }`}
          style={{ backgroundImage: `url(${images[nextIndex]})` }}
        ></div>
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Content */}
        <div className="relative z-20 flex flex-col items-center justify-center min-h-screen w-full max-w-full text-white text-center px-4 md:px-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 leading-tight">
            Welcome to My Salon
          </h1>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            TheCut Point
          </h2>
          <p className="text-md sm:text-lg md:text-xl lg:text-2xl mb-4 max-w-screen-md mx-auto">
            Your one-stop solution for all your grooming needs.
          </p>
          <button 
            onClick={handleBookAppointment}
            className="text-black border-2 border-red-600 px-6 sm:px-8 py-2 mt-4 sm:mt-6 bg-white font-bold rounded-lg hover:bg-red-600 hover:text-white transition duration-300"
          >
            Book Appointment
          </button>
        </div>
      </div>
      <Services />
      <Footer />
    </>
  );
};

export default Index;
