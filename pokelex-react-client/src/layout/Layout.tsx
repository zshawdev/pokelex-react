import React from "react";
import { Background } from "./background";
import { Body } from "./body";
import { Lang } from "./lang";
import { Pokeball } from "./pokeball";

const Layout: React.FC = () => {
  return (
    <article>
      <Background />
      <Lang />
      <Pokeball />
      <Body />
    </article>
  );
};

export default Layout;
