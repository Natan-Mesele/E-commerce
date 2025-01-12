import React from 'react';
import { Route, Routes } from 'react-router-dom'; // Remove Router import
import Header from './pages/Header';
import HomePage from './pages/HomePage';
import UserProfile from './userprofile/UserProfile';
import LoginDropdown from './Auth/LoginDropdown';
import CarList from './car/CarList';
import SignUp from './Auth/SignUp';
import CheckOut from './pages/CheckOut';
import ContactUs from './pages/ContactUs';
import About from './pages/About';
import CarDetail from './car/CarDetail';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/login" element={<LoginDropdown />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/cars" element={<CarList />} />
        <Route path="/check" element={<CheckOut />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
        <Route path="/car/:carId" element={<CarDetail />} />
      </Routes>
    </>
  );
}

export default App;
