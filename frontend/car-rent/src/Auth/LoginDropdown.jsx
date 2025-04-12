import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Auth/Action";
import { auth, provider } from '../firebase';
import { signInWithPopup } from "firebase/auth";
import axios from "axios";

const LoginDropdown = ({ setIsTyping }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };

    if (setIsTyping) {
      setIsTyping(false);
    }
    dispatch(login(userData));
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,     // Check if displayName is available
        email: user.email,           // Check if email is available
        photoUrl: user.photoURL,     // Check if photoURL is available
        uid: user.uid,               // Ensure UID is provided
      };

      // Log user data to verify the values
      console.log("Google Sign-In User Data: ", userData);

      // Send userData to the backend
      const response = await axios.post('http://localhost:3001/auth/google', userData);
      console.log(response.data);
    } catch (error) {
      console.error('Error signing in with Google', error);
    }
  };

  return (
    <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-80 p-6 z-50">
      <h4 className="text-lg font-semibold text-gray-800 mb-4">
        Log in to your account
      </h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (setIsTyping) {
                setIsTyping(true);
              }
            }}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="you@example.com"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (setIsTyping) {
                setIsTyping(true);
              }
            }}
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md"
        >
          Log In
        </button>
      </form>

      <div className="mt-4 text-sm text-gray-600">
        <p className="text-center">
          Don't have an account?{" "}
          <button
            onClick={() => {
              if (setIsTyping) {
                setIsTyping(false);
              }
              navigate('/register');
            }}
            className="text-blue-500 hover:underline"
          >
            Create Account
          </button>
        </p>
        <p className="text-center mt-2">
          <a href="/forgot-password" className="text-blue-500 hover:underline">
            Forgot Password?
          </a>
        </p>
      </div>

      {/* Google Sign-In Button */}
      <div className="mt-4 text-center">
        <button
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center bg-white text-black py-2 px-4 rounded-md border-2 border-gray-300 hover:border-gray-500 transition-all duration-300"
        >
          {/* Google Icon */}
          <img
            src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
            alt="Google Logo"
            className="w-6 h-6 mr-3"  // Adjust size as needed
          />
          Continue with Google
        </button>
      </div>
    </div>
  );
};

export default LoginDropdown;
