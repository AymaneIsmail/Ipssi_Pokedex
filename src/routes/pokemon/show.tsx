import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export function Show() {
    let { id } = useParams();
    const [pokemonStats, setPokemonStats] = useState(null);
    useEffect(() => {
        const fetchPokemon = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`);
            const data = await response.json();
            setPokemonStats(data);
        };
        fetchPokemon();
    }, [id]);

    return (
        <>
            <section className=" flex items-start overflow-hidden">
                <div className="card h-[250px] w-[250px]" style={{ backgroundImage: 'url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/1.png)' }}></div>
                <h2 className="first-letter:uppercase text-black text-8xl tracking-widest">{pokemonStats && pokemonStats.name}</h2>
            </section>
        </>
    );
}
