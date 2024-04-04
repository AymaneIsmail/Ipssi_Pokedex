import { createContext, useContext, useState, ReactNode } from 'react';

type Stats = {
    [key: string]: PokemonStats;
};


type DataStats = {
    base_stat: number,
    effort: number,
    stat: { name: string, url: string }
}

type PokemonStats = {
    stats: DataStats[]
};

type StatContextType = {
    stats: Stats;
    setStats: (name: string, data: any) => void;
};

const StatContext = createContext<StatContextType | null>(null);

export function StatProvider({ children }: { children: ReactNode }) {
    const [stats, setStatsState] = useState<Stats>({});
    const setStats = (name: string, data: PokemonStats) => {
        setStatsState((prevStats) => ({
            ...prevStats,
            [name]: data,
        }));
    };

    return (
        <StatContext.Provider value={{ stats, setStats }}>
            {children}
        </StatContext.Provider>
    );
}

export function useStats() {
    const context = useContext(StatContext);

    if (context === null) {
        throw new Error('useStats must be used within a StatProvider');
    }

    return context;
}