import { configureStore } from "@reduxjs/toolkit";

import pokemonTeamSlice from "./Slice/pokemonTeam";

export const store = configureStore({
  reducer: { pokemonTeam: pokemonTeamSlice },
});
