import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EventPage(){
    
    //lager en slug, men siden NEON kortet skriver ut neon-festival istedenfor neon blir det feil i keyword. derfor gjør vi om neon-festival til neon før den sendes som slug.
    const CreateSlug = (name) => {
        if (name.toLowerCase().includes("neon")) return "neon";
        return name.toLowerCase().replace(/\s+/g, "-");
    };
    
    const [Festival, setFestival] = useState([]);

    const getFestival = async () => {
        fetch("https://app.ticketmaster.com/discovery/v2/attractions?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&id=K8vZ917_YJf,%20K8vZ917oWOV,%20K8vZ917K7fV,%20K8vZ917bJC7&locale=*") // Henter data fra API-et.
        .then((response) => response.json()) //gjør om til JSON-format
        .then((data) => setFestival(data._embedded?.attractions || [])) // Setter Festival i state-variabelen
        .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
    };

    useEffect(() => {
        getFestival()
        //getCity()
        console.log("Festival:", Festival);
    }, []);
    
    
    return(
        <section>
        {Festival.map((fe) => {
          {/*mapper ut en slug for hver av festivalene*/}
          CreateSlug
          return (
            <article key={fe.id}>
              <img src={fe.images?.[0]?.url} alt={fe.name} />
              <h3>{fe.name}</h3>
              <Link to={`/event/:${CreateSlug(fe.name)}`}>Les mer om {fe.name}</Link>
            </article>
          );
        })}
        </section>
    )
}