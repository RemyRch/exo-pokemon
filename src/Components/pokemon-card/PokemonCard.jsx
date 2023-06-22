import { useState, useEffect } from "react";
import { colours } from "../../constants/ColorsType";
import { TypeIcons } from "./../type-icons/TypeIcons";
import { PokemonWiki } from "./../pokemon-wiki/PokemonWiki";
import * as Styles from "./PokemonCard.styles";

export default function PokemonCard(props) {
  const { pokemon } = props;

  const [bgColor, setBgColor] = useState("");

  useEffect(() => {
    setBgColor(pokemon.types[pokemon.types.length - 1].color)
  }, [])

  return (
    <Styles.PokemonCardContainer style={{ backgroundColor: bgColor }}>
      <header>
     
          <h3>{pokemon.name} <TypeIcons pokemon={pokemon} home /></h3>
      
{/*      
        <div className="types">
          <TypeIcons pokemon={pokemon} home />
        </div> */}
      </header>

      <main>
        <div className="imgBg">
          <img
              className="imgPkmnCards"
              src={pokemon.image}
              alt={pokemon.name}
            />
        </div>
      </main>

      <footer>
        <p>Height: {pokemon.height / 10} m</p>
        <p>Weight: {pokemon.weight / 10} kg</p>
      </footer>
    </Styles.PokemonCardContainer>
  );
}
