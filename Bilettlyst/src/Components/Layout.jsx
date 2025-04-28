import { Link } from "react-router-dom";



export default function Layout({children}){
    return(
        <>       
        <header>
           <h1>LOGO</h1>
           <nav>
               <ul>
                   <li><button><Link to="/">knapp1</Link></button></li>
                   <li><button><Link to="/2">knapp2</Link></button></li>
                   <li><button><Link to="/3">knapp3</Link></button></li>
                   <li><button><Link to="/4">knapp4</Link></button></li>
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