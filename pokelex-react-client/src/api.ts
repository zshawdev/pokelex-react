import fetchJson from "./utils/fetch";

// TODO: have this handled using env secrets and insert in CI/CD where appropriate
const BASE_URL = process.env.NODE_ENV === "production" ? "https://api.pokelex.com/" : "http://localhost:3000/";

export const getAllPokemon = async () => fetchJson(BASE_URL + "pokemon/");

export const getPokemon = async (id: number) => fetchJson(BASE_URL + "pokemon/" + id);

export const getPokemonList = async () => fetchJson(BASE_URL + "pokemon-list/");

export const setup = async () => {
  const [pokemonList, pikachu]: [PokemonName[], Lexmon] = await Promise.all([
    getPokemonList(),
    getPokemon(25)
  ]);

  return {
    pokemonList,
    pikachu
  };
}
