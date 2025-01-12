import React from 'react';
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';

const ContactUs = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-gray-600 text-center mb-8">
          We're here to help! Reach out to us using any of the methods below.
        </p>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="text-center">
            <FaEnvelope className="text-4xl text-blue-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Email Us</h3>
            <p className="text-gray-600">
              <a href="mailto:support@example.com" className="text-blue-500 hover:underline">
                support@example.com
              </a>
            </p>
          </div>

          <div className="text-center">
            <FaPhoneAlt className="text-4xl text-green-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Call Us</h3>
            <p className="text-gray-600">
              <a href="tel:+1234567890" className="text-blue-500 hover:underline">
                +1 (234) 567-890
              </a>
            </p>
          </div>

          <div className="text-center">
            <FaMapMarkerAlt className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">Visit Us</h3>
            <p className="text-gray-600">123 Main Street, Addis Ababa, Ethiopia</p>
          </div>
        </div>

        <form className="mt-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200"
            />
          </div>
          <textarea
            placeholder="Your Message"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 h-32"
          />
          <button className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
