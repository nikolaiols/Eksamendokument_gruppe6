import { Link } from "react-router-dom";
import "../Styles/Home.scss"
import "../Styles/Layout.scss"
export default function Layout({children}){
    return(
        <>       
        <header>
           <nav>
               <ul>
                   <li className="Logo"><button><Link to="/">BilettLyst</Link></button></li> {/*denne og de tre under må kanskje flyttes ut av header, finner ut når vi får demo */}
                  {/* <li><button><Link to="/event/:id">EventPage</Link></button></li>*/}
                   {/*<li><button><Link to="/category/:slug">CategoryPage</Link></button></li>*/}
                   <li><button><Link to="/category/musikk">Musikk</Link></button></li> {/*karakter E: menypunktene: musikk, sport og teater som fører brukeren til CategoryPage */}
                   <li><button><Link to="/category/sport">Sport</Link></button></li>
                   <li><button><Link to="/category/teater">Teater/Show</Link></button></li>
                   <li className="Login"><button><Link to="/dashboard">Logg inn</Link></button></li> {/*karakter E: logg inn som fører brukeren til Dashboard. */}
               </ul>
           </nav>
       </header>
       <main>
       {children}
       </main>
       <footer>
        Footer!
       </footer>
       </>
    )
}

