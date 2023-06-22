import { useState, useEffect } from "react";
import { colours } from "../../constants/ColorsType";
import { TypeIcons } from "./../type-icons/TypeIcons";
import { PokemonWiki } from "./../pokemon-wiki/PokemonWiki";
import * as Styles from "./PokemonCard.styles";

export default function PokemonCard(props) {
  const { id, wiki } = props;

  const [pokemon, setPokemon] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [bgImg, setBgImg] = useState("");

  const [sourceImg, setSourceImg] = useState("");
  const [orientation, setOrientation] = useState("front_default");

  //ce useEffect gère le fetch et le bgColor
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => response.json())
      .then((data) => {
        setPokemon(data);

        //on cherche le 1er type du pokémon
        const firstType = data.types?.[0].type.name;

        //on set le background-color en fonction du type dans ColorsType
        setBgColor(colours[firstType]);
        // setBgImg(typeIcon[firstType]);
        // console.log(typeIcon.bug)
      });
  }, [id]);

  //ce useEffect gère les images front et back
  useEffect(() => {
    //On déclare src
    let src;

    //On vérifie si gif et le chemin renvoient quelque chose, si oui src = le chemin du gif, sinon src = le chemin d'un png

   src = pokemon.sprites;

    //setSourceImg prend les données de src et de orientation
    setSourceImg(src?.[orientation]);
  }, [orientation, pokemon]);

  //function onClick -> si orientation a comme valeur front_default, alors il devient back_default et inversement
  const toggleGifOrientation = () =>
    setOrientation(
      orientation === "front_default" && pokemon.sprites?.back_default
        ? "back_default"
        : "front_default"
    );

  return (
    <Styles.PokemonCardContainer style={{ backgroundColor: bgColor, backgroundImg: bgImg }}>
     
        <header>
          <h3>{pokemon.name}</h3>
          <div className="types">
            <TypeIcons pokemon={pokemon} />
          </div>
        </header>

        <main>
          <div className="imgBg">
            {pokemon.sprites?.versions?.["generation-v"]?.["black-white"]
              ?.animated?.front_default ? (
              <img className="imgPkmnCards"
                onClick={toggleGifOrientation}
                src={sourceImg}
                alt={pokemon.name}
              />
            ) : (
              <img className="imgPkmnCards"
                onClick={toggleGifOrientation}
                src={sourceImg}
                alt={pokemon.name}
              />
            )}
          </div>
        </main>

        <footer>

          <p>Height: {pokemon.height / 10} m</p>
          <p>Weight: {pokemon.weight / 10} kg</p>

        </footer>
    
    </Styles.PokemonCardContainer>
  );
  {
    /* <div className="img">
          {pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.front_default ? (
            <img
              onClick={toggleGifOrientation}
              src={sourceImg}
              alt={pokemon.name}
            />
          ) : (
            <img
              onClick={toggleGifOrientation}
              src={sourceImg}
              alt={pokemon.name}
            />
          )}
         </div>
         <p>
           Types:{" "}
           {pokemon.types
              ?.map((type) => {
               return type.type.name;
             })
             .join(", ")}
         </p>
         <p>Height: {pokemon.height / 10} m</p>
         <p>Weight: {pokemon.weight / 10} kg</p>
       </div>   */
  }
}
