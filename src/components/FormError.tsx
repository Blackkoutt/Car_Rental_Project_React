import '../css/FormError.css';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface FormErrorProps {
    message: string;
}

// Komponent renderujacy błędy formularza
function FormError(props:FormErrorProps) {
    const {message} = props;
    return (
        <div>
            <div className="text-danger"> 
                <p>{message}</p>
            </div>
        </div>
    )
}

export default FormError;
