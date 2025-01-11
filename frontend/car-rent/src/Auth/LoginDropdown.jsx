import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../Redux/Auth/Action";

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

              // Check if setIsTyping is provided before calling it
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

              // Check if setIsTyping is provided before calling it
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
    </div>
  );
};

export default LoginDropdown;