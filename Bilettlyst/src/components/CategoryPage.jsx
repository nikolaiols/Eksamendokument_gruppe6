import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Hoved komponentet for kategori siden
export default function CategoryPage() {
    //Henter ut sluggen "musikk", "sport" og "teater" fra URL-en
  const { slug } = useParams(); 
  //oppretter states for arrengementer
  const [events, setEvents] = useState([]);
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

// Funksjon som henter de arrengementene fra ticketmaster API
  const getEvents = async () => {
    console.log("Starter API-kall...");

    fetch(
        // Henter ut informasjonen vi trenger, ${API_KEY} peker på API-nøkkelen vår, ${segmentId} basert på "musikk" eller annet.
      `https://app.ticketmaster.com/discovery/v2/events?apikey=${API_KEY}&locale=*&size=5&countryCode=US&segmentId=${segmentId}`
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const events = data._embedded?.events || []; // Hetnter ut eventene
        setEvents(events); // Lagres i state
      })
      .catch((error) => {
        console.error("Feil ved henting av arrangementer:", error);
      });
  };
  // useEffect kjører ved lasting av komponent
  useEffect(() => {
    if (segmentId) {
      console.log("Kjører useEffect for segment:", segmentId);
      getEvents(); // Start API-kall
    } else {
      console.warn("Ingen gyldig segmentId for slug:", slug);
    }
  }, [slug]); // Kjør på nytt hvis "slug" endres.

  return ( // Skriver ut innhold på nettsiden. å returnere JSX som viser innhold.
    <>
    <section><h2>Attraksjoner</h2></section>
  

    <section>
      <h2>{slug.toLowerCase()} – Arrangementer</h2>
        {events.map((event) => {
          return (
            <article key={event.id}>
              <img src={event.images?.[0]?.url} alt={event.name}/>
              <h3>{event.name}</h3>
              <p>
                {event.dates?.start?.localDate}{" "}
                {event.dates?.start?.localTime}
              </p>
              <p>
                {event._embedded?.venues?.[0]?.city?.name},{" "}
                {event._embedded?.venues?.[0]?.country?.name}
              </p>
              <p>{event._embedded?.venues?.[0]?.name}</p>
            </article>
          );
        })}
      </section>
      <section><h2>Spillesteder</h2></section>
    </>
  );
}