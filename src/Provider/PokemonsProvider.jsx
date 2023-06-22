import { useState, useEffect } from "react";
import { PokemonsContext } from "../Context/PokemonsContext";

//children fait référence à tout ce qui est wrap par PokemonsProvider dans App.jsx
export const PokemonsProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {

    (async () => {
      // add Access-Control-Allow-Origin
      const results = await fetch(`https://pokemons.mytoolsboard.com/api/pokemons?page=${page}`)
      const pokemons = await results.json();
      setPokemons(pokemons);

    })();

  }, [page]);

  return (
    <PokemonsContext.Provider value={{ pokemons, page, setPage }}>
      {children}
    </PokemonsContext.Provider>
  );
};
