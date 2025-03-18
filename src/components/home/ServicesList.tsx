import { Link } from 'react-router-dom';
import { useRef } from 'react';

const Services = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const servicesList = [
        {
            id: 'skin-fade',
            name: 'SKIN FADE',
            description: 'Skin fade down to the wood, with a scissor cut on top!',
            price: '£18.00',
            duration: '45min'
        },
        {
            id: 'hair-cut',
            name: 'HAIR CUT',
            description: 'Scissor cut on top with clippers back and sides. (anything over a 0.5 guard length)',
            price: '£15.00',
            duration: '30min'
        },
        {
            id: 'skin-fade-beard',
            name: 'SKIN FADE & BEARD TRIM',
            description: 'Skin fade down to the wood with a scissor cut on top, along with a beard trim and shape.',
            price: '£25.00',
            duration: '1hr'
        },
        {
            id: 'haircut-beard',
            name: 'HAIRCUT & BEARD TRIM',
            description: 'Clipper cut no less than a 0.5 guard length and a scissor cut on top, along with a beard trim.',
            price: '£20.00',
            duration: '1hr'
        },
        {
            id: 'scissor-cut-short',
            name: 'SCISSOR CUT (SHORT HAIR)',
            description: 'Scissor work throughout the top, back and sides cut to client\'s desired length, along with a wash and style.',
            price: '£18.00',
            duration: '45min'
        },
        {
            id: 'scissor-cut-long',
            name: 'SCISSOR CUT (LONG HAIR)',
            description: 'All scissor work throughout the top, back and sides, cut to client\'s desired length.',
            price: '£20.00',
            duration: '1hr'
        },
        {
            id: 'kids-skin-fade',
            name: 'KIDS SKIN FADE',
            description: '16yrs & Under. Skin fade down to the wood or trimmer.',
            price: '£15.00',
            duration: '45min'
        },
        {
            id: 'kids-cut',
            name: 'KIDS CUT',
            description: '16yrs & under. Scissor cut on top with clippers on the sides.',
            price: '£13.00',
            duration: '30min'
        },
        {
            id: 'beard',
            name: 'BEARD',
            description: 'Get your beard tidied and shaped, shortened, faded out or even whipped off.',
            price: '£10.00',
            duration: '15min'
        },
        {
            id: 'restyle',
            name: 'RESTYLE',
            description: 'If you\'re thinking of switching it up then book this service!',
            price: '£20.00',
            duration: '1hr'
        }
    ];

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    return (
        <section id="services" className="relative py-20">
            <div
                className="absolute inset-0 bg-fixed bg-center bg-cover bg-no-repeat z-0"
                style={{
                    backgroundImage: "url('src/assets/images/rob-trim-bg-pic.png')",
                    backgroundAttachment: "fixed"
                }}
            >
                <div className="absolute inset-0 bg-black opacity-70"></div>
            </div>

            <div className="relative z-10 container mx-auto px-4">
                <h2 className="text-4xl font-bold text-center mb-16 uppercase tracking-wider relative text-white">
                    OUR SERVICES
                    <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 -mb-4 w-16 h-1 bg-white"></span>
                </h2>

                <div className="relative">
                    <button
                        onClick={scrollLeft}
                        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors focus:outline-none hidden md:block z-10"
                        aria-label="Scroll left"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div
                        ref={scrollContainerRef}
                        className="flex overflow-x-auto pb-8 scrollbar-hide snap-x snap-mandatory"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {servicesList.map((service) => (
                            <div
                                key={service.id}
                                className="min-w-[300px] w-80 mx-3 snap-center first:ml-4 last:mr-4 bg-black text-white p-8 flex flex-col transition-transform duration-300 hover:-translate-y-2"
                            >
                                <h3 className="text-xl font-bold mb-3">{service.name}</h3>
                                <p className="text-gray-300 mb-8 flex-grow">{service.description}</p>
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-2xl font-bold">{service.price}</span>
                                    <span className="text-gray-400">{service.duration}</span>
                                </div>
                                <Link
                                    to={`/booking?service=${service.id}`}
                                    className="bg-white text-black py-3 px-6 text-center hover:bg-gray-300 transition-colors duration-300 uppercase text-sm tracking-wider font-bold"
                                >
                                    BOOK NOW
                                </Link>
                            </div>
                        ))}
                    </div>

                    <button
                        onClick={scrollRight}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white p-3 rounded-full shadow-lg hover:bg-gray-800 transition-colors focus:outline-none hidden md:block z-10"
                        aria-label="Scroll right"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>

                <div className="flex justify-center mt-6 items-center">
                    <div className="flex space-x-4 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform -rotate-90 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        <p className="text-gray-300 italic">Swipe to explore services</p>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 transform -rotate-90 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Services;