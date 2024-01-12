import { RefObject } from 'react';
import '../css/MainInfo.css';
import {scrollToElement} from '../helpers/helpers'

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface MainInfoProps{
    element: RefObject<HTMLElement>
}

// Komponent renderujący informacje o stronie
function MainInfo(props : MainInfoProps) {
    return (
        <div className="welcome">
            <h2>Witaj w CarRental</h2>
            <p>
                CarRental jest serwisem, który umożliwia wynajmowanie samochodów z łatwością i wygodą. Oferujemy szeroki wybór pojazdów, dostosowanych do różnych potrzeb i preferencji. 
                Nie ważne, czy planujesz rodzinny wypad, służbową podróż, czy weekendowy wyjazd - CarRental ma dla Ciebie odpowiednią ofertę. Nasza flota obejmuje zarówno starsze jak i nowoczesne pojazdy, z różnymi opcjami wyposażenia, więc z pewnością znajdziesz coś dla siebie. 
                Wynajmuj samochody z CarRental - z nami podróżowanie staje się jeszcze łatwiejsze!
            </p>
            <input onClick={()=>scrollToElement(props.element)} type="button" value="Sprawdź flotę pojazdów"/>
        </div>
    )
}

export default MainInfo;