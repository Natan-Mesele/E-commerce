import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-700 to-blue-500 text-white py-8 mt-16">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul>
              <li>
                <a href="#" className="text-lg hover:text-blue-400">About Us</a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-400">Contact</a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-400">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-400">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Info</h3>
            <p className="text-lg">Phone: +1 (123) 456-7890</p>
            <p className="text-lg">Email: info@carrentals.com</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-3xl hover:text-blue-400">
                <FaFacebook />
              </a>
              <a href="#" className="text-3xl hover:text-blue-400">
                <FaInstagram />
              </a>
              <a href="#" className="text-3xl hover:text-blue-400">
                <FaTwitter />
              </a>
              <a href="#" className="text-3xl hover:text-blue-400">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Subscribe to Our Newsletter</h3>
            <p className="text-lg mb-4">Get the latest updates on new cars, offers, and news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 text-gray-800 rounded-l-md w-full"
              />
              <button className="bg-blue-500 text-white px-6 py-2 rounded-r-md hover:bg-blue-700 transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Bottom */}
      <div className="bg-blue-900 text-center py-4 mt-8">
        <p className="text-lg">&copy; 2025 CarRentals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
