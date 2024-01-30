import React, { Component} from 'react';
import ReservationData from '../models/reservation';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface ReservationProps {
    reservation: ReservationData,
    changeDetailsVisibility: (reservation?:ReservationData) => void,
    setDeleteReservation: (reservation:ReservationData) => void,
}

// Interfejs stanu definiujący typy wartości stanu komponentu
interface ReservationState {
    reservation: ReservationData,
    visible: boolean
}
class ReservationsElement extends Component<ReservationProps, ReservationState>{
    constructor(props:ReservationProps){
        super(props);
        
        this.state = {
            reservation: props.reservation,
            visible: false
        };
    }
    render(){
        const { reservation} = this.state;
        return(
        <>
            <tr>
                <td>{reservation.User?.Name}</td>
                <td>{reservation.User?.Surname}</td>
                <td>{reservation.CarId}</td>
                <td>{reservation.Start_of_reservation}</td>
                <td>{reservation.End_of_reservation}</td>
                <td>{reservation.Total_cost} zł</td>
                <td className="action_buttons">   
                    <button className="details_button" onClick={()=>this.props.changeDetailsVisibility(this.props.reservation)} >Szczegóły</button>
                    <button onClick={()=>this.props.setDeleteReservation(reservation)} className="delete_button">Usuń</button>
                </td> 
            </tr>
            </>

        );
    }
}

export default ReservationsElement;
