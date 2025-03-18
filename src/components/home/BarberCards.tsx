import { Link } from 'react-router-dom';

const Team = () => {
    const barbers = [
        {
            id: 'rob',
            name: 'ROB CUNLIFFE',
            role: 'Owner',
            image: 'src/assets/images/robcunliffe-pfp.png'
        },
        {
            id: 'josh',
            name: 'JOSH GILDEA',
            role: 'Barber',
            image: 'src/assets/images/joshgildea-pfp.png'
        },
        {
            id: 'cole',
            name: 'COLE CAISLEY',
            role: 'Barber',
            image: 'src/assets/images/colecaisley-pfp.png'
        }
    ];

    return (
        <section id="team" className="relative py-20 bg-black text-white">
            <div className="container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider relative">
                    MEET THE TEAM
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-4 w-16 h-1 bg-white"></span>
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {barbers.map((barber) => (
                        <div key={barber.id} className="text-center mb-10">
                            <div className="mb-6 overflow-hidden rounded-full w-64 h-64 mx-auto border-2 border-white">
                                <img
                                    src={barber.image}
                                    alt={barber.name}
                                    className="w-full h-full object-cover object-center transform transition-transform duration-500 hover:scale-110"
                                />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">{barber.name}</h3>
                            <p className="text-gray-400 mb-6">{barber.role}</p>
                            <Link
                                to={`/booking?barber=${barber.id}`}
                                className="bg-white text-black py-3 px-8 inline-block hover:bg-gray-300 transition-colors duration-300 uppercase text-sm tracking-wider font-bold"
                            >
                                BOOK WITH {barber.name}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Team;