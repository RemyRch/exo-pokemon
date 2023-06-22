import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useRef, useContext } from "react";
import { PokemonsContext } from "../../Context/PokemonsContext";
import { useSelector } from "react-redux";

// import { myStyle } from "./NavStyles";

import Select from 'react-select'

export const Navbar = ({ className }) => {

  const { pokemons } = useContext(PokemonsContext)
  const navigate = useNavigate()
  const pokemonTeam = useSelector(state => state.pokemonTeam)

  const options = pokemons.map((pokemon) => {
    return { value: pokemon.id, label: pokemon.name }
  })

  const formatOptionLabel = ({ value, label, customAbbreviation }) => (
    <div style={{ display: "flex", alignItems:"center", cursor: "pointer", gap: "3px", padding: "0px 6px" }}>
      <div>
        <img height="50" width="50" src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${value}.png`} alt={label} />
      </div>
      <div>
        <span>{label}</span>
      </div>
    </div>
  );

  const onChange = ({ value }) => navigate(`/pokemon/${value}`)


  // styles={myStyle}
  return (
    <nav className={className} >
      <div className="left">
        <button>
          <NavLink to="/">
            Home
          </NavLink>
        </button>
        {(pokemonTeam.team.length > 0) && (<button>
          <NavLink to="/team">
            Team
          </NavLink>
        </button>)}
      </div>
      <Select 
        options={options} 
        formatOptionLabel={formatOptionLabel}
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
