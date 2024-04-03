export type Stat = {
    stats: PokemonStat[]

}

export type PokemonStat = {
    base_stat: number
    effort: number
    stat: { name: string, url: string }
}