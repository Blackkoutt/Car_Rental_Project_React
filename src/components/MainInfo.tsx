import { RefObject } from 'react';
import '../css/MainInfo.css';
import {scrollToElement} from '../helpers/helpers'
import { Link } from 'react-router-dom';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface MainInfoProps{
    element: RefObject<HTMLElement>
}

// Komponent renderujący informacje o stronie
function MainInfo(props : MainInfoProps) {
    return (
        <article>
            <div className="welcome">
                <h2>Witaj w CarRental</h2>
                <p>
                    CarRental umożliwia łatwy i wygodny wynajem samochodów. Oferujemy szeroki wybór pojazdów, dostosowanych do różnych potrzeb. 
                    Służbowa podróż, czy rodzinny wyjazd ? - CarRental ma dla Ciebie odpowiednią ofertę. Nasza flota obejmuje zarówno starsze jak i nowoczesne pojazdy. Z pewnością znajdziesz coś dla siebie. 
                    Poróż z nami jest jeszcze łatwiejsza!
                </p>
                <Link to="/" title="Flota pojazdów" onClick={()=>scrollToElement(props.element)}>
                    <div className="welcome_button">
                            Sprawdź flotę pojazdów
                    </div>   
                </Link>  
            </div>
        </article>
    )
}

export default MainInfo;