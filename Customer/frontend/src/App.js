import React from 'react';
import Navbar from './components/Navbar';
import Index from './components/Index';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Services from './components/Services';
import About from './components/aboutus/About';
import Blogs from './components/Blogs'
import Map from './components/Map';
import BookNowPage from './components/BookNowPage';
import SalonDetails from './components/SalonDetails';
import Profile from './components/Profile';
import EditProfile from "./components/EditProfile";
import HairColoring from './components/services/HairColoring';
import ExpertConsultation from './components/services/ExpertConsultation';
import MassageTherapy from './components/services/MassageTherapy';
import SkinCare from './components/services/SkinCare';

function App() {
  return (
    <Router>
      <div className="App w-full min-h-screen overflow-x-hidden">
        <Navbar />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/services" element={<Services />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/map" element={<Map />} />
          <Route path="/book-now" element={<BookNowPage />} />
          <Route path="/salon-details/:id" element={<SalonDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/hair-coloring" element={<HairColoring/>} />
          <Route path="/consultation" element={<ExpertConsultation/>} />
          <Route path="/massage" element={<MassageTherapy/>} />
          <Route path="/skin-care" element={<SkinCare/>} />
        </Routes>
      </div>
    </Router>
  );
}


export default App;