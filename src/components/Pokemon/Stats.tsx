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

export function Stats({ id, labels }) {
    const [stats, setStats] = useState(null)

    useEffect(() => {
        const stats = async () => {
            const response  = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
            const data = await response.json()
            console.log(data)
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
            },
        },
        scales: {
            x: {
                display: false,
            },
            y: {
                display: false,
            }
        }
    };


    const data = {
        labels,
        datasets: [
            {
                // label: 'Dataset 1',
                data: [50],
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