import { useContext, useState } from "react";
import { PokemonList } from "../Components/PokemonList";
import { PokemonsContext } from "../Context/pokemonsContext";

export default function Search() {
  const {pokemons} = useContext(PokemonsContext);
  const [search, setSearch] = useState("");

  const handleChange = (event) => {
    setSearch(event.target.value);
  };

  return (
    <>
      <input
        type="text"
        onChange={handleChange}
        placeholder="Search"
        className="searchInput"
      />
      {search && <PokemonList search={search} pokemons={pokemons} />}
    </>
  );
}
