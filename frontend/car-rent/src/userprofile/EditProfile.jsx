import React, { useState } from 'react';
import { editProfile } from '../Redux/Auth/Action';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

function EditProfile() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Simple validation
    if (!name || !email || !phone) {
      setError('All fields are required.');
      return;
    }

    const profileData = { fullName: name, email, phoneNumber: phone };
    console.log("Profile data before dispatch:", profileData);
    dispatch(editProfile(profileData));

    toast.success('Profile updated successfully!');
   
    setName('');
    setEmail('');
    setPhone('');
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Edit Profile</h2>

      {/* Edit Profile Form */}
      <form onSubmit={handleSubmit}>
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-600 mb-2">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          />
        </div>

        {/* Email Field */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-600 mb-2">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        {/* Phone Number Field */}
        <div className="mb-4">
          <label htmlFor="phone" className="block text-gray-600 mb-2">Phone Number</label>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm mb-4">{success}</p>}

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="py-2 px-6 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfile;
