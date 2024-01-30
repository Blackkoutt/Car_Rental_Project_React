import '../css/ReservationDetailsItem.css';

interface ReservationDetailsItemProps {
    label: string;
    value: string|undefined;
}
function ReservationDetailsItem(props:ReservationDetailsItemProps) {
    const {label, value} = props;
    return (
        <div className="reservation-detail-item">
            <span className="detail-label">{label}</span>
            <span className="detail-value">{value}</span>
        </div>
    )
}

export default ReservationDetailsItem;