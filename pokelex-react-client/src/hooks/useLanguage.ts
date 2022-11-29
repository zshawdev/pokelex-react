import React, { createContext, useContext } from "react";

export const LANG_OPTIONS = ["en", "fr", "de"] as const;
export type LangOption = typeof LANG_OPTIONS[number];
export interface Language {
  language: LangOption;
  setLanguage: React.Dispatch<React.SetStateAction<LangOption>>;
}
const LanguageContext = createContext<Language>({ language: "en", setLanguage: () => {} });
export const LanguageContextProvider = LanguageContext.Provider;

const useLanguage = () => useContext(LanguageContext);
export default useLanguage;
