import React, { useState } from "react";
import SimpleBar from "simplebar-react";

import useLanguage, { LangOption } from "../../hooks/useLanguage";
import { PokemonNameList } from "../../hooks/usePokemon";

import "simplebar-react/dist/simplebar.min.css";
import "./PokemonList.css";

const langMap: Record<LangOption, string> = {
  en: "SEARCH",
  fr: "RECHERCHER",
  de: "SUCHE",
};

const PokemonList: React.FC<{
  selectPaneActive?: boolean;
  pokemonList: PokemonNameList[];
  onPokemonClick: (id: string) => void;
}> = ({ selectPaneActive, pokemonList, onPokemonClick }) => {
  const { language } = useLanguage();
  const [search, setSearch] = useState<string>("");

  const otherProps = selectPaneActive ? { style: { display: "block" } } : {};

  return (
    <div
      {...otherProps}
      className="hidden bg-transparent ml-0 pl-[5.1125rem] w-full h-full border-y border-white border-solid md:block md:w-[45%] md:ml-[calc(4.8rem-2rem)] md:pl-0"
    >
      <input
        className="search ml-8 bg-black border border-[#878787] h-[2.85rem] w-[30.4rem] text-[2.8rem] mt-[1.1rem] mb-[0.4rem] text-center"
        type="search"
        autoComplete="off"
        placeholder={langMap[language]}
        value={search}
        onInput={(event) => setSearch(event.currentTarget.value)}
      />
      <div className="text-[2.8rem] ml-8 text-[#878787] relative pl-[calc(2px+1.3rem)]">
        <span>No.</span>
        <span className="absolute left-[11.5rem]">POK&#233;MON</span>
      </div>
      <SimpleBar
        tag="ol"
        data-simplebar-direction="rtl" // I don't know why the direction key straight up does not work
        className="list-of-pokemon"
      >
        {pokemonList
          .filter((p) =>
            search.length
              ? Object.values(p.name).some((name: string) =>
                  name.includes(search.toUpperCase())
                )
              : true
          )
          .map((pokemon) => (
            <li key={pokemon.id} tabIndex={-1} onClick={() => onPokemonClick(pokemon.id)}>
              <span className="text-[2.8rem]">{pokemon.id}</span>
              <span className="absolute left-[11.5rem] text-[2.8rem]">
                {pokemon.name[language]}
              </span>
            </li>
          ))}
      </SimpleBar>
    </div>
  );
};

export default PokemonList;
