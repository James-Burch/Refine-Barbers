import { Link } from 'react-router-dom';

const Team = () => {
    const barbers = [
        {
            id: 'rob',
            name: 'ROB CUNLIFFE',
            role: 'Owner',
            image: 'src/assets/images/robcunliffe-pfp.png',
            instagram: 'rob.refine'
        },
        {
            id: 'josh',
            name: 'JOSH GILDEA',
            role: 'Mens Stylist',
            image: 'src/assets/images/joshgildea-pfp.png',
            instagram: 'josh_refine_'
        },
        {
            id: 'cole',
            name: 'COLE CAISLEY',
            role: 'Barber',
            image: 'src/assets/images/colecaisley-pfp.png',
            instagram: 'refinebycole'
        }
    ];

    return (
        <section id="team" className="relative py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider relative">
                    MEET THE TEAM
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-4 w-16 h-1 bg-white"></span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-4 gap-y-16">
                    {barbers.map((barber) => (
                        <div key={barber.id} className="flex flex-col items-center">
                            <div className="mb-6 overflow-hidden rounded-full w-64 h-64 border-2 border-white">
                                <img
                                    src={barber.image}
                                    alt={`${barber.name} profile`}
                                    className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{barber.name}</h3>
                            <p className="text-gray-400 mb-3">{barber.role}</p>

                            <a
                                href={`https://instagram.com/${barber.instagram}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center text-gray-400 hover:text-white transition-colors duration-300 mb-5"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="20"
                                    height="20"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="mr-2"
                                >
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                                @{barber.instagram}
                            </a>

                            <Link
                                to={`/booking?barber=${barber.id}`}
                                className="bg-white text-black py-3 text-center hover:bg-gray-300 transition-colors duration-300 uppercase text-sm font-bold w-48"
                            >
                                {barber.name.includes(' ') ? (
                                    <>BOOK WITH<br />{barber.name.split(' ')[0]}</>
                                ) : (
                                    <>BOOK WITH {barber.name}</>
                                )}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;