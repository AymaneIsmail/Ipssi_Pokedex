import { PokemonListResponse } from "@/types/Pokemon"

export const getPokemons = async (offset: number): Promise<PokemonListResponse> => {
    console.log(offset)
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`)
    return await res.json()
}