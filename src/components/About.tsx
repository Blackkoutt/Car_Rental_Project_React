import '../css/About.css';
import logo from '../assets/logo.png';
import { useEffect } from 'react';

// Komponent renderujący Footer
function About() {
    useEffect(() => {
        document.title = "O nas - CarRental";
      });
    return (
        <article id="about">
            <div className="about_info_div">
                <h2>O nas</h2>
                <img title="Logo CarRental" src={logo} alt="Logo CarRental" />
                <p>
                    Witamy w CarRental - miejscu, gdzie podróżowanie staje się dużo prostsze.
                    Nasza strona to nie tylko miejsce, gdzie pożyczasz pojazd.
                    To miejsce, gdzie zaczynają się przygody. Staramy się aby każda trasa stała się wyjątkowym
                    doświadczeniem. Cenimy sobie komfort i wygodę. Nasza flota samochodów składa się wyłącznie z 
                    sprawnych i nowych aut. Chcemy zapewnić klientom jak najlepszą jakość i dostosować się do ich wymagań.
                    Liczne opinie klientów pomagają nam w dostosowaniu naszych usług. 
                </p>
                <p>
                    W CarRental wiemy, że każdy klient ma unikalne potrzeby, dlatego nasza flota
                    samochodów obejmuje szeroki wybór modeli, dostosowanych do różnych celów podróży.
                    Niezależnie od tego, czy planujesz rodzinny wypad, czy służbową podróż znajdziesz u nas idealny pojazd.
                    Dbamy o to, aby nasze samochody były
                    nie tylko nowoczesne, ale także utrzymane w doskonałym stanie technicznym. Sprawia to, że 
                    możesz czuć się bezpiecznie i podróżować wygodnie.
                </p>
                <p>
                    Nasza misja to nie tylko dostarczanie samochodów, ale także tworzenie wspomnień.
                    Z nami podróż staje się przyjemnością. Każdy moment za kierownicą to okazja
                    do odkrycia nowych miejsc i doświadczenia nowych wrażeń. Nasz zespół
                    z pasją do podróży jest gotów służyć Ci pomocą,
                    doradztwem i elastycznym podejściem do Twoich potrzeb.
                </p>
                <p>
                    CarRental to nie tylko firma, to społeczność podróżników, którzy dzielą wspólną
                    pasję do odkrywania świata. Jesteśmy tu, aby sprawić, że Twoja podróż stanie się
                    wyjątkowym przeżyciem. Dołącz do nas i zobacz, dlaczego CarRental to nie tylko
                    miejsce pożyczania samochodów, to styl życia, to sposób na życie pełen przygód i
                    nowych możliwości podróży.
                </p>
            </div>
        </article>
    )
}

export default About;