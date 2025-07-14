// import React, { useState, useEffect } from "react";
// import Calendar from "react-calendar";
// import "react-calendar/dist/Calendar.css";

// const Servicessalon = () => {
//   const initialServices = [
//     { name: "Head Massage With Oil", price: 270 },
//     { name: "Arm Waxing", price: 120 },
//     { name: "Back Waxing", price: 315 },
//     { name: "Beard Color", price: 150 },
//     { name: "Bikini Line Waxing", price: 670 },
//     { name: "Bleach", price: 100 },
//     { name: "Brazilian Waxing", price: 1100 },
//     { name: "Clean Up", price: 720 },
//     { name: "Face Makeup", price: 1000 },
//     { name: "Hair Spa", price: 800 },
//     { name: "Haircut", price: 500 },
//   ];

//   const [services, setServices] = useState(initialServices);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [showSortOptions, setShowSortOptions] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedService, setSelectedService] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [selectedTime, setSelectedTime] = useState(null);
//   const [timeSlots, setTimeSlots] = useState([]);
//   const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
//   const [hairstyle, setHairstyle] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [cart, setCart] = useState([]);

//   const generateTimeSlots = (startHour = 9) => {
//     const slots = [];
//     let start = new Date();
//     start.setHours(startHour, 0, 0);

//     while (start.getHours() < 23) {
//       slots.push(
//         start.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
//       );
//       start.setMinutes(start.getMinutes() + 15);
//     }
//     return slots;
//   };

//   const handleSort = (type) => {
//     const sorted = [...services].sort((a, b) =>
//       type === "price" ? a.price - b.price : a.name.localeCompare(b.name)
//     );
//     setServices(sorted);
//     setShowSortOptions(false);
//   };

//   const filteredServices = services.filter((service) =>
//     service.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const handleBook = (service) => {
//     setSelectedService(service);
//     setIsModalOpen(true);
//   };

//   useEffect(() => {
//     const today = new Date();
//     const isToday = selectedDate.toDateString() === today.toDateString();
//     const startHour = isToday ? Math.max(today.getHours(), 9) : 9;
//     setTimeSlots(generateTimeSlots(startHour));
//   }, [selectedDate]);

//   const isDateDisabled = (date) => {
//     const today = new Date();
//     const maxDate = new Date();
//     maxDate.setDate(today.getDate() + 15);
//     return date < today || date > maxDate;
//   };

//   const handleConfirm = () => {
//     // Trigger the second modal for "Haircut" service
//     if (selectedService.name === "Haircut") {
//       setIsModalOpen(false);
//       setIsSecondModalOpen(true);
//     } else {
//       // Directly confirm without alert
//       const newBooking = {
//         service: selectedService,
//         date: selectedDate,
//         time: selectedTime,
//       };
//       setCart([...cart, newBooking]);
//       setIsModalOpen(false);
//     }
//   };

//   const handlePhotoUpload = (e) => {
//     setPhoto(e.target.files[0]);
//   };

//   const handleSubmit = () => {
//     const newBooking = {
//       service: selectedService,
//       date: selectedDate,
//       time: selectedTime,
//       photo: photo,
//       hairstyleName: hairstyle,
//     };
//     setCart([...cart, newBooking]);
//     setIsSecondModalOpen(false);
//   };

//   return (
//     <div className="flex flex-col sm:flex-row mt-14 gap-6 p-6 bg-gray-50 min-h-screen">
//       {/* Services Section */}
//       <div className="w-full sm:w-1/2 p-6 bg-white shadow-lg rounded-lg">
//         <div className="flex justify-between items-center mb-6">
//           <div className="flex items-center border border-gray-300 rounded-lg p-3 w-2/3 bg-gray-100">
//             <input
//               type="text"
//               placeholder="Search by name"
//               className="outline-none w-full bg-transparent text-gray-700"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//             />
//           </div>
//           <div className="relative">
//             <button
//               className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg transition hover:bg-blue-500 hover:text-white"
//               onClick={() => setShowSortOptions(!showSortOptions)}
//             >
//               Sort Options
//             </button>
//             {showSortOptions && (
//               <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
//                 <button
//                   className="block w-full px-4 py-2 hover:bg-gray-100"
//                   onClick={() => handleSort("price")}
//                 >
//                   By Price
//                 </button>
//                 <button
//                   className="block w-full px-4 py-2 hover:bg-gray-100"
//                   onClick={() => handleSort("name")}
//                 >
//                   By Name
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>

//         <h2 className="text-xl font-semibold mb-4">Services</h2>
//         <ul className="space-y-3">
//           {filteredServices.map((service, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition"
//             >
//               <span className="font-medium">{service.name}</span>
//               <div className="flex items-center space-x-3">
//                 <span className="text-lg font-semibold">₹{service.price}</span>
//                 <button
//                   className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                   onClick={() => handleBook(service)}
//                 >
//                   Book
//                 </button>
//               </div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Cart Section */}
//       <div className="w-full sm:w-1/2 p-6 bg-white shadow-lg rounded-lg">
//         <h2 className="text-xl font-semibold mb-4">Cart</h2>
//         <ul className="space-y-3">
//           {cart.map((booking, index) => (
//             <li
//               key={index}
//               className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg"
//             >
//               <div className="flex flex-col w-3/4">
//                 <span className="font-semibold">Service: {booking.service.name}</span>
//                 <span className="text-gray-600">Date: {booking.date.toLocaleDateString()}</span>
//                 <span className="text-gray-600">Time Slot: {booking.time}</span>
//                 <span className="text-gray-600">Hairstyle: {booking.hairstyleName}</span>
//                 <span className="font-semibold text-lg">Total Price: ₹{booking.service.price}</span>
//               </div>
//               {booking.service.name === "Haircut" && booking.photo && (
//                 <img
//                   src={URL.createObjectURL(booking.photo)}
//                   alt="Hairstyle"
//                   className="w-20 h-20 object-cover rounded-lg"
//                 />
//               )}
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Booking Modal */}
//       {isModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">
//               Select Date & Time for {selectedService?.name}
//             </h2>
//             <Calendar
//               onChange={(date) => setSelectedDate(date)}
//               value={selectedDate}
//               tileDisabled={({ date }) => isDateDisabled(date)}
//             />
//             <div className="mt-4">
//               <h3 className="text-lg font-semibold mb-2">Available Time Slots</h3>
//               <ul className="max-h-40 overflow-y-auto space-y-1">
//                 {timeSlots.map((time, index) => (
//                   <li
//                     key={index}
//                     className={`p-2 cursor-pointer rounded-lg ${
//                       selectedTime === time ? "bg-blue-300" : "hover:bg-blue-200"
//                     }`}
//                     onClick={() => setSelectedTime(time)}
//                   >
//                     {time}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="flex justify-end mt-4">
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600 transition"
//                 onClick={() => setIsModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                 onClick={handleConfirm}
//               >
//                 Confirm
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Upload Hairstyle Modal */}
//       {isSecondModalOpen && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
//             <h2 className="text-xl font-semibold mb-4">Upload Hairstyle Photo</h2>
//             <input
//               type="file"
//               onChange={handlePhotoUpload}
//               className="mb-4 w-full p-2 border border-gray-300 rounded-lg"
//               accept="image/*"
//             />
//             <input
//               type="text"
//               placeholder="Enter Hairstyle Name"
//               className="border border-gray-300 rounded-lg p-3 w-full mb-4"
//               value={hairstyle}
//               onChange={(e) => setHairstyle(e.target.value)}
//             />
//             <div className="flex justify-end">
//               <button
//                 className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600 transition"
//                 onClick={() => setIsSecondModalOpen(false)}
//               >
//                 Cancel
//               </button>
//               <button
//                 className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
//                 onClick={handleSubmit}
//               >
//                 Submit
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );

// };

// export default Servicessalon;










import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const Servicessalon = () => {
  const { id } = useParams(); // Get salon ID from URL

  const [services, setServices] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortOptions, setShowSortOptions] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [cart, setCart] = useState([]);

  // Predefined available time slots
  const availableTimeSlots = [
    "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM",
    "12:00 PM", "12:30 PM", "01:00 PM", "01:30 PM",
    "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM",
    "04:00 PM", "04:30 PM", "05:00 PM", "05:30 PM",
  ];

  // Fetch services from the database
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/partner/salons/${id}`);
        if (response.data.menuOperations?.services) {
          setServices(response.data.menuOperations.services);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [id]);

  const handleSort = (type) => {
    const sorted = [...services].sort((a, b) =>
      type === "price" ? a.price - b.price : a.name.localeCompare(b.name)
    );
    setServices(sorted);
    setShowSortOptions(false);
  };

  const filteredServices = services.filter((service) =>
    service.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleBook = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const isDateDisabled = (date) => {
    const today = new Date();
    const maxDate = new Date();
    maxDate.setDate(today.getDate() + 15);
    return date < today || date > maxDate;
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset selected time when a new date is chosen
  };

  const handleConfirm = () => {
    if (selectedService && selectedDate && selectedTime) {
      const newBooking = {
        service: selectedService.name,
        price: selectedService.price,
        date: selectedDate.toDateString(),
        time: selectedTime,
      };

      setCart([...cart, newBooking]); // Add booking to cart
      setIsModalOpen(false);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row mt-14 gap-6 p-6 bg-gray-50 min-h-screen">
      {/* Services Section */}
      <div className="w-full sm:w-1/2 p-6 bg-white shadow-lg rounded-lg">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center border border-gray-300 rounded-lg p-3 w-2/3 bg-gray-100">
            <input
              type="text"
              placeholder="Search by name"
              className="outline-none w-full bg-transparent text-gray-700"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="relative">
            <button
              className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg transition hover:bg-blue-500 hover:text-white"
              onClick={() => setShowSortOptions(!showSortOptions)}
            >
              Sort Options
            </button>
            {showSortOptions && (
              <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg">
                <button
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSort("price")}
                >
                  By Price
                </button>
                <button
                  className="block w-full px-4 py-2 hover:bg-gray-100"
                  onClick={() => handleSort("name")}
                >
                  By Name
                </button>
              </div>
            )}
          </div>
        </div>

        <h2 className="text-xl font-semibold mb-4">Services</h2>
        <ul className="space-y-3">
          {filteredServices.map((service, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-100 shadow-md rounded-lg hover:shadow-lg transition"
            >
              <span className="font-medium">{service.name}</span>
              <div className="flex items-center space-x-3">
                <span className="text-lg font-semibold">₹{service.price}</span>
                <button
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                  onClick={() => handleBook(service)}
                >
                  Book
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Select Date & Time for {selectedService?.name}
            </h2>
            <Calendar
              onChange={handleDateChange}
              value={selectedDate}
              tileDisabled={({ date }) => isDateDisabled(date)}
            />
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Select a Time Slot</h3>

              {selectedDate ? (
                <ul className="max-h-40 overflow-y-auto space-y-1">
                  {availableTimeSlots.map((time, index) => (
                    <li
                      key={index}
                      className={`p-2 cursor-pointer rounded-lg ${
                        selectedTime === time ? "bg-blue-300" : "hover:bg-blue-200"
                      }`}
                      onClick={() => setSelectedTime(time)}
                    >
                      {time}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">Select a date first to choose a time slot.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button className="px-4 py-2 bg-red-500 text-white rounded-lg mr-2 hover:bg-red-600 transition" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition" onClick={handleConfirm}>
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Display Confirmed Bookings */}
      {cart.length > 0 && (
        <div className="w-full sm:w-1/2 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Confirmed Bookings</h2>
          <ul className="space-y-3">
            {cart.map((booking, index) => (
              <li key={index} className="p-4 bg-green-100 shadow-md rounded-lg">
                <p><strong>Service:</strong> {booking.service}</p>
                <p><strong>Price:</strong> ₹{booking.price}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Servicessalon;
