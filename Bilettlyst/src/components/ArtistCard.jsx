import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function ArtistCard(){

    const [ArtistCard, setArtistCard] = useState([]);
    const { slug } = useParams(); // Får slug fra URL

    const getArtistCard = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=${slug}&locale=*&countryCode=NO`) // Henter data fra API-et.
          .then((response) => response.json()) //gjør om til JSON-format
          .then((data) => setArtistCard(data._embedded?.events)) // Setter Findings i state-variabelen
          .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
      };

      useEffect(() => {
        getArtistCard()
        console.log("ArtistCard:", ArtistCard);
      }, []);

    return(
    
         <section>
         <h3>Artister</h3>
         {ArtistCard.map((ev) => (
           ev._embedded?.attractions?.map((artist) => (
             <article key={artist.id}>
               <h3>{artist.name}</h3>
               <img src={artist.images?.[0]?.url} alt={artist.name} />
             </article>
             
           ))
         ))}
       </section>
    )
}