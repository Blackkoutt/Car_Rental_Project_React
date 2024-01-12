import '../css/CarDetailsItem.css';

// Interfejs propsów definiujący typy właściwości przyjmowane przez komponent
interface CarDetailsItemProps {
    label: string;
    value: string|undefined;
}

// Komponent wyświetlający pojedyńczą informację na temat danego samochodu
function CarDetailsItem(props:CarDetailsItemProps) {
    const {label, value} = props;
    return (
        <div className="car-detail-item">
            <span className="detail-label">{label}</span>
            <span className="detail-value">{value}</span>
        </div>
    )
}

export default CarDetailsItem;