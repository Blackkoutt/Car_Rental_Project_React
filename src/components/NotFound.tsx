import '../css/NotFound.css';

// Komponent renderujący widok błedu 404
function NotFound() {
    return (
        <article id="not_found">
            <div className="error-404">
                <div className="error-big">
                    404
                </div>
                <p>Przepraszamy, taka strona nie istnieje...</p>
            </div>
        </article>    
    )
}

export default NotFound;