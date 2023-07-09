import './App.css'
import {useCallback, useState} from "react";
import {History} from "./components/happinessHistory/History";
import {useHistory} from "./hook/useHistory";
import {countHappiness} from "./utils/countHappiness";
import {useMetricSystem} from "./hook/useScale";
import ToggleSwitch from "./components/toggleSwitch/ToggleSwitch";

function App() {
    const [sex, setSex] = useState<0 | 1>(0);
    const {isMetricSystem, onMetricSystemChange} = useMetricSystem();
    const [weight, setWeight] = useState<number>(0);
    const [age, setAge] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [happiness, setHappiness] = useState<number>();
    const [error, setError] = useState<string>('');

    const [showHistory, setShowHistory] = useState(false);
    const {happinessHistory, onHistoryChange, onClear} = useHistory();

    const onCount = useCallback(() => {
        if (!weight || !age || !height) {
            setError('Oops! All fields should be filled');
            return;
        }
        const date = new Date();
        const result = {
            value: countHappiness({sex, height, age, weight, isMetricSystem}),
            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        };
        setHappiness(result.value);
        onHistoryChange(result);
    }, [weight, age, height, setError, countHappiness, setHappiness, onHistoryChange]);

    return (
        <div className={'container'}>
            <h2 className={'title'}>Happiness calculator</h2>
            <div className={'toggle'}>
                <ToggleSwitch label={'Imperial system'} checked={!isMetricSystem} onChange={onMetricSystemChange}/>
            </div>
            {error && <div className={'error'}>{error}</div>}
            <div className={'input-form'}>
                <label>Sex</label>
                <select name="sex" id="sex" value={sex}
                        onChange={(e) => setSex((e.target as unknown as HTMLTextAreaElement)?.value as unknown as 0 | 1)}>
                    <option value={0}>male</option>
                    <option value={1}>female</option>
                </select>
            </div>
            <div className={'input-form'}>
                <label>Weight</label>
                <input placeholder={`weight (${isMetricSystem ? 'kg' : 'pounds'})`}
                       type={"number"}
                       value={weight || ''}
                       onInput={(e) => {
                           setError('');
                           setWeight(+(e.target as unknown as HTMLTextAreaElement)?.value)
                       }}/>
            </div>
            <div className={'input-form'}>
                <label>Age</label>
                <input placeholder={'age'}
                       type={"number"}
                       value={age || ''}
                       onInput={(e) => {
                           setError('');
                           setAge(+(e.target as unknown as HTMLTextAreaElement)?.value)
                       }}/>
            </div>
            <div className={'input-form'}>
                <label>Height</label>
            <input placeholder={`height (${isMetricSystem ? 'cm' : 'foot'})`}
                   type={"number"} value={height || ''}
                   onInput={(e) => {
                       setError('');
                       setHeight(+(e.target as unknown as HTMLTextAreaElement)?.value)
                   }}/>
            </div>
            <button id={'countButton'} className={'count-button'} onClick={onCount}>Count my happiness</button>
            {happiness && !error?.length &&
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
