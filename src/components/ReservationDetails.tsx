import '../css/ReservationDetails.css';
import ReservationData from '../models/reservation';
import CarData from '../models/car-data';
import ReservationDetailsItem from './ReservationDetailsItem';

interface ReservationDetailsProps {
    reservation:ReservationData
    changeDetailsVisibility: (reservation?:ReservationData) => void
}
function ReservationDetails(props:ReservationDetailsProps) {
    const {reservation} = props;
    return(
        <>
        <div className="reservation-details-container">
            <div className ="reservation-details-box">
            <ReservationDetailsItem label="ID: " value={reservation.Id?.toString()}></ReservationDetailsItem>
            <ReservationDetailsItem label="Imie: " value={reservation.User?.Name}></ReservationDetailsItem>
            <ReservationDetailsItem label="Nazwisko: " value={reservation.User?.Surname}></ReservationDetailsItem>
            <ReservationDetailsItem label="Email: " value={reservation.User?.Email}></ReservationDetailsItem>
            <ReservationDetailsItem label="Data rozpoczecia: " value={reservation.Start_of_reservation}></ReservationDetailsItem>
            <ReservationDetailsItem label="Data zakończenia: " value={reservation.End_of_reservation}></ReservationDetailsItem>
            <ReservationDetailsItem label="Marka samochodu: " value={reservation.Car?.Manufacturer?.Name}></ReservationDetailsItem>
            <ReservationDetailsItem label="Model samochodu: " value={reservation.Car?.Model}></ReservationDetailsItem>
            <ReservationDetailsItem label="Koszt wypozyczenia: " value={`${reservation.Total_cost.toString()} zł`}></ReservationDetailsItem>
            </div>
        <div className="back_button">
                    <button title="Wróć do poprzedniego widoku" onClick={() => props.changeDetailsVisibility() }>Wróć</button>
                </div>
        </div>
        </>
    )
}
export default ReservationDetails;
