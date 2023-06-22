import { useState, useEffect } from "react";
import { PokemonsContext } from "../Context/PokemonsContext";

//children fait référence à tout ce qui est wrap par PokemonsProvider dans App.jsx
export const PokemonsProvider = ({ children }) => {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {

    // (async () => {
    //   // add Access-Control-Allow-Origin
    //   const pokemons = await fetch(`https://pokemons.mytoolsboard.com/api/pokemons?page=${page}`, {
    //     method: 'GET',
    //     mode: 'no-cors'
    //   })

    //   console.log(pokemons.body);

    // })();

    fetch("https://pokeapi.co/api/v2/pokemon?limit=151")
      .then((response) => response.json())
      .then((data) => {
        setPokemons(
          data.results.map((pokemon) => {
            return {
              ...pokemon,
              // On ajoute un ID à pokémon qu'on passe en Int, on replace le lien de l'url par rien pour ne garder que l'id du pokémon
              id: parseInt(
                pokemon.url
                  .replace("https://pokeapi.co/api/v2/pokemon/", "")
                  .replace("/", "")
              ),
            };
          })
        );
      });
  }, [page]);

  return (
    <PokemonsContext.Provider value={{ pokemons, page, setPage }}>
      {children}
    </PokemonsContext.Provider>
  );
};
