import React, { useState, useEffect } from "react";
import { getResource } from "../../api";
import useLanguage from "../../hooks/useLanguage";
import usePokemon from "../../hooks/usePokemon";
import Loading from "../Loading";

import "./PokedexEntry.css";

const speciesMap: LangSplit = {
  en: "SPECIES",
  fr: "ESPÈCES",
  de: "SPECIES"
};

const heightMap: LangSplit = {
  en: "HT",
  fr: "TAI",
  de: "GR."
};

const weightMap: LangSplit = {
  en: "WT",
  fr: "PDS",
  de: "GEW"
};

const PokedexEntry: React.FC<{ entryPaneActive?: boolean }> = ({
  entryPaneActive = true,
}) => {
  const { language } = useLanguage();
  const { activePokemon, fetchingPokemon } = usePokemon();
  const [audioFile, setAudiofile] = useState<HTMLAudioElement>();

  useEffect(() => {
    if (activePokemon && activePokemon.cry) {
      setAudiofile(new Audio(getResource(activePokemon.cry)));
    }
  }, [activePokemon]);

  const styleProps = { style: { display: entryPaneActive ? "block" : "none" } };

  const playAudio = () => {
    if (audioFile) audioFile.play();
  };

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
            <span className="text-norm">
              {activePokemon?.name?.[language] ?? "MissingNo."}
            </span>
            <img
              className={"mt-[0.8rem] w-[8.536rem] select-none"}
              src={getResource(activePokemon?.image ?? "images/missingno.png")}
            />
            <img
              className="cursor-pointer mb-4 mt-[0.8rem] w-6 hover:opacity-80 select-none"
              src="assets/img/icons/speaker.png"
              onClick={playAudio}
            />
          </div>
          {activePokemon && (
            <div className="flex gap-[1.6rem] my-0 mx-[1.8rem]">
              <span>
                <span className="text-accent">{ speciesMap[language] }</span>&nbsp;
                {activePokemon.species[language]}
              </span>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PokedexEntry;
