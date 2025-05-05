import { useEffect, useState } from "react";
import "../Styles/Home.scss"

export default function Home(){
  //en funksjon som gjør det mulig å ta imot en tekslig verdi fra knappene og gjør den om til små bokstaver: (dette gjorde vi sammen på skolen, noen problemer med github så ble på min(Nikolai) sin pc)
  const handleClick = (e) => {
    const text = e.target.innerText.toLowerCase();
    console.log(text)
    getCity(text);
  };
  
  // Lager en "state" (en variabel som React husker og kan oppdatere) for events
 const [Festival, setFestival] = useState([]);
 const [City, setCity] = useState([]);


//findings
 const getFestival = async () => {
   fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&id=Z698xZb_Z16vfkqIjU,%20Z698xZb_Z16v7eGkFy,%20Z698xZb_Z17qfaA,%20Z698xZb_Z17q339&locale=*") // Henter data fra API-et.
     .then((response) => response.json()) //gjør om til JSON-format
     .then((data) => setFestival(data._embedded?.events)) // Setter Findings i state-variabelen
     .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
 };


    //city
    const getCity = async (text) => {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&locale=*&size=10&city=${text}`)
        .then((response) => response.json()) 
        .then((data) => setCity(data._embedded?.events)) 
        .catch((error) => console.error("Skjedde noe feil ved fetch", error)); 
    };

 
  useEffect(() => {
   getFestival()
   //getCity()
   console.log("Festival:", Festival);
   console.log("city:", City);
 }, []);

    
    return(
        <>
        <h1>Sommerens festivaler!</h1>
        <section>
        {Festival.map((fe) => (
          <article key={fe.id}>
            {<img src={fe.images?.[0]?.url} alt={fe.name} />}
           <h3>{fe.name}</h3>
           <button>Les mer om {fe.name}</button>
           </article>
        ))} 
        </section>

        <section className="Byer">
         <nav>
          <button onClick={handleClick}>Oslo</button>
          <button onClick={handleClick}>Stockholm</button>
          <button onClick={handleClick}>Berlin</button>
          <button onClick={handleClick}>London</button>
          <button onClick={handleClick}>Paris</button>
         </nav>
          
         {City.map((city) => (
          <article key={city.id}>
            <img src={city.images?.[0]?.url} alt={city.name} />
            <h3>{city.name}</h3>
            <button>Les mer om {city.name}</button>
          </article>
        ))}

        </section>
        </>
    )

}