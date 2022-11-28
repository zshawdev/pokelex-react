import express from "express";
import path from "path";

import { getPokemon, getAllPokemon } from "./pokeapi";

const app = express();

app.use("/cries", express.static(path.join(__dirname, "..", "cries")));
app.use("/images", express.static(path.join(__dirname, "..", "images")));
app.use(express.json());

app.use("/pokemon/:id", async (req, res, next) => {
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
