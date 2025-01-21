import React from 'react';
import { FaUsers, FaShareAlt, FaHandshake, FaCalendarAlt } from 'react-icons/fa';

function StatsSection() {
  return (
    <div
      className="w-full relative"
      style={{
        backgroundImage: 'url("https://img.freepik.com/free-vector/worldwide-connection-gray-background-illustration-vector_53876-61769.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        padding: '4rem 0',
      }}
    >
      <div className="bg-gradient-to-r from-black via-transparent to-black absolute inset-0 opacity-80"></div>
      
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-200 mb-12 relative z-10">
        Our Achievements
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-4 sm:px-8 md:px-16 relative z-10">
        {/* Clients */}
        <div className="text-center bg-black bg-opacity-50 rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg">
          <FaUsers className="text-6xl md:text-7xl text-custom-primary mb-4 mx-auto animate-bounce" />
          <h3 className="text-2xl font-semibold text-white mb-2">Our Clients</h3>
          <p className="text-xl text-gray-200 font-medium">1,623</p>
        </div>

        {/* Social Media Reach */}
        <div className="text-center bg-black bg-opacity-50 rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg">
          <FaShareAlt className="text-6xl md:text-7xl text-custom-primary mb-4 mx-auto animate-bounce" />
          <h3 className="text-2xl font-semibold text-white mb-2">Reaches on Social Media</h3>
          <p className="text-xl text-gray-200 font-medium">110,000</p>
        </div>

        {/* Partners */}
        <div className="text-center bg-black bg-opacity-50 rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg">
          <FaHandshake className="text-6xl md:text-7xl text-custom-primary mb-4 mx-auto animate-bounce" />
          <h3 className="text-2xl font-semibold text-white mb-2">Partners Working With</h3>
          <p className="text-xl text-gray-200 font-medium">12</p>
        </div>

        {/* Events */}
        <div className="text-center bg-black bg-opacity-50 rounded-lg p-6 transform transition-transform hover:scale-105 hover:shadow-lg">
          <FaCalendarAlt className="text-6xl md:text-7xl text-custom-primary mb-4 mx-auto animate-bounce" />
          <h3 className="text-2xl font-semibold text-white mb-2">Events</h3>
          <p className="text-xl text-gray-200 font-medium">14</p>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
