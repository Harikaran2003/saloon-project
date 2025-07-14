import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./components/home/Index";
import Register from "./components/register/Register";
import Dashboard from "./components/dashboard/Dashboard";
import TrendingHairstyles from "./components/dashboard/TrendingHairstyles";
import About from "./components/aboutus/About";
import Profile from "./components/Profile";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/blogs" element={<TrendingHairstyles />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
}

export default App;
