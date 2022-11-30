import React from "react";
import useLanguage from "../../hooks/useLanguage";
import usePokemon from "../../hooks/usePokemon";
import Loading from "../Loading";

import "./PokedexEntry.css";

const PokedexEntry: React.FC<{ entryPaneActive?: boolean }> = ({
  entryPaneActive = true,
}) => {
  const { language } = useLanguage();
  const { activePokemon, fetchingPokemon } = usePokemon();

  const styleProps = { style: { display: entryPaneActive ? "block" : "none" } };

  return (
    <div
      {...styleProps}
      className="body-pane md:w-[55%] md:border-l border-white"
    >
      {fetchingPokemon ? (
        <Loading size={100} useText={false} />
      ) : (
        <>
          <div className="flex flex-col items-center">
            <span className="text-accent mt-small">
              No. {activePokemon?.id}
            </span>
            <span className="text-norm">{ activePokemon?.name[language] }</span>
          </div>
        </>
      )}
    </div>
  );
};

export default PokedexEntry;
