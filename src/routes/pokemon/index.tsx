import { StatProvider } from "@/components/Pokemon/StatContext";
import { Stat } from "@/components/Pokemon/Stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { parseUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPokemons } from '../../utils/api';
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { GetPokemon } from "@/types/Pokemon";

export function Index() {
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState<GetPokemon[]>([]);

    const query = useQuery({
        queryKey: ['pokemons', offset],
        queryFn: () => getPokemons(offset),
        placeholderData: keepPreviousData
    });

    useEffect(() => {
        if (query.isSuccess) {
            setFilteredPokemons(prev => {
                if (offset === 0) {
                    return query.data.results;
                } else {
                    // Filtrer les nouveaux Pokémon pour supprimer les redondances
                    const newPokemons = query.data.results.filter(newPokemon => !prev.some(prevPokemon => prevPokemon.name === newPokemon.name));
                    return [...prev, ...newPokemons];
                }
            });
        }
    }, [query.isSuccess, query.data, offset]);

    if (query.isError || !query.isSuccess) {
        return (<div>
            Error
        </div>);
    }

    if (query.isLoading) {
        return (<div>
            Loading
        </div>);
    }

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm)

        const filteredPokemons = query.data.results.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        if (filteredPokemons) {
            setFilteredPokemons(filteredPokemons);
        }
    };

    const loadMorePokemons = () => {
        setOffset((prevOffset) => prevOffset + 12)
    }

    return (
        <>
            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Search Pokemon..."
                    value={searchTerm}
                    onChange={handleSearch}
                />
            </div>
            <StatProvider>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
                    {filteredPokemons && filteredPokemons.map((pokemon) => {
                        const imageUrl = parseUrl(pokemon.url);
                        const id = pokemon.url.split('/')[6]
                        return (
                            <Card key={pokemon.name} className="mx-auto bg-white max-w-[350px] w-full">
                                <CardHeader>
                                    <CardTitle>Pokemon</CardTitle>
                                    <Avatar>
                                        {imageUrl !== false && typeof imageUrl === 'string' ?
                                            <AvatarImage src={imageUrl} alt={pokemon.name} /> :
                                            <AvatarFallback>CN</AvatarFallback>
                                        }
                                    </Avatar>
                                </CardHeader>
                                <CardContent className="flex flex-col items-center justify-center">
                                    <p className="first-letter:uppercase text-lg font-bold tracking-wide">{pokemon.name}</p>
                                    <Stat pokemonName={pokemon.name} />
                                </CardContent>
                                <CardFooter>
                                    <Link className="w-full" to={`/${id}`}>
                                        <Button className="w-full" variant="outline">
                                            Voir
                                        </Button>
                                    </Link>
                                </CardFooter>
                            </Card>
                        );
                    })}
                </div >
            </StatProvider>
            {loading ? <p>Loading...</p> : 
            <Button className="w-full mt-4" variant='default' onClick={loadMorePokemons}>
                Charger plus de Pokemons
            </Button>}
        </>
    )
}
