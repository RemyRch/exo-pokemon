import { Link } from "react-router-dom";
import styled from "styled-components";
import { PreviousPage } from "../pokemon-list.styles";

export const StyledList = styled.ul``;

export const PokemonList = ({ pokemons, search }) => {
  if (!pokemons) {
    return;
  } else {
    return (
      <>
        <ul>
          {pokemons
            .filter((pokemon) => pokemon.name.includes(search))
            .map((pokemon) => (
              <li key={pokemon.name}>
                <Link to={`/pokemon/${pokemon.id}`}>{pokemon.name}</Link>
              </li>
            ))}
        </ul>
        <PreviousPage> Previous </PreviousPage>
      </>
    );
  }
};
