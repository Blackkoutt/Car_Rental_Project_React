import { createRef, useEffect } from 'react';
import '../css/Notification.css';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface NotificationProps {
    text: string
    getRef: (ref: React.RefObject<HTMLDialogElement>) => void;
}

// Komponent renderujący powiadomienie o poprawnym usunięciu samochodu
function Notification(props:NotificationProps) {
    const targetElementRef = createRef<HTMLDialogElement>();
    
    // Hook do ustawienia referencji na element dialog
    useEffect(() => {
        props.getRef(targetElementRef);
      }, [targetElementRef, props]);
    
    return (
        <dialog className="success_dialog" ref={targetElementRef}>
            <div className="success_dialog_div">
                <p>{props.text}</p>
            </div>     
        </dialog>
    )
}

export default Notification;