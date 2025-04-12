import React, { useState } from "react";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { useDispatch } from "react-redux";
import { register } from "../Redux/Auth/Action";
import { toast } from "react-toastify";

const SignUp = () => {
  const dispatch = useDispatch(); // Initialize dispatch
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState(""); // For displaying errors
  const [showPassword, setShowPassword] = useState(false); // State for password visibility

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        "Password must be at least 8 characters long and include at least one letter, one number, and one special character."
      );
      return false; // Return false to stop further execution
    }
    return true; // Return true if password is valid
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!validatePassword(trimmedPassword)) {
      return;
    }

    if (trimmedPassword !== trimmedConfirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number for the selected country.");
      return;
    }

    const userData = {
      name,  
      email,
      password: trimmedPassword,
      confirmPassword: trimmedConfirmPassword,
      phoneNumber,
      role: "ROLE_USER",
    };
    

    dispatch(register(userData));
    setError("");
    toast.success("Sign-up successful!");
  };

  return (
    <div className="container mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign Up</h2>
      <form className="max-w-2xl mx-auto bg-white shadow-md rounded-lg p-6" onSubmit={handleSubmit}>
        {/* Full Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="John Doe"
            required
          />
        </div>

        {/* Phone Number */}
        <div className="mb-4">
          <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
            Phone Number
          </label>
          <PhoneInput
            id="phoneNumber"
            value={phoneNumber}
            onChange={(value) => {
              setPhoneNumber(value);
              setError(""); // Clear any error when the input changes
            }}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter phone number"
            defaultCountry="US"
            required
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
        </div>

        {/* Email Address */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="you@example.com"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Create a Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 text-gray-500 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
            Confirm Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="********"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 px-3 text-gray-500 focus:outline-none"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
