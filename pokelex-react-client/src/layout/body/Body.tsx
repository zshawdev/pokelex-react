import React, { useState, useEffect } from "react";
import { getPokemon, getPokemonList } from "../../api";
import Loading from "../../components/Loading";
import { PokemonList } from "../../components/pokemon-list";
import { PokemonNameList } from "../../hooks/usePokemon";

import "./Body.css";

const Body: React.FC = () => {
  const [listCollapsed, setListCollapsed] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);
  const [activePokemon, setActivePokemon] = useState<string>();
  const [pokemonList, setPokemonList] = useState<PokemonNameList[]>([]);
  const [pokemonData, setPokemonData] = useState<Lexmon[]>([]);

  const toggleCollapse = () => setListCollapsed(!listCollapsed);

  useEffect(() => {
    Promise.all([
      getPokemonList().then((list) => {
        console.log(list);
        if (Array.isArray(list)) {
          setPokemonList(list);
          return true;
        }
        return false;
      }),
      getPokemon(25).then((pokemon: Lexmon) => {
        if(pokemon.id) {
          setActivePokemon(pokemon.id);
          return true;
        }
        return false;
      }),
    ])
      .then(([resA, resB]) => {
        if(!(resA && resB)) {
          // attach logging here
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
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
          <PokemonList pokemonList={pokemonList} selectPaneActive={!listCollapsed} onPokemonClick={id => setActivePokemon(id)} />
        </>
      )}
    </div>
  );
};

export default Body;
