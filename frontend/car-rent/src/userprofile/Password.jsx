import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../Redux/Auth/Action';
import { toast } from 'react-toastify';

function Password() {
  const dispatch = useDispatch(); // Initialize the dispatch function
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Basic validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      setError('All fields are required.');
      return;
    }

    // Check if new password matches confirm password
    if (newPassword !== confirmPassword) {
      toast.error('New password and confirmation do not match.');
      return;
    }

    // Password strength validation: Must contain letter, number, and special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      toast.error('Password must be at least 8 characters long and include a letter, a number, and a special character.');
      return;
    }

    const passwordData = {
      oldPassword: oldPassword,
      newPassword: newPassword,
    };

    dispatch(changePassword(passwordData))
      .then((response) => {
        toast.success('Password change request has been sent!');
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
          <div className="relative">
            <input
              type={showOldPassword ? 'text' : 'password'}
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter current password"
            />
            <button
              type="button"
              onClick={() => setShowOldPassword(!showOldPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showOldPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* New Password */}
        <div className="mb-4">
          <label htmlFor="newPassword" className="block text-gray-600 mb-2">New Password</label>
          <div className="relative">
            <input
              type={showNewPassword ? 'text' : 'password'}
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowNewPassword(!showNewPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showNewPassword ? 'Hide' : 'Show'}
            </button>
          </div>
        </div>

        {/* Confirm New Password */}
        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-gray-600 mb-2">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2"
            >
              {showConfirmPassword ? 'Hide' : 'Show'}
            </button>
          </div>
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
