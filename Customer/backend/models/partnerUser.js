const mongoose = require("mongoose");

// ✅ Connect to MongoDB
const db2_url = mongoose.createConnection(
  "mongodb+srv://nikhilmali810:nikhilmali123@partnerappcluster0.ibce8.mongodb.net/partnerApp?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);

console.log("Database connected successfully!");

// ✅ Define Salon Schema
const SalonSchema = new mongoose.Schema({
  salonName: { type: String, required: true },
  ownerName: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  phone: { type: String, required: true },
  address: {
    shopNumber: String,
    floor: String,
    area: String,
    landmark: String,
    city: { type: String, required: true },
    state: String,
    country: String,
    pincode: String,
    latitude: Number,
    longitude: Number,
  },
  timings: {
    startTime: { hour: Number, minute: Number, ampm: String },
    endTime: { hour: Number, minute: Number, ampm: String },
    openDays: [String],
  },
  menuOperations: {
    services: [{ name: String, price: Number }],
  },
  uploadedImages: [String],
  salonDocuments: {
    pan: { panNumber: String, panImage: String },
    aadhaar: { aadhaarNumber: String, aadhaarImage: String },
    certifications: {
      gstRegistrationCertificate: String,
      rentAgreementOrPropertyProof: String,
      shopEstablishmentLicense: String,
      salonRegistrationCertificate: String,
    },
  },
  contract: {
    isContractAccepted: Boolean,
    acceptedAt: Date,
    userId: String,
  },
  createdAt: { type: Date, default: Date.now },
});

// ✅ Use correct MongoDB connection instance
const Salon = db2_url.model("salondatas", SalonSchema);

module.exports = Salon;