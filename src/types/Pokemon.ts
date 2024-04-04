export type Stat = {
    stats: PokemonStat[]

}

export type PokemonStat = {
    base_stat: number
    effort: number
    stat: { name: string, url: string }
}

export type GetPokemon = {
    name: string,
    url: string,
}

export type PokemonListResponse = {
    count: number;
    next: string | null;
    previous: string | null;
    results: {
      name: string;
      url: string;
    }[];
  };