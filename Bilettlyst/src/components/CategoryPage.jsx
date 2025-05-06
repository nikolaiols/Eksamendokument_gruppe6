import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../Styles/CategoryPage.scss";

// Hoved komponentet for kategori siden
export default function CategoryPage() {
  //Henter ut sluggen "musikk", "sport" og "teater" fra URL-en
  const { slug } = useParams(); 
  //oppretter states for arrengementer
  const [events, setEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [venues, setVenues] = useState([]);
  
  // Henter ut API-nøkkel fra ticketmaster
  const API_KEY = "XiNPWWR7685AFoobg27DG2naIh92yDVH";

  // Finner ut hvilke "segmentID" som skal vrues basert på sluggs
  const segmentMap = {
    musikk: "KZFzniwnSyZfZ7v7nJ",
    sport: "KZFzniwnSyZfZ7v7nE",
    teater: "KZFzniwnSyZfZ7v7na",
  };

  // Henter ut "segmentID" basert på URL-slug
  const segmentId = segmentMap[slug];
  console.log("URL slug:", slug);
  console.log("Tilknyttet segmentId:", segmentId);

  // useEffect kjører ved lasting av komponent
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

  return ( // Skriver ut innhold på nettsiden. å returnere JSX som viser innhold.
    <>
      <section className="Attraksjoner">
        <h2>Attraksjoner</h2>
        {attractions.map(attr => (
          <article key={attr.id}>
            <img src={attr.images?.[0]?.url} alt={attr.name}/>
            <h3>{attr.name}</h3>
          </article>
        ))}
      </section>

      <section className="Arrangementer">
        <h2>Arrangementer</h2>
        {events.map((event) => {
          return (
            <article key={event.id}>
              <img src={event.images?.[0]?.url} alt={event.name}/>
              <h3>{event.name}</h3>
              <p>{event.dates?.start?.localDate}</p>
              <p>{event.dates?.start?.localTime}</p>
              <p>{event._embedded?.venues?.[0]?.city?.name} </p>
              <p>{event._embedded?.venues?.[0]?.country?.name}</p>
              <p>{event._embedded?.venues?.[0]?.name}</p>
            </article>
          );
        })}
      </section>

      <section className="Spillesteder">
        <h2>Spillesteder</h2>
        {venues.map(venue => (
          <article key={venue.id}>
            <h3>{venue.name}</h3>
            <p>{venue.city?.name}, {venue.country?.name}</p>
            {venue.images?.[0]?.url && (
              <img src={venue.images?.[0]?.url} alt={venue.name}/>
            )}
          </article>
        ))}
      </section>
    </>
  );
}