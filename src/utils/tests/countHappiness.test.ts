import {describe, expect, test} from '@jest/globals';
import {countHappinessFunc} from '../countHappinessFunc';
import * as formElementsJson from '../../forms/forms.json';
import {FormInterface} from "../../types/types";

describe('Count the result', () => {
    const formElements =  formElementsJson.forms as FormInterface[];
    test('Calculates correct value ', () => {
        const paramValues = {sex: 10, weight: 55, age: 23, height: 168};
        console.log(formElementsJson.forms);
        expect(countHappinessFunc({paramValues, formElements })).toBe(519.415);
    });
    test('Calculates correct value for man', () => {
        const paramValues = {sex: 1, weight: 55, age: 23, height: 168};
        expect(countHappinessFunc({paramValues, formElements })).toBe(519.415);
    });
});
