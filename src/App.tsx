import './App.css'
import {useCallback, useState} from "react";
import {History} from "./happinessHistory/History";
import {useHistory} from "./hook/useHistory";
import {countHappiness} from "./utils/countHappiness";

function App() {
    const [sex, setSex] = useState<0 | 1>(0);
    const [weight, setWeight] = useState<number>(0);
    const [age, setAge] = useState<number>();
    const [height, setHeight] = useState<number>();
    const [happiness, setHappiness] = useState<number>();
    const [error, setError] = useState<string>('');
    const [showHistory, setShowHistory] = useState(false);
    const {happinessHistory, onChange, onClear} = useHistory();

    const onCount = useCallback(() => {
        if (!weight || !age || !height) {
            setError('Oops! All fields should be filled');
            return;
        }
        const date = new Date();
        const result = {
            value: countHappiness({sex, height, age, weight}),
            date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`
        };
        setHappiness(result.value);
        onChange(result);
    }, [weight, age, height, setError, countHappiness, setHappiness, onChange]);

    return (
        <div className={'container'}>
            <h2>Happiness calculator</h2>
            {error && <div className={'error'}>{error}</div>}
            <select name="sex" id="sex" value={sex} onChange={(e) => setSex((e.target as HTMLTextAreaElement)?.value as 0 | 1)}>
                <option value={0}>male</option>
                <option value={1}>female</option>
            </select>
            <input placeholder={'weight'} type={"number"} value={weight || ''} onInput={(e) => {
                setError('');
                setWeight(+(e.target as HTMLTextAreaElement)?.value)
            }}/>
            <input placeholder={'age'} type={"number"} value={age || ''} onInput={(e) => {
                setError('');
                setAge(+(e.target as HTMLTextAreaElement)?.value)
            }}/>
            <input placeholder={'height'} type={"number"} value={height || ''} onInput={(e) => {
                setError('');
                setHeight(+(e.target as HTMLTextAreaElement)?.value)
            }}/>
            <button onClick={onCount}>Count my happiness</button>
            {happiness && !error?.length &&
                <div className={'result'}>Your happiness is {happiness}</div>
            }
            <div className={'history'}
                 onClick={() => setShowHistory(!showHistory)}>{showHistory ? 'Hide' : 'Show'} history
            </div>
            {showHistory && <History happinessHistory={happinessHistory} onClear={onClear}/>}
        </div>
    )
}

export default App
