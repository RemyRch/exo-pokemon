import { useContext } from "react";
import PokemonCard from "../Components/pokemon-card/PokemonCard";
import { Link } from "react-router-dom";
import { PokemonsContext } from "../Context/PokemonsContext";


export default function Home() {

  //On récupère pokemons qui est stocké dans le context qu'on a importé
  const { pokemons } = useContext(PokemonsContext);

  return (
    <section className="cards-container">
        {pokemons?.map((pokemon) => (
          <div className="cards" key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.id}`}>
              <PokemonCard id={pokemon.id} />
            </Link>
          </div>
        ))}
    </section>
  );
}

