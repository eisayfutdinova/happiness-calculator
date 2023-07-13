import {useCallback, useEffect, useMemo, useState} from "react";
import {countHappinessFunc} from "../utils/countHappinessFunc";
import {FormInterface} from "../types/types";

export const useCount = ({formElements}:
                             { formElements: FormInterface[] }) => {
    const [paramValues, setParamValues] = useState<{ [key: string]: number }>({});

    useEffect(() => {
        //create object with [key]: 0
        const initialParamValues = formElements.reduce((accumulator, value) => {
            return {...accumulator, [value.key]: value.elementType === 'select' && value.options ? value.options[0].value : 0};
        }, {});
        setParamValues(initialParamValues);
    }, [formElements, setParamValues]);

    const handleChange = useCallback((value: any, itemKey: string) => {
        setParamValues({
            ...paramValues,
            [itemKey]: value,
        })
    }, [setParamValues, paramValues]);

    return useMemo(() => {
        const result = countHappinessFunc({ paramValues, formElements });

        return {
            result: +result,
            isError: Object.values(paramValues)?.find(value => value === 0) !== undefined,
            handleChange
        }
    }, [paramValues, formElements, handleChange])
};