import { PokemonListResponse } from "@/types/Pokemon"

export const getPokemons = async (offset: number): Promise<PokemonListResponse> => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`)
    return await res.json()
}

export const getStats = async (pokemonName: string) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
    return await response.json();
} 