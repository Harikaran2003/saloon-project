import { Facebook, Instagram, Twitter, Linkedin, Youtube, Mail, Phone } from "lucide-react";

const Footer = () => {
    return (
      <footer className="bg-gray-100 text-gray-700 py-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-5 gap-8">
          
          {/* Logo */}
          <div className="col-span-1">
            <h2 className="text-2xl font-bold text-green-600">The Cut Point</h2>
            <p className="text-sm text-gray-500">Your Salon, Your Style</p>
          </div>
  
          {/* About Us */}
          <div>
            <h4 className="text-lg font-semibold mb-3">ABOUT US</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="hover:text-green-600 cursor-pointer">Our Story</li>
              <li className="hover:text-green-600 cursor-pointer">Blog</li>
              <li className="hover:text-green-600 cursor-pointer">Careers</li>
              <li className="hover:text-green-600 cursor-pointer">Investor Relations</li>
              <li className="hover:text-green-600 cursor-pointer">Press Kit</li>
            </ul>
          </div>
  
          {/* Salon Services */}
          <div>
            <h4 className="text-lg font-semibold mb-3">SALON SERVICES</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="hover:text-green-600 cursor-pointer">Haircuts & Styling</li>
              <li className="hover:text-green-600 cursor-pointer">Beauty & Skincare</li>
              <li className="hover:text-green-600 cursor-pointer">Mens Grooming</li>
              <li className="hover:text-green-600 cursor-pointer">Bridal & Party Looks</li>
              <li className="hover:text-green-600 cursor-pointer">Wellness & Spa</li>
            </ul>
          </div>
  
          {/* Customer Support */}
          <div>
            <h4 className="text-lg font-semibold mb-3">CUSTOMER SUPPORT</h4>
            <ul className="space-y-2 text-gray-500 text-sm">
              <li className="hover:text-green-600 cursor-pointer">Help Center</li>
              <li className="hover:text-green-600 cursor-pointer">FAQs</li>
              <li className="hover:text-green-600 cursor-pointer">Privacy Policy</li>
              <li className="hover:text-green-600 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>
        </div>
  
        {/* Contact & Social Links Section */}
        <div className="max-w-7xl mx-auto px-6 mt-8 flex flex-col md:flex-row items-center justify-between text-gray-500 text-sm">
          
          {/* Contact Info */}
          <div className="flex gap-4">
            <></>
            <a href="mailto:support@thecutpoint.com"  className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-green-100">
              <Mail size={18} className="text-green-600" /> support@thecutpoint.com
            
            </a>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-full hover:bg-green-100">
              <Phone size={18} className="text-green-600" /> +91 970**
            </button>
          </div>
  
          {/* Social Links with Actual URLs */}
          <div className="flex gap-4 mt-4 md:mt-0">
            <a href="https://www.linkedin.com/company/thecutpoint" target="_blank" rel="noopener noreferrer">
              <Linkedin className="w-6 h-6 hover:text-green-600 cursor-pointer" />
            </a>
            <a href="https://www.instagram.com/thecutpoint" target="_blank" rel="noopener noreferrer">
              <Instagram className="w-6 h-6 hover:text-green-600 cursor-pointer" />
            </a>
            <a href="https://twitter.com/thecutpoint" target="_blank" rel="noopener noreferrer">
              <Twitter className="w-6 h-6 hover:text-green-600 cursor-pointer" />
            </a>
            <a href="https://www.youtube.com/c/thecutpoint" target="_blank" rel="noopener noreferrer">
              <Youtube className="w-6 h-6 hover:text-green-600 cursor-pointer" />
            </a>
            <a href="https://www.facebook.com/thecutpoint" target="_blank" rel="noopener noreferrer">
              <Facebook className="w-6 h-6 hover:text-green-600 cursor-pointer" />
            </a>
          </div>
        </div>
        
        {/* App Store Links */}
        <div className="max-w-7xl mx-auto px-6 mt-4 flex justify-center md:justify-end gap-4">
          <a href="https://play.google.com/store/apps/details?id=com.thecutpoint" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/Google_Play_Store_badge_EN.svg/256px-Google_Play_Store_badge_EN.svg.png" 
                 alt="Google Play" className="w-32 hover:opacity-80"/>
          </a>
          <a href="https://apps.apple.com/us/app/thecutpoint/id1234567890" target="_blank" rel="noopener noreferrer">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Apple-logo.svg/128px-Apple-logo.svg.png" 
                 alt="App Store" className="w-32 hover:opacity-80"/>
          </a>
        </div>
  
        {/* Copyright & Terms */}
        <div className="border-t border-gray-300 mt-8 pt-4 text-center text-gray-500 text-sm">
          By continuing past this page, you agree to our <span className="text-green-600 hover:underline cursor-pointer">Terms of Service</span>, 
          <span className="text-green-600 hover:underline cursor-pointer"> Privacy Policy</span>, and <span className="text-green-600 hover:underline cursor-pointer">Content Policies</span>.
          <br />
          © 2025 The Cut Point. All rights reserved.
        </div>
      </footer>
    );
  };

  export default Footer;