import React from "react";
import { LangButton } from "../../components";
import useLanguage from "../../hooks/useLanguage";

const langMap: Record<LangOption, Record<LangOption, string>> = {
  en: { en: "ENGLISH", fr: "FRENCH", de: "GERMAN" },
  fr: { en: "ANGLAIS", fr: "FRANÇAIS", de: "ALLEMAND" },
  de: { en: "ENGLISCH", fr: "FRANZÖSISCH", de: "DEUTSCH" },
};

const Lang: React.FC = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-center gap-16 bg-[rgba(43,33,33,0.3)] py-4 px-16 z-10">
      {Object.keys(langMap).map(lang => (
        <LangButton
          key={lang}
          text={langMap[language][lang as LangOption]}
          onPress={() => setLanguage(lang as LangOption)}
          active={language === lang}
        />
      ))}
    </div>
  );
};

export default Lang;
