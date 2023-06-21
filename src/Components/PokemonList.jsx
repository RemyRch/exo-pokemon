import { Link } from "react-router-dom";

export const PokemonList = ({ pokemons, search }) => {
  if (!pokemons) {
    return;
  } else {
    return (
      <ul>
        {pokemons
          .filter((pokemon) => pokemon.name.includes(search))
          .map((pokemon) => (
            <li key={pokemon.name}>
              <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
            </li>
          ))}
      </ul>
    );
  }
};
