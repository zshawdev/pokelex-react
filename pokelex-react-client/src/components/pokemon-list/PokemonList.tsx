import React, { useState, useRef, useEffect } from "react";
import SimpleBar from "simplebar-react";

import useLanguage, { LangOption } from "../../hooks/useLanguage";
import usePokemon from "../../hooks/usePokemon";

import "simplebar-react/dist/simplebar.min.css";
import "./PokemonList.css";

const langMap: Record<LangOption, string> = {
  en: "SEARCH",
  fr: "RECHERCHER",
  de: "SUCHE",
};

// height of the simplebar content after loading 151 pokemon in pixels
// since item height is purely static always we only need to calculate this once
const CONTENT_HEIGHT = 5136; 

const PokemonList: React.FC<{
  selectPaneActive?: boolean;
  onPokemonClick: (id: string) => void;
}> = ({ selectPaneActive, onPokemonClick }) => {
  const { pokemonList } = usePokemon();
  const { language } = useLanguage();
  const scrollRef = useRef<any>();
  const [search, setSearch] = useState<string>("");

  const otherProps = selectPaneActive ? { style: { display: "block" } } : {};

  useEffect(() => {
    const scrollListener: EventListener = (e => {
      const { target } = e;
      if(target) {
        const { scrollTop, clientHeight } = target as HTMLDivElement;
        const degrees = Math.round((scrollTop / (CONTENT_HEIGHT - clientHeight)) * 360);
        document.documentElement.style.setProperty("--deg", `${ degrees }deg`)
      }
    });

    scrollRef.current?.addEventListener("scroll", scrollListener);

    return () => {
      scrollRef.current?.removeEventListener("scroll", scrollListener);
    }
  }, []);

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
        data-simplebar-direction="rtl" // I don't know why the direction prop straight up does not work but this does
        className="list-of-pokemon"
        scrollableNodeProps={{ ref: scrollRef }}
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
