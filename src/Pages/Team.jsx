import { useSelector, useDispatch } from "react-redux";
import { useContext } from "react";
import { PokemonsContext } from "../Context/PokemonsContext";
import PokemonCard from "../Components/pokemon-card/PokemonCard";
import uniqid from "uniqid";
import { removePokemon } from "../Slice/pokemonTeam";
import { toast } from "react-toastify";

export const Team = () => {
  const { pokemons } = useContext(PokemonsContext);
  const pokemonTeam = useSelector((state) => state.pokemonTeam);
  const dispatch = useDispatch();

  const capitalizeFirstLetter = (string) => {
    if (string === undefined) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleRemove = (id) => {
    toast.success(`${capitalizeFirstLetter(pokemons[id - 1].name)} removed from team`);
    dispatch(removePokemon(id));
  };

  return (
    <>
      <h1>Team</h1>
      <div className="team">
        {pokemonTeam.team.map((id) => (
          <div key={uniqid()}>
            <PokemonCard key={id} id={id} />
            <button id={uniqid()} onClick={() => handleRemove(id)}>
              Remove
            </button>
          </div>
        ))}
      </div>
    </>
  );
};
