import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaTimesCircle, FaTimes, FaPlus } from "react-icons/fa";

const MenuOperations = ({ goToNextStep }) => {
  const [services, setServices] = useState([{ name: "", price: "" }]);
  const [uploadedImages, setUploadedImages] = useState([]);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [showGuidelines, setShowGuidelines] = useState(false);
  const [numOfBarbers, setNumOfBarbers] = useState(0); // New state for number of barbers
  const [barbers, setBarbers] = useState([]); // New state for barbers' details

  // Load existing data from localStorage
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem("menuData")) || {};
    setServices(savedData.services || [{ name: "", price: "" }]);
    setUploadedImages(savedData.uploadedImages || []);
    setSelectedDevice(savedData.selectedDevice || null);
    setNumOfBarbers(savedData.numOfBarbers || 0);
    
    // Ensure stored barber images are properly set
    const storedBarbers = savedData.barbers?.map(barber => ({
      name: barber.name || "",
      photo: barber.photo || "", // Ensure photo exists
    })) || [];
  
    setBarbers(storedBarbers);
  }, []);
  

  // Handle service change
  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...services];
    updatedServices[index][field] = value;
    setServices(updatedServices);
  };

  // Add a new service
  const addService = () => {
    setServices([...services, { name: "", price: "" }]);
  };

  // Handle image upload
  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);

    const readFilesAsBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
      });
    };

    Promise.all(files.map(readFilesAsBase64))
      .then((base64Images) => {
        setUploadedImages((prevImages) => [...prevImages, ...base64Images]);
      })
      .catch((error) => console.error("Error uploading images:", error));
  };

  // Remove an uploaded image
  const removeImage = (index) => {
    setUploadedImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  // Handle barber input changes
  // Handle barber input changes
  const handleBarberChange = (index, field, value) => {
    setBarbers((prevBarbers) => {
      const updatedBarbers = [...prevBarbers];
  
      if (field === "photo" && value && value[0]) {
        const file = value[0];
        const reader = new FileReader();
  
        reader.onloadend = () => {
          updatedBarbers[index] = { 
            ...updatedBarbers[index], 
            photo: { url: reader.result }  // ✅ Storing it as { photo: { url: "base64string" } }
          };
          setBarbers([...updatedBarbers]); // ✅ Ensures state update
        };
  
        reader.readAsDataURL(file);
      } else {
        updatedBarbers[index] = { 
          ...updatedBarbers[index], 
          [field]: value || "" 
        };
        return [...updatedBarbers]; // ✅ Ensures state updates properly
      }
  
      return prevBarbers;
    });
  };
  
  


  // Handle number of barbers change
  const handleNumOfBarbersChange = (event) => {
    const value = event.target.value.trim(); // Remove accidental spaces
    const number = value === "" ? 0 : parseInt(value, 10); // Convert only if not empty
  
    if (!isNaN(number)) {
      setNumOfBarbers(number);
      setBarbers(Array.from({ length: number }, () => ({ name: "", photo: "" })));
    }
  };
  

  // Save data & move to the next step
  // Save data & move to the next step
const handleNext = () => {
  const existingData = JSON.parse(localStorage.getItem("menuData")) || {};
  const updatedData = {
    ...existingData,
    services,
    uploadedImages,
    selectedDevice,
    numOfBarbers,
    barbers, // Make sure this contains the updated barber data, including photos
  };

  localStorage.setItem("menuData", JSON.stringify(updatedData)); // ✅ Corrected key name
  goToNextStep();
};


  const ImageUploadGuidelines = ({ setShowGuidelines }) => {
    const guidelines = [
      { img: "https://placehold.co/100x100", text: "A clear entrance image of your salon is required.", valid: true },
      { img: "https://placehold.co/100x100", text: "Closed shutter images will be rejected.", valid: false },
      { img: "https://placehold.co/100x100", text: "Submit clear HD photos of your salon’s interiors.", valid: true },
      { img: "https://placehold.co/100x100", text: "Blurry, low-quality photos will not be accepted.", valid: false },
    ];

    ImageUploadGuidelines.propTypes = {
      setShowGuidelines: PropTypes.func.isRequired,
    };
  
    return (
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white p-6 rounded-lg shadow-lg w-96 z-50 mt-5">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold">Image Upload Guidelines</h1>
          <button className="text-gray-500" onClick={() => setShowGuidelines(false)}>
            <FaTimes />
          </button>
        </div>
        <div className="space-y-4">
          {guidelines.map((item, index) => (
            <div key={index} className="flex items-start space-x-4">
              <img src={item.img} alt={item.text} className="w-16 h-16 rounded-md object-cover" />
              <p className="text-sm flex-1">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Check if Next button should be disabled
  const isNextDisabled = () => {
    return (
      services.some((service) => service.name.trim() === "" || service.price.trim() === "") ||
      uploadedImages.length === 0 ||
      !selectedDevice ||
      barbers.some((barber) => barber.name.trim() === "" || !barber.photo)
    );
  };

  return (
    <div className="relative p-6">
      <h2 className="text-3xl font-semibold mb-8 text-gray-800">Menu & Operations</h2>

      {/* Image Upload Section */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4 text-gray-900">Upload Salon Images</h3>
        <div className="border-2 border-dashed border-blue-300 rounded-lg p-6 flex flex-col items-center justify-center bg-blue-50">
          <input
            type="file"
            multiple
            accept="image/png, image/jpeg"
            className="hidden"
            id="fileUpload"
            onChange={handleImageUpload}
          />
          <label htmlFor="fileUpload" className="cursor-pointer flex flex-col items-center">
            <FaPlus className="text-blue-500 text-3xl mb-2" />
            <p className="text-blue-500 font-semibold">Add Salon Images</p>
            <p className="text-gray-500">JPEG, PNG formats up to 5MB</p>
          </label>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4">
          {uploadedImages.map((src, index) => (
            <div key={index} className="relative">
              <img src={src} alt="Uploaded" className="w-24 h-24 rounded-md object-cover" />
              <FaTimesCircle
                className="absolute top-0 right-0 text-red-500 text-lg cursor-pointer"
                onClick={() => removeImage(index)}
              />
            </div>
          ))}
        </div>
        <button onClick={() => setShowGuidelines(true)} className="text-blue-500 mt-4 block text-center w-full">Guidelines to Upload Salon Images</button>
      </div>
      {showGuidelines && <ImageUploadGuidelines setShowGuidelines={setShowGuidelines} />}

      {/* Services Section */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4 text-gray-900">Services & Pricing</h3>
        {services.map((service, index) => (
          <div key={index} className="grid grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Service Name*"
              value={service.name}
              onChange={(e) => handleServiceChange(index, "name", e.target.value)}
            />
            <input
              type="number"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Price (INR)*"
              value={service.price}
              onChange={(e) => handleServiceChange(index, "price", e.target.value)}
            />
          </div>
        ))}
        <button className="mt-2 text-sm text-blue-500" onClick={addService}>
          + Add Another Service
        </button>
      </div>

      {/* Number of Barbers Section */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-4 text-gray-900">Number of Barbers</h3>
        <input
          type="number"
          value={numOfBarbers}
          onChange={handleNumOfBarbersChange}
          min="0"
          className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Enter number of barbers"
        />
      </div>

      {/* Barbers Section */}
      {numOfBarbers > 0 && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-medium mb-4 text-gray-900"> Barber Details</h3>
          {barbers.map((barber, index) => (
            <div key={index} className="grid grid-cols-2 gap-4 mb-4">
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder={`Barber ${index + 1} Name`}
                value={barber.name}
                onChange={(e) => handleBarberChange(index, "name", e.target.value)}
              />
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                onChange={(e) => handleBarberChange(index, "photo", e.target.files)}
              />
            </div>
          ))}
        </div>
      )}

      {/* Device Selection */}
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-medium mb-8 text-gray-900">Select the device type</h3>
        <div className="space-y-4">
          {["Mobile App (Android Only)", "Web Dashboard", "POS System"].map((device, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-4 border-lg rounded-lg cursor-pointer hover:shadow-md transition ${selectedDevice === device ? "border border-green-500 shadow-lg" : "border-gray-300"}`}
              onClick={() => setSelectedDevice(device)}
            >
              <p className="text-gray-800 font-medium">{device}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Next Button */}
      <button
        className={`w-full px-6 py-3 rounded-lg font-semibold transition ${
          isNextDisabled() ? "bg-blue-300 opacity-50 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"
        }`}
        disabled={isNextDisabled()}
        onClick={handleNext}
      >
        Next
      </button>
    </div>
  );
};

MenuOperations.propTypes = {
  goToNextStep: PropTypes.func.isRequired,
};

export default MenuOperations;
