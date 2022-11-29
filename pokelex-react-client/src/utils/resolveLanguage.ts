import { LangOption, LANG_OPTIONS } from "../hooks/useLanguage";

const resolveLanguage = (): LangOption => {
  const url = new URL(window.location.href);

  // check url param first
  const param = url.searchParams.get("lang");
  if(param && LANG_OPTIONS.includes(param as LangOption)) {
    return param as LangOption;
  }

  // now check path matching
  const pathIndex = url.pathname.indexOf("/lang/");
  if(pathIndex > -1) {
    const lang = url.pathname.slice(pathIndex + ("/lang/").length, 2);
    if(LANG_OPTIONS.includes(lang as LangOption)) {
      return lang as LangOption;
    }
  }

  // fall back to localstorage
  const langStorage = localStorage.getItem("lang");
  if(langStorage && LANG_OPTIONS.includes(langStorage as LangOption)) {
    return langStorage as LangOption;
  }

  // default to English
  return "en";
};

export default resolveLanguage;
