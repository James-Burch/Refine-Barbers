import Navbar from "./components/layout/Navbar"
import Hero from "./components/home/Hero";
import Services from "./components/home/ServicesList";
import Team from "./components/home/BarberCards";
import Footer from "./components/layout/Footer";
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Navbar />
        <Hero />
        <Services />
        <Team />
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App