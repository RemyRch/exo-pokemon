import { useContext } from "react";
import PokemonCard from "../Components/PokemonCard";
import { Link } from "react-router-dom";
import { PokemonsContext } from "../Context/pokemonsContext";


export default function Home() {

  //On récupère pokemons qui est stocké dans le context qu'on a importé
  const { pokemons } = useContext(PokemonsContext);

  return (
    <div className="containerList">
      <ul>
        {pokemons?.map((pokemon) => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonCard id={pokemon.id} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

