import { Link } from 'react-router-dom';
import '../css/Logo.css';

// Komponent renderujący logo strony
function Logo() {
    return (
        <Link to="/">
            <div className="logo">
                <h1><span className="first_part_logo">Car</span><span className="second_part_logo">Rental</span></h1>
            </div>
        </Link>
    )
}

export default Logo;