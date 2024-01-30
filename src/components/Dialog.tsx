import { createRef, useEffect } from 'react';
import '../css/Dialog.css';
import { closeDialogAndChangeTitle } from '../helpers/helpers';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface DialogProps {
    text: string
    getRef: (ref: React.RefObject<HTMLDialogElement>) => void;
    deleteCar: () => void;
}

// Komponent wyświetlający dialog z pytaniem "Czy chcesz usunąć samochód"
function Dialog(props:DialogProps) {
    const targetElementRef = createRef<HTMLDialogElement>();
    
    // Hook do ustawienia referencji na element dialog
    useEffect(() => {
        props.getRef(targetElementRef);
      }, [targetElementRef, props]);
    
    return (
        <dialog className="delete_dialog" ref={targetElementRef}>
            <form method="dialog">
                <div>
                    <p>{props.text}</p>
                    <button className="delete_button_dialog" type="submit" onClick={props.deleteCar}>Usuń</button>
                    <button className="cancel_button_dialog" type="reset" onClick={()=>closeDialogAndChangeTitle(targetElementRef)}>Anuluj</button>
                </div>
            </form>
        </dialog>
    )
}

export default Dialog;
