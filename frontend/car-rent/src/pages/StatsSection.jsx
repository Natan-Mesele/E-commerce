import React from 'react';
import { FaUsers, FaShareAlt, FaHandshake, FaCalendarAlt } from 'react-icons/fa';

function StatsSection() {
  return (
    <div
      className="w-full"
      style={{
        backgroundImage:
          'url("https://image-optimizer.cyberriskalliance.com/unsafe/1920x0/https://files.cyberriskalliance.com/wp-content/uploads/2023/08/networking-GettyImages-2-1327187531.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        padding: '4rem 0', // Adjusting padding for vertical spacing
      }}
    >
      <h2 className="text-4xl font-bold text-center text-white mb-8">Our Achievements</h2>

      <div className="flex justify-between items-center px-4 sm:px-8 md:px-16 space-x-8">
        {/* Clients */}
        <div className="text-center flex-1">
          <FaUsers className="text-6xl text-blue-500 mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">Our Clients</h3>
          <p className="text-xl text-white">1,623</p>
        </div>

        {/* Social Media Reach */}
        <div className="text-center flex-1">
          <FaShareAlt className="text-6xl text-blue-500 mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">Reaches on Social Media</h3>
          <p className="text-xl text-white">110,000</p>
        </div>

        {/* Partners */}
        <div className="text-center flex-1">
          <FaHandshake className="text-6xl text-blue-500 mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">Partners Working With</h3>
          <p className="text-xl text-white">12</p>
        </div>

        {/* Events */}
        <div className="text-center flex-1">
          <FaCalendarAlt className="text-6xl text-blue-500 mb-4" />
          <h3 className="text-2xl font-semibold text-white mb-2">Events</h3>
          <p className="text-xl text-white">14</p>
        </div>
      </div>
    </div>
  );
}

export default StatsSection;
