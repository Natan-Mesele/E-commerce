import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header Section */}
      <div 
        className="relative h-64 lg:h-96 w-full flex items-center justify-center"
        style={{
          backgroundImage: "url('https://www.shutterstock.com/image-photo/concept-contact-us-customer-support-600nw-2505308177.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative z-10 text-center text-white px-6">
          <h1 className="text-4xl lg:text-5xl font-bold mb-2">About Us</h1>
          <p className="text-lg lg:text-xl">
            Discover our story, mission, and what drives us forward.
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="bg-white flex-grow p-6 lg:p-16">
        <div className="max-w-4xl mx-auto bg-white rounded-lg p-6 lg:p-10">
          {/* Paragraph with Title */}
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Our Story</h2>
          <p className="text-gray-600 leading-relaxed text-justify mb-8">
            Since our inception, our mission has been to connect people with top-quality services and products.
            We strive to make life easier and more enjoyable through innovative solutions. By integrating
            technology with a personal touch, we ensure an exceptional experience for everyone who trusts us.
          </p>

          {/* Image and Text Side-by-Side (Image Left, Text Right) */}
          <div className="grid md:grid-cols-2 gap-10 items-center mb-10">
            <div>
              <img
                src="https://plus.unsplash.com/premium_photo-1707155466084-690e1646e40d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Our Mission"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Why Choose Us</h3>
              <p className="text-gray-600">
                We believe in creating meaningful connections and delivering value to our customers.
                Whether it’s through our services or our interactions, our focus remains on
                exceeding expectations and building trust.
              </p>
            </div>
          </div>

          {/* Our Team Section */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Our Team</h2>
            <p className="text-center text-gray-600 mb-8">
              Meet the passionate individuals who drive our success.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Team Member 1 */}
              <div className="text-center">
                <img
                  src="https://plus.unsplash.com/premium_photo-1658506615399-d1280310ad6c?q=80&w=1472&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Team Member"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-800">Jane Doe</h4>
                <p className="text-gray-600">CEO & Founder</p>
              </div>
              {/* Team Member 2 */}
              <div className="text-center">
                <img
                  src="https://plus.unsplash.com/premium_photo-1722859210044-5ca8a393b001?q=80&w=1481&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Team Member"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-800">John Smith</h4>
                <p className="text-gray-600">Head of Operations</p>
              </div>
              {/* Team Member 3 */}
              <div className="text-center">
                <img
                  src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                  alt="Team Member"
                  className="rounded-full w-32 h-32 mx-auto mb-4 object-cover"
                />
                <h4 className="text-lg font-semibold text-gray-800">Emily Johnson</h4>
                <p className="text-gray-600">Marketing Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
