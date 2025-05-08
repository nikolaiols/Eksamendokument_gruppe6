import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ArtistCard from "./ArtistCard";

export default function EventCard(){
    const [Eventcard, setEventcard] = useState([]);
    const { slug } = useParams(); // Får slug fra URL

    const getEventcard = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=${slug}&locale=*&countryCode=NO`) // Henter data fra API-et.
          .then((response) => response.json()) //gjør om til JSON-format
          .then((data) => setEventcard(data._embedded?.events)) // Setter eventcard i state-variabelen
          .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
      };

      useEffect(() => {
        getEventcard()
        console.log("eventcard:", Eventcard);
      }, []);

    return(
      <>
      <section>
      <h3>sjanger:</h3>
      <ul>
        {Eventcard.map((ev, index) => (
          <li key={index}>{ev.classifications?.[0]?.subGenre?.name}</li>
        ))}
      </ul>
  
      <h2>Festivalpass {slug}</h2>
      
     {Eventcard.map((ev) => (
        <article key={ev.id}>
          {<img src={ev.images?.[0]?.url} alt={ev.name} />}
         <h3>{ev.name}</h3>
          <p>{ev._embedded?.venues?.[0]?.name}</p>
          {<p>{ev.dates?.start.localDate}</p>}
          <button>Kjøp</button>
          <button>legg til i ønskeliste</button>
         </article>
      ))}
      </section>

      <ArtistCard/>
      </>
    )
}