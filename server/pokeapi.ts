import NodeCache from "node-cache";
import { fetch, metricToFeet, metricToPounds, padDigit } from "./utils";
import {
  Pokemon,
  Lexmon,
  PokemonData,
  PokemonSpeciesData,
  CachedPokemon
} from "./types";

const fetchJson = (url: string) => fetch(url).then(r => r.json()).catch(console.error);

const pokemonCache = new NodeCache();

const getPokeList = async (): Promise<CachedPokemon[]> => {
  // base data
  const pokemonDataPromise = new Array(151).fill(0).map((_, i) => fetchJson(`https://pokeapi.co/api/v2/pokemon/${i + 1}`));
  // localization data
  const pokemonSpeciesDataPromise = new Array(151).fill(0).map((_, i) => fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`));

  const [pokemonData, pokemonSpeciesData]: [PokemonData[], PokemonSpeciesData[]] = await Promise.all([
    Promise.all(pokemonDataPromise),
    Promise.all(pokemonSpeciesDataPromise)
  ]);

  const cacheData = pokemonData.map((pokemon, i) => ({ 
    ...pokemon,
    ...pokemonSpeciesData[i]
  })).map(mapPokemonToCache);

  pokemonCache.mset(cacheData.map(cachedPokemon => ({ key: cachedPokemon.base.id, val: cachedPokemon })));

  return cacheData;
};

export const getPokemon = async (id: number): Promise<CachedPokemon | null> => {
  // clamp this for now just in case we weirdly call this for a non-kanto pokemon
  if (id > 0 && id <= 151) {
    // first try and grab from cache
    const cachedPokemon = pokemonCache.get<CachedPokemon>(id);
    if(cachedPokemon) {
      return cachedPokemon;
    } else {
      const [pokemonData, pokemonSpeciesData]: [PokemonData, PokemonSpeciesData] = await Promise.all([
        fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`),
        fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${id}`)
      ]);

      if(pokemonData?.id && pokemonSpeciesData?.id) {
        const cachedPokemon: CachedPokemon = mapPokemonToCache({
          ...pokemonData,
          ...pokemonSpeciesData
        });
  
        pokemonCache.set(cachedPokemon.base.id, cachedPokemon);
  
        return cachedPokemon;
      }
    }
  } else {
    console.warn("Calling `getPokemon` for non-Kanto Pokémon!");
  }
  return null;
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

const mapPokemonToCache = (pokemon: Pokemon): CachedPokemon => ({
  base: pokemon,
  lex: mapPokemonToLexmon(pokemon),
});

export default getPokeList;
