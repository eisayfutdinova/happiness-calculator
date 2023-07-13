import {FormInterface} from "../types/types";

export const countHappinessFunc = ({paramValues, formElements}: {paramValues: { [key: string]: number }, formElements: FormInterface[]}) => {
    return Object.keys(paramValues)
        .map(paramKey => {
            //looking for the necessary element by key to take its coefficient and transformFunc
            const item = formElements.find(formElement => formElement.key === paramKey);
            if (!item) {
                return paramValues[paramKey];
            }
            return paramValues[paramKey] * item?.weight
        })?.reduce((total, item) => total + item, 0);
};
