import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../Redux/Auth/Action';

function Password() {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirmation do not match.');
      return;
    }

    const passwordData = {
      oldPassword: oldPassword,  // Ensure this is not empty
      newPassword: newPassword   // Ensure this is not empty
    };

    // Dispatch the changePassword action
    dispatch(changePassword(passwordData))
      .then((response) => {
        setSuccess('Password change request has been sent!');
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
      })
      .catch((err) => {
        setError(err.message || 'Something went wrong. Please try again.');
      });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white">
      <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Change Password</h2>
      
      <form onSubmit={handleSubmit}>
        {/* Old Password */}
        <div className="mb-4">
          <label htmlFor="oldPassword" className="block text-gray-600 mb-2">Current Password</label>
          <input
            type="password"
            id="oldPassword"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter current password"
          />
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-600 mb-2">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter new password"
          />
        </div>

        {/* Confirm New Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Confirm new password"
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
            Change Password
          </button>
        </div>
      </form>
    </div>
  );
}

export default Password;
