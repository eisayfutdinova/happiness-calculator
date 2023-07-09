import {useCallback, useEffect, useState} from "react";

export function useMetricSystem() {
    const [isMetricSystem, setIsMetricSystem] = useState<boolean>(true);

    useEffect(() => {
        const savedScale = localStorage.getItem('isMetricSystem');
        if (savedScale !== null) {
            setIsMetricSystem(JSON.parse(savedScale));
        }
    }, [setIsMetricSystem]);

    const onChange = useCallback(() => {
        setIsMetricSystem(!isMetricSystem);
        localStorage.setItem('isMetricSystem', JSON.stringify(!isMetricSystem));
    }, [setIsMetricSystem, isMetricSystem]);

    return {
        isMetricSystem,
        onMetricSystemChange: onChange
    }
}
