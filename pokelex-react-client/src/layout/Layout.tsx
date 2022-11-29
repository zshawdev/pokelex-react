import React from "react";
import { Background } from "./background";
import { Pokeball } from "./pokeball";

const Layout: React.FC = () => {
  return (
    <article>
      <Background />
      <Pokeball />
    </article>
  );
};

export default Layout;
