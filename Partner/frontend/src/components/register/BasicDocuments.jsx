import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';


const BasicDocuments = ({goToNextStep}) => {
    const [salonName, setSalonName] = useState("");
    const [ownerName, setOwnerName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [shopNumber, setShopNumber] = useState("");
    const [floor, setFloor] = useState("");
    const [area, setArea] = useState("");
    const [landmark, setLandmark] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [country, setCountry] = useState("");
    const [pincode, setPincode] = useState("");
    const [isPhoneValid, setIsPhoneValid] = useState(true);
    const [deliveryStartHour, setDeliveryStartHour] = useState(9);
    const [deliveryStartMinute, setDeliveryStartMinute] = useState(0);
    const [deliveryStartAMPM, setDeliveryStartAMPM] = useState("AM");
    const [deliveryEndHour, setDeliveryEndHour] = useState(6);
    const [deliveryEndMinute, setDeliveryEndMinute] = useState(0);
    const [deliveryEndAMPM, setDeliveryEndAMPM] = useState("PM");


    useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user")); 
        if (userData) {
            setEmail(userData.email || "");  // Pre-fill email from stored user data
        }
    }, []);


    const handlePhoneChange = (value) => {
        setPhone(value);
        setIsPhoneValid(value && value.length >= 10);  // Ensure minimum 10 digits
    };
    

    const isFormValid = () => {
        return salonName && ownerName && email && phone &&
               shopNumber && floor && area && landmark && city &&
               state && country && pincode && isPhoneValid; 
    };    

    const handleNext = () => {
        // Retrieve existing salon data (if any) from localStorage
        const existingData = JSON.parse(localStorage.getItem("basicData")) || {};
    
        // Merge new data with existing data
        const updatedbasicData = {
            ...existingData,  // Preserve previously saved data
            salonName,
            ownerName,
            email,
            phone,
            address: {
                shopNumber,
                floor,
                area,
                landmark,
                city,
                state,
                country,
                pincode
            },
            salonTimings: {
                startTime: { hour: deliveryStartHour, minute: deliveryStartMinute, ampm: deliveryStartAMPM },
                endTime: { hour: deliveryEndHour, minute: deliveryEndMinute, ampm: deliveryEndAMPM }
            }
        };
    
        // Save updated object to localStorage
        localStorage.setItem("basicData", JSON.stringify(updatedbasicData));
    
        // Proceed to the next step
        goToNextStep();
    };
    
    
    return (
        <div >

            <h2 className="text-3xl font-semibold mb-8 text-gray-800">Salon Information</h2>

            {/* Salon Name Section */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <div className="mb-6">
                    <label className="block text-xl font-medium mb-2 text-gray-900">Salon name</label>
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-3"
                        placeholder="Salon name*"
                        value={salonName}
                        onChange={(e) => setSalonName(e.target.value)}
                    />
                </div>
            </div>

            {/* Owner Information Section */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-2 text-gray-900">Owner Details</h3>
                <input
                    type="text"
                    className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 mt-2 mb-4"
                    placeholder="Full name*"
                    value={ownerName}
                    onChange={(e) => setOwnerName(e.target.value)}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="w-full">
                        <label className="block text-lg font-medium mb-2 text-gray-900">Phone number*</label>
                        <PhoneInput
                            international
                            defaultCountry="IN"
                            value={phone}
                            onChange={handlePhoneChange}
                            className={`w-full p-4 border ${isPhoneValid ? 'border-gray-300' : 'border-red-500'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500`}
                            placeholder="Phone number*"
                        />
                        {!isPhoneValid && <p className="text-red-500 text-sm">Please enter a valid phone number</p>}
                        <button className="mt-2 text-sm text-blue-500">Verify</button>
                    </div>
                    <div>
                        <label className="block text-lg font-medium mb-2 text-gray-900">Email address*</label>
                        <input
                            type="email"
                            className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            value={email}
                            disabled // Make it read-only
                        />
                    </div>
                </div>
            </div>

            {/* Address Section */}
            <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-4 text-gray-900">Address Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Shop Number*"
                        value={shopNumber}
                        onChange={(e) => setShopNumber(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Floor*"
                        value={floor}
                        onChange={(e) => setFloor(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Area*"
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Landmark*"
                        value={landmark}
                        onChange={(e) => setLandmark(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="City*"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="State*"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Country*"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                    <input
                        type="text"
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        placeholder="Pincode*"
                        value={pincode}
                        onChange={(e) => setPincode(e.target.value)}
                    />
                </div>
            </div>

            {/* Delivery Timing Section */}
            <div className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="text-xl font-medium mb-4 text-gray-900">Salon Timings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Start Time */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <select
                                className="p-3 w-16 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={deliveryStartHour}
                                onChange={(e) => setDeliveryStartHour(Number(e.target.value))}
                            >
                                {[...Array(12).keys()].map((i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <span className="ml-2 text-lg">:</span>
                        </div>
                        <div className="flex items-center">
                            <select
                                className="p-3 w-16 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={deliveryStartMinute}
                                onChange={(e) => setDeliveryStartMinute(Number(e.target.value))}
                            >
                                {[0, 15, 30, 45].map((min) => (
                                    <option key={min} value={min}>{min < 10 ? `0${min}` : min}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <select
                                className="p-3 w-20 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={deliveryStartAMPM}
                                onChange={(e) => setDeliveryStartAMPM(e.target.value)}
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>

                    {/* End Time */}
                    <div className="flex items-center gap-4">
                        <div className="flex items-center">
                            <select
                                className="p-3 w-16 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={deliveryEndHour}
                                onChange={(e) => setDeliveryEndHour(Number(e.target.value))}
                            >
                                {[...Array(12).keys()].map((i) => (
                                    <option key={i} value={i + 1}>{i + 1}</option>
                                ))}
                            </select>
                            <span className="ml-2 text-lg">:</span>
                        </div>
                        <div className="flex items-center">
                            <select
                                className="p-3 w-16 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={deliveryEndMinute}
                                onChange={(e) => setDeliveryEndMinute(Number(e.target.value))}
                            >
                                {[0, 15, 30, 45].map((min) => (
                                    <option key={min} value={min}>{min < 10 ? `0${min}` : min}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center">
                            <select
                                className="p-3 w-20 text-center border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                value={deliveryEndAMPM}
                                onChange={(e) => setDeliveryEndAMPM(e.target.value)}
                            >
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="mb-6">
                    <h2 className="text-lg font-medium text-gray-900">Mark Open Days</h2>
                    <p className="text-sm text-gray-500 mb-4">Don’t forget to uncheck your off-day.</p>
                    <div className="grid grid-cols-3 gap-6">
                        {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day) => (
                            <label key={day} className="flex items-center space-x-2 border border-white shadow-md rounded-lg p-3">
                                <input type="checkbox" className="form-checkbox h-5 w-5 text-green-600" defaultChecked />
                                <span>{day}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Add Day Wise Slots */}
                <div className="text-right">
                    <a href="#" className="text-green-500 text-sm">Add day-wise slots</a>
                </div>
            </div>
            <button 
    className={`w-full mt-6 px-6 py-3 rounded-lg font-semibold transition ${isFormValid() ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
    disabled={!isFormValid()}
    onClick={handleNext}  // Trigger localStorage save + step change
>
    Next
</button>


        </div>
    );
};
BasicDocuments.propTypes = {
    goToNextStep: PropTypes.func.isRequired,
};

export default BasicDocuments;

