import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Profile = () => {
  const [salon, setSalon] = useState(null);
  const [cookies] = useCookies(['email', 'sid']);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!cookies.email) return;

    axios
      .post('http://localhost:5001/salondata', { email: cookies.email })
      .then((resp) => {
        setSalon(resp.data.data);
        setFormData(resp.data.data); // Initialize form data for editing
      })
      .catch((err) => {
        console.error('Error fetching salon data:', err);
      });
  }, [cookies.email]);

  // Handle input change for form fields
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Support nested fields with dot notation, e.g., "address.city"
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle nested timing changes (e.g. startTime.hour)
  const handleTimingChange = (field, subfield, value) => {
    setFormData((prev) => ({
      ...prev,
      timings: {
        ...prev.timings,
        [field]: {
          ...prev.timings[field],
          [subfield]: value,
        },
      },
    }));
  };

  // Handle openDays array editing (simple comma separated string input)
  const handleOpenDaysChange = (e) => {
    const val = e.target.value;
    const arr = val.split(',').map((d) => d.trim());
    setFormData((prev) => ({ ...prev, openDays: arr }));
  };

  // Handle services price update by index
  const handleServicePriceChange = (index, value) => {
    const newServices = [...formData.menuOperations.services];
    newServices[index].price = Number(value);
    setFormData((prev) => ({
      ...prev,
      menuOperations: {
        ...prev.menuOperations,
        services: newServices,
      },
    }));
  };

  // Toggle contract acceptance
  const toggleContractAccepted = () => {
    setFormData((prev) => ({
      ...prev,
      contract: {
        ...prev.contract,
        isContractAccepted: !prev.contract.isContractAccepted,
        acceptedAt: new Date().toISOString(),
      },
    }));
  };

  const handleSave = () => {
    setSaving(true);

    // Adjust this API call as per your backend update route & method
    axios
      .put('http://localhost:5001/salondata/update', { email: cookies.email, updatedData: formData })
      .then((resp) => {
        setSalon(formData);
        setIsEditing(false);
        setSaving(false);
      })
      .catch((err) => {
        console.error('Error updating salon data:', err);
        setSaving(false);
      });
  };

  if (!salon || !formData) {
    return <div className="p-4 text-center">Loading...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 flex justify-between items-center">
        Salon Profile
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {isEditing ? 'Cancel' : 'Edit Profile'}
        </button>
      </h1>

      {/* Basic Info */}
      <section className="mb-6 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Basic Information</h2>
        {isEditing ? (
          <>
            <label className="block mb-2">
              Salon Name:
              <input
                type="text"
                name="salonName"
                value={formData.salonName}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Owner Name:
              <input
                type="text"
                name="ownerName"
                value={formData.ownerName}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                readOnly
                className="border p-1 ml-2 rounded bg-gray-100 cursor-not-allowed"
              />
            </label>
            <label className="block mb-2">
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
          </>
        ) : (
          <>
            <p><strong>Salon Name:</strong> {salon.salonName}</p>
            <p><strong>Owner Name:</strong> {salon.ownerName}</p>
            <p><strong>Email:</strong> {salon.email}</p>
            <p><strong>Phone:</strong> {salon.phone}</p>
          </>
        )}
      </section>

      {/* Address */}
      <section className="mb-6 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Address</h2>
        {isEditing ? (
          <>
            <label className="block mb-2">
              Shop Number:
              <input
                type="text"
                name="address.shopNumber"
                value={formData.address.shopNumber}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Floor:
              <input
                type="text"
                name="address.floor"
                value={formData.address.floor}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Area:
              <input
                type="text"
                name="address.area"
                value={formData.address.area}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Landmark:
              <input
                type="text"
                name="address.landmark"
                value={formData.address.landmark}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              City:
              <input
                type="text"
                name="address.city"
                value={formData.address.city}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              State:
              <input
                type="text"
                name="address.state"
                value={formData.address.state}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Country:
              <input
                type="text"
                name="address.country"
                value={formData.address.country}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
            <label className="block mb-2">
              Pincode:
              <input
                type="text"
                name="address.pincode"
                value={formData.address.pincode}
                onChange={handleChange}
                className="border p-1 ml-2 rounded"
              />
            </label>
          </>
        ) : (
          <>
            <p>
              {`${salon.address.shopNumber}, Floor ${salon.address.floor}, ${salon.address.area}, ${salon.address.landmark}`}
            </p>
            <p>
              {`${salon.address.city}, ${salon.address.state}, ${salon.address.country} - ${salon.address.pincode}`}
            </p>
          </>
        )}
      </section>

      {/* Timings */}
      <section className="mb-6 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Timings</h2>
        {isEditing ? (
          <>
            <div>
              <label className="mr-2">Start Time:</label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.timings.startTime.hour}
                onChange={(e) =>
                  handleTimingChange('startTime', 'hour', e.target.value)
                }
                className="border p-1 rounded w-12 mr-2"
              />
              :
              <input
                type="number"
                min="0"
                max="59"
                value={formData.timings.startTime.minute}
                onChange={(e) =>
                  handleTimingChange('startTime', 'minute', e.target.value)
                }
                className="border p-1 rounded w-12 mx-2"
              />
              <select
                value={formData.timings.startTime.ampm}
                onChange={(e) =>
                  handleTimingChange('startTime', 'ampm', e.target.value)
                }
                className="border p-1 rounded"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            <div className="mt-2">
              <label className="mr-2">End Time:</label>
              <input
                type="number"
                min="1"
                max="12"
                value={formData.timings.endTime.hour}
                onChange={(e) =>
                  handleTimingChange('endTime', 'hour', e.target.value)
                }
                className="border p-1 rounded w-12 mr-2"
              />
              :
              <input
                type="number"
                min="0"
                max="59"
                value={formData.timings.endTime.minute}
                onChange={(e) =>
                  handleTimingChange('endTime', 'minute', e.target.value)
                }
                className="border p-1 rounded w-12 mx-2"
              />
              <select
                value={formData.timings.endTime.ampm}
                onChange={(e) =>
                  handleTimingChange('endTime', 'ampm', e.target.value)
                }
                className="border p-1 rounded"
              >
                <option>AM</option>
                <option>PM</option>
              </select>
            </div>
            <div className="mt-2">
              <label>
                Open Days (comma separated):
                <input
                  type="text"
                  value={formData.openDays.join(', ')}
                  onChange={handleOpenDaysChange}
                  className="border p-1 ml-2 rounded w-full"
                />
              </label>
            </div>
          </>
        ) : (
          <>
            <p>
              <strong>Start Time:</strong>{' '}
              {salon.timings.startTime.hour}:{salon.timings.startTime.minute}{' '}
              {salon.timings.startTime.ampm}
            </p>
            <p>
              <strong>End Time:</strong>{' '}
              {salon.timings.endTime.hour}:{salon.timings.endTime.minute}{' '}
              {salon.timings.endTime.ampm}
            </p>
            <p>
              <strong>Open Days:</strong> {salon.openDays.join(', ')}
            </p>
          </>
        )}
      </section>

      {/* Services */}
      <section className="mb-6 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Services</h2>
        <ul className="list-disc ml-6">
          {formData.menuOperations.services.map((service, idx) => (
            <li key={idx} className="mb-1">
              {service.name} – ₹
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  value={service.price}
                  onChange={(e) => handleServicePriceChange(idx, e.target.value)}
                  className="border p-1 w-20"
                />
              ) : (
                service.price
              )}
            </li>
          ))}
        </ul>
      </section>

      {/* Contract */}
      <section className="mb-6 bg-white shadow rounded p-4">
        <h2 className="text-xl font-semibold mb-2">Contract</h2>
        {isEditing ? (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={formData.contract.isContractAccepted}
              onChange={toggleContractAccepted}
            />
            <span>Contract Accepted</span>
          </label>
        ) : (
          <>
            <p>
              <strong>Accepted:</strong>{' '}
              {salon.contract.isContractAccepted ? '✅ Yes' : '❌ No'}
            </p>
            <p>
              <strong>Accepted At:</strong>{' '}
              {new Date(salon.contract.acceptedAt).toLocaleString()}
            </p>
          </>
        )}
      </section>

      {isEditing && (
        <div className="flex justify-end">
          <button
            onClick={handleSave}
            disabled={saving}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      )}

      {/* Created At */}
      <p className="text-sm text-gray-500 text-right mt-6">
        Profile created at: {new Date(salon.createdAt).toLocaleString()}
      </p>
    </div>
  );
};

export default Profile;
