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
    fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=NEON&locale=*&size=1&countryCode=NO")
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
        {Findings.map((fin) => (
          <article>
           <h3>{fin.name}</h3>
           </article>
        ))}
        

        {Tons.map((ton) => (
          <article>
            <h3>{ton.name}</h3>
            </article>
        ))}

        {Skei.map((skei) => (
          <article>
            <h3>{skei.name}</h3>
          </article>
        ))}

        {Ne.map((ne) => (
          <article>
            <h3>{ne.name}</h3>
          </article>
        ))}
        </>
    )

}