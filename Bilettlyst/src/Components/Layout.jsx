import { Link } from "react-router-dom";
import "../Styles/Home.scss"
import "../Styles/Layout.scss"
export default function Layout({children}){
    return(
        <>       
        <header>
           <nav>
               <ul>
                   <li className="Logo"><button><Link to="/">BilettLyst</Link></button></li>
                   <li><button><Link to="/category/musikk">Musikk</Link></button></li>
                   <li><button><Link to="/category/sport">Sport</Link></button></li>
                   <li><button><Link to="/category/teater">Teater/Show</Link></button></li>
                   <li className="Login"><button><Link to="/dashboard">Logg inn</Link></button></li>
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

