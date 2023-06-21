import { useState, useEffect } from "react";
import { colours } from "../../constants/ColorsType";
import { TypeIcons } from "./../type-icons/TypeIcons";
import uniqid from "uniqid";

export const PokemonWiki = (props) => {
  const { id } = props;

  const initialRelations = {
    normal: 1,
    fire: 1,
    water: 1,
    electric: 1,
    grass: 1,
    ice: 1,
    fighting: 1,
    poison: 1,
    ground: 1,
    flying: 1,
    psychic: 1,
    bug: 1,
    rock: 1,
    ghost: 1,
    dragon: 1,
    dark: 1,
    steel: 1,
    fairy: 1,
  };

  const [sensibilities, setSensibilities] = useState(initialRelations);

  const [pokemon, setPokemon] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [bgImg, setBgImg] = useState("");

  const [sourceImg, setSourceImg] = useState("");
  const [orientation, setOrientation] = useState("front_default");

  //function onClick -> si orientation a comme valeur front_default, alors il devient back_default et inversement
  const toggleGifOrientation = () =>
    setOrientation(
      orientation === "front_default" && pokemon.sprites?.back_default
        ? "back_default"
        : "front_default"
    );

  const actualizeSensibilities = (pokemon) => {
    const newSensibilities = initialRelations;
    pokemon.types?.forEach((type) => {
        fetch(`https://pokeapi.co/api/v2/type/${type.type.name}/`)
        .then((response) => response.json())
        .then((data) => {
            // {
            //     "damage_relations": {
            //       "double_damage_from": [
            //         {
            //           "name": "ground",
            //           "url": "https://pokeapi.co/api/v2/type/5/"
            //         },
            //         {
            //           "name": "psychic",
            //           "url": "https://pokeapi.co/api/v2/type/14/"
            //         }
            //       ],
            //       "double_damage_to": [
            //         {
            //           "name": "grass",
            //           "url": "https://pokeapi.co/api/v2/type/12/"
            //         },
            //         {
            //           "name": "fairy",
            //           "url": "https://pokeapi.co/api/v2/type/18/"
            //         }
            //       ],
            //       "half_damage_from": [
            //         {
            //           "name": "fighting",
            //           "url": "https://pokeapi.co/api/v2/type/2/"
            //         },
            //         {
            //           "name": "poison",
            //           "url": "https://pokeapi.co/api/v2/type/4/"
            //         },
            //         {
            //           "name": "bug",
            //           "url": "https://pokeapi.co/api/v2/type/7/"
            //         },
            //         {
            //           "name": "grass",
            //           "url": "https://pokeapi.co/api/v2/type/12/"
            //         },
            //         {
            //           "name": "fairy",
            //           "url": "https://pokeapi.co/api/v2/type/18/"
            //         }
            //       ],
            //       "half_damage_to": [
            //         {
            //           "name": "poison",
            //           "url": "https://pokeapi.co/api/v2/type/4/"
            //         },
            //         {
            //           "name": "ground",
            //           "url": "https://pokeapi.co/api/v2/type/5/"
            //         },
            //         {
            //           "name": "rock",
            //           "url": "https://pokeapi.co/api/v2/type/6/"
            //         },
            //         {
            //           "name": "ghost",
            //           "url": "https://pokeapi.co/api/v2/type/8/"
            //         }
            //       ],
            //       "no_damage_from": [
                    
            //       ],
            //       "no_damage_to": [
            //         {
            //           "name": "steel",
            //           "url": "https://pokeapi.co/api/v2/type/9/"
            //         }
            //       ]
            //     }
            //     }
            data.damage_relations.double_damage_from.forEach((type) => {
                newSensibilities[type.name] = newSensibilities[type.name] * 2;
            })
            data.damage_relations.half_damage_from.forEach((type) => {
                newSensibilities[type.name] = newSensibilities[type.name] * 0.5;
            })
            data.damage_relations.no_damage_from.forEach((type) => {
                newSensibilities[type.name] = newSensibilities[type.name] * 0;
            })
            setSensibilities(newSensibilities);
                
        });
    });
    };

    const capitalizeFirstLetter = (string) => {
        if(string === undefined) return;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
                

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

        actualizeSensibilities(data);
      });
  }, [id]);

  //ce useEffect gère les images front et back
  useEffect(() => {
    //On déclare src
    let src;

    //On vérifie si gif et le chemin renvoient quelque chose, si oui src = le chemin du gif, sinon src = le chemin d'un png
    pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated?.[
      orientation
    ]
      ? (src =
          pokemon.sprites?.versions?.["generation-v"]?.["black-white"]
            ?.animated)
      : (src = pokemon.sprites);

    //setSourceImg prend les données de src et de orientation
    setSourceImg(src?.[orientation]);
  }, [orientation, pokemon]);

  return (
    <div className="pokemon-wiki" >
        
        <header style={{ backgroundColor: bgColor }}>
            <h3>
                {capitalizeFirstLetter(pokemon.name)}
            </h3>
            <div className="types-img">
                <TypeIcons pokemon={pokemon} />
            </div>
        </header>

        <main>
            <div className="img" >
                {pokemon.sprites?.versions?.["generation-v"]?.["black-white"]?.animated
                    ?.front_default ? (
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

            <div className="content" style={{ backgroundColor: bgColor }}>

                <div className="infos">
                    <h4>Types</h4>
                    <div className="types-itm">
                        {pokemon.types?.map(({ type }) => <span key={uniqid()}>{capitalizeFirstLetter(type.name)}</span>)}
                    </div>
                </div>
                
                <div className="infos">
                    <h4>Height :</h4>
                    <span>{pokemon.height / 10} m</span>
                </div>

                <div className="infos">
                    <h4>Weight :</h4>
                    <span>{pokemon.weight / 10} kg</span>
                </div>
                
                <ul>
                    {Object.keys(sensibilities).map((key) => {
                        return (
                            <li key={uniqid()}>
                            <span>{key}</span>
                            <span>{sensibilities[key]}</span>
                            </li>
                        );
                    })}
                    
                </ul>
            </div>


        </main>

        <footer>

            

        </footer>      
    </div>
  );
};
