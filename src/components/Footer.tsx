import { Link } from 'react-router-dom';
import '../css/Footer.css';

// Komponent renderujący Footer
function Footer() {
    return (
        <>
            <div className="socials">
                <Link to="https://www.facebook.com/" target="_blank"><div className="fb"><i className="fa-brands fa-facebook-f"></i></div></Link>
                <a href="https://www.instagram.com/" target="_blank"><div className="insta"><i className="fa-brands fa-instagram"></i></div></a>
                <a href="https://twitter.com/?lang=pl" target="_blank"><div className="x"><i className="fa-brands fa-x-twitter"></i></div></a>
            </div>
            <div className="end">
                Wszelkie prawa zastrzeżone &copy; 2023 CarRental
            </div>
        </>
    )
}

export default Footer;