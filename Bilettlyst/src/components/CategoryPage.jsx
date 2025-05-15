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

  // tar imot input fra søk
  const [Search, setSearch] = useState("");       
  const [filteredTerm, setFilteredTerm] = useState(""); 

  // Oppretter states for arrangementer, attraksjoner og spillesteder
  const [events, setEvents] = useState([]);
  const [attractions, setAttractions] = useState([]);
  const [venues, setVenues] = useState([]);

  // Oppretter states for filtrering
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  //tar imot tekstlig verdi
  const handleSearchInput = (e) => {
    setSearch(e.target.value.toLowerCase());
  };
  //starter search
  const startSearch = () => {
    setFilteredTerm(Search);
  };
  

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

    const eventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&locale=*&size=100&segmentId=${segmentId}`;

    // Henter alle events for valgt segment ID
    fetch(eventUrl)
      .then(res => res.json())
      .then(data => {
        const eventSave = data._embedded?.events || [];
        // setter state med max 5 ulike arrangementer
        setEvents(eventSave.slice(0, 5)); 


        // Henter ut unike spillesteder fra eventene
        const venueList = []; // Tom liste for å lagre venue objektene 
        const venueIds = []; // Tom liste for å holde styr på ID'er

        // Går igjennom alle eventene vi har hentet ut 
        eventSave.forEach(event => {
          const venue = event._embedded?.venues?.[0]; // Henter første eventet
          // Hvis venue finnes, og og ikke lagt til ID. 
          if (venue && !venueIds.includes(venue.id)) {
            venueList.push(venue); // Legger til venue i listen
            venueIds.push(venue.id); // Registrerer ID-en 
          }
        });
         // setter state med max 5 ulike spillesteder
        setVenues(venueList.slice(0, 5));

        // Henter ut attraksjoner direkte fra eventene (Ettersom attractions ikke har steds informasjon)
        const attractionMap = {};
        eventSave.forEach(event => {
          const attr = event._embedded?.attractions?.[0];
          if (attr && !attractionMap[attr.id]) {
            attractionMap[attr.id] = attr;
          }
        });

        // SetAttractions oppdaterer komponentenes state 'Attractions', som en array av attraksjonsobjekter

        // Object.values(attractionMap) henter ut "Alle verdiene" fra objektet attractionMap, Object.value returenerer dermed en array med attraksjonsobjekter
        setAttractions(Object.values(attractionMap).slice(0, 5)); //.slice(0,5) Viser de første attraksjonene 5 i arrayen
      });
  }, [slug]);

  // Håndterer filtrering av data når man trykker på knapp
  const handleFilter = () => {
    if (!segmentId) return;

    // Bygger URL basert på brukervalg
    const eventUrl = `https://app.ticketmaster.com/discovery/v2/events.json?apikey=${API_KEY}&locale=*&size=100&segmentId=${segmentId}` + //Basis URL for å hente events fra Ticketmaster APIet, med våresd APIKEY og valgt segmentID (Kategori)
      (selectedCountry ? `&countryCode=${selectedCountry}` : "") + // Hvis bruker velger land, legger man til URL som countryCode (CountryCode=NO)
      (selectedCity ? `&city=${selectedCity}` : "") + //Bruker velger en by legg til i ciry-filter i URL, (City= Oslo)
      (selectedDate ? `&startDateTime=${selectedDate}T00:00:00Z` : ""); // Hvis det er valgt dato, legg til i startDateTime for å finne riktig arrangemeter til riktig tid

    // Henter events som matcher valgt land, by og dato
    fetch(eventUrl)
      .then(res => res.json())
      .then(data => {
        const filteredEvents = data._embedded?.events || [];
        setEvents(filteredEvents.slice(0, 5));

        const venueList = [];
        const venueIds = [];

        filteredEvents.forEach(event => {
          const venue = event._embedded?.venues?.[0];
          if (venue && !venueIds.includes(venue.id)) {
            venueList.push(venue);
            venueIds.push(venue.id);
          }
        });
        setVenues(venueList.slice(0, 5));
        
        // Henter attraksjoner som er knyttet til de filtrerte arrangementene 
        // Vi kan ikke filtrere firekte på attraksjoner, så vi henter de via arrangementene 
        const attractionMap = {};
        filteredEvents.forEach(event => {
          const attr = event._embedded?.attractions?.[0];
          if (
            attr &&
            attr.name?.toLowerCase().includes(Search) &&
            !attractionMap[attr.id]
          ) {
            attractionMap[attr.id] = attr;
          }
        });
        // SetAttractions oppdaterer komponentenes state 'Attractions', som en array av attraksjonsobjekter
        // Object.values(attractionMap) henter ut "Alle verdiene" fra objektet attractionMap, Object.value returenerer dermed en array med attraksjonsobjekter
        setAttractions(Object.values(attractionMap).slice(0, 5)); // .slice(0,5) Viser de første attraksjonene 5 i arrayen
      });
  };

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
      <label className="Sokefelt"> Søk etter arrangement  
        <input
          type="text"
          placeholder="Søk etter arrangement..."
          onChange={handleSearchInput}
          value={Search}
        />
        <button onClick={startSearch}>Søk</button>
      </label> 
      <section className="Filtrering">
      <label>Velg land:
        <select onChange={(e) => setSelectedCountry(e.target.value)} value={selectedCountry}>
          <option value="">Alle</option>
          <option value="NO">Norge</option>
          <option value="SE">Sverige</option>
          <option value="GB">UK</option>
        </select>
      </label>

      <label>Velg by:
        <select onChange={(e) => setSelectedCity(e.target.value)} value={selectedCity}>
          <option value="">Alle</option>
          <option value="Oslo">Oslo</option>
          <option value="Stockholm">Stockholm</option>
          <option value="London">London</option>
        </select>
      </label>

      <label>Velg dato:
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      <button onClick={handleFilter}>Filtrer</button>
      </section>

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
        {events.filter(event => event.name.toLowerCase().includes(filteredTerm)).map((event) => (
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
              <FontAwesomeIcon icon={isFavorite(venue.id, "venue") ? solidHeart : regularHeart} /> 
            </button>
          </article>
        ))}
      </section>
    </>
  );
}