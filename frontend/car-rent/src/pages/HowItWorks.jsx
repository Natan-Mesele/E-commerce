import React from 'react';
import { FaSearch, FaHandPointRight, FaCalendarCheck } from 'react-icons/fa'; // Import the icons

function HowItWorks() {
  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">How It Works</h1>
      <p className="text-xl text-center text-gray-600 mb-12">
        Discover & Connect: Learn how to book your car, wedding car, or tour with us and start enjoying your ride.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        {/* Step 1 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
          <FaSearch className="text-4xl text-blue-500 mb-4" /> {/* Icon for step 1 */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Visit the List</h3>
          <p className="text-gray-600 text-center">
            Visit all the listed Cars, Wedding Cars, or Tours available for booking.
          </p>
        </div>

        {/* Step 2 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
          <FaHandPointRight className="text-4xl text-blue-500 mb-4" /> {/* Icon for step 2 */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Click on Your Choice</h3>
          <p className="text-gray-600 text-center">
            From the list, click on the one that suits your preference and enjoy exploring options.
          </p>
        </div>

        {/* Step 3 */}
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
          <FaCalendarCheck className="text-4xl text-blue-500 mb-4" /> {/* Icon for step 3 */}
          <h3 className="text-xl font-semibold text-gray-700 mb-4">Choose & Book</h3>
          <p className="text-gray-600 text-center">
            Fill in the required information and click on 'Book' to secure your reservation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HowItWorks;
