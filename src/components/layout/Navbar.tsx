import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-black text-white sticky top-0 z-50 shadow-md">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">
                        <img src="src/assets/images/circle-logo-1.png" alt="Refine Logo Image" className="h-12 w-12 mr-2 rounded-full" />
                    </Link>

                    <button
                        className="md:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                        </svg>
                    </button>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
                        <Link to="/#services" className="hover:text-gray-400 transition-colors">Services</Link>
                        <Link to="/#barbers" className="hover:text-gray-400 transition-colors">Our Barbers</Link>
                        <Link to="/booking" className="hover:text-gray-400 transition-colors">Book Now</Link>
                        <Link to="/login">
                            <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
                                Barber Login
                            </button>
                        </Link>
                    </nav>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <nav className="mt-4 flex flex-col space-y-4 md:hidden">
                        <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
                        <Link to="/#services" className="hover:text-gray-400 transition-colors">Services</Link>
                        <Link to="/#barbers" className="hover:text-gray-400 transition-colors">Our Barbers</Link>
                        <Link to="/booking" className="hover:text-gray-400 transition-colors">Book Now</Link>
                        <Link to="/login">
                            <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors w-full">
                                Barber Login
                            </button>
                        </Link>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Navbar;