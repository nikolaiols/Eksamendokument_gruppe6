import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function (){
    const [Eventcard, setEventcard] = useState([]);
    const { slug } = useParams(); // Får slug fra URL

    const getEventcard = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=${slug}&locale=*&countryCode=NO`) // Henter data fra API-et.
          .then((response) => response.json()) //gjør om til JSON-format
          .then((data) => setEventcard(data._embedded?.events)) // Setter Findings i state-variabelen
          .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
      };

      useEffect(() => {
        getEventcard()
        console.log("eventcard:", Eventcard);
      }, []);

    return(
      <>
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
      
      <section>
      {/*denne skal endres.*/}
      {Eventcard.map((ev) => (
        <article key={ev.id}>
          <h3>{ev._embedded?.attractions?.[1]?.name}</h3>
          {<img src={ev._embedded.attractions[1].images[1].url} alt="f" />}
         </article>
      ))}
      </section>
      </>

      //artister som er på festivalen bare bilde og navn
    )
}