import React from "react";

export interface Language {
  lang: "en" | "fr" | "de";
}
const LanguageContext = React.createContext<Language>({ lang: "en" });
export const LanguageContextProvider = LanguageContext.Provider;

const useLanguage = React.useContext(LanguageContext);
export default useLanguage;
