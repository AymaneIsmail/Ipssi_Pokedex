import { useEffect, useState } from 'react';
import { useStats } from './StatContext';
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

import { Bar } from 'react-chartjs-2';

type StatComponentProps = {
    pokemonName: string,
}

export function Stat({ pokemonName }: StatComponentProps) {
    const { stats, setStats } = useStats();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!stats[pokemonName]) {
            loadData();
        }
    }, [pokemonName]);

    const loadData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}/`);
            const data = await response.json();
            setStats(pokemonName, data);
        } catch (error) {
            console.error('Error fetching data:', error);
        } finally {
            setLoading(false);
        }
    };

    if (loading || !stats[pokemonName]) {
        return <div>Loading...</div>;
    }

    const pokemonStats = stats[pokemonName].stats;
    const statsValues = pokemonStats.map((stat) => stat.base_stat);
    const statsLabels = pokemonStats.map((stat) => stat.stat.name);

    const data = {
        labels: statsLabels,
        datasets: [
            {
                label: 'Base Stats',
                data: statsValues,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1,
                borderColor: 'rgb(255, 99, 132)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
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
                top: 10,
            }
        }
    };

    return (
        <div>
            <Bar data={data} options={options} />
        </div>
    );
}