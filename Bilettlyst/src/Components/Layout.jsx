import { Link } from "react-router-dom";



export default function Layout({children}){
    return(
        <>       
        <header>
           <h1>LOGO</h1>
           <nav>
               <ul>
                   <li><button><Link to="/">Hjem</Link></button></li> {/*denne og de tre under må kanskje flyttes ut av header, finner ut når vi får demo */}
                   <li><button><Link to="/event/:id">EventPage</Link></button></li>
                   <li><button><Link to="/category/:slug">CategoryPage</Link></button></li>
                   <li><button><Link to="/dashboard">Dashboard</Link></button></li>
                   <li><button><Link to="/category/:slug">Musikk</Link></button></li> {/*karakter E: menypunktene: musikk, sport og teater som fører brukeren til CategoryPage */}
                   <li><button><Link to="/category/:slug">Sport</Link></button></li>
                   <li><button><Link to="/category/:slug">Teater</Link></button></li>
                   <li><button><Link to="/dashboard">Logg inn</Link></button></li> {/*karakter E: logg inn som fører brukeren til Dashboard. */}
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