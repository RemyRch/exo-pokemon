import { useState, useEffect } from "react";
import { PokemonsContext } from "../Context/PokemonsContext";

//children fait référence à tout ce qui est wrap par PokemonsProvider dans App.jsx
export const PokemonsProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [cache, setCache] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {

    (async () => {

      if(cache[page] === undefined) {
        // await wait(2);
        const results = await fetch(`https://pokemons.mytoolsboard.com/api/pokemons?page=${page}`)
        const pokemons = await results.json();
        setPokemons(pokemons);
        cache[page] = pokemons;
      } else {
        setPokemons(cache[page]);
      }

    })();

  }, [page]);

  // setTimeout function with promise
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms * 1000));

  return (
    <PokemonsContext.Provider value={{ pokemons, page, setPage }}>
      {children}
    </PokemonsContext.Provider>
  );
};
