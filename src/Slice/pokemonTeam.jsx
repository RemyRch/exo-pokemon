import { createSlice } from "@reduxjs/toolkit";

export const pokemonTeamSlice = createSlice({
  name: "pokemonTeam",
  initialState: {
    //initialState est la valeur de base qui est un tableau vide
    team: [],
  },
  reducers: {
    //on récupère le state (tableau vide) et l'id du pokémon pour le push dans le state
    addPokemon: (state, action) => {
      state.team = [...state.team, parseInt(action.payload)];
    },

    //on crée un tableau modifié en gardant l'id des pokémons non sélectionnés
    removePokemon: (state, action) => {
      state.team = state.team.filter((pokemon) => pokemon !== action.payload);
    },
    reorderPokemon: (state, { id, destinationIndex }) => {
      const pokemon = state.team.find((pokemon) => pokemon.id === id); // find() cherche l'élément dans le tableau
      const index = state.team.indexOf(pokemon); //indexOf() renvoi la position de l'élément dans le tableau
      state.team.splice(index, 1); //supprime l'élément du tableau de sa position
      state.team.splice(destinationIndex, 0, pokemon); //positionne l'élément sélectionné à l'emplacement sélectionné
    },
  },
});

export const { addPokemon, removePokemon, reorderPokemon } =
  pokemonTeamSlice.actions;

export default pokemonTeamSlice.reducer;
