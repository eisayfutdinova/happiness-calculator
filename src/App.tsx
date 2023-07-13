import './App.css'
import {useCallback, useState} from "react";
import {History} from "./components/happinessHistory/History";
import {Happiness, useHistory} from "./hook/useHistory";
import {useCount} from "./hook/useCountHappiness";
import {useMetricSystem} from "./hook/useScale";
import ToggleSwitch from "./components/toggleSwitch/ToggleSwitch";
import {Parameter} from "./components/parameterForm/Parameter";
import * as formElementsJson from './forms/forms.json';
import {FormInterface} from "./types/types";

function App() {
    const [formElements] = useState(formElementsJson.forms);
    const {isMetricSystem, onMetricSystemChange} = useMetricSystem();
    const [happiness, setHappiness] = useState<number>();
    const [error, setError] = useState('');
    const {result, handleChange, isError} = useCount({ formElements: formElements as FormInterface[] });

    const [showHistory, setShowHistory] = useState(false);
    const {happinessHistory, averageHappiness, onHistoryChange, onClear} = useHistory();

    const onCount = useCallback(() => {
        if (isError) {
            setError('Oops! All fields should be filled');
            return;
        }
        setError('');

        const date = new Date();
        const happy = {
            value: +result,
            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        };
        setHappiness(+result.toFixed(3));
        onHistoryChange(happy as Happiness);
    }, [result, setHappiness, setError, onHistoryChange, error, isError]);

    return (
        <div className={'container'}>
            <h2 className={'title'}>Happiness calculator</h2>
            <div className={'toggle'}>
                <ToggleSwitch label={'Imperial system'} checked={!isMetricSystem} onChange={onMetricSystemChange}/>
            </div>
            {error && <div className={'error'}>{error}</div>}
                {
                    formElements?.map(item => {
                        return (
                            <Parameter item={item as FormInterface}
                                       averageHappiness={averageHappiness}
                                       isMetricSystem={isMetricSystem}
                                       key={item.key}
                                       onError={(error) => setError(error)}
                                       handleChange={(e) => handleChange(e, item.key)}/>
                        )
                    })
                }
            <button data-testid={'countButton'} disabled={!!error} className={'count-button'} onClick={onCount}>Count my happiness</button>
            {happiness &&
                <div id={'result'} className={'result'}>Your happiness is {happiness}</div>
            }
            <div className={'history'}
                 onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Hide' : 'Show'} history
            </div>
            {showHistory && <History happinessHistory={happinessHistory} onClear={onClear}/>}
        </div>
    )
}

export default App
