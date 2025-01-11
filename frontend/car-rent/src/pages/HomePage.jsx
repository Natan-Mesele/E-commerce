import React from 'react';
import CarList from '../car/CarList';
import StatsSection from './StatsSection';
import HowItWorks from './HowItWorks';
import Footer from './Footer';

const HomePage = () => {
    return (
        <section 
            className="relative bg-cover bg-center h-[75vh]" 
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1599834913612-e1afcef37547?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxjYXIlMjByZW50fGVufDB8fDB8fHww')" }}
        >
            <div className="absolute inset-0 bg-black opacity-50"></div>
            <div className="relative z-10 flex items-center h-full text-left text-white pl-6 sm:pl-16 lg:pl-24">
                <div className="max-w-md sm:max-w-lg ml-0 sm:ml-40">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 sm:mb-6">Find Your Perfect Ride</h1>
                    <p className="text-lg sm:text-xl mb-6 sm:mb-8">Browse through our wide selection of cars available for rent and enjoy your journey.</p>
                    <button className="bg-blue-500 text-white py-3 px-8 rounded-lg text-lg hover:bg-blue-700 transition duration-300">
                        Start Renting
                    </button>
                </div>
            </div>
            <div>
                <CarList />
                <StatsSection />
                <HowItWorks />
                <Footer />
            </div>
        </section>
    );
};

export default HomePage;
