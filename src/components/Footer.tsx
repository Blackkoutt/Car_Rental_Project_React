import { Link } from 'react-router-dom';
import '../css/Footer.css';

// Komponent renderujący Footer
function Footer() {
    return (
        <div>
            <div className="socials">
                <Link className="social_link social_fb" to="https://www.facebook.com/" title="Przekierowanie do naszego facebooka" target="_blank"><div className="fb"><i className="fa-brands fa-facebook-f"></i></div></Link>
                <Link className="social_link social_insta" to="https://www.instagram.com/"  title="Przekierowanie do naszego instagrama" target="_blank"><div className="insta"><i className="fa-brands fa-instagram"></i></div></Link>
                <Link className="social_link social_x" to="https://twitter.com/?lang=pl" title="Przekierowanie do naszego X" target="_blank"><div className="x"><i className="fa-brands fa-x-twitter"></i></div></Link>
            </div>
            <div className="end">
                Wszelkie prawa zastrzeżone &copy; 2023 CarRental I l d b rn m
            </div>
        </div>
    )
}

export default Footer;