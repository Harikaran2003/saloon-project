import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Contract() {
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate(); // ✅ React Router navigation

  const handleProceed = async () => {
    const userId = localStorage.getItem("userId") || null;
    const validUserId = userId && /^[0-9a-fA-F]{24}$/.test(userId) ? userId : null;

    const basicData = JSON.parse(localStorage.getItem("basicData")) || {};
    const menuData = JSON.parse(localStorage.getItem("menuData")) || {};
    const salonDocumentData = JSON.parse(localStorage.getItem("salonDocumentData")) || {};

    const finalData = {
      salonName: basicData.salonName || "",
      ownerName: basicData.ownerName || "",
      email: basicData.email || "",
      phone: basicData.phone || "",

      address: {
        shopNumber: basicData.address?.shopNumber || "",
        floor: basicData.address?.floor || "",
        area: basicData.address?.area || "",
        landmark: basicData.address?.landmark || "",
        city: basicData.address?.city || "",
        state: basicData.address?.state || "",
        country: basicData.address?.country || "",
        pincode: basicData.address?.pincode || "",
      },

      timings: {
        startTime: {
          hour: basicData.timings?.startTime?.hour || 9,
          minute: basicData.timings?.startTime?.minute || 0,
          ampm: basicData.timings?.startTime?.ampm || "AM",
        },
        endTime: {
          hour: basicData.timings?.endTime?.hour || 8,
          minute: basicData.timings?.endTime?.minute || 0,
          ampm: basicData.timings?.endTime?.ampm || "PM",
        },
      },

      openDays: basicData.openDays || [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
      ],

      menuOperations: {
        services: Array.isArray(menuData.services)
          ? menuData.services.map((service) => ({
            name: service.name || "Unnamed Service",
            price: Number(service.price) || 0,
          }))
          : [],
        uploadedImages: Array.isArray(menuData.uploadedImages) ? menuData.uploadedImages : [],
        selectedDevice: menuData.selectedDevice || "",
        barbers: Array.isArray(menuData.barbers) 
  ? menuData.barbers.map((barber) => ({
      name: barber.name || "Unnamed Barber",
      image: barber.photo?.url || "", // ✅ Extract `url` safely
    }))
  : [],


      },

      salonDocuments: {
        pan: {
          panNumber: salonDocumentData?.panNumber || "",
          panImage: salonDocumentData?.panImage || "",
        },
        aadhaar: {
          aadhaarNumber: salonDocumentData?.aadhaarNumber || "",
          aadhaarImage: salonDocumentData?.aadhaarImage || "",
        },
        certifications: {
          gstRegistrationCertificate:
            salonDocumentData?.certifications?.["GST Registration Certificate"] || "",
          rentAgreementOrPropertyProof:
            salonDocumentData?.certifications?.["Rent Agreement / Property Ownership Proof"] || "",
          shopEstablishmentLicense:
            salonDocumentData?.certifications?.["Shop & Establishment License"] || "",
          salonRegistrationCertificate:
            salonDocumentData?.certifications?.["Salon Registration Certificate"] || "",
        },
      },

      contract: {
        isContractAccepted: true,
        acceptedAt: new Date().toISOString(),
        userId: validUserId,
      },

      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch("http://localhost:5000/api/salon/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(finalData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Data successfully submitted!");
        localStorage.setItem("isSalonRegistered", "true"); // ✅ Store contract acceptance
        localStorage.removeItem("basicData");
        localStorage.removeItem("menuData");
        localStorage.removeItem("salonDocumentData");
        navigate("/dashboard"); // ✅ Redirect to Dashboard
      } else {
        console.error("❌ Error Response:", result);
        alert(result.message || "Failed to submit data.");
      }
    } catch (error) {
      console.error("❌ Network Error:", error);
      alert("Network error. Try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">Salon Partner Contract</h1>
        <p className="mb-4 text-gray-600">Read and accept the contract to proceed.</p>

        <div className="border p-4 rounded-md mb-4 bg-gray-50 max-h-60 overflow-y-auto text-sm">
          <h2 className="font-semibold mb-2">Terms and Conditions</h2>
          <p>
            1. The salon must follow health, safety, and cleanliness regulations.<br />
            2. Service listings and pricing must be accurate.<br />
            3. All bookings must be honored with quality service.<br />
            4. Cancellation policies must be clear to customers.<br />
            5. Payouts follow the agreed schedule.<br />
            6. Violating these terms may result in termination.
          </p>
        </div>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="w-4 h-4 mr-2"
          />
          <label className="text-gray-700">I agree to the terms and conditions.</label>
        </div>

        <button
          className={`w-full py-2 px-4 rounded-lg text-white font-bold ${isChecked ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed"
            }`}
          disabled={!isChecked}
          onClick={handleProceed}
        >
          Accept and Proceed
        </button>
      </div>
    </div>
  );
}
