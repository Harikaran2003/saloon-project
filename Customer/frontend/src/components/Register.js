import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // ✅ Import useNavigate

function Signup() {
    const navigate = useNavigate(); // ✅ Initialize useNavigate

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '', // ✅ Added phone field
        password: '',
        confirmPassword: '',
    });

    const [message, setMessage] = useState('');

    // Handle input change
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', {
                name: formData.name,
                email: formData.email,
                phone: formData.phone, // ✅ Added phone field
                password: formData.password,
                confirm_password: formData.confirmPassword,
            });

            setMessage(response.data.message);
            setFormData({ name: '', email: '', phone: '', password: '', confirmPassword: '' });

            // ✅ Redirect to Login page after successful signup
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds

        } catch (error) {
            setMessage(error.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gradient-to-r from-gray-100 to-gray-200">
            <motion.div 
                initial={{ opacity: 0, y: 50 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
                className="flex h-3/4 w-3/4 shadow-lg rounded-lg overflow-hidden"
            >
                {/* Left Side */}
                <motion.div 
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-1/2 bg-white flex flex-col justify-center items-center text-gray-800 p-8"
                >
                    <h1 className="text-3xl font-bold mb-4">Join Us Today!</h1>
                    <p className="text-center mb-4 text-gray-600">
                        Sign up to access exclusive offers, rewards, and discounts.
                    </p>
                </motion.div>

                {/* Right Side (Signup Form) */}
                <motion.div 
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 1 }}
                    className="w-1/2 bg-gray-50 flex flex-col justify-center items-center p-8"
                >
                    <h1 className="text-3xl font-bold mb-4 text-gray-800">Signup</h1>

                    <form className="w-full" onSubmit={handleSubmit}>
                        <motion.input 
                            whileFocus={{ scale: 1.02 }} 
                            type="text" 
                            name="name"
                            placeholder="Name" 
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400" 
                            required 
                        />
                        <motion.input 
                            whileFocus={{ scale: 1.02 }} 
                            type="email" 
                            name="email"
                            placeholder="Email" 
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400" 
                            required 
                        />
                        <motion.input 
                            whileFocus={{ scale: 1.02 }} 
                            type="text" 
                            name="phone"
                            placeholder="Phone Number" 
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400" 
                            required 
                        />
                        <motion.input 
                            whileFocus={{ scale: 1.02 }} 
                            type="password" 
                            name="password"
                            placeholder="Create Password" 
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400" 
                            required 
                        />
                        <motion.input 
                            whileFocus={{ scale: 1.02 }} 
                            type="password" 
                            name="confirmPassword"
                            placeholder="Confirm Password" 
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            className="w-full mb-4 p-2 border border-gray-300 rounded focus:ring-2 focus:ring-gray-400" 
                            required 
                        />
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded w-full mb-4"
                            type="submit"
                        >
                            Signup
                        </motion.button>
                    </form>

                    {message && <p className="text-red-600 mt-2">{message}</p>}

                    <p className="mb-4 text-gray-600">or sign up with</p>
                    <div className="flex space-x-4">
                        <a href="/" className="text-blue-600 text-xl"><i className="fab fa-facebook-f"></i></a>
                        <a href="/" className="text-red-600 text-xl"><i className="fab fa-google"></i></a>
                        <a href="/" className="text-blue-400 text-xl"><i className="fab fa-linkedin-in"></i></a>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}

export default Signup;
