import React from "react";
import { noop } from "../utils/constants";

export const LANG_OPTIONS = ["en", "fr", "de"] as const;
export type LangOption = typeof LANG_OPTIONS[number];
export interface Language {
  language: LangOption;
  setLanguage: React.Dispatch<React.SetStateAction<LangOption>>;
}
const LanguageContext = React.createContext<Language>({ language: "en", setLanguage: noop });
export const LanguageContextProvider = LanguageContext.Provider;

const useLanguage = () => React.useContext(LanguageContext);
export default useLanguage;
