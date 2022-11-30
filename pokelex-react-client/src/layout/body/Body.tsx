import React, { useState, useEffect } from "react";
import { getPokemon, getPokemonList } from "../../api";
import Loading from "../../components/Loading";
import { PokemonList } from "../../components/pokemon-list";
import { PokemonContextProvider, PokemonName } from "../../hooks/usePokemon";

import "./Body.css";

const Body: React.FC = () => {
  const [listCollapsed, setListCollapsed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingPokemon, setFetchingPokemon] = useState<boolean>(false);
  const [activePokemon, setActivePokemon] = useState<Lexmon>();
  const [pokemonList, setPokemonList] = useState<PokemonName[]>([]);
  const [lexmon, setLexmon] = useState<Lexmon[]>([]);

  const toggleCollapse = () => setListCollapsed(!listCollapsed);

  useEffect(() => {
    Promise.all([
      getPokemonList().then((list) => {
        if (Array.isArray(list)) {
          setPokemonList(list);
          return true;
        }
        return false;
      }),
      getPokemon(25).then((pokemon: Lexmon) => {
        if (pokemon.id) {
          addToLexmon(pokemon);
          onSelectPokemon(pokemon.id);
          return true;
        }
        return false;
      }),
    ]).finally(() => {
      setLoading(false);
    });
  }, []);

  const onSelectPokemon = (id: string) => {
    const selectedLexmon = lexmon.find(lex => lex.id === id);
    if(!selectedLexmon) {
      setFetchingPokemon(true);
      getPokemon(parseInt(id, 10)).then((pokemon: Lexmon) => {
        if(pokemon.id) {
          addToLexmon(pokemon);
          setActivePokemon(pokemon);
        }
      }).finally(() => {
        setFetchingPokemon(false);
      });
    } else {
      setActivePokemon(selectedLexmon);
    }
    if (!listCollapsed) setListCollapsed(true);
  };

  const addToLexmon = async (lex: Lexmon) => 
  setLexmon([...lexmon, lex]);

  return (
    <PokemonContextProvider
      value={{
        pokemonList,
        setPokemonList,
        activePokemon,
        setActivePokemon,
        lexmon,
        fetchingPokemon
      }}
    >
      <div className="body w-[44.825rem] md:w-[81.5rem] absolute z-10 top-1/2 left-1/2 flex text-white">
        {loading ? (
          <Loading size={100} />
        ) : (
          <>
            <span
              onClick={toggleCollapse}
              className="toggle-button block md:hidden absolute top-[2.8rem] left-8 cursor-pointer"
            >
              <span className="icon">&nbsp;</span>
            </span>
            <PokemonList
              selectPaneActive={!listCollapsed}
              onPokemonClick={onSelectPokemon}
            />
          </>
        )}
      </div>
    </PokemonContextProvider>
  );
};

export default Body;
