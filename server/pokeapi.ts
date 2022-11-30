import NodeCache from "node-cache";
import { fetch, formatHeight, formatWeight, padDigit, sleep } from "./utils";

const fetchJson = (url: string) =>
  fetch(url)
    .then((r) => r.json())
    .catch(console.error);

const pokemonCache = new NodeCache();

let fetching = false;
let settingUp = false;

export const isSettingUp = () => settingUp;

const getPokeList = async (first?: boolean): Promise<CachedPokemon[]> => {
  if (first) settingUp = true;
  fetching = true;
  // base data
  const pokemonDataPromise = new Array(151)
    .fill(0)
    .map((_, i) => fetchJson(`https://pokeapi.co/api/v2/pokemon/${i + 1}`));
  // localization data
  const pokemonSpeciesDataPromise = new Array(151)
    .fill(0)
    .map((_, i) =>
      fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${i + 1}`)
    );

  const [pokemonData, pokemonSpeciesData]: [
    PokemonData[],
    PokemonSpeciesData[]
  ] = await Promise.all([
    Promise.all(pokemonDataPromise),
    Promise.all(pokemonSpeciesDataPromise),
  ]);

  const cacheData = pokemonData
    .map((pokemon, i) => ({
      ...pokemon,
      ...pokemonSpeciesData[i],
    }))
    .map(mapPokemonToCache);

  pokemonCache.mset(
    cacheData.map((cachedPokemon) => ({
      key: cachedPokemon.base.id,
      val: cachedPokemon,
    }))
  );

  fetching = false;
  settingUp = false;

  return cacheData;
};

export const getPokemon = async (id: number): Promise<CachedPokemon | null> => {
  // clamp this for now just in case we weirdly call this for a non-kanto pokemon
  // (this should theoretically not matter at all but there's no harm in adding this constraint)
  if (id > 0 && id <= 151) {
    // first try and grab from cache
    const cachedPokemon = pokemonCache.get<CachedPokemon>(id);
    if (cachedPokemon) {
      return cachedPokemon;
    } else {
      const [pokemonData, pokemonSpeciesData]: [
        PokemonData,
        PokemonSpeciesData
      ] = await Promise.all([
        fetchJson(`https://pokeapi.co/api/v2/pokemon/${id}`),
        fetchJson(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
      ]);

      if (pokemonData?.id && pokemonSpeciesData?.id) {
        const cachedPokemon: CachedPokemon = mapPokemonToCache({
          ...pokemonData,
          ...pokemonSpeciesData,
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

export const getAllPokemon = async (
  tries = 0
): Promise<CachedPokemon[] | null> => {
  const keys = new Array(151).fill(0).map((_, i) => i + 1);
  const allPokemon = pokemonCache.mget<CachedPokemon>(keys);
  const entries = Object.entries(allPokemon).filter(
    ([id, pokemon]) => Object.keys(pokemon).length
  );

  // if for whatever reason we dont have all pokemon check to see if we're currently fetching them
  // if we're not fetching them already, fetch them and then recurse
  // only allow this type of recursion 5 times (aka 1 second of sleeping and then returning not including the actual pokeapi fetch time)
  if (entries.length < 151) {
    if (tries <= 5) {
      if (fetching) {
        // wait a little bit and then try again
        // TODO: build out a better way to emit when `getPokemonList` finishes and resolve that here
        await sleep(200);
        return getAllPokemon(tries + 1);
      } else {
        // try fetching the entirety of this
        await getPokeList();
        return getAllPokemon(tries + 1);
      }
    } else {
      // bail out. this is not working at this point
      return null;
    }
  }

  // dont bother comparing `id` here since doing the string -> int conversion is a pointless function call
  return entries
    .map(([id, pokemon]) => pokemon)
    .sort((pokeA, pokeB) => pokeA.base.id - pokeB.base.id);
};

// TODO: make this language agnostic and map all localizations for the name/ species/ entry keys
export const mapPokemonToLexmon = (pokemon: Pokemon): Lexmon => ({
  id: padDigit(pokemon.id),
  name: {
    en: pokemon.names[8].name.toUpperCase(),
    de: pokemon.names[5].name.toUpperCase(),
    fr: pokemon.names[4].name.toUpperCase(),
  },
  image: `images/${pokemon.id}.png`,
  cry: `cries/${pokemon.id}.wav`,
  ht: {
    imperial: formatHeight("imperial", pokemon.height),
    metric: formatHeight("metric", pokemon.height),
  },
  wt: {
    imperial: formatWeight("imperial", pokemon.weight),
    metric: formatWeight("metric", pokemon.weight),
  },
  species: {
    en: pokemon.genera[7].genus.replace(" Pokémon", "").toUpperCase(),
    de: pokemon.genera[4].genus.replace("-Pokémon", "").toUpperCase(),
    fr: pokemon.genera[3].genus.replace("Pokémon ", "").toUpperCase(),
  },
  entry: {
    en: pokemon.flavor_text_entries[6].flavor_text
      .replace(/\n/gi, " ")
      .replace(/\f/gi, " "),
    de: pokemon.flavor_text_entries[25].flavor_text
      .replace(/\n/gi, " ")
      .replace(/\f/gi, " "),
    fr: pokemon.flavor_text_entries[24].flavor_text
      .replace(/\n/gi, " ")
      .replace(/\f/gi, " "),
  },
});

const mapPokemonToCache = (pokemon: Pokemon): CachedPokemon => ({
  base: pokemon,
  lex: mapPokemonToLexmon(pokemon),
});

export default getPokeList;
