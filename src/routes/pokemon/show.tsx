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

    console.log(pokemonStats)

    return (
        <>
            <section className=" flex items-start overflow-hidden">
                <div className="card h-[150px] w-[150px]" style={{ backgroundImage: `url(${pokemonStats && pokemonStats.sprites.front_default})` }}></div>
                <h2 className="first-letter:uppercase text-black text-8xl tracking-widest">{pokemonStats && pokemonStats.name}</h2>
            </section>
        </>
    );
}
