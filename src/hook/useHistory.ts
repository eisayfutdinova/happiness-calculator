import {useCallback, useEffect, useMemo, useState} from "react";
import {average} from "../utils/average";

export interface Happiness {
    value: number,
    date: string,
}

export function useHistory() {
    const [happinessHistory, setHappinessHistory] = useState<Happiness[]>([]);

    const averageHappiness = useMemo(() => {
        const historyValues = happinessHistory.map(happiness => +happiness.value);
        return historyValues.length ? average(historyValues) : undefined;
    }, [happinessHistory]);

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

    return {happinessHistory, onHistoryChange: onChange, onClear, averageHappiness}
}
