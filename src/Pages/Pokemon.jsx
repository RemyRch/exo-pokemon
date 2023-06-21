import { useParams } from "react-router-dom";
import PokemonCard from "../Components/pokemon-card/PokemonCard";
import { NextPokemon, PreviousPokemon } from "./Pokemon.styles";
import { StyledPokemonCard } from "../Components/pokemon-card/PokemonCard.styles";
import { PokemonWiki } from "../Components/pokemon-wiki/PokemonWiki";

export default function Pokemon() {
  // useParams récupère les paramètres (id) en l'occurence
  const { id } = useParams();
  const max = 1010;
  const min = 1;

  return (
    <>
      {parseInt(id) > min && (
        <PreviousPokemon to={`/pokemon/${parseInt(id) - 1}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              parseInt(id) - 1
            }.png`}
            alt={"Previous Pokemon"}
          />
        </PreviousPokemon>
      )}

      <PokemonWiki id={id} />

      {parseInt(id) < max && (
        <NextPokemon to={`/pokemon/${parseInt(id) + 1}`}>
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              parseInt(id) + 1
            }.png`}
          />
        </NextPokemon>
      )}
    </>
  );
}
