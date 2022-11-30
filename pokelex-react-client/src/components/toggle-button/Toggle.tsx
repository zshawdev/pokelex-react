import React from "react";

import "./Toggle.css";

const Toggle: React.FC<{ onClick: () => void }> = ({ onClick }) => (
  <span
    onClick={onClick}
    className="h-[calc((0.8rem*2)+(0.2rem*3))] block md:hidden absolute top-[2.8rem] left-8 cursor-pointer"
  >
    <span className="icon">&nbsp;</span>
  </span>
);

export default Toggle;
