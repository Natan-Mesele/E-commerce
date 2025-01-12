import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 lg:p-10">
        <h1 className="text-3xl font-bold text-center mb-6">About Us</h1>
        <p className="text-gray-600 leading-relaxed text-justify">
          Welcome to our platform! Our mission is to connect people with the best services and products,
          making life easier and more enjoyable. Since our founding, we’ve worked tirelessly to create
          a user-friendly experience, blending technology with human touch.
        </p>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600">
              To become the most reliable and innovative platform that empowers individuals
              and businesses to thrive in today’s dynamic world.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Our Values</h3>
            <ul className="list-disc pl-6 text-gray-600">
              <li>Customer-first approach</li>
              <li>Integrity and transparency</li>
              <li>Innovation and excellence</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center">
          <h3 className="text-xl font-semibold mb-4">Join Our Journey</h3>
          <p className="text-gray-600">
            Together, we can create a better future. Thank you for choosing us!
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
