import { Stats } from "@/components/Pokemon/Stats";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { parseUrl } from "@/lib/utils";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

type GetPokemon = {
    name: string,
    url: string,
}

type CardProps = React.ComponentProps<typeof Card>

export function Index({ className, ...props }: CardProps) {

    const [pokemons, setPokemons] = useState<GetPokemon[] | null>(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
                const data = await res.json();
                setPokemons(data.results);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-11">
                {pokemons && pokemons.map((pokemon) => {
                    const imageUrl = parseUrl(pokemon.url);
                    return (
                        <Card key={pokemon.name} className="w-full">
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
                                {pokemon.name}
                                <Stats id={pokemon.url.split('/')[6]} />
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="outline">
                                    <Link to={pokemon.url}>Voir</Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    );
                }
                )}
            </div >
        </>
    )
}