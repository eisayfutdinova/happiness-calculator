import {describe, expect, test} from '@jest/globals';
import {imperialToMetric, metricToImperial} from '../measurementCalculations';

describe('Transform imperial value to metric', () => {
    test('ft to kg', () => {
        expect(imperialToMetric({value: 120, type: 'kg'})).toBe(54.480000000000004);
    });
    test('lbs to cm', () => {
        expect(imperialToMetric({value: 5.5, type: 'cm'})).toBe(167.64000000000001);
    });
    test('no type for age', () => {
        expect(imperialToMetric({value: 23, type: undefined})).toBe(23);
    });
    test('kg to ft', () => {
        expect(metricToImperial({value: 54, type: 'kg'})).toBe(118.94273127753304);
    });
});