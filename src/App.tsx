import './App.css'
import {useCallback, useState} from "react";
import {History} from "./components/happinessHistory/History";
import {Happiness, useHistory} from "./hook/useHistory";
import {useCount} from "./hook/useCountHappiness";
import {useMetricSystem} from "./hook/useScale";
import ToggleSwitch from "./components/toggleSwitch/ToggleSwitch";
import {Parameter} from "./components/parameterForm/Parameter";
import {formElements} from "./utils/formElements";

function App() {
    const {isMetricSystem, onMetricSystemChange} = useMetricSystem();
    const [happiness, setHappiness] = useState<number>();
    const [error, setError] = useState('');
    const {result, isError} = useCount({transformEnabled: !isMetricSystem});

    const [showHistory, setShowHistory] = useState(false);
    const {happinessHistory, onHistoryChange, onClear} = useHistory();

    const onCount = useCallback(() => {
        if (isError) {
            setError('Oops! All fields should be filled');
            return;
        }
        setError('');

        const date = new Date();
        const happy = {
            value: result,
            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        };
        setHappiness(result);
        onHistoryChange(happy as Happiness);
    }, [result, setHappiness, setError, onHistoryChange, isError]);

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
                        <Parameter label={item.name}
                                   elementType={item.elementType}
                                   type={item.type}
                                   parameterKey={item.key}
                                   key={item.key}
                                   isTransformed={item.isTransformed}
                                   options={item.options} />
                    )
                })
            }
            <button id={'countButton'} className={'count-button'} onClick={onCount}>Count my happiness</button>
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
