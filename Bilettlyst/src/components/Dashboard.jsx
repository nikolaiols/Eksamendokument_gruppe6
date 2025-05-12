import React, { useState } from 'react';

// Definerer Dashboard komponentet
export default function Dashboard(){
    // Oppretter en state-variabel, for å skjekke om brukeren er logget inn
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    // Oppretter en state-variabel, for å lagre brukernavnet
    const [username, setUsername] = useState('');
    // Funksjon som håndterer innsending av loggin-skjema

  const handleLogin = (e) => {
    e.preventDefault(); // Forhindrer at skjemaet prøver å sende
    setIsLoggedIn(true); // Setter brukeren til, innlogget

  };

    return(
        <section>
      {!isLoggedIn ? (
        <>
          <h2>Logg inn</h2>
          <form onSubmit={handleLogin}>
            <label>
              Navn:
              <input
                type="text"
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </label>
            <button type="submit">Logg inn</button>
          </form>
        </>

        // Når brukeren logger inn, viser dette innholdet
      ) : (
        <>
          <h2>Min side</h2>
          <p>Velkommen, {username}!</p>
        </>
      )}
    </section>
    )
}