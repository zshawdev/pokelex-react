import fetchJson from "./utils/fetch";

// TODO: have this handled using env secrets and insert in CI/CD where appropriate
const BASE_URL = process.env.NODE_ENV === "production" ? "https://api.pokelex.com/" : "http://localhost:3000/";

export const getAllPokemon = () => fetchJson(BASE_URL + "pokemon/");

export const getPokemon = (id: number) => fetchJson(BASE_URL + "pokemon/" + id);

export const getPokemonList = () => fetchJson(BASE_URL + "pokemon-list/");
