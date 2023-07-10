import {useEffect, useMemo, useState} from "react";
import {formElements} from "../utils/formElements";

export const useCount = ({transformEnabled}: { transformEnabled: boolean }) => {
    const [paramValues, setParamValues] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        //create object with [key]: 0
        const initialParamValues = formElements.reduce((accumulator, value) => {
            return {...accumulator, [value.key]: value.elementType === 'select' ? value.options[0].value : 0};
        }, {});
        setParamValues(initialParamValues);
    }, [formElements, setParamValues]);

    useEffect(() => {
        const listener = (e: Event, itemKey: string) => {
            setParamValues({
                ...paramValues,
                [itemKey]: +(e.target as unknown as HTMLTextAreaElement).value
            })
        };

        //track changes in input fields
        formElements.forEach(item => {
            const element = document.getElementById(item.key);
            element?.addEventListener('change', (e) => listener(e, item.key))
        });

        return () => {
            formElements.forEach((item) => {
                const element = document.getElementById(item.key);
                element?.removeEventListener('change', (e) => listener(e, item.key));
            });
        };
    }, [paramValues]);


    return useMemo(() => {
        const result = Object.keys(paramValues)
            .map(paramKey => {
                //looking for the necessary element by key to take its coefficient and transformFunc
                const item = formElements.find(formElement => formElement.key === paramKey);
                if (!item) {
                    return paramValues[paramKey];
                }
                const value = transformEnabled ? item?.transform(paramValues[paramKey]) : paramValues[paramKey]
                return value * item?.weight
            })?.reduce((total, item) => total + item, 0)
            .toFixed(3);
        return {
            result: +result,
            isError: Object.values(paramValues)?.find(value => value === 0) !== undefined
        }
    }, [paramValues, formElements, transformEnabled])
};