import React, { useEffect } from 'react';
import CarList from '../car/CarList';
import StatsSection from './StatsSection';
import HowItWorks from './HowItWorks';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import { getUser } from '../Redux/Auth/Action';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const dispatch = useDispatch();
    const jwt = localStorage.getItem('jwt');
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getUser(jwt))
    }, [dispatch, jwt])

    const handleStartRentingClick = () => {
        navigate('/register');  
    }

    return (
        <section
            className="relative bg-custom-bg bg-cover bg-center h-[75vh]"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599834913612-e1afcef37547?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxjYXIlMjByZW50fGVufDB8fDB8fHww')" }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center justify-left h-full text-left text-white pl-6 sm:pl-16 lg:pl-24">
                <div className="max-w-md sm:max-w-2xl ml-0 sm:ml-40">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Find Your Perfect Ride</h1>
                    <p className="text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8">Browse through our wide selection of cars available for rent and enjoy your journey.</p>
                    <button
                        onClick={handleStartRentingClick}  // Set the onClick to navigate to signup page
                        className="bg-custom-primary text-white py-3 px-8 rounded-lg text-lg hover:bg-custom-bg hover:text-black transition duration-300">
                        Start Renting
                    </button>
                </div>
            </div>
            {/* Content Sections */}
            <div className="bg-gray-100">
                {/* Car List */}
                <div className="py-12">
                    <CarList />
                </div>

                {/* Statistics */}
                <div className="py-12">
                    <StatsSection />
                </div>

                {/* How It Works */}
                <div className="py-12">
                    <HowItWorks />
                </div>

                {/* Footer */}
                <Footer />
            </div>
        </section>
    );
};

export default HomePage;
