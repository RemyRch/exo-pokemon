import { useSelector, useDispatch } from "react-redux";
import { useContext, useEffect, useState } from "react";
import { PokemonsContext } from "../Context/PokemonsContext";
import PokemonCard from "../Components/pokemon-card/PokemonCard";
import uniqid from "uniqid";
import { removePokemon } from "../Slice/pokemonTeam";
import { toast } from "react-toastify";

export const Team = () => {

  const pokemonTeam = useSelector((state) => state.pokemonTeam);

  const [pokemons, setPokemons] = useState([]);

  const dispatch = useDispatch();

  const getPokemon = async (id) => {
    const result = await fetch(`https://pokemons.mytoolsboard.com/api/pokemon/${id}`);
    const pokemon = await result.json();
    return pokemon;
  }

  useEffect(() => {

    setPokemons([]);

    pokemonTeam.team.forEach((id) => {
      (async () => {
        let pokemon = await getPokemon(id);
        setPokemons((currentPokemons) => {return [...currentPokemons, pokemon]});
      })()
    })

  }, [pokemonTeam.team])

  const capitalizeFirstLetter = (string) => {
    if (string === undefined) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleRemove = async (pokemon) => {
    toast.success(`${capitalizeFirstLetter(pokemon.name)} removed from team`);
    dispatch(removePokemon(pokemon.id));
  };

  return (
    <>
      <h1 className="teamTitle">Team</h1>
      <section className="cards-container">
        {pokemons.map(pokemon => (
          <div key={uniqid()}>
            <PokemonCard pokemon={pokemon}  />
            <button id={uniqid()} onClick={() => handleRemove(pokemon)}>
              Remove
            </button>
          </div>
        ))}
      </section>
    </>
  );
};
