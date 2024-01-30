
import { ChangeEvent } from 'react';
import '../css/Input.css';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface InputProps {
    label: string;
    id: string;
    type: string;
    placeholder? :string;
    value?: string|number;
    onChange: (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>)=> void; 
    min?: number|string;
    max?: number;
}

// Komponent renderujący pole input
function Input(props:InputProps) {
    const {onChange} = props;
    return (
        <div className="form_input">
            <label htmlFor={props.id}>{props.label}</label>
            <input id={props.id} type={props.type} min={props.min?.toString()} max={props.max?.toString()} placeholder={props.placeholder} defaultValue={props.value} onChange={onChange}/>
        </div>
    )
}

export default Input;