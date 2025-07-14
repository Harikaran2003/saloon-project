import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { PhotoIcon, PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/solid";

const FileUpload = ({ label, id, onChange, file, onRemove }) => {
    FileUpload.propTypes = {
        label: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        file: PropTypes.string,
        onRemove: PropTypes.func.isRequired,
    };
    return (
        <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">{label}</label>
            <div className="relative border border-gray-300 rounded-lg p-3 flex flex-col items-center cursor-pointer" onClick={() => document.getElementById(id).click()}>
                <div className="bg-blue-100 p-4 rounded-full mb-4 relative">
                    <PhotoIcon className="text-blue-500 w-12 h-12" />
                    <PlusCircleIcon className="text-blue-500 w-5 h-5 absolute -mt-2 -ml-2" />
                </div>
                <p className="text-lg font-semibold text-gray-700 mb-2">Upload {label}</p>
                <p className="text-gray-500 mb-4">jpeg, png, or pdf (Max 5MB)</p>
                <input type="file" accept=".jpeg,.jpg,.png,.pdf" id={id} className="hidden" onChange={onChange} />
            </div>
            {file && (
                <div className="mt-3 flex items-center space-x-3 border p-2 rounded-lg shadow-md bg-gray-100">
                    {file.startsWith("data:image") ? (
                        <img src={file} alt="Preview" className="w-12 h-12 object-cover rounded-lg" />
                    ) : (
                        <p className="text-sm text-gray-700 truncate">File Uploaded</p>
                    )}
                    <XCircleIcon className="w-5 h-5 text-red-500 cursor-pointer" onClick={onRemove} />
                </div>
            )}
        </div>
    );
};

const SalonDocuments = ({ goToNextStep }) => {
    const [salonDocumentData, setsalonDocumentData] = useState({
        panNumber: "",
        panImage: "",
        aadhaarNumber: "",
        aadhaarImage: "",
        certifications: {}
    });

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("salonDocumentData")) || {
            panNumber: "",
            panImage: "",
            aadhaarNumber: "",
            aadhaarImage: "",
            certifications: {}
        };
        setsalonDocumentData(savedData);
    }, []);

    useEffect(() => {
        localStorage.setItem("salonDocumentData", JSON.stringify(salonDocumentData));
    }, [salonDocumentData]);

    const convertFileToBase64 = (file, callback) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => callback(reader.result);
        reader.onerror = (error) => console.error("Base64 conversion error:", error);
    };

    const handleFileChange = (event, type, certType) => {
        const file = event.target.files[0];
        if (!file) return;

        if (["image/jpeg", "image/png", "application/pdf"].includes(file.type) && file.size <= 5 * 1024 * 1024) {
            convertFileToBase64(file, (base64) => {
                setsalonDocumentData((prevData) => {
                    const updatedData = certType
                        ? { ...prevData, certifications: { ...prevData.certifications, [certType]: base64 } }
                        : { ...prevData, [type]: base64 };
                    return updatedData;
                });
            });
        } else {
            alert("Invalid file. Please upload a JPEG, PNG, or PDF file up to 5MB.");
        }
    };

    const handleRemoveFile = (type, certType) => {
        setsalonDocumentData((prevData) => {
            if (certType) {
                const updatedCertifications = { ...prevData.certifications };
                delete updatedCertifications[certType];
                return { ...prevData, certifications: updatedCertifications };
            }
            return { ...prevData, [type]: "" };
        });
    };

    const isFormComplete = salonDocumentData.panNumber && salonDocumentData.panImage && salonDocumentData.aadhaarNumber && salonDocumentData.aadhaarImage &&
        ["Salon Registration Certificate", "GST Registration Certificate", "Shop & Establishment License", "Rent Agreement / Property Ownership Proof"].every(cert => salonDocumentData.certifications[cert]);

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-4xl">
                <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 w-full">
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Enter PAN Details</h3>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg mb-4" placeholder="PAN Number*" value={salonDocumentData.panNumber} onChange={(e) => setsalonDocumentData({ ...salonDocumentData, panNumber: e.target.value })} />
                    <FileUpload label="PAN" id="panUpload" onChange={(e) => handleFileChange(e, "panImage")} file={salonDocumentData.panImage} onRemove={() => handleRemoveFile("panImage")} />
                </div>

                <div className="bg-white border border-gray-300 rounded-lg p-6 mb-8 w-full">
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Enter Aadhaar Details</h3>
                    <input type="text" className="w-full p-3 border border-gray-300 rounded-lg mb-4" placeholder="Aadhaar Number*" value={salonDocumentData.aadhaarNumber} onChange={(e) => setsalonDocumentData({ ...salonDocumentData, aadhaarNumber: e.target.value })} />
                    <FileUpload label="Aadhaar" id="aadhaarUpload" onChange={(e) => handleFileChange(e, "aadhaarImage")} file={salonDocumentData.aadhaarImage} onRemove={() => handleRemoveFile("aadhaarImage")} />
                </div>

                <div className="bg-white border border-gray-300 rounded-lg p-6 w-full">
                    <h3 className="text-xl font-medium mb-4 text-gray-900">Upload Certification Details</h3>
                    {["Salon Registration Certificate", "GST Registration Certificate", "Shop & Establishment License", "Rent Agreement / Property Ownership Proof"].map((label, index) => (
                        <FileUpload key={index} label={label} id={`certificationUpload${index}`} onChange={(e) => handleFileChange(e, "certifications", label)} file={salonDocumentData.certifications[label]} onRemove={() => handleRemoveFile("certifications", label)} />
                    ))}
                </div>

                <button className={`w-full text-white mt-6 px-6 py-3 rounded-lg font-semibold ${isFormComplete ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400 cursor-not-allowed opacity-50"}`} disabled={!isFormComplete} onClick={goToNextStep}>
                    Next
                </button>
            </div>
        </div>
    );
};

SalonDocuments.propTypes = { goToNextStep: PropTypes.func.isRequired };

export default SalonDocuments;
