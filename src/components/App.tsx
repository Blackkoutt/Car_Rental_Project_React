import React from 'react';
import '../css/App.css';
import CarList from './CarList'

function App() {
  return (
    <div>
      <header>
        <div className="topbar">
          <div className="logo">
            <a><h1><span className="first_part_logo">Car</span><span className="second_part_logo">Rental</span></h1></a>
          </div>
          <nav>
            <ul className="nav-list">
                <li><a href="#">Strona główna</a></li>
                <li><a href="#">Dodaj pojazd</a></li>
                <li><a href="#">Wypożyczenia</a></li>
              </ul>
          </nav>
        </div>
      </header>
      <main>
        <article id="main-article">
          <section id="info">
              <div className="welcome">
                  <h2>Witaj w CarRental</h2>
                  <p>
                    CarRental jest serwisem, który umożliwia wynajmowanie samochodów z łatwością i wygodą. Oferujemy szeroki wybór pojazdów, dostosowanych do różnych potrzeb i preferencji. 
                    Nie ważne, czy planujesz rodzinny wypad, służbową podróż, czy weekendowy wyjazd - CarRental ma dla Ciebie odpowiednią ofertę. Nasza flota obejmuje zarówno starsze jak i nowoczesne pojazdy, z różnymi opcjami wyposażenia, więc z pewnością znajdziesz coś dla siebie. 
                    Wynajmuj samochody z CarRental - z nami podróżowanie staje się jeszcze łatwiejsze!
                  </p>
                  <input type="button" value="Sprawdź flotę pojazdów"/>
              </div>
          </section>
          <section id="cars">
            <CarList/>
          </section>
        </article>
      </main>
      <footer>
        <div className="socials">
            <a href="https://www.facebook.com/" target="_blank"><div className="fb"><i className="fa-brands fa-facebook-f"></i></div></a>
            <a href="https://www.instagram.com/" target="_blank"><div className="insta"><i className="fa-brands fa-instagram"></i></div></a>
            <a href="https://twitter.com/?lang=pl" target="_blank"><div className="x"><i className="fa-brands fa-x-twitter"></i></div></a>
        </div>
        <div className="end">
            Wszelkie prawa zastrzeżone &copy; 2023 CarRental
        </div>
      </footer>
    </div>
  );
}

export default App;
