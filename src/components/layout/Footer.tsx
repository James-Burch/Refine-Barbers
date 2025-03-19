// import { Link } from 'react-router-dom';

// const Footer = () => {
//     const currentYear = new Date().getFullYear();

//     return (
//         <footer className="bg-black text-white py-16">
//             <div className="container mx-auto px-4 max-w-7xl">
//                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
//                     {/* Brand and Description */}
//                     <div>
//                         <div className="flex items-center space-x-4 mb-6">
//                             <img
//                                 src="/images/circle-logo-1.png"
//                                 alt="Refine Barbers Logo"
//                                 className="h-14 w-14 rounded-full"
//                             />
//                             <h3 className="text-xl font-bold">Refine<br />Barbers</h3>
//                         </div>
//                         <p className="text-gray-400 leading-relaxed">
//                             Professional barbering services with precision cuts, stylish fades, and expert beard trims in a relaxed environment.
//                         </p>
//                     </div>

//                     {/* Contact Information */}
//                     <div>
//                         <h3 className="text-xl font-bold mb-6 relative pb-2">
//                             Contact Info
//                             <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-white"></span>
//                         </h3>
//                         <ul className="space-y-4">
//                             <li className="flex items-start">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
//                                 </svg>
//                                 <span>
//                                     94 Winterhey Lane<br />
//                                     Horwich, Manchester<br />
//                                     BL6 7NZ
//                                 </span>
//                             </li>
//                             <li className="flex items-center">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
//                                 </svg>
//                                 <span>07850 442736</span>
//                             </li>
//                             <li className="flex items-center">
//                                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                                 </svg>
//                                 <span>info@refinebarbers.com</span>
//                             </li>
//                         </ul>
//                     </div>

//                     {/* Opening Hours */}
//                     <div>
//                         <h3 className="text-xl font-bold mb-6 relative pb-2">
//                             Opening Hours
//                             <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-white"></span>
//                         </h3>
//                         <table className="w-full">
//                             <tbody className="text-gray-400">
//                                 <tr>
//                                     <td className="py-1.5 text-left">Monday</td>
//                                     <td className="py-1.5 text-right">Closed</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="py-1.5 text-left">Tuesday</td>
//                                     <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="py-1.5 text-left">Wednesday</td>
//                                     <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="py-1.5 text-left">Thursday</td>
//                                     <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="py-1.5 text-left">Friday</td>
//                                     <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="py-1.5 text-left">Saturday</td>
//                                     <td className="py-1.5 text-right whitespace-nowrap text-sm">7:15 - 11:00 | 11:30 - 15:00</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="py-1.5 text-left">Sunday</td>
//                                     <td className="py-1.5 text-right">Closed</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Find Us */}
//                     <div>
//                         <h3 className="text-xl font-bold mb-6 relative pb-2">
//                             Find Us
//                             <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-white"></span>
//                         </h3>
//                         <div className="w-full h-64 rounded-md overflow-hidden">
//                             <iframe
//                                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.8922900285087!2d-2.54165668464475!3d53.59706298003392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b0767bf2199cd%3A0x3729635d8e95c81c!2s94%20Winterhey%20Ln%2C%20Horwich%2C%20Bolton%20BL6%207NZ%2C%20UK!5e0!3m2!1sen!2sus!4v1615985573487!5m2!1sen!2sus"
//                                 width="100%"
//                                 height="100%"
//                                 style={{ border: 0 }}
//                                 loading="lazy"
//                                 referrerPolicy="no-referrer-when-downgrade"
//                                 title="Refine Barbers Location"
//                                 className="filter contrast-125"
//                             ></iframe>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Social Media Links */}
//                 <div className="flex justify-center mt-16 mb-8 space-x-4">
//                     <a href="https://instagram.com/refinebarbers" target="_blank" rel="noopener noreferrer">
//                         <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
//                                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
//                             </svg>
//                         </div>
//                     </a>
//                     <a href="https://facebook.com/refinebarbers" target="_blank" rel="noopener noreferrer">
//                         <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors">
//                             <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
//                                 <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
//                             </svg>
//                         </div>
//                     </a>
//                 </div>

//                 {/* Copyright */}
//                 <div className="text-center pt-8 border-t border-gray-800 text-gray-500">
//                     <p>&copy; {currentYear} Refine Barbers. All rights reserved.</p>
//                 </div>
//             </div>
//         </footer>
//     );
// };

// export default Footer;

import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-black text-white py-16">
            <div className="container mx-auto px-4 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
                    {/* Brand and Description */}
                    <div>
                        <div className="flex items-center space-x-4 mb-6">
                            <img
                                src="/images/circle-logo-1.png"
                                alt="Refine Barbers Logo"
                                className="h-14 w-14 rounded-full"
                            />
                            <h3 className="text-xl font-bold uppercase tracking-wider">Refine<br />Barbers</h3>
                        </div>
                        <p className="text-gray-400 leading-relaxed uppercase tracking-wide text-sm">
                            Professional barbering services with precision cuts, stylish fades, and expert beard trims in a relaxed environment.
                        </p>
                    </div>

                    {/* Opening Hours */}
                    <div>
                        <h3 className="text-xl font-bold mb-6 relative pb-2 uppercase tracking-wider">
                            Opening Hours
                            <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-white"></span>
                        </h3>
                        <table className="w-full">
                            <tbody className="text-gray-400">
                                <tr>
                                    <td className="py-1.5 text-left">MONDAY</td>
                                    <td className="py-1.5 text-right">CLOSED</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-left">TUESDAY</td>
                                    <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-left">WEDNESDAY</td>
                                    <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-left">THURSDAY</td>
                                    <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-left">FRIDAY</td>
                                    <td className="py-1.5 text-right whitespace-nowrap text-sm">9:00 - 13:00 | 13:30 - 18:00</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-left">SATURDAY</td>
                                    <td className="py-1.5 text-right whitespace-nowrap text-sm">7:15 - 11:00 | 11:30 - 15:00</td>
                                </tr>
                                <tr>
                                    <td className="py-1.5 text-left">SUNDAY</td>
                                    <td className="py-1.5 text-right">CLOSED</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Contact Info and Find Us combined section */}
                    <div className="lg:col-span-2">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Contact Information */}
                            <div>
                                <h3 className="text-xl font-bold mb-6 relative pb-2 uppercase tracking-wider">
                                    Contact Info
                                    <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-white"></span>
                                </h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 mt-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        <span className="uppercase text-sm tracking-wider">
                                            94 WINTERHEY LANE<br />
                                            HORWICH, MANCHESTER<br />
                                            BL6 7NZ
                                        </span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                        <span className="uppercase tracking-wider">07850 442736</span>
                                    </li>
                                    <li className="flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                        <span className="uppercase tracking-wider">INFO@REFINEBARBERS.COM</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Find Us */}
                            <div>
                                <h3 className="text-xl font-bold mb-6 relative pb-2 uppercase tracking-wider">
                                    Find Us
                                    <span className="absolute bottom-0 left-0 w-12 h-0.5 bg-white"></span>
                                </h3>
                                <div className="w-full h-64 rounded-md overflow-hidden">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2367.8922900285087!2d-2.54165668464475!3d53.59706298003392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x487b0767bf2199cd%3A0x3729635d8e95c81c!2s94%20Winterhey%20Ln%2C%20Horwich%2C%20Bolton%20BL6%207NZ%2C%20UK!5e0!3m2!1sen!2sus!4v1615985573487!5m2!1sen!2sus"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Refine Barbers Location"
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-center mt-16 mb-8 space-x-4">
                    <a href="https://instagram.com/refinebarbers" target="_blank" rel="noopener noreferrer">
                        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </div>
                    </a>
                    <a href="https://facebook.com/refinebarbers" target="_blank" rel="noopener noreferrer">
                        <div className="bg-white rounded-full w-12 h-12 flex items-center justify-center hover:bg-gray-200 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="black">
                                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* Horizontal Line and Copyright */}
                <div className="border-t border-gray-800 pt-8 mt-8">
                    <p className="text-center text-gray-500 uppercase text-sm tracking-wider">
                        &copy; {currentYear} REFINE BARBERS. ALL RIGHTS RESERVED.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;