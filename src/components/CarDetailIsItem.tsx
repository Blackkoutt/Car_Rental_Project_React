import '../css/CarDetailsItem.css';

interface CarDetailsItemProps {
    label: string;
    value: string|undefined;
}

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