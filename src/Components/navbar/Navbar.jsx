import { NavLink, useNavigate } from "react-router-dom";
import { useRef, useContext } from "react";
import { PokemonsContext } from "../../Context/PokemonsContext";
import { useSelector } from "react-redux";

import AsyncSelect from 'react-select/async';

export const Navbar = ({ className }) => {

  const navigate = useNavigate()

  const pokemonTeam = useSelector(state => state.pokemonTeam)

  const { pokemons } = useContext(PokemonsContext)
  const options = pokemons.map(pokemon => { return { value: pokemon, label: pokemon.name } })

  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div style={{ display: "flex", alignItems:"center", cursor: "pointer", gap: "3px", padding: "0px 6px" }}>
      <div>
        <img height="50" width="50" src={value.image} alt={value.name} />
      </div>
      <div>
        <span>{value.name}</span>
      </div>
    </div>
  );

  let timer = useRef();
  const promiseOptions = (query, callback) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(async () => {
      
      const response = await fetch(`https://pokemons.mytoolsboard.com/api/pokemon?search=${query}`)
      const pokemons = await response.json()
      
      callback(pokemons.map(pokemon => { return { value: pokemon, label: pokemon.name } }));

    }, 300);
  }

  const onChange = ({ value }) => navigate(`/pokemon/${value.id}`)

  // styles={myStyle}
  return (
    <nav className={className} >
      <div className="left">
        <NavLink to="/">
          <button>
              Home
          </button>
        </NavLink>
        {(pokemonTeam.team.length > 0) && (
          <NavLink to="/team">
            <button>
              Team
            </button>
          </NavLink>
        )}
      </div>


      <AsyncSelect 
        cacheOptions 
        defaultOptions={options}
        formatOptionLabel={formatOptionLabel}
        loadOptions={promiseOptions}
        onChange={onChange}
        placeholder="Rechercher un pokemon"
        styles={{
          control: baseStyles => ({
            ...baseStyles,
            minWidth: '300px',
            textAlign: 'left',
          }),
          option: baseStyles => {
            return {
              ...baseStyles,
              color: '#000',
              textAlign: 'left',
              height: '50px',
              padding: '0 0px',
              flex: 'flex',
              alignItems: 'center',
            }
          },
          valueContainer: (provided, state) => ({
            ...provided,
            height: '30px',
            padding: '0 0px',
          }),
        }}
      />


    </nav>
  );
}
