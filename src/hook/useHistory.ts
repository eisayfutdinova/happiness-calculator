import {useCallback, useEffect, useState} from "react";

export interface Happiness {
    value: number,
    date: string,
}

export function useHistory() {
    const [happinessHistory, setHappinessHistory] = useState<Happiness[]>([]);

    useEffect(() => {
        const store = localStorage.getItem('happiness');
        if (store) {
            setHappinessHistory(JSON.parse(store));
        }
    }, [setHappinessHistory]);

    const onChange = useCallback((result: Happiness) => {
        setHappinessHistory([...happinessHistory, result]);
        localStorage.setItem('happiness', JSON.stringify([...happinessHistory, result]));
    }, [setHappinessHistory, happinessHistory]);

    const onClear = () => {
        setHappinessHistory([]);
        localStorage.removeItem('happiness');
    };

    return {happinessHistory, onHistoryChange: onChange, onClear}
}
