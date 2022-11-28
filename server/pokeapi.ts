import { fetch, metricToFeet, metricToPounds, padDigit } from "./utils";
import {
  Pokemon,
  Lexmon,
  PokemonData,
  PokemonSpeciesData,
} from "./types";

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

export const mapPokemonToLexmon = (pokemon: Pokemon): Lexmon => ({
  id: padDigit(pokemon.id),
  name: pokemon.name.toUpperCase(),
  image: `images/${pokemon.id}.png`,
  cry: `cries/${pokemon.id}.png`,
  ht: metricToFeet(pokemon.height),
  wt: metricToPounds(pokemon.weight),
  species: pokemon.genera[7].genus.replace(' Pokémon', '').toUpperCase(),
  entry: pokemon.flavor_text_entries[6].flavor_text.replace(/\n/gi, ' ').replace(/\f/gi, ' '),
});
export default getPokeList;
