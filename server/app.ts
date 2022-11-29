import express from "express";
import path from "path";

import { getPokemon, getAllPokemon, isSettingUp } from "./pokeapi";
import { sleep } from "./utils";

const app = express();

app.use("/cries", express.static(path.join(__dirname, "cries")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

app.use("/pokemon/:id", async (req, res, next) => {
  // an amateur way to let clients load a little longer on initial api requests if the server is still being set up
  if(isSettingUp()) {
    for(let i = 0; i < 5; i++) {
      // TODO: make this recurse properly instead of putting the entire thread to sleep
      if(isSettingUp()) await sleep(1000);
      else break;
    }
  }

  const { id } = req.params;
  
  if(id) {
    const cachedPokemon = await getPokemon(parseInt(id, 10));
    if(cachedPokemon) {
      return res.json(cachedPokemon.lex)
    }
  } else {
    const cachedPokemon = await getAllPokemon();
    if(cachedPokemon) {
      return res.json(cachedPokemon.map(p => p.lex));
    }
  }

  return res.sendStatus(404);
});

export default app;
