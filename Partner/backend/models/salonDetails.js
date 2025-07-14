import mongoose from "mongoose";

const salonSchema = new mongoose.Schema({
  salonName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },

  address: {
    shopNumber: { type: String, required: true },
    floor: { type: String, required: true },
    area: { type: String, required: true },
    landmark: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    pincode: { type: String, required: true },
  },

  timings: {
    startTime: {
      hour: { type: Number, required: true },
      minute: { type: Number, required: true },
      ampm: { type: String, required: true },
    },
    endTime: {
      hour: { type: Number, required: true },
      minute: { type: Number, required: true },
      ampm: { type: String, required: true },
    },
  },

  openDays: { type: [String], required: true },

  menuOperations: {
    services: [
      {
        name: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
    uploadedImages: { type: [String], required: true },
    selectedDevice: { type: String, required: true },

    barbers: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true }, // Assuming image URL or Base64
      },
    ],
  },

  salonDocuments: {
    pan: {
      panNumber: { type: String, required: true },
      panImage: { type: String, required: true },
    },
    aadhaar: {
      aadhaarNumber: { type: String, required: true },
      aadhaarImage: { type: String, required: true },
    },
    certifications: {
      gstRegistrationCertificate: { type: String, required: true },
      rentAgreementOrPropertyProof: { type: String, required: true },
      shopEstablishmentLicense: { type: String, required: true },
      salonRegistrationCertificate: { type: String, required: true },
    },
  },

  contract: {
    isContractAccepted: { type: Boolean, required: true },
    acceptedAt: { type: Date, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: false },
  },

  createdAt: { type: Date, default: Date.now },
});

const Salondata = mongoose.model("Salondata", salonSchema);
export default Salondata;
