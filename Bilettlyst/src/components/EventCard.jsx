export default function (){
    const [Eventcard, setEventcard] = useState([]);

    const getEventcard = async () => {
        fetch("") // Henter data fra API-et.
          .then((response) => response.json()) //gjør om til JSON-format
          .then((data) => setEventcard(data._embedded?.events)) // Setter Findings i state-variabelen
          .catch((error) => console.error("Skjedde noe feil ved fetch", error)); //feilmeldinger
      };

      useEffect(() => {
        getEventcard()
        console.log("eventcard:", Eventcard);
      }, []);

    return(
        <h1>EventCard</h1> /*(fra karakter D) En komponent som presenterer et enkelt arrangement i kortformat.
         Denne skal brukes der arrangementer listes opp, f.eks. i: */
    )
}