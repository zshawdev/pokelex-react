import React, { useState, useEffect } from "react";
import { getResource } from "../../api";
import useLanguage from "../../hooks/useLanguage";
import usePokemon from "../../hooks/usePokemon";
import Loading from "../Loading";

import "./PokedexEntry.css";

const PokedexEntry: React.FC<{ entryPaneActive?: boolean }> = ({
  entryPaneActive = true,
}) => {
  const { language } = useLanguage();
  const { activePokemon, fetchingPokemon } = usePokemon();
  const [audioFile, setAudiofile] = useState<HTMLAudioElement>();

  useEffect(() => {
    if(activePokemon && activePokemon.cry) {
      setAudiofile(new Audio(getResource(activePokemon.cry)));
    }
  }, [activePokemon]);

  const styleProps = { style: { display: entryPaneActive ? "block" : "none" } };

  const playAudio = () => {
    if(audioFile) audioFile.play();
  }

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
            <span className="text-norm">{ activePokemon?.name?.[language] ?? "MissingNo." }</span>
            <img className={"mt-[0.8rem] w-[8.536rem]"} src={getResource( activePokemon?.image ?? "images/missingno.png")} />
            <img className="" src="assets/img/icons/speaker.png" onClick={playAudio} />
          </div>
        </>
      )}
    </div>
  );
};

export default PokedexEntry;
