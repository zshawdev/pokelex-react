import express from "express";
import path from "path";
import cors from "cors";

import { getPokemon, getAllPokemon, isSettingUp } from "./pokeapi";
import { sleep } from "./utils";

const app = express();

app.use(cors());
app.use("/cries", express.static(path.join(__dirname, "cries")));
app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());

app.use("*", async (req, res, next) => {
    // an amateur way to let clients load a little longer on initial api requests if the server is still being set up
    if(isSettingUp()) {
      for(let i = 0; i < 5; i++) {
        // TODO: make this recurse properly instead of putting the entire thread to sleep
        if(isSettingUp()) await sleep(1000);
        else break;
      }
    }
    next();
});

app.use("/pokemon/:id", async (req, res, next) => {
  const { id } = req.params;
  
  if(id) {
    const cachedPokemon = await getPokemon(parseInt(id, 10));
    if(cachedPokemon) {
      return res.json(cachedPokemon.lex)
    }
  }

  return res.sendStatus(404);
});

app.use("/pokemon-list", async(req, res, next) => {
  const cachedPokemon = await getAllPokemon();
  if(cachedPokemon) {
    return res.json(cachedPokemon.map(p => ({ name: p.lex.name, id: p.lex.id })));
  }
});

export default app;
