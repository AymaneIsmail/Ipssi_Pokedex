import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js/auto';
import { stat } from 'fs';
import { useEffect, useState } from 'react';
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import { Line, Bar } from 'react-chartjs-2';

type StatProps = {
    id: string,
    // labels: string[],
}

type PokemonStats = {
    stats: Stats[]
}

type Stats = {
    base_stat: number,
    effort: number,
    stat: { name: string, url: string }
}

export function Stats({ id }: StatProps) {
    const [stats, setStats] = useState<PokemonStats | null>(null)

    useEffect(() => {
        const stats = async () => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            const data = await response.json()
            // console.log(data)
            setStats(data)
        }

        stats()
    }, [])

    const options = {
        responsive: true,
        plugins: {
            legend: {
                // position: 'top' as const,
                display: false,
            },
            title: {
                display: true,
                text: 'Stats',
                font: {
                    size: 16,
                }
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        },
        layout: {
            padding: {
                top: 10, // Ajoute un espace au-dessus du graphique pour le titre
            }
        }
    };


    const pokemonStats = stats && stats.stats;
    const statsValues = pokemonStats && pokemonStats.map((stat) => stat.base_stat)
    const statsLabel = pokemonStats && pokemonStats.map((stat) => stat.stat.name)

    const data = {
        labels: statsLabel ?? [],
        datasets: [
            {
                data: statsValues,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                borderColor: 'rgb(255, 99, 132)',
            },
        ],
    };


    return (
        <div>
            <Bar
                id={id}
                options={options}
                data={data}
            />
        </div>
    )

}