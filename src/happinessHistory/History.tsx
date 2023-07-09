import {useMemo} from 'react';
import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {Happiness} from "../hook/useHistory";

export const History = ({happinessHistory, onClear}: { happinessHistory: Happiness[], onClear: () => void }) => {
    const {data, min, max} = useMemo(() => {
        const values = happinessHistory.map(item => item.value);
        return {
            data: happinessHistory.map(item => {
                return {happiness: item.value, date: item.date}
            }),
            min: Math.min(...values),
            max: Math.max(...values),
        };
    }, [happinessHistory]);

    if (!happinessHistory.length) {
        return (
            <div>No history yet!</div>
        )
    }

    return (
        <div>
            <ResponsiveContainer width={'98%'} height={300}>
                <LineChart data={data} overflow={'visible'}>
                    <XAxis dataKey="date"/>
                    <YAxis type="number" padding={{top: 50, bottom: 30}} interval={0} domain={[min, max]}/>
                    <Tooltip/>
                    <Line type="monotone" dataKey="happiness" stroke="#8884d8"/>
                </LineChart>
            </ResponsiveContainer>
            <div className={'clear-history'} onClick={onClear}>Clear history</div>
        </div>
    )
};