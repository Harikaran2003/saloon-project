import React, { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";

// ✅ Gold Marker Icon for Salons
const goldIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [35, 55],
  iconAnchor: [17, 55],
  popupAnchor: [0, -55],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

// ✅ Red Marker Icon for Searched Location
const redIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  iconSize: [35, 55],
  iconAnchor: [17, 55],
  popupAnchor: [0, -55],
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  shadowSize: [41, 41],
});

const MapComponent = () => {
  const [currentLocation, setCurrentLocation] = useState([19.076, 72.85]); // Default: Mumbai
  const [filteredSalons, setFilteredSalons] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedLocation, setSearchedLocation] = useState(null);
  const [showResults, setShowResults] = useState(false);
  const navigate = useNavigate();

  // ✅ Get User's Location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userCoords = [position.coords.latitude, position.coords.longitude];
          setCurrentLocation(userCoords);
          console.log("📍 Current Location:", userCoords);
        },
        () => {
          setCurrentLocation([19.076, 72.85]); // Default to Mumbai if denied
          console.warn("⚠ Location permission denied. Using default.");
        }
      );
    }
  }, []);

  // ✅ Fetch Salons Based on Search
  const fetchFilteredSalons = async () => {
    if (!searchQuery.trim()) return;
    try {
      const response = await axios.get("http://localhost:5000/api/partner/salons", {
        params: { search: searchQuery.trim() },
      });

      setFilteredSalons(response.data);
      setShowResults(true);
      updateMapCenter(searchQuery.trim());
    } catch (error) {
      console.error("❌ Error fetching salons:", error);
    }
  };

  // ✅ Convert City Name to Coordinates
  const updateMapCenter = async (city) => {
    try {
      const response = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${city}`);
      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        const newCoords = [parseFloat(lat), parseFloat(lon)];
        setCurrentLocation(newCoords);
        setSearchedLocation(newCoords);
        console.log("🔍 Updated Search Location:", newCoords);
      }
    } catch (error) {
      console.error("❌ Error fetching location:", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen bg-[#f9f6fa] p-6">
      {/* Sidebar */}
      <motion.div
        className="w-full md:w-1/3 p-6 bg-white shadow-xl rounded-xl border border-[#C9A660]"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-extrabold text-[#C9A660] mb-4">Find a Salon</h2>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by city, area, landmark..."
          className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C9A660] transition"
        />
        <motion.button
          onClick={fetchFilteredSalons}
          className="w-full mt-3 p-3 bg-[#C9A660] text-white rounded-lg font-semibold shadow-md hover:bg-[#b28e4f] hover:scale-105 transition"
          whileHover={{ scale: 1.05 }}
        >
          Search
        </motion.button>

        {showResults && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 max-h-64 overflow-y-auto bg-gray-50 p-4 rounded-lg shadow-inner"
          >
            <h3 className="text-lg font-semibold text-gray-700">Salons Nearby</h3>
            <ul className="mt-3 space-y-2">
              {filteredSalons.length > 0 ? (
                filteredSalons.map((salon) => (
                  <motion.li
                    key={salon._id}
                    onClick={() => navigate(`/salon-details/${salon._id}`)}
                    className="p-3 border bg-white rounded-lg flex items-center space-x-3 shadow-md hover:bg-[#f7e3c0] hover:shadow-lg transition cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h4 className="font-semibold">{salon.salonName}</h4>
                  </motion.li>
                ))
              ) : (
                <li className="p-3 text-gray-500">No salons found</li>
              )}
            </ul>
          </motion.div>
        )}
      </motion.div>

      {/* Map Section */}
      <motion.div
        className="w-full md:w-2/3 h-96 md:h-[550px] bg-white shadow-xl rounded-xl border border-[#C9A660] overflow-hidden"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <MapContainer center={currentLocation} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {/* ✅ Current Location Marker (Default Blue) */}
          <Marker position={currentLocation}>
            <Popup>📍 Your Current Location</Popup>
          </Marker>

          {/* ✅ Search Result Marker (Red) */}
          {searchedLocation && (
            <Marker position={searchedLocation} icon={redIcon}>
              <Popup>🔍 Search Location</Popup>
            </Marker>
          )}

          {/* ✅ Display Salon Markers */}
          {filteredSalons.map((salon) =>
            salon.address?.latitude && salon.address?.longitude ? (
              <Marker key={salon._id} position={[salon.address.latitude, salon.address.longitude]} icon={goldIcon}>
                <Popup>
                  <h3 className="font-semibold">{salon.salonName}</h3>
                </Popup>
              </Marker>
            ) : null
          )}
        </MapContainer>
      </motion.div>
    </div>
  );
};

export default MapComponent;
