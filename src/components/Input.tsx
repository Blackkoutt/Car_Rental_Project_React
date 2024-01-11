
import { ChangeEvent } from 'react';
import '../css/Input.css';

interface InputProps {
    label: string;
    id: string;
    type: string;
    value: string|number;
    onChange: (e: ChangeEvent<HTMLInputElement|HTMLSelectElement>)=> void; 
    min?: number|string;
    max?: number;
}

function Input(props:InputProps) {
    const {onChange} = props;
    return (
        <div className="form_input">
            <label>{props.label}</label>
            <input id={props.id} type={props.type} min={props.min?.toString()} max={props.max?.toString()} defaultValue={props.value} onChange={onChange}/>
        </div>
    )
}
export default Input;