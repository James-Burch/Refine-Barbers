// import Navbar from "./components/layout/Navbar"
// import Hero from "./components/home/Hero";
// import Services from "./components/home/ServicesList";
// import Team from "./components/home/BarberCards";
// import Footer from "./components/layout/Footer";
// import { BrowserRouter } from 'react-router-dom';

// const App = () => {
//   return (
//     <div className="overflow-x-hidden">
//       <BrowserRouter>
//         <Navbar />
//         <Hero />
//         <Services />
//         <Team />
//         <Footer />
//       </BrowserRouter>
//     </div>
//   )
// }

// export default App

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HomePage from "./pages/HomePage.tsx";
import BookingPage from "./pages/BookingPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import { BookingProvider } from './context/BookingContext';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <AuthProvider>
          <BookingProvider>
            <Navbar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/booking" element={<BookingPage />} />
              <Route path="/admin" element={<AdminPage />} />
            </Routes>
            <Footer />
          </BookingProvider>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;