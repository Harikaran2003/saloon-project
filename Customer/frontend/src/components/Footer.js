import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-10 px-6 md:px-16">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                {/* Logo & Social Links */}
                <div>
                    <h2 className="text-3xl font-bold text-green-500 mb-4">TheCut Point</h2>
                    <div className="flex justify-center md:justify-start space-x-6 mt-4">
                        <a href="#" className="text-white hover:text-gray-400 text-xl"><i className="fab fa-facebook-f"></i></a>
                        <a href="#" className="text-white hover:text-gray-400 text-xl"><i className="fab fa-instagram"></i></a>
                        <a href="#" className="text-white hover:text-gray-400 text-xl"><i className="fab fa-linkedin-in"></i></a>
                        <a href="#" className="text-white hover:text-gray-400 text-xl"><i className="fab fa-twitter"></i></a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#" className="hover:text-green-400">Home</a></li>
                        <li><a href="#" className="hover:text-green-400">Services</a></li>
                        <li><a href="#" className="hover:text-green-400">Blogs</a></li>
                        <li><a href="#" className="hover:text-green-400">About Us</a></li>
                        <li><a href="#" className="hover:text-green-400">Contact Us</a></li>
                    </ul>
                </div>

                {/* Contact Information */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                    <ul className="space-y-3">
                        <li className="flex items-center justify-center md:justify-start">
                            <i className="fas fa-phone-alt mr-3"></i> +91 123456789
                        </li>
                        <li className="flex items-center justify-center md:justify-start">
                            <i className="fas fa-envelope mr-3"></i> info@cutpoint.com
                        </li>
                        <li className="flex items-center justify-center md:justify-start">
                            <i className="fas fa-map-marker-alt mr-3"></i>
                            102-Complex, Xyz Road, City, State, 136458
                        </li>
                    </ul>
                </div>
            </div>

            {/* Copyright & Terms */}
            <div className="mt-10 text-center text-sm border-t border-gray-700 pt-4">
                <p>Salon Appointment Booking &copy; 2025 | All Rights Reserved</p>
                <p><a href="#" className="hover:underline text-gray-400">Terms & Conditions</a></p>
            </div>
        </footer>
    );
};

export default Footer;
