import {useState } from "react";
import "../Styles/Home.scss"
import EventPage from "./EventCard";
export default function Home(){
  //en funksjon som gjør det mulig å ta imot en tekslig verdi fra knappene og gjør den om til små bokstaver: (dette gjorde vi sammen på skolen, noen problemer med github så ble på min(Nikolai) sin pc)
  const handleClick = (e) => {
    const text = e.target.innerText.toLowerCase();
    console.log(text)
    getCity(text);
  };

  
  // Lager en "state" (en variabel som React husker og kan oppdatere) for events
 const [City, setCity] = useState([]);



    //city
    const getCity = async (text) => {
      fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&locale=*&size=10&city=${text}`)
        .then((response) => response.json()) 
        .then((data) => setCity(data._embedded?.events)) 
        .catch((error) => console.error("Skjedde noe feil ved fetch", error)); 
    };



    return(
        <>
        {/**fjern */}
        <h1>Sommerens festivaler!</h1>
        <EventPage/>
        {/*her er det lagd knapper som sender inn den tekstlige verdien fra knappen og sender denne inn i url slik at man får riktig arrangementer basert på by */}
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
            <p>{city.dates?.start?.localDate}</p> 
            <p>{city.dates?.start?.localTime}</p> 
            <p>{city._embedded?.venues?.[0]?.country?.name}</p>
            <p>{city._embedded?.venues?.[0]?.city?.name}</p> 
            <p>{city._embedded?.venues?.[0]?.name}</p> 
          </article>
        ))}

        </section>
        </>
    )

}