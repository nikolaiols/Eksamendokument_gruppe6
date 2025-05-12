import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function ArtistCard(){

    const [ArtistCard, setArtistCard] = useState([]);
    const { slug } = useParams(); // Får slug fra URL
    let duplikatArtist = []
    const getArtistCard = async () => {
        fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&keyword=${slug}&locale=*&countryCode=NO`) // Henter data fra API-et.
          .then((response) => response.json()) //gjør om til JSON-format
          .then((data) => setArtistCard(data._embedded?.events)) // Setter Artist i state-variabelen
          .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
      };

      useEffect(() => {
        getArtistCard()
        console.log("ArtistCard:", ArtistCard);
      }, []);

    return(
      <section>
      <h3 className="artist">Artister</h3>
      {/*Siden det er flere versjoner av konsertene vil artistene printes ut flere ganger. Dette ble ungått ved å lage en if-test
       som sjekker om id-en til artisten allerede er brukt. etter det printes kortene ut med navn og bilde*/}
      {ArtistCard.map((ev) =>
        ev._embedded?.attractions?.map((artist) => {

          if (duplikatArtist.includes(artist.id)) {
            return null;
          }
          duplikatArtist.push(artist.id);
          return (
            <article key={artist.id}>
              <h3>{artist.name}</h3>
              <img src={artist.images?.[0]?.url} alt={artist.name} />
            </article>
          );
        })
      )}
    </section>
    )
}