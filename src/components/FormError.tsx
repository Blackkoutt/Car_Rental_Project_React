import '../css/FormError.css';

interface FormErrorProps {
    message: string;
}

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
