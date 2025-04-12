import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import LoginDropdown from '../Auth/LoginDropdown';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../Redux/Auth/Action';

function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
    const isLoggedIn = useSelector((state) => !!state.auth.jwt);
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State for modal visibility

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleProfileDropdown = () => setIsProfileDropdownOpen(!isProfileDropdownOpen);
    const name= useSelector((state) => state.auth.name);
    const jwt = localStorage.getItem("jwt");
    const user = useSelector((state) => state.auth.user);

    const handleLoginClick = () => {
        setIsLoginPopupOpen(true);
    };

    const handleCloseModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleLinkClick = () => {
        setIsMobileMenuOpen(false);
    };

    const handleLogout = () => {
        dispatch(logout());
        setIsProfileDropdownOpen(false);
        navigate('/');
    };

    const totalItemsInCart = useSelector((state) => state.cart?.totalItems || 0);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.profile-dropdown') && isProfileDropdownOpen) {
                setIsProfileDropdownOpen(false);
            }
            if (!event.target.closest('.login-popup') && isLoginPopupOpen) {
                setIsLoginPopupOpen(false); // Close the login popup on outside click
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isProfileDropdownOpen, isLoginPopupOpen]);

    return (
        <div className="sticky top-0 z-50 flex items-center justify-between px-4 md:px-16 py-4 bg-white shadow-">
            {/* Brand Logo */}
                <Link to="/">
                    <img src="/logo.png" alt="" className="w-32 h-auto object-contain" />
                </Link>
            {/* Mobile Menu Button */}
            <div className="md:hidden">
                <button onClick={toggleMobileMenu} className="text-gray-700 hover:text-gray-900 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                    </svg>
                </button>
            </div>
            {/* Mobile Navigation Menu */}
            <div className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-gray-700 hover:text-gray-900 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <nav className="flex flex-col space-y-4 px-6 py-16">
                    <Link to="/" className="flex items-center space-x-2 hover:text-gray-500 border-b border-gray-300 pb-2" onClick={toggleMobileMenu}>
                        <span>🚗</span>
                        <span>Tour Car</span>
                    </Link>
                   
                    <Link to="/contact" className="flex items-center space-x-2 hover:text-gray-500 border-b border-gray-300 pb-2" onClick={toggleMobileMenu}>
                        <span>📄</span>
                        <span>Contact Us</span>
                    </Link>
                    <Link to="/about" className="flex items-center space-x-2 hover:text-gray-500 border-b border-gray-300 pb-2" onClick={toggleMobileMenu}>
                        <span>ℹ️</span>
                        <span>About Us</span>
                    </Link>
                    {isLoggedIn && (
                        <>
                            <button className="flex items-center space-x-2 hover:text-gray-500 text-left border-b border-gray-300 pb-2" onClick={toggleProfileDropdown}>
                                <span>👤</span>
                                <span>{user?.name}</span>
                            </button>
                            {isProfileDropdownOpen && (
                                <div className="profile-dropdown mt-2 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md absolute right-0 w-40 flex flex-col items-center justify-center">
                                    <Link to="/profile" className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">
                                        <span>👀 View Profile</span>
                                    </Link>
                                    <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-center">
                                        <span>🚪 Logout</span>
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </nav>
            </div>
            {/* Desktop Navigation Menu */}
            <nav className="hidden md:flex space-x-6">
                <Link to="/" className="flex items-center space-x-2 hover:text-gray-500">
                    <span>🚗</span>
                    <span>Tour Car</span>
                </Link>
                <Link to="/contact" className="flex items-center space-x-2 hover:text-gray-500">
                    <span>📄</span>
                    <span>Contact Us</span>
                </Link>
                <Link to="/about" className="flex items-center space-x-2 hover:text-gray-500">
                    <span>ℹ️</span>
                    <span>About Us</span>
                </Link>
            </nav>
            {/* Desktop Profile/Login Section */}
            <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn ? (
                    <>
                        <button
                            className="flex justify-between items-center hover:text-gray-500 text-left w-full gap-4"
                            onClick={toggleProfileDropdown}
                        >
                            <span>👤</span>
                            <div className="flex justify-between w-full gap-2">
                                <span>{user?.name?.split(' ')[0]}</span> {/* First Name */}
                                <span>{user?.name?.split(' ')[1]}</span> {/* Last Name */}
                            </div>
                        </button>
                        <Link to="/check" className="relative block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-left">
                            <FaShoppingCart className="w-6 h-6" />
                            {totalItemsInCart > 0 && (
                                <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{totalItemsInCart}</span>
                            )}
                        </Link>
                        {isProfileDropdownOpen && (
                            <div className="profile-dropdown mt-44 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md absolute right-16 w-40 flex flex-col items-center justify-center">
                                <Link to="/profile" className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-left">
                                    <span>👀 View Profile</span>
                                </Link>
                                <button onClick={handleLogout} className="block w-full px-4 py-2 text-gray-700 hover:bg-gray-200 dark:text-white dark:hover:bg-gray-700 text-left">
                                    <span>🚪 Logout</span>
                                </button>
                            </div>
                        )}
                    </>
                ) : (
                    <button onClick={handleLoginClick} className="flex items-center space-x-2 hover:text-gray-500">
                        <span>🔑</span>
                        <span>Login</span>
                    </button>
                )}
            </div>
            {/* Login Popup */}
            {isLoginPopupOpen && (
                <div className="login-popup absolute top-20 right-8 z-50 bg-white shadow-lg rounded-lg p-4">
                    <LoginDropdown setIsLoginPopupOpen={setIsLoginPopupOpen} />
                </div>
            )}
        </div>
    );
}

export default Header;
