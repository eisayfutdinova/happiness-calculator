import {FormInterface} from "../../types/types";
import { useMemo } from "react";
import {imperialToMetric, metricToImperial} from "../../utils/measurementCalculations";

enum ImperialSystem {
    kg = 'ft',
    cm = 'lbs'
}

export const Parameter = ({item, isMetricSystem, handleChange, onError, averageHappiness}:
                              {
                                  item: FormInterface,
                                  isMetricSystem: boolean,
                                  onError: (error: string) => void,
                                  averageHappiness?: number | undefined,
                                  handleChange: (value: number) => void
                              }) => {
    const inputPlaceholder = useMemo(() => {
        if (!item?.metricMeasure) {
            return '';
        }
        return (isMetricSystem && item.metricMeasure) ? item.metricMeasure : ImperialSystem[item?.metricMeasure]
    }, [isMetricSystem, item.metricMeasure]);

    const minMaxLabel = useMemo(() => {
        let label = '';
        if (item.min) {
            label += ' min: ';
            label += isMetricSystem ? item.min : Math.ceil(metricToImperial({value: item.min, type: item.metricMeasure}));
        }
        if (item.max) {
            label += ' max: ';
            label += isMetricSystem ? item.max : Math.ceil(metricToImperial({value: item.max, type: item.metricMeasure}));
        }
        return label;
    }, [item.min, item.max, item.metricMeasure, isMetricSystem]);

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined) => {
        const targetValue = (e?.target as unknown as HTMLTextAreaElement).value;
        if (targetValue === '') {
            onError('All fields should be filled');
            return;
        }
        const value = isMetricSystem ? +targetValue : imperialToMetric({
            value: +targetValue,
            type: item.metricMeasure
        });
        if ((item?.min && value < item.min) || (item?.max && value > item.max)) {
            onError(`Value of ${item.key} should match the limits`);
            return;
        }
        onError('');
        if (value === 0 && item.default) {
            handleChange(averageHappiness ? Math.max(item.default, averageHappiness/113) : item.default);
        } else {
            handleChange(value);
        }
    };

    return (
        <div className={'input-form'}>
            <label data-testid={`${item.key}-label`}>{item.name} {minMaxLabel}</label>
            {item.elementType === 'select' &&
                <select name={item.name}
                        onChange={onChange}
                        data-testid={`${item.key}-select`}>
                    {
                        item.options?.map((option, i) => {
                            return (
                                <option key={`${i}${option.value}`} value={option.value}>{option.name}</option>
                            )
                        })
                    }
                </select>
            }
            {
                item.elementType === 'input' &&
                <input placeholder={inputPlaceholder}
                       min={item?.min || 0}
                       data-testid={`${item.key}-input`}
                       onChange={onChange}
                       type={item.type}/>
            }
        </div>
    )
};