export type PokeApiUrl<T extends string> = `https://pokeapi.co/api/v2/${T}/${string}`;

export interface ApiResource<T extends string = ""> {
  name: string;
  url: PokeApiUrl<T>;
}

type ApiVersionResource = ApiResource<"version">;

interface PokemonAbility {
  ability: ApiResource<"ability">;
  is_hidden: boolean;
  slot: number;
}

interface GameIndex {
  game_index: number;
  version: ApiVersionResource;
}

interface HeldItem {
  item: ApiResource<"item">;
  version_details: {
    rarity: number;
    version: ApiVersionResource;
  }[];
}

interface PokemonMove {
  move: ApiResource;
  version_group_details: {
    level_learned_at: number;
    move_learn_method: ApiResource<"move-learn-method">;
    version_group: ApiResource<"version-group">;
  };
}

interface PastType {
  generation: ApiResource<"generation">;
  types: ApiResource<"type">;
}

interface FrontSprite {
  front_default: string;
  front_female: string | null;
}

interface FrontShinySprite {
  front_shiny: string;
  front_female_shiny: string | null;
}

interface GenerationSprite {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}


// TODO: make the versions object here its own auto-generated interface
interface PokemonSprites extends FrontSprite, FrontShinySprite {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  other: {
    dream_world: FrontSprite;
    home: FrontSprite & FrontShinySprite;
    'official-artwork': FrontSprite;
  };
  versions: {
    'generation-i': {
      'red-blue': GenerationSprite;
      yellow: GenerationSprite;
    }; // ignore all other generations for now since this is just a lot of boilerplate
  }
}

interface PokemonStat {
  base_stat: number;
  effort: number;
  stat: ApiResource<"stat">;
}

interface PokemonType {
  slot: number;
  type: ApiResource<"type">;
}

export interface PokemonData {
  id: number;
  abilities: PokemonAbility[];
  base_experience: number;
  forms: ApiResource[];
  game_indices: GameIndex[];
  height: number;
  held_items: HeldItem[];
  is_default: boolean;
  location_area_encounters: PokeApiUrl<"pokemon">;
  moves: PokemonMove[];
  name: string;
  order: number;
  past_types: PastType[];
  species: ApiResource<"pokemon-species">;
  sprites: PokemonSprites;
  stats: PokemonStat[];
  types: [PokemonType] | [PokemonType, PokemonType];
  weight: number;
}


// `LanguageGeneric<K, V>` is any object that has some kind of language api resource combined with an optional game version and some other identifier (defaults to "name").
// This could theoretically be expanded to be used with all ApiResource interfaces (mainly this GenericRecord bit) but this would require a much deeper understanding of how the entire pokeapi is laid out and all potential values keys can take for these resources (not to mention some gross type mapping for specific key values)
interface Language<V extends boolean = false> {
  language: ApiResource<"language">;
  version: V extends false ? never : ApiVersionResource;
}
type GenericRecord<K extends string> = Record<K, string>;
type LanguageGeneric<K extends string = "name", V extends boolean = false> = Language<V> & GenericRecord<K>;

// none of the first 151 pokemon have this data so we're just stubbing it for now
interface FormDescription {}

interface PalParkEncounter {
  area: ApiResource<"pal-park-area">;
  base_score: number;
  rate: number;
}

interface PokemonVariety {
  is_default: boolean;
  pokemon: ApiResource<"pokemon">;
}

export interface PokemonSpeciesData {
  id: number;
  base_happiness: number;
  capture_rate: number;
  egg_groups: ApiResource<"egg-group">[];
  evolution_chain: { url: PokeApiUrl<"evolution-chain"> };
  evolves_from_species: null | '';
  flavor_text_entries: LanguageGeneric<"flavor_text", true>[];
  form_descriptions: FormDescription[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: LanguageGeneric<"genus">[];
  generation: ApiResource<"generation">;
  growth_rate: ApiResource<"growth-rate">;
  habitat: ApiResource<"pokemon-habitat">;
  has_gender_differences: boolean;
  hatch_counter: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: LanguageGeneric[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  shape: ApiResource<"pokemon-shape">;
  varieties: PokemonVariety[];
}

export type Pokemon = PokemonData & PokemonSpeciesData;

export interface Lexmon {
  id: string;
  name: string;
  image: string;
  cry: string;
  ht: string;
  wt: string;
  species: string;
  entry: string;
}

export interface CachedPokemon {
  base: Pokemon;
  lex: Lexmon;
}
