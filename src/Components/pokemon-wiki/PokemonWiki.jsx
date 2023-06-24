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

  const [capturePercent, setCapturePercent] = useState(0);
  const [PV, setPV] = useState(100);
  const [pokeball, setPokeball] = useState(1);
  const [status, setStatus] = useState("");

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

  const getPokemon = async (id) => {
    const result = await fetch(`https://pokemons.mytoolsboard.com/api/pokemon/${id}`);
    const pokemon = await result.json();
    return pokemon;
}

  const handleAdd = async () => {

    const pokemon = await getPokemon(id);

    const index = pokemonTeam.team.findIndex(
      (currentId) => currentId === parseInt(id)
    );
    
    if (index === -1 && pokemonTeam.team.length < 6) {
      dispatch(addPokemon(id));
      toast.success(`${capitalizeFirstLetter(pokemon.name)} added to team`);
    } else if (index !== -1) {
      toast.error(`${capitalizeFirstLetter(pokemon.name)} already in team`);
    } else {
      toast.error("Team full");
    }
  };

  const testCapture = () => {

    const random = Math.floor(Math.random() * 101);

    if(random < capturePercent) {
      handleAdd();
    } else {
      toast.error(`${capitalizeFirstLetter(pokemon.name)} escaped`);
    }

  }

  const testAttack = (status) => {
    const random = Math.floor(Math.random() * 101);
    let attack = "";
    switch(status) {
      case "sleep":
        attack = "Sleep powder";
        break;
      case "freeze":
        attack = "Blizzard";
        break;
      case "paralysis":
        attack = "Stun spore";
        break;
      case "burn":
        attack = "Will-O-Wisp";
        break;
      case "poison":
        attack = "Toxik";
        break;
      default:
        attack = "Full heal";
        toast.success(`Pokemon is healthy !`);
        setStatus(status);
    }

    if(attack === "Full heal") return;
    if(random > 75) {
      toast.error(`${attack} missed`);
    }
    else {
      toast.success(`Pokemon is ${status} !`) 
      setStatus(status);
    }
  }

  useEffect(() => {

    ( async () => {

      if(!pokemon) return;
      let bonusStatus = 1;
      switch(status) {
        case "sleep":
        case "freeze":
          bonusStatus = 2.5;
          break;
        case "paralysis":
        case "burn":
        case "poison":
          bonusStatus = 1.5;
          break;
        default:
          bonusStatus = 1;
      }

      const PVmax = pokemon.stats?.[0].base_stat;
      const a = (1 - (2/3*PV/PVmax)) * pokemon.captureRate * pokeball * bonusStatus;
      const b = (65535/(255/a)**(3/16));
      
      const percent = Math.floor(Math.pow(b/65536, 4) * 100);

      setCapturePercent((current) =>  (percent < 100 && pokeball != 255 ? current = percent : current = 100) );
    })()


  }, [pokeball, PV, status])
  
  //ce useEffect gère le fetch et le bgColor
  useEffect(() => {
    ( async () => {
      const pokeResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}`)

      let poke = await pokeResponse.json()
      const species = await speciesResponse.json()
      poke = {...poke, captureRate: species.capture_rate};
      setPokemon((current) => (current = poke));
      //on cherche le 1er type du pokémon
      const firstType = poke.types?.[0].type.name;
      //on set le background-color en fonction du type dans ColorsType
      setBgColor(colours[firstType]);
      actualizeSensibilities(poke);
      setStatus("");

    })()
  }, [id]);

  useEffect(() => {
    actualizeSensibilities(pokemon);
    document.getElementById("pvmax").max = pokemon.stats?.[0].base_stat
    setPV(pokemon.stats?.[0].base_stat ?? 0)
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
        <h3 className="wikiName">{capitalizeFirstLetter(pokemon.name)}<TypeIcons pokemon={pokemon} /></h3>
      </header>

      <main>
        <div className="main-and-prevnext">
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
            <div className="top">
              
              <div className="infos">
                {pokemon.types?.length > 1 ? <h4>Types :</h4> : <h4>Type :</h4>}
                <div className="types-itm">
                  {pokemon.types?.map(({ type }) => (
                    <span key={uniqid()}>
                      {capitalizeFirstLetter(type.name)}
                    </span>
                  ))}
                </div>
              </div>

              
                <div className="infos">
                  <h4>Height :</h4>
                  <span>{pokemon.height / 10} m</span>
                </div>

              </div>

              <div className="bottom">

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
          </div>

          <div className="content">
            <StyledTypeAffinityTable
              bgColor={bgColor}
              sensibilities={sensibilities}
            />

            <div className="capture">

              <div className="header">
                <h4>Capture rate :</h4>
                <span>{pokemon.captureRate}</span>
              </div>
              
              <div className="pvStatus">
                <div className="pv">
                  <span>PV : </span>
                  <input type="range" id="pvmax" min="1" value={PV} onChange={({ target: { value } }) => { setPV(value) }} />
                  <span>{PV}</span>
                </div>
                {status && <span className="statu">{status}</span>}
              </div>
              <div className="pokeballs">
                <button onClick={() => { setPokeball((current) => {return current = 1}) }} className={pokeball == 1 ? "isActive" : ""}><img src="/pokeballs/poke.png" alt="pokeball" /></button> 
                <button onClick={() => { setPokeball((current) => { return current = 1.5 }) }} className={pokeball == 1.5 ? "isActive" : ""}><img src="/pokeballs/great.png" alt="greatball" /></button>
                <button onClick={() => { setPokeball((current) => { return current = 2 }) }} className={pokeball == 2 ? "isActive" : ""}><img src="/pokeballs/ultra.png" alt="ultraball" /></button>
                <button onClick={() => { setPokeball((current) => { return current = 255 }) }} className={pokeball == 255 ? "isActive" : ""}><img src="/pokeballs/master.png" alt="masterball" /></button>
              </div>
              <button onClick={testCapture} className="captureBtn">Test capture ({ capturePercent }%)</button>
              <div className="statusBtn">
                <button onClick={() => testAttack("sleep")} className="sleep">Sleep Powder</button>
                <button onClick={() => testAttack("freeze")} className="freeze">Blizzard</button>
                <button onClick={() => testAttack("paralysis")} className="paralysis">Stun Spore</button>
                <button onClick={() => testAttack("burn")} className="burn">Will-O-Wisp</button>
                <button onClick={() => testAttack("poison")} className="poison">Toxic</button>
                <button onClick={() => testAttack("")}>Full heal</button>
              </div>
            </div>            
          </div>
        </div>
      </main>

      <footer></footer>
    </div>
  );
};
