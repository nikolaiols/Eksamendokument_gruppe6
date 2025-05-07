import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/CategoryPage.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

// Hoved komponentet for kategori siden
export default function CategoryPage() {
//Henter ut sluggen "musikk", "sport" og "teater" fra URL-en
  const { slug } = useParams();

  // Oppretter states for arrangementer, attraksjoner og spillesteder
  const [events, setEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [venues, setVenues] = useState([]);

  // Oppretter en state for "favoritter", hvor vi lagrer objekter med både id og type
  const [favorites, setFavorites] = useState([]);

  // Henter ut API-nøkkel fra Ticketmaster
  const API_KEY = "XiNPWWR7685AFoobg27DG2naIh92yDVH";

  // Finner ut hvilke segmentID som skal brukes basert på sluggen i URL-en
  const segmentMap = {
    musikk: "KZFzniwnSyZfZ7v7nJ",
    sport: "KZFzniwnSyZfZ7v7nE",
    teater: "KZFzniwnSyZfZ7v7na",
  };

  // Henter ut segmentID
  const segmentId = segmentMap[slug];
  console.log("Tilknyttet segmentId:", segmentId);

  // useEffect kjører når komponenten lastes, og når sluggen endrer seg
  useEffect(() => {
    if (!segmentId) return;

    // Henter arrangementer
    fetch(`https://app.ticketmaster.com/discovery/v2/events?apikey=${API_KEY}&locale=*&size=5&segmentId=${segmentId}`)
      .then(res => res.json())
      .then(data => {
        const eventData = data._embedded?.events || [];
        // setter state med max 5 ulike arrangementer
        setEvents(eventData.slice(0, 5)); 


        // Henter ut unike spillesteder fra eventene
        const venueList = []; // Tom liste for å lagre venue objektene 
        const venueIds = []; // Tom liste for å holde styr på ID'er

        // Går igjennom alle eventene vi har hentet ut 
        eventData.forEach(event => {
          const venue = event._embedded?.venues?.[0]; // Henter første eventet
          // Hvis venue finnes, og og ikke lagt til ID. 
          if (venue && !venueIds.includes(venue.id)) {
            venueList.push(venue); // Legger til venue i listen
            venueIds.push(venue.id); // Registrerer ID-en 
          }
        });
         // setter state med max 5 ulike spillesteder
        setVenues(venueList.slice(0, 5)); 
      });

    // Henter attraksjoner
    fetch(`https://app.ticketmaster.com/discovery/v2/attractions?apikey=${API_KEY}&locale=*&size=5&segmentId=${segmentId}`)
      .then(res => res.json())
      .then(data => {
        const attractionData = data._embedded?.attractions || [];
        // setter state med max 5 ulike attraksjoner
        setAttractions(attractionData.slice(0, 5)); 
      });

  }, [slug]);

  // Funksjon for å legge til eller fjerne fra favoritter,vi lagrer både ID og type
  // Den tar imot to parametere: id (unik identifikator) og type (event, venue, attraction)
  const toggleFavorite = (id, type) => {
    setFavorites((prev) => {
  // Skjekker om elementet allerede finnes i favoritt-listen, basert på både ID og type
      const isAlreadyFavorited = prev.some(fav => fav.id === id && fav.type === type);

      if (!isAlreadyFavorited) {
        //Hvis elementet ikke er i favorittlisten, legg det til
        console.log("Denne er nå favoritt:", id, "type:", type);
        return [...prev, { id, type }];
      } else {
        //Hvis elementet er i favorittlisten, fjern det fra listen
        console.log("Denne er ikke lenger favoritt:", id, "type:", type);
        return prev.filter(fav => !(fav.id === id && fav.type === type));
      }
    });
  };

  // Funksjon som returnerer true hvis en spesifikk ID og type er i favorittlisten
  const isFavorite = (id, type) => // Tar imot både id og type for å kunne skille mellom attraksjoner, events og venues
    favorites.some(fav => fav.id === id && fav.type === type);

  return (
    <>
      {/* Seksjon for attraksjoner */}
      <section className="Attraksjoner">
        <h2>Attraksjoner</h2>
        {attractions.map(attr => (
          <article key={attr.id}>
            <img src={attr.images?.[0]?.url} alt={attr.name}/>
            <h3>{attr.name}</h3>
            {/* Knapp som sjekker og endrer favorittstatus */}
            <button className="heart-button" onClick={() => toggleFavorite(attr.id, "attraction")}>
              <FontAwesomeIcon icon={isFavorite(attr.id, "attraction") ? solidHeart : regularHeart} />
            </button>
          </article>
        ))}
      </section>

      {/* Seksjon for arrangementer */}
      <section className="Arrangementer">
        <h2>Arrangementer</h2>
        {events.map((event) => (
          <article key={event.id}>
            <img src={event.images?.[0]?.url} alt={event.name} />
            <h3>{event.name}</h3>
            <p>{event.dates?.start?.localDate}</p>
            <p>{event.dates?.start?.localTime}</p>
            <p>{event._embedded?.venues?.[0]?.city?.name}</p>
            <p>{event._embedded?.venues?.[0]?.country?.name}</p>
            <p>{event._embedded?.venues?.[0]?.name}</p>
            {/* Knapp som sjekker og endrer favorittstatus */}
            <button className="heart-button" onClick={() => toggleFavorite(event.id, "event")}>
              <FontAwesomeIcon icon={isFavorite(event.id, "event") ? solidHeart : regularHeart} />
            </button>
          </article>
        ))}
      </section>

      {/* Seksjon for spillesteder */}
      <section className="Spillesteder">
        <h2>Spillesteder</h2>
        {venues.map(venue => (
          <article key={venue.id}>
            <h3>{venue.name}</h3>
            <p>{venue.city?.name}, {venue.country?.name}</p>
            {venue.images?.[0]?.url && (
              <img src={venue.images?.[0]?.url} alt={venue.name} />
            )}
            {/* Knapp som sjekker og endrer favorittstatus */}
            <button className="heart-button" onClick={() => toggleFavorite(venue.id, "venue")}>
              <FontAwesomeIcon icon={isFavorite(venue.id, "venue") ? solidHeart : regularHeart} /> {/* Knapp som sjekker og endrer favorittstatus */}
            </button>
          </article>
        ))}
      </section>
    </>
  );
}