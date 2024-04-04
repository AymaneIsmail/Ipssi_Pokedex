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
import { Input } from "@/components/ui/input";

export function Index() {
    const [loading, setLoading] = useState(false);
    const [offset, setOffset] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');
    const [pokemons, setPokemons] = useState<GetPokemon[]>([]);

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey: ['pokemons', offset],
        queryFn: () => getPokemons(offset),
        placeholderData: keepPreviousData
    });

    useEffect(() => {
        if (isSuccess && data.results) {
            setPokemons(prevPokemons => [...prevPokemons, ...data.results]);
            setLoading(false)
        }
    }, [isSuccess, data]);

    const loadMorePokemons = () => {
        setLoading(true)
        setOffset(prevOffset => prevOffset + 12);
    }

    const filteredPokemons = pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError || !isSuccess) {
        return <div>Error</div>;
    }

    return (
        <>
            <Input
                className="my-4 w-1/2"
                type="text"
                placeholder="Search Pokemon..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-11">
                <StatProvider>
                    {filteredPokemons.map((pokemon, index) => {
                        const imageUrl = parseUrl(pokemon.url);
                        const id = pokemon.url.split('/')[6];
                        return (
                            <Card key={index} className="mx-auto sm:mx-0 bg-white max-w-[350px] w-full">
                                <CardHeader>
                                    <CardTitle>Pokemon</CardTitle>
                                    <Avatar className="h-24 w-24">
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
                </StatProvider>
            </div >
            {loading ? <p>Loading...</p> :
                <Button className="w-full mt-8 text-lg font-medium tracking-normal" variant='default' onClick={loadMorePokemons}>
                    Load more Pokemons
                </Button>}
        </>
    );
}
