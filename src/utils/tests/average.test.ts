import {describe, expect, test} from '@jest/globals';
import {average} from "../average";

describe('Average value', () => {
    test('Empty array', () => {
        expect(average([])).toBe(NaN);
    });
    test('History array', () => {
        expect(average([
            518.284,
            518.245,
            518.245,
            517.77,
            518.245,
            518.258,
            518.258,
            518.258,
            518.258,
            519.545,
            517.77,
            517.7702400000001
        ])).toBe(518.2421866666665);
    });
});
