import React, { useState, useEffect } from "react";
import usePokemon from "../../hooks/usePokemon";

import "./Body.css";

const Body: React.FC = () => {
  const { pokemonList, setPokemonList } = usePokemon();
  const [listCollapsed, setListCollapsed] = useState<boolean>(true);

  const toggleCollapse = () => setListCollapsed(!listCollapsed);

  return (
    <div className="body w-[44.825rem] md:w-[81.5rem] absolute z-10 top-1/2 left-1/2 flex text-white">
      <span onClick={toggleCollapse} className="toggle-button block md:hidden absolute top-[2.8rem] left-8 cursor-pointer">
        <span className="icon">&nbsp;</span>
      </span>
    </div>
  );
};

export default Body;
