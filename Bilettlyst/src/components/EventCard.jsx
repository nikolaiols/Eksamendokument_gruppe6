import { useEffect, useState } from "react";

export default function (){
    const [Eventcard, setEventcard] = useState([]);

    const getEventcard = async () => {
        fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=findings&locale=*&countryCode=NO") // Henter data fra API-et.
          .then((response) => response.json()) //gjør om til JSON-format
          .then((data) => setEventcard(data._embedded?.events)) // Setter Findings i state-variabelen
          .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
      };

      useEffect(() => {
        getEventcard()
        console.log("eventcard:", Eventcard);
      }, []);

    return(
      <section>
     {Eventcard.map((ev) => (
        <article key={ev.id}>
          {<img src={ev.images?.[0]?.url} alt={ev.name} />}
         <h3>{ev.name}</h3>
          <p>{ev._embedded?.venues?.[0]?.name}</p>
          {<p>{ev.dates?.start.localDate}</p>}
          <button>Kjøp</button>
          <button>legg til i ønskeliste</button> {/*denne må funke*/}
         </article>
      ))}
      </section>

      //artister som er på festivalen bare bilde og navn
    )
}