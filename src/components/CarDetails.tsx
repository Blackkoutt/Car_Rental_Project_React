import '../css/CarDetails.css';
import CarData from '../models/car-data';

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
                    <div className="car-detail-item">
                        <span className="detail-label">ID: </span>
                        <span className="detail-value">{ car.Id }</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Producent: </span>
                        <span className="detail-value">{ car.Manufacturer?.Name }</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Model: </span>
                        <span className="detail-value">{ car.Model }</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Data produkcji: </span>
                        <span className="detail-value">{ car.DateOfManufacture }</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Ilość: </span>
                        <span className="detail-value">{ car.AvailableCount }</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Cena wynajmu: </span>
                        <span className="detail-value">{ car.RentalCost } zł</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Liczba miejsc: </span>
                        <span className="detail-value">{ car.Type?.SeatsCount }</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Skrzynia biegów: </span>
                        <span className="detail-value">{ car.GearBox ? 'Automatyczna' : 'Manualna' }</span>
                    </div>
                    <div className="car-detail-item">
                        <span className="detail-label">Typ: </span>
                        <span className="detail-value">{ car.Type?.Name }</span>
                    </div>
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