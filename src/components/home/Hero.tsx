import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-black text-white py-20 w-full">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center max-w-full">
        <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left lg:pl-24">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 uppercase tracking-wider">REFINE BARBERS</h1>
          <p className="text-xl mb-8 text-gray-300">
            Professional Barbers offering appointment and walk-ins.
          </p>
          <div className="mb-8 text-lg text-gray-400">
            <p>94 Winterhey Lane</p>
            <p>Horwich, Manchester</p>
          </div>
          <Link to="/booking">
            <button className="border-2 border-white text-white px-8 py-3 text-lg font-medium hover:bg-white hover:text-black transition-colors duration-300 uppercase tracking-wider">
              Book Appointment
            </button>
          </Link>
        </div>
        <div className="md:w-1/2 flex justify-center">
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-white">
            <img 
              src="src/assets/images/circle-logo-1.png" 
              alt="Refine Barbers" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;