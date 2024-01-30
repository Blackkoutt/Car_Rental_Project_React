import { createRef} from 'react';
import '../css/App.css';
import CarList from './CarList'
import NotFound from './NotFound'
import CarAdd from './CarAdd'
import Reservations from './Reservations'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Logo from './Logo';
import NavBar from './NavBar';
import MainInfo from './MainInfo';
import Footer from './Footer';
import About from './About';
import ReservationAdd from './ReservationAdd';
import CarDetails from './CarDetails';

// Komponent nadrzędny renderujący content strony
// Komponent ten definiuje routing

function App() {
  const targetElementRef = createRef<HTMLElement>();
  return (
    <>
      <header>
        <div className="topbar">
          <Logo/>
          <NavBar element={targetElementRef}/>
        </div>
      </header>
      <main>
        <article id="main-article">
          <section id="info">
             <MainInfo element={targetElementRef}/>         
          </section>
          <section id="main_content" ref={targetElementRef}>         
            <Routes>            
              <Route path="/add" element={<CarAdd/>} />
              <Route path="/about" element={<About/>} />
              <Route path="/reservations" element = {<Reservations/>}/>
              <Route path="/addRes/:carId" element={<ReservationAdd/>} />
              <Route path="/" element={<CarList/>} />
              <Route Component={NotFound} />
            </Routes>
          </section>
        </article>
      </main>
      <footer>
        <Footer/>
      </footer>
    </>
  );
}

export default App;
