import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { useCookies } from "react-cookie";
import axios from "axios";

export default function Dashboard() {
  const [appointments, setAppointments] = useState({ pending: 0, completed: 0 });
  const [reports, setReports] = useState({ daily: 0, weekly: 0, monthly: 0 });
  const [bookings, setBookings] = useState([]);
  const [Sb, setSb] = useState([]);
  const [cookies] = useCookies(["salonid"]);
  const [sid,setSid]=useCookies(["sid"]);
  
  const navigate = useNavigate();

  console.log(cookies.email)




  useEffect(() => {
    const userEmail = cookies.email; // 👈 Get the actual email string
  
    if (!userEmail) {
      console.warn("No user email in cookies.");
      return;
    }

axios
  .get("http://localhost:5000/getSuccessbooking")
  .then((resp) => {
    // resp.data is the parsed JSON
    console.log("running");
    console.log("success", sid.sid);

    // filter by your sid
    const mydata = resp.data.data.filter(
      (item) => String(item.salonId) === String(sid.sid)
    );

    console.log("axioss",mydata);
    setSb(mydata);
  })
  .catch((err) =>
    console.error("Error fetching success bookings:", err)
  );

    //  fetch()
    //   .then((res) =>{ 
    //     res.json()
    //     console.log("runing")
    //   })
    //   .then((data) =>{
    //     console.log("success",data.data)
    //      const mydata = data.data.filter(item => item.id === sid.sid);

    //      console.log("mydata",mydata)
    //      setSb(mydata)
    //   })
    //   .catch((err) => console.error("Error fetching success bookings:", err));
  
    axios.post("http://localhost:5001/salonid", { email: userEmail })
      .then((resp) => {
        const id = resp.data.data;
        console.log("Salon ID:", id);
        setSid("sid",id);
      })
      .catch((err) => {
        console.error("Error fetching salon ID:", err);
      });
  }, []);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }


    fetch("http://localhost:5000/api/appointments")
      .then((res) => res.json())
      .then((data) => setAppointments({ pending: data.pending || 0, completed: data.completed || 0 }))
      .catch((err) => console.error("Error fetching appointments:", err));

    fetch("http://localhost:5000/api/reports")
      .then((res) => res.json())
      .then((data) => setReports({ daily: data.daily || 0, weekly: data.weekly || 0, monthly: data.monthly || 0 }))
      .catch((err) => console.error("Error fetching reports:", err));

    fetch("http://localhost:5000/getbooking")
      .then((res) => res.json())
      .then((data) => setBookings(data.data))
      .catch((err) => console.error("Error fetching bookings:", err));

   
  }, []);

  const handleDecide = (booking_id, decision) => {
    fetch(`http://localhost:5000/decide/${decision}/${booking_id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data.message);
        setBookings(prev => prev.filter(booking => booking._id !== booking_id));
        if (decision === 1) {
          fetch("http://localhost:5000/getSuccessbooking")
            .then((res) => res.json())
            .then((data) => {
               const mydata = data.data.filter(
            (item) => String(item.id) === String(sid.sid)
    );
     console.log("mydata", mydata);
           setSb(mydata);
            });
        }
      })
      .catch((err) => console.error(err));

       window.location.reload();
  };

  const salonId = sid.sid;
  console.log("saloon id",sid.sid)
  const filteredBookings = bookings.filter((b) => b.salonId === salonId);
  const filteredSb = Sb.filter((b) => b.salonid === salonId);
  // console.log(filteredBookings)
  // console.log(bookings)

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-blue-200 to-teal-300 px-8 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-semibold mb-12 text-gray-900">Dashboard Overview</h1>

          {/* Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
            <Card title="Pending Appointments" value={filteredBookings.length} color="bg-gradient-to-r from-yellow-200 to-yellow-400" icon="📅" />
            <Card title="Completed Appointments" value={Sb.length} color="bg-gradient-to-r from-green-200 to-green-400" icon="✔️" />
            <Card title="Daily Reports" value={reports.daily} color="bg-gradient-to-r from-blue-200 to-blue-400" icon="📊" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
            <Card title="Weekly Reports" value={reports.weekly} color="bg-gradient-to-r from-purple-200 to-purple-400" icon="📈" />
            <Card title="Monthly Reports" value={reports.monthly} color="bg-gradient-to-r from-pink-200 to-pink-400" icon="📆" />
          </div>

          {/* Booking List */}
          <div className="mt-16">
            <h2 className="text-3xl font-semibold text-gray-800 mb-8">Booking Entries</h2>
            <div className="space-y-8">
              {filteredBookings.length === 0 ? (
                <div className="text-center text-gray-500 py-16">No booking entries found.</div>
              ) : (
                filteredBookings.map((booking, index) => (
                  <div
                    key={index}
                    className="bg-white/60 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-6 px-8 py-6">
                      {/* Left: Booking Details */}
                      <div className="space-y-2 text-left">
                        <h3 className="text-lg font-semibold text-gray-900">{booking.customerName}</h3>
                        <p className="text-sm text-gray-600">Service: <span className="font-medium text-gray-800">{booking.service}</span></p>
                        <p className="text-sm text-gray-600">Time: <span className="text-gray-800">{booking.time}</span></p>
                        <p className="text-sm text-gray-600">Date: <span className="text-gray-800">{new Date(booking.date).toLocaleDateString()}</span></p>
                        <p className="text-sm text-gray-600">Booked: <span className="text-gray-800">{new Date(booking.bookedAt).toLocaleString()}</span></p>
                        <p className="text-sm text-gray-600">Barber: <span className="text-gray-800">{booking.barber}</span></p>
                        <p className="text-sm text-gray-600">Price: <span className="text-green-700 font-bold">₹{booking.price}</span></p>
                      </div>

                      {/* Center: Image */}
                      <div className="flex justify-center items-center">
                        {booking.image ? (
                          <img
                            src={booking.image}
                            alt="Style"
                            className="w-32 h-32 object-cover rounded-2xl shadow-lg border border-gray-300"
                          />
                        ) : (
                          <div className="text-sm text-gray-400">No Image</div>
                        )}
                      </div>

                      {/* Right: Buttons */}
                      <div className="flex flex-col gap-4 items-center md:items-end">
                        <button
                          onClick={() => handleDecide(booking._id, 1)}
                          className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
                        >
                          <FaCheckCircle className="text-lg" /> Accept
                        </button>
                        <button
                          onClick={() => handleDecide(booking._id, 0)}
                          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2"
                        >
                          <FaTimesCircle className="text-lg" /> Reject
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Card({ title, value, color, icon }) {
  return (
    <div className={`${color} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 cursor-pointer`}>
      <div className="flex items-center gap-4">
        <span className="text-3xl">{icon}</span>
        <div>
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
          <p className="text-3xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
      </div>
    </div>
  );
}
