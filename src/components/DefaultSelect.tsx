import { ChangeEvent } from 'react';
import '../css/DefaultSelect.css';

// Interfejs definiujący kolejne typy wartości obiektu
interface ValuesTypes{
    manufacturer:string;
    model:string;
    date_of_manufacture:string;
    available_count:string;
    rental_cost:string;
    seats_count:string;
    gearbox:string;
    type:string;
}

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface DefaultSelectProps {
    label: string;
    id: string;
    values:ValuesTypes;
    onChange: (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>)=> void; 
}

// Komponent do wyświetlenia podstawowego selecta (używany w filtracji)
function DefaultSelect(props:DefaultSelectProps) {
    const {label, id, values, onChange} = props;
    return (
        <div className="form_input">
            <label>{label}</label>
            <select id={id} onChange={onChange}>
            {Object.entries(values).map(([key, value]) => (
                    <option key={key} value={key}>
                        {(value as React.ReactNode)}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default DefaultSelect;