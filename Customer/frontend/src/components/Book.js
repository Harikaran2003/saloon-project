import React, { useState } from "react";

function Book() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedService, setSelectedService] = useState('Haircut');
    const [rate, setRate] = useState(100);
    const [selectedTime, setSelectedTime] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [showMore, setShowMore] = useState(false); // Single flag for showing the input field
    const [customTime, setCustomTime] = useState(''); // For the custom input time

    // Function to format the date in DD-MM-YYYY format
    const getFormattedDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    // Function to go to the previous day
    const handlePrevClick = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() - 1)));
    };

    // Function to go to the next day
    const handleNextClick = () => {
        setCurrentDate(new Date(currentDate.setDate(currentDate.getDate() + 1)));
    };

    // Function to handle the service change and adjust the rate
    const handleServiceChange = (event) => {
        const service = event.target.value;
        setSelectedService(service);
        setRate(service === 'Haircut' ? 100 : 60); // Set the rate based on the selected service
    };

    // Function to handle the time slot click
    const handleTimeClick = (time) => {
        setSelectedTime(time); // Set the selected time
    };

    // Function to toggle the "More" button functionality
    const handleMoreClick = () => {
        setShowMore(!showMore); // Toggle the "More" for showing the input field
    };

    // Function to handle custom time input
    const handleCustomTimeChange = (value) => {
        setCustomTime(value); // Update the custom time
        setSelectedTime(value); // Set the selected time to the custom time
    };

    // Function to book the appointment
    const handleBookNow = () => {
        if (selectedTime && phoneNumber) {
            alert('Appointment booked successfully!');
        } else {
            alert('Please select a time and enter your phone number.');
        }
    };

    // Function to generate time slots from 9:00 AM to 11:00 PM
    const generateTimeSlots = () => {
        const times = [];
        for (let i = 9; i <= 23; i++) {
            const hour = i > 12 ? i - 12 : i;
            const period = i >= 12 ? "PM" : "AM";
            times.push(hour + ":00 " + period, hour + ":30 " + period);
        }
        return times;
    };

    const timeSlots = generateTimeSlots(); // Get the time slots

    // Generate the next 4 days based on the current date
    const days = ['MON', 'TUE', 'WED', 'THU'];
    const dates = Array.from({ length: 4 }, (_, i) => {
        const date = new Date(currentDate);
        date.setDate(currentDate.getDate() + i);
        return date;
    });

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-3/4">
                <h1 className="text-2xl font-semibold mb-6">Book Appointment</h1>
                <div className="grid grid-cols-2 gap-6">
                    {/* Left side: Service and Phone Number Input */}
                    <div>
                        <label className="block text-gray-700 mb-2">REASON FOR VISIT</label>
                        <select className="w-full p-2 border border-gray-300 rounded" onChange={handleServiceChange}>
                            <option>Haircut</option>
                            <option>Shaving</option>
                        </select>
                        <label className="block text-gray-700 mt-4 mb-2">RATE</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded" value={`${rate} Rs`} readOnly />
                        <label className="block text-gray-700 mt-4 mb-2">TIME</label>
                        <input type="text" className="w-full p-2 border border-gray-300 rounded" value={selectedTime} readOnly />
                        <label className="block text-gray-700 mt-4 mb-2">PHONE NUMBER</label>
                        <input type="tel" className="w-full p-2 border border-gray-300 rounded" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>

                    {/* Right side: Time Slots and Calendar */}
                    <div>
                        <div className="bg-gray-100 p-4 rounded-lg">
                            <div className="flex justify-between items-center mb-4">
                                <button className="text-gray-500" onClick={handlePrevClick}>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                {dates.map((date, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-gray-700">{days[index]}</div>
                                        <div className="text-gray-500 text-sm">{getFormattedDate(date)}</div>
                                    </div>
                                ))}
                                <button className="text-gray-500" onClick={handleNextClick}>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>

                            <div className="grid grid-cols-4 gap-2">
                                {timeSlots.slice(0, 4).map((time, index) => (
                                    <div
                                        key={index}
                                        className="bg-blue-500 text-white text-center p-2 rounded hover:bg-yellow-500 cursor-pointer mt-1"
                                        onClick={() => handleTimeClick(time)}
                                    >
                                        {time}
                                    </div>
                                ))}
                            </div>

                            {/* Show More Button and Text Field for Custom Time */}
                            <div className="text-center mt-4">
                                {showMore && (
                                    <input
                                        type="text"
                                        className="mt-2 p-2 border border-gray-300 rounded w-full"
                                        placeholder="Enter custom time"
                                        value={customTime}
                                        onChange={(e) => handleCustomTimeChange(e.target.value)}
                                    />
                                )}
                                <button
                                    className="text-blue-500 mt-2"
                                    onClick={handleMoreClick}
                                >
                                    {showMore ? "SHOW LESS" : "MORE..."}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-between mt-6">
                    <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded">CANCEL</button>
                    <button className="bg-yellow-500 text-white px-4 py-2 rounded" onClick={handleBookNow}>BOOK NOW</button>
                </div>
            </div>
        </div>
    );
}

export default Book;