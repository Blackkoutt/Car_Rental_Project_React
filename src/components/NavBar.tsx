import { Link } from 'react-router-dom';
import '../css/NavBar.css';
import { RefObject } from 'react';
import {scrollToElement} from '../helpers/helpers'

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface MainInfoProps{
    element: RefObject<HTMLElement>
}

// Komponent renderujący NavBar 
function NavBar(props : MainInfoProps) {
    return (
        <nav>
        <ul className="nav-list">
            <li><Link to="/">Strona główna</Link></li>
            <li onClick={()=>scrollToElement(props.element)} ><Link to="/add">Dodaj pojazd</Link></li>
            <li><a href="#">Wypożyczenia</a></li>
          </ul>
      </nav>
    )
}

export default NavBar;