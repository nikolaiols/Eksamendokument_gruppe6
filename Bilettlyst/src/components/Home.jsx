import { useEffect, useState } from "react";
import "../Styles/Home.scss"
import { data, Link } from "react-router-dom";
export default function Home(){
  //en funksjon som gjør det mulig å ta imot en tekslig verdi fra knappene og gjør den om til små bokstaver: (dette gjorde vi sammen på skolen, noen problemer med github så ble på min(Nikolai) sin pc)
  const handleClick = (e) => {
    const text = e.target.innerText.toLowerCase();
    console.log(text)
    getCity(text);
  };

  //lager en slug, men siden NEON kortet skriver ut neon-festival istedenfor neon blir det feil i keyword. derfor gjør vi om neon-festival til neon før den sendes som slug.
  const CreateSlug = (name) => {
    if (name.toLowerCase().includes("neon")) return "neon";
    return name.toLowerCase().replace(/\s+/g, "-");
  };
  
  // Lager en "state" (en variabel som React husker og kan oppdatere) for events
 const [Festival, setFestival] = useState([]);
 const [City, setCity] = useState([]);


//findings
 const getFestival = async () => {
   fetch("https://app.ticketmaster.com/discovery/v2/attractions?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&id=K8vZ917_YJf,%20K8vZ917oWOV,%20K8vZ917K7fV,%20K8vZ917bJC7&locale=*") // Henter data fra API-et.
     .then((response) => response.json()) //gjør om til JSON-format
     .then((data) => setFestival(data._embedded?.attractions || [])) // Setter Findings i state-variabelen
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
        {Festival.map((fe) => {
          {/*mapper ut en slug for hver av festivalene*/}
          CreateSlug
          return (
            <article key={fe.id}>
              <img src={fe.images?.[0]?.url} alt={fe.name} />
              <h3>{fe.name}</h3>
              <Link to={`/event/:${CreateSlug(fe.name)}`}>Les mer om {fe.name}</Link>
            </article>
          );
        })}
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