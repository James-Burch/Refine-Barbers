import { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="bg-black text-white sticky top-0 z-50 transition-all duration-300 md:border-b md:border-gray-800 md:shadow-sm">
            <div className="container mx-auto px-4 py-4">
                <div className="flex justify-between items-center">
                    <Link to="/" className="text-2xl font-bold">
                        <img src="/images/circle-logo-1.png" alt="Refine Logo Image" className="h-12 w-12 mr-2 rounded-full" />
                    </Link>

                    <button
                        className="md:hidden relative w-6 h-6 focus:outline-none"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >

                        <span
                            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'rotate-45 top-3' : 'rotate-0 top-1'
                                }`}
                        ></span>

                        <span
                            className={`absolute h-0.5 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? 'w-0 opacity-0 left-3' : 'w-6 opacity-100 left-0'
                                } top-3`}
                        ></span>

                        <span
                            className={`absolute h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out ${isMenuOpen ? '-rotate-45 top-3' : 'rotate-0 top-5'
                                }`}
                        ></span>
                    </button>

                    {/* Desktop menu */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="hover:text-gray-400 transition-colors">Home</Link>
                        <Link to="/#services" className="hover:text-gray-400 transition-colors">Services</Link>
                        <Link to="/#barbers" className="hover:text-gray-400 transition-colors">Our Barbers</Link>
                        <Link to="/booking" className="hover:text-gray-400 transition-colors">Book Now</Link>
                        <Link to="/admin">
                            <button className="border border-white text-white px-4 py-2 rounded hover:bg-white hover:text-black transition-colors">
                                Barber Login
                            </button>
                        </Link>
                    </nav>
                </div>

                {/* Mobile menu with height animation */}
                <div
                    className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-72 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                >
                    <nav className="flex flex-col items-center space-y-5 py-6">
                        <Link to="/" className="text-xl font-medium hover:text-gray-400 transition-colors">Home</Link>
                        <Link to="/#services" className="text-xl font-medium hover:text-gray-400 transition-colors">Services</Link>
                        <Link to="/#barbers" className="text-xl font-medium hover:text-gray-400 transition-colors">Our Barbers</Link>
                        <Link to="/booking" className="text-xl font-medium hover:text-gray-400 transition-colors">Book Now</Link>
                        <Link to="/admin" className="w-3/4 text-center mt-2">
                            <button className="border border-white text-white px-5 py-3 rounded text-lg font-medium hover:bg-white hover:text-black transition-colors w-full">
                                Barber Login
                            </button>
                        </Link>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Navbar;