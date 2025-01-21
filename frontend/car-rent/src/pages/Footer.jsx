import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-10 mt-16">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-lg hover:text-blue-400 transition duration-300">About Us</a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-400 transition duration-300">Contact</a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-400 transition duration-300">FAQ</a>
              </li>
              <li>
                <a href="#" className="text-lg hover:text-blue-400 transition duration-300">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Contact Info</h3>
            <p className="text-lg text-gray-400">Phone: +1 (123) 456-7890</p>
            <p className="text-lg text-gray-400">Email: info@carrentals.com</p>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-3xl hover:text-blue-400 transition duration-300">
                <FaFacebook />
              </a>
              <a href="#" className="text-3xl hover:text-blue-400 transition duration-300">
                <FaInstagram />
              </a>
              <a href="#" className="text-3xl hover:text-blue-400 transition duration-300">
                <FaTwitter />
              </a>
              <a href="#" className="text-3xl hover:text-blue-400 transition duration-300">
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Newsletter Subscription */}
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-300">Subscribe to Our Newsletter</h3>
            <p className="text-lg mb-4 text-gray-400">Get the latest updates on new cars, offers, and news.</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 text-gray-800 rounded-l-md w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="bg-custom-secondary text-white px-6 py-2 rounded-r-md hover:bg-custom-primary transition duration-300">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="bg-gray-700 text-center py-4 mt-8">
        <p className="text-lg text-gray-300">&copy; 2025 CarRentals. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;