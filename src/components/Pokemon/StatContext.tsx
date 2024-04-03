import { Stat } from '@/types/Pokemon';
import { createContext, useContext, useState, ReactNode } from 'react';


type StatContextType = {
    stats: Stat|null;
    setStats: any;
};


// const StatContext = createContext<StatContextType | null>(null);

// export function StatProvider({ children }: { children: ReactNode }) {
//     const [stats, setStats] = useState<Stat[]>([]);
//     console.log(stats)
//     const getStat = (id: string) => {
//         return stats.find((stat) => stat.id === id)
//     }

//     const setStat = (stat: Stat) => {
//         setStats((prev) => [...prev, stat]);
//     }

//     return (
//         <StatContext.Provider value={{ getStat, setStat }}>
//             {children}
//         </StatContext.Provider>
//     );
// }

// export function useStat() {

//     const context = useContext(StatContext);

//     if (context == null) {
//         throw new Error('Cette fonction ne peux pas être utilisé')
//     }
//     return context
// }


const StatContext = createContext<StatContextType | null>(null)

export function StatProvider({ children }: { children: ReactNode }) {
    const [stats, setStats] = useState<Stat | null>(null)

    return (
        <StatContext.Provider value={{ stats, setStats }}>
            {children}
        </StatContext.Provider>)
}

export function useStats() {
    const context = useContext(StatContext)

    if (context == null) {
        throw new Error('Cette fonction ne peux pas être utilisé')
    }

    return context
}