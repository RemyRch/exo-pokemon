import { useState, useEffect, useContext } from "react";
import { colours } from "../../constants/ColorsType";
import { TypeIcons } from "./../type-icons/TypeIcons";
import uniqid from "uniqid";
import { useDispatch, useSelector } from "react-redux";
import { addPokemon } from "../../Slice/pokemonTeam";
import {
  TypeAffinityTable,
  StyledTypeAffinityTable,
} from "./../type-affinity-table/TypeAffinityTable";
import { toast } from "react-toastify";
import { PokemonsContext } from "../../Context/PokemonsContext";

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

  const dispatch = useDispatch();
  const pokemonTeam = useSelector((state) => state.pokemonTeam);

  const [sensibilities, setSensibilities] = useState(initialRelations);

  const [pokemon, setPokemon] = useState([]);
  const [bgColor, setBgColor] = useState("");
  const [bgImg, setBgImg] = useState("");

  const [sourceImg, setSourceImg] = useState("");
  const [orientation, setOrientation] = useState("front_default");

  const { pokemons } = useContext(PokemonsContext);

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
          data.damage_relations.double_damage_from.forEach((type) => {
            newSensibilities[type.name] *= 2;
          });
          data.damage_relations.half_damage_from.forEach((type) => {
            newSensibilities[type.name] *= 0.5;
          });
          data.damage_relations.no_damage_from.forEach((type) => {
            newSensibilities[type.name] *= 0;
          });
          setSensibilities(newSensibilities);
        });
    });
  };

  const capitalizeFirstLetter = (string) => {
    if (string === undefined) return;
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const handleAdd = () => {
    const index = pokemonTeam.team.findIndex(
      (currentId) => currentId === parseInt(id)
    );
    const pokemon = pokemons[id - 1].name
    if (index === -1 && pokemonTeam.team.length < 6) {
      dispatch(addPokemon(id));
      toast.success(`${capitalizeFirstLetter(pokemon)} added to team`);
    } else if (index !== -1) {
      toast.error(`${capitalizeFirstLetter(pokemon)} already in team`);
    } else {
      toast.error("Team full");
    }
  };

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

  useEffect(() => {
    actualizeSensibilities(pokemon);
  }, [pokemon]);

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
    <div className="pokemon-wiki">
      <header style={{ backgroundColor: bgColor }}>
        <h3 className="wikiName">{capitalizeFirstLetter(pokemon.name)}</h3>
        <div className="types-img">
          <TypeIcons pokemon={pokemon} />
        </div>
      </header>

      <main>
        <div className="main-container">
          <div className="img">
            {pokemon.sprites?.versions?.["generation-v"]?.["black-white"]
              ?.animated?.front_default ? (
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
          <div
            className="arrow-left"
            style={{ borderRight: `100px solid ${bgColor}` }}
          />

          <div className="informations" style={{ backgroundColor: bgColor }}>
            <div className="infos">
              {pokemon.types?.length > 1 ? <h4>Types :</h4> : <h4>Type :</h4>}
              <div className="types-itm">
                {pokemon.types?.map(({ type }) => (
                  <span key={uniqid()}>{capitalizeFirstLetter(type.name)}</span>
                ))}
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

            <div className="infos">
              <h4>Abilities :</h4>
              <div className="abilities">
                {pokemon.abilities?.map(({ ability }) => (
                  <span key={uniqid()}>
                    {capitalizeFirstLetter(ability.name)}
                    <br />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="content">
          <StyledTypeAffinityTable
            bgColor={bgColor}
            sensibilities={sensibilities}
          />

          <button onClick={handleAdd}>Add to team</button>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};
