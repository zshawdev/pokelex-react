import React, { useState, useEffect } from "react";
import { getPokemon, setup } from "../../api";
import { Loading, PokemonList, PokedexEntry, Toggle } from "../../components";
import { PokemonContextProvider } from "../../hooks/usePokemon";

import "./Body.css";

const Body: React.FC = () => {
  const [listCollapsed, setListCollapsed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [fetchingPokemon, setFetchingPokemon] = useState<boolean>(false);
  const [activePokemon, setActivePokemon] = useState<Lexmon>();
  const [pokemonList, setPokemonList] = useState<PokemonName[]>([]);
  const [lexmon, setLexmon] = useState<Lexmon[]>([]);
  const [error, setError] = useState<string>();

  const toggleCollapse = () => setListCollapsed(!listCollapsed);

  useEffect(() => {
    setup()
      .then(({ pokemonList, pikachu }) => {
        if (Array.isArray(pokemonList)) {
          setPokemonList(pokemonList);
        }
        if (pikachu.id) {
          addToLexmon(pikachu);
          selectPokemon(pikachu.id);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const selectPokemon = (id: string) => {
    const selectedLexmon = lexmon.find((lex) => lex.id === id);
    if (!selectedLexmon) {
      setFetchingPokemon(true);
      getPokemon(parseInt(id, 10))
        .then((pokemon: Lexmon) => {
          if (pokemon.id) {
            addToLexmon(pokemon);
            setActivePokemon(pokemon);
          }
        })
        .finally(() => {
          setFetchingPokemon(false);
        });
    } else {
      setActivePokemon(selectedLexmon);
    }
    if (!listCollapsed) setListCollapsed(true);
  };

  const addToLexmon = async (lex: Lexmon) => setLexmon([...lexmon, lex]);

  return (
    <PokemonContextProvider
      value={{
        pokemonList,
        setPokemonList,
        activePokemon,
        setActivePokemon,
        lexmon,
        fetchingPokemon,
      }}
    >
      <div className="body w-[44.825rem] md:w-[81.5rem] absolute z-10 top-1/2 left-1/2 flex text-white">
        {loading ? (
          <Loading size={100} />
        ) : (
          <>
            <Toggle onClick={toggleCollapse} />
            <PokemonList
              selectPaneActive={!listCollapsed}
              onPokemonClick={selectPokemon}
            />
            <PokedexEntry entryPaneActive={listCollapsed} />
          </>
        )}
      </div>
    </PokemonContextProvider>
  );
};

export default Body;
