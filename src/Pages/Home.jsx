import { useContext, useState, useEffect } from "react";
import PokemonCard from "../Components/pokemon-card/PokemonCard";
import { Link } from "react-router-dom";
import { PokemonsContext } from "../Context/PokemonsContext";
import {
  PaginationContainer,
  PreviousPage,
  NextPage,
} from "./../Components/pagination/Pagination.styles";

export default function Home() {
  //On récupère pokemons qui est stocké dans le context qu'on a importé
  const { pokemons, page, setPage } = useContext(PokemonsContext);
  const max = 1110/20;

  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNext = () => {
    if (page < max)setPage(page + 1)
  };

  useEffect(() => {
    setPage(1)
  }, []);

  return (
    <section>
      <section className="cards-container">
        {pokemons.map((pokemon) => (
          <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
            <PokemonCard pokemon={pokemon} />
          </Link>
        ))}
      </section>
      <PaginationContainer>
        <PreviousPage onClick={handlePrevious}>Previous</PreviousPage>
        <h3> {page} </h3>
        <NextPage onClick={handleNext}>Next</NextPage>
      </PaginationContainer>
    </section>
  );
}
