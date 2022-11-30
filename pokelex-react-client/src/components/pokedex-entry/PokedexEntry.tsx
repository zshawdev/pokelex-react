import React, { useState, useEffect, useRef } from "react";
import { getResource } from "../../api";
import useLanguage from "../../hooks/useLanguage";
import usePokemon from "../../hooks/usePokemon";
import { MEASURE_CHOICE } from "../../utils/constants";
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
  const entryPaneRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (activePokemon && activePokemon.cry) {
      setAudiofile(new Audio(getResource(activePokemon.cry)));
    }
  }, [activePokemon]);

  const styleProps = { style: { display: entryPaneActive ? "block" : "none" } };

  const playAudio = () => {
    if (audioFile) audioFile.play();
  };

  const scrollPad = { paddingRight: entryPaneRef.current ? entryPaneRef.current.offsetWidth - entryPaneRef.current.clientWidth : 17 };

  if(!entryPaneActive) return null;

  return (
    <div
      {...styleProps}
      className="body-pane md:w-[55%] md:border-l md:border-solid border-white overflow-hidden"
    >
      {fetchingPokemon ? (
        <Loading size={100} useText={false} />
      ) : (
        <div ref={entryPaneRef} style={scrollPad} className="h-full w-full box-content overflow-y-scroll">
          <div className="flex flex-col items-center">
            <span className="text-accent mt-xsmall">
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
          {activePokemon && (<>
            <div className="flex gap-[1.6rem] my-0 mx-small">
              <span>
                <span className="text-accent">{ speciesMap[language] }</span>&nbsp;
                {activePokemon.species[language]}
              </span>
              <span>
                <span className="text-accent">{ heightMap[language] }</span>&nbsp;
                {activePokemon.ht[MEASURE_CHOICE[language]]}
              </span>
              <span>
                <span className="text-accent">{ weightMap[language] }</span>&nbsp;
                {activePokemon.wt[MEASURE_CHOICE[language]]}
              </span>
            </div>
            <p className="text-small border-t border-white border-solid my-0 mx-small">
              { activePokemon.entry[language] }
            </p>
          </>)}
        </div>
      )}
    </div>
  );
};

export default PokedexEntry;
