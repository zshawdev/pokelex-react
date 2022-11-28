import { fetch } from "./utils";

const fetchJson = (url: string) => fetch(url).then(r => r.json()).catch(console.error);

const getPokeList = async () => {
  // base data
  const pokemonDataPromise = new Array(151).fill(0).map((_, i) => fetchJson(`https://pokeapi.co/api/v2/pokemon/${i + 1}`));
  // localization data
  const pokemonSpeciesDataPromise = new Array(151).fill(0).map((_, i) => fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`));
  
  const [pokemonData, pokemonSpeciesData]: [any[], any[]] = await Promise.all([
    Promise.all(pokemonDataPromise),
    Promise.all(pokemonSpeciesDataPromise)
  ]);

  return pokemonData.map((data, i) => ({ 
    ...data,
    ...pokemonSpeciesData[i]
  }));
};

export default getPokeList;
