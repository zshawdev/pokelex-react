import React from "react";
import { noop } from "../utils/constants";

interface PokemonNameList {
  name: LangSplit;
  id: number;
}
interface PokemonDataList {
  pokemonList: PokemonNameList[];
  setPokemonList: (list: PokemonNameList[]) => void;
  lexmon: Lexmon[];
  addToLexmon: (lexmon: Lexmon) => void;
}
const defaultContext: PokemonDataList = {
  pokemonList: [],
  setPokemonList: noop,
  lexmon: [],
  addToLexmon: noop
};
const PokemonContext = React.createContext<PokemonDataList>(defaultContext);
export const PokemonContextProvider = PokemonContext.Provider;

const usePokemon = () => React.useContext(PokemonContext);
export default usePokemon;
