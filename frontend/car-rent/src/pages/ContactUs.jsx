import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';

function ContactUs() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm("service_tr8x3hy", "template_r9zhhsw", form.current, "85el7MKTL1vd_8b8q")
      .then((result) => {
        console.log('Success:', result.text);
        alert('Message sent successfully!');
        // Clear the form fields
        e.target.reset();
      })
      .catch((error) => {
        console.error('Error:', error.text);
        alert('Failed to send message.');
      });
  };

  return (
    <div className="contact-container flex flex-col md:flex-row min-h-screen">
      {/* Left Section */}
      <div className="contact-info w-full md:w-1/2 bg-white flex items-start justify-left">
        <div className="flex flex-col space-y-8 px-6 md:px-20 mt-8 md:mt-16">
          <p className="text-left text-lg font-semibold text-gray-600">Contact</p>
          <span className="text-4xl md:text-5xl text-gray-400">
            <span className="text-custom-primary">nattymesele</span>@gmail
          </span>
          <p className="text-sm md:text-lg text-gray-400">
            If you’d like to get in touch, feel free to send any text or message to
            <a href="mailto:nattymesele@gmail.com" className="text-custom-primary"> nattymesele@gmail.com</a>.
            Whether you have a question, a project idea, or just want to say hello, I’d love to hear from you!
          </p>
          {/* Contact Form */}
          <form ref={form} onSubmit={sendEmail} className="w-full space-y-6 md:space-y-8 mt-6 md:mt-8">
            {/* Full Name Field */}
            <div className="flex flex-col">
              <input
                type="text"
                id="fullName"
                name="fullName"
                placeholder="Enter your full name"
                className="py-4 md:py-8 px-4 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-custom-primary"
              />
            </div>

            {/* Email Field */}
            <div className="flex flex-col">
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                className="py-4 md:py-8 px-4 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-custom-primary"
              />
            </div>

            {/* Description Field */}
            <div className="flex flex-col">
              <textarea
                id="message"
                name="message"
                placeholder="Enter your message or description"
                rows="4"
                className="py-4 md:py-16 px-4 rounded bg-gray-100 focus:outline-none focus:ring-2 focus:ring-custom-primary"
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="py-3 px-6 bg-gray-600 text-white rounded hover:bg-gray-700 w-full md:w-auto"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Right Section with Diagonal Image */}
      <div className="contact-image w-full md:w-1/2 h-64 md:h-screen relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1528747045269-390fe33c19f2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Beautiful View"
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10% 100%)', // Diagonal from top-left to bottom-left
          }}
        />
      </div>
    </div>
  );
}

export default ContactUs;