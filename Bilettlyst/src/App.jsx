import { useEffect, useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import Home from './components/Home'
import EventPage from './components/EventPage'
import CategoryPage from './components/CategoryPage'
import Dashboard from './components/Dashboard'

function App() {
  
  // dette er ikke ferdig produkt men ment for å teste å hente ut info, denne henter ut all info uten noen filtrering.
 // Lager en "state" (en variabel som React husker og kan oppdatere) for spillene
 const [Events, setEvent] = useState();

 // En funksjon som henter data fra en API
 const getEvent = async () => {
   fetch("https://app.ticketmaster.com/discovery/v2/events?apikey=XiNPWWR7685AFoobg27DG2naIh92yDVH&locale=*") /* Henter data fra API-et.
    bytt ut siste parameterene etter "&"-tegnet for å filtrere (denne gjøres dynamisk når vi skal filtrere på category osv...)*/
     .then((response) => response.json()) // Konverterer svaret til JSON-format
     .then((data) => setEvent(data._embedded?.events)) // Setter spillene i state-variabelen
     .catch((error) => console.error("Skjedde noe feil ved fetch", error)); // Hvis noe går galt, vis en feilmelding
 };

 // useEffect kjører en gang når komponenten lastes inn
  useEffect(() => {
   getEvent(); // Kaller på getEvent-funksjonen for å hente spillene
   console.log("Min state", Events); // Skriver ut spillene i konsollen
 }, []); // Tom array [] betyr at dette bare skjer én gang når appen starter

  return (
    <>
    <Layout>
    <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/event/:id" element={<EventPage />}></Route>
        <Route path= "/category/:slug" element={<CategoryPage />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
    </Layout>
    </>
  )
}

export default App
