import { StatProvider } from "@/components/Pokemon/StatContext";
import { Stat } from "@/components/Pokemon/Stats";
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

export function Index() {

    const [pokemons, setPokemons] = useState<GetPokemon[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredPokemons, setFilteredPokemons] = useState<GetPokemon[]>([]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=12&offset=${offset}`);
            const data = await res.json();
            setPokemons((prevPokemonsData) => {
                const newPokemons = data.results.filter((newPokemon: GetPokemon) => !prevPokemonsData || !prevPokemonsData.some(prevPokemon => prevPokemon.name === newPokemon.name));
                return prevPokemonsData ? [...prevPokemonsData, ...newPokemons] : newPokemons;
            });

            setFilteredPokemons((prevPokemonsData) => {
                const newPokemons = data.results.filter((newPokemon: GetPokemon) => !prevPokemonsData || !prevPokemonsData.some(prevPokemon => prevPokemon.name === newPokemon.name));
                return prevPokemonsData ? [...prevPokemonsData, ...newPokemons] : newPokemons;
            });
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        fetchData();
    }, [offset]);

    const handleScroll = () => {
        const scrollTop = (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop;
        const scrollHeight = (document.documentElement && document.documentElement.scrollHeight) || document.body.scrollHeight;
        const clientHeight = document.documentElement.clientHeight || window.innerHeight;
        const scrolledToBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight;

        if (scrolledToBottom) {
            // Augmenter l'offset pour obtenir plus de données
            setOffset((prevOffset) => prevOffset + 12);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        // Filtrer les pokemons en utilisant le state pokemons
        const filteredPokemons = pokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(searchTerm)
        );
        setFilteredPokemons(filteredPokemons);
    };

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
                    {filteredPokemons.map((pokemon) => {
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
                    }
                    )}
                </div >
            </StatProvider>
            {loading && <p>Loading...</p>}
        </>
    )
}
