import { NavLink } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
// import TomSelect from "tom-select";
import { PokemonsContext } from "../Context/pokemonsContext";

import Select from 'react-select'

function Navbar() {

  const { pokemons } = useContext(PokemonsContext)

  const options = pokemons.map((pokemon) => {
    return { value: pokemon.id, label: pokemon.name }
  })

  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div style={{ display: "flex", alignItems:"center", cursor: "pointer" }}>
      <div>
        <img height="50" width="50" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png`} alt={label} />
      </div>
      <div>
        <span>{label}</span>
      </div>
    </div>
  );

  return (
    <nav>
      <ul>
        <li>
          <button>
            <NavLink to="/">
              Home
            </NavLink>
          </button>
        </li>
        <li>
          <button>
            <NavLink to="/pokemon/1">
              Pokemon
            </NavLink>
          </button>
        </li>
        <li>
            <Select 
              options={options} 
              formatOptionLabel={formatOptionLabel}
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
                  }
                },
              }}
            />
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;