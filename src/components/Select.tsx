import { ChangeEvent } from 'react';
import '../css/Select.css';
import ManufacturerData from '../models/manufacturer';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface SelectProps {
    label: string;
    id: string;
    selected_man?: string;
    selected_type?: string;
    selected_seats?: number;
    selected_gearbox?: string;
    mans?:ManufacturerData[];
    onChange: (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>)=> void; 
    type_names?:string[]
    seats_count?:number[]
    gearbox?:string[];
}

// Komponent renderujący Select (używany w formularzach edycji i doawania samochodu)
function Select(props:SelectProps) {
    const {onChange} = props;
    return (   
        <div className="form_input">
            <label htmlFor={props.id}>{props.label}</label>
            {props.id === "manufacturer" && (
                <select id={props.id} value={props.selected_man} onChange={onChange}> 
                    {props.mans?.map((man: ManufacturerData) => (
                        <option key={man.Id} value={man.Name}>
                            {man.Name}
                        </option>
                    ))}
                </select>
            )}
            {props.id === "type" && (
                <select id={props.id} value={props.selected_type} onChange={onChange}> 
                    {props.type_names?.map((type: string, key:number) => (
                        <option key={key}>
                            {type}
                        </option>
                    ))}
                </select>
            )}
            {props.id === "seats_count" && (
                <select id={props.id} value={props.selected_seats} onChange={onChange}> 
                    {props.seats_count?.map((count: number, key:number) => (
                        <option key={key}>
                            {count}
                        </option>
                    ))}
                </select>
            )}
            {props.gearbox && (
                <select id={props.id} value={props.selected_gearbox} onChange={onChange}> 
                    {props.gearbox?.map((value:string, key:number) => (   
                        <option key={key}>
                            {value}
                        </option>
                    ))} 
                </select>
            )}
        </div>
    )
}

export default Select;
