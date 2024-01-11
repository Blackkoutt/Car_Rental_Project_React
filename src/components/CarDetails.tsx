import '../css/CarDetails.css';
import CarData from '../models/car-data';
import CarDetailsItem from './CarDetailIsItem';

interface CarDetailsProps {
    car:CarData
    changeDetailsVisibility: (car?:CarData) => void
}

function CarDetails(props:CarDetailsProps) {
    const {car} = props;
    return (
        <>
            <div className="car-details-container">
                <div className ="car-details-box">
                    <CarDetailsItem label="ID: " value={car.Id?.toString()}></CarDetailsItem>
                    <CarDetailsItem label="Producent: " value={car.Manufacturer?.Name}></CarDetailsItem>
                    <CarDetailsItem label="Model: " value={car.Model}></CarDetailsItem>
                    <CarDetailsItem label="Data produkcji: " value={car.DateOfManufacture}></CarDetailsItem>
                    <CarDetailsItem label="Ilość: " value={car.AvailableCount.toString()}></CarDetailsItem>
                    <CarDetailsItem label="Cena wynajmu: " value={`${car.RentalCost.toString()} zł`}></CarDetailsItem>
                    <CarDetailsItem label="Liczba miejsc: " value={car.Type?.SeatsCount.toString()}></CarDetailsItem>
                    <CarDetailsItem label="Skrzynia biegów:  " value={ car.GearBox ? 'Automatyczna' : 'Manualna' }></CarDetailsItem>
                    <CarDetailsItem label="Typ: " value={ car.Type?.Name }></CarDetailsItem>
                    <div className="action-buttons">
                        <a href="#"><button className="reserve-button">Wynajmij</button></a>
                    </div>
                </div>
                <div className="back_button">
                    <button onClick={() => props.changeDetailsVisibility() }>Wróć</button>
                </div>
            </div>
        </>
    )
}

export default CarDetails;