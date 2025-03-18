import Navbar from "./components/layout/Navbar"
import Hero from "./components/home/Hero";
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  return (
    <div className="overflow-x-hidden">
      <BrowserRouter>
        <Navbar />
        <Hero />
      </BrowserRouter>
    </div>
  )
}

export default App