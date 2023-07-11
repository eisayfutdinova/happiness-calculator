import {useCallback, useEffect, useMemo, useState} from "react";
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

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | undefined, itemKey: string) => {
      setParamValues({
          ...paramValues,
          [itemKey]: +(e?.target as unknown as HTMLTextAreaElement).value,
      })
    }, [setParamValues, paramValues]);


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
            isError: Object.values(paramValues)?.find(value => value === 0) !== undefined,
            handleChange
        }
    }, [paramValues, formElements, transformEnabled, handleChange])
};