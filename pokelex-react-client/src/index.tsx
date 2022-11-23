import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./clear.css";
import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("poke") as HTMLElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
