import React from "react";

import "./Body.css";

const Body: React.FC = () => {
  return (
    <div className="absolute z-10 top-1/2 left-1/2 flex text-white">
      <span className="block md:hidden">
        <span className="icon">&nbsp;</span>
      </span>
    </div>
  );
};

export default Body;
