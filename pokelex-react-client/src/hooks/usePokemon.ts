import React from "react";
import { noop } from "../utils/constants";

export interface PokemonName {
  name: LangSplit;
  id: string;
}
interface PokemonDataList {
  pokemonList: PokemonName[];
  setPokemonList: (list: PokemonName[]) => void;
  lexmon: Lexmon[];
  activePokemon?: Lexmon;
  setActivePokemon: (lexmon: Lexmon) => void;
  fetchingPokemon?: boolean;
}
const defaultContext: PokemonDataList = {
  pokemonList: [],
  setPokemonList: noop,
  lexmon: [],
  setActivePokemon: noop,
};
const PokemonContext = React.createContext<PokemonDataList>(defaultContext);
export const PokemonContextProvider = PokemonContext.Provider;

// despite this only being used in one place for now this allows us to plug and play with this data anywhere in the app in the future
const usePokemon = () => React.useContext(PokemonContext);
export default usePokemon;
