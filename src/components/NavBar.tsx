import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { RefObject, useRef } from 'react';
import {scrollToElement, openCloseAccordion} from '../helpers/helpers'

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface MainInfoProps{
    element: RefObject<HTMLElement>
}

// Komponent renderujący NavBar 
function NavBar(props : MainInfoProps) {
    const acc = useRef(null);
    return (
        <nav>
            <div className="default_nav">
                <ul className="nav-list">
                    <li><Link to="/" title="Strona główna">Strona główna</Link></li>
                    <li onClick={()=>scrollToElement(props.element)}><Link to="/about" title="Informacje o serwisie">O nas</Link></li>
                    <li onClick={()=>scrollToElement(props.element)} ><Link to="/add" title="Dodawanie nowego pojazdu">Dodaj pojazd</Link></li>
                    <li onClick={()=>scrollToElement(props.element)}><Link to="/reservations" title= "Lista rezerwacji">Wypożyczenia</Link></li>
                </ul>
            </div>
            <button onClick={()=>openCloseAccordion(acc)}  className="collapsed_nav"> 
                <div className="accordion-panel">
                        <i className="fa-solid fa-list"></i>
                </div>
            </button>
            <div className="accordion">
                <div ref={acc} className="accordion-content">
                    <div>
                        <ul className="nav-list-collapsed">
                            <li><Link to="/" title="Strona główna">Strona główna</Link></li>
                            <li onClick={()=>scrollToElement(props.element)}><Link to="/about" title="Informacje o serwisie">O nas</Link></li>
                            <li onClick={()=>scrollToElement(props.element)} ><Link to="/add" title="Dodawanie nowego pojazdu">Dodaj pojazd</Link></li>
                            <li onClick={()=>scrollToElement(props.element)}><Link to="/reservations" title= "Lista rezerwacji">Wypożyczenia</Link></li>
                        </ul>
                    </div>
                </div>
            </div>    
        </nav>       
    )
}

export default NavBar;