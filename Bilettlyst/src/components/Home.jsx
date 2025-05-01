import { useEffect, useState } from "react";
import "../Styles/Home.scss"

export default function Home(){
  // Lager en "state" (en variabel som React husker og kan oppdatere) for events
 const [Findings, setFindings] = useState([]);
 const [Tons, setTons] = useState([]);
 const [Skei, setSkei] = useState([]);
 const [Ne, setNeon] = useState([]);


//findings
 const getFindings = async () => {
   fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=findings&locale=*&size=1&countryCode=NO") // Henter data fra API-et.
     .then((response) => response.json()) //gjør om til JSON-format
     .then((data) => setFindings(data._embedded?.events)) // Setter Findings i state-variabelen
     .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
 };

 //Tons of rock
 const getTons = async () => {
    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=tons%20of%20rock&locale=*&size=1&countryCode=NO")
      .then((response) => response.json()) 
      .then((data) => setTons(data._embedded?.events)) 
      .catch((error) => console.error("Skjedde noe feil ved fetch", error)); 
  };

  //skeikampenfestivalen
 const getSkei = async () => {
    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=skeikampenfestivalen&locale=*&size=1&countryCode=NO")
      .then((response) => response.json()) 
      .then((data) => setSkei(data._embedded?.events)) 
      .catch((error) => console.error("Skjedde noe feil ved fetch", error)); 
  };

  //NEON
  const getNeon = async () => {
    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=neon&locale=*&size=1&countryCode=NO")
      .then((response) => response.json()) 
      .then((data) => setNeon(data._embedded?.events)) 
      .catch((error) => console.error("Skjedde noe feil ved fetch", error)); 
  };
 
  useEffect(() => {
   getFindings()
   getTons()
   getSkei()
   getNeon()
   console.log("Findings:", Findings);
   console.log("Tons of Rock:", Tons); 
   console.log("skeikampenfestivalen:", Skei);
   console.log("NEON:", Ne);
 }, []);

    
    return(
        <>
        <h1>Sommerens festivaler!</h1>
        
        {Findings.map((fin) => (
          <article key={fin.id}>
            <img src={fin.images?.[0]?.url} alt={fin.name} />
           <h3>{fin.name}</h3>
           <button>Les mer om {fin.name}</button>
           </article>
        ))}
        

        {Tons.map((ton) => (
          <article key={ton.id}>
            <img src={ton.images?.[0]?.url} alt={ton.name} />
            <h3>{ton.name}</h3>
            <button>Les mer om {ton.name}</button>
            </article>
        ))}

        {Skei.map((skei) => (
          <article key={skei.id}>
            <img src={skei.images?.[0]?.url} alt={skei.name} />
            <h3>{skei.name}</h3>
            <button>Les mer om {skei.name}</button>
          </article>
        ))}

        {Ne.map((ne) => (
          <article key={ne.id}>
            <img src={ne.images?.[0]?.url} alt={ne.name} />
            <h3>{ne.name}</h3>
            <button>Les mer om {ne.name}</button>
          </article>
        ))}
        </>
    )

}