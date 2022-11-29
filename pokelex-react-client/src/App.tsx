import React, { useState } from "react";
import { LangOption, LanguageContextProvider } from "./hooks/useLanguage";
import Layout from "./layout/Layout";
import resolveLanguage from "./utils/resolveLanguage";

const App: React.FC = () => {
  const [language, setLanguage] = useState<LangOption>(resolveLanguage());

  return (
    <LanguageContextProvider value={{ language, setLanguage }}>
      <Layout />
    </LanguageContextProvider>
  );
};

export default App;
