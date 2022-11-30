import React from "react";
import usePokemon from "../../hooks/usePokemon";

import "./PokedexEntry.css";

const PokedexEntry: React.FC<{ entryPaneActive?: boolean }> = ({
  entryPaneActive = true,
}) => {
  const { activePokemon } = usePokemon();

  const styleProps = { style: { display: entryPaneActive ? "block" : "none" } };

  return <div {...styleProps} className="body-pane md:w-[55%] border-l border-white"></div>;
};

export default PokedexEntry;
