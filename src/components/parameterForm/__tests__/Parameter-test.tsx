import {render, screen } from '@testing-library/react';
import {expect, test} from '@jest/globals';
import {Parameter} from "../Parameter";
import {FormInterface} from "../../../types/types";

test('renders the Parameter with input', () => {
    let item: FormInterface = {
        "key": "test_item",
        "name": "some_test_name",
        "weight": 50,
        "elementType": "input",
        "type": "number",
        "options": []
    };
    render(<Parameter item={item}
                      isMetricSystem={false}
                      handleChange={(value) => console.log(value)}
                      onError={(error) => console.error(error)}
                      averageHappiness={0}/>);
    expect(screen.getByTestId(`${item.key}-input`)).toBeDefined();
});

test('renders the Parameter with select', () => {
    let item: FormInterface = {
        "key": "test_item",
        "name": "some_test_name",
        "weight": 100,
        "elementType": "select",
        "type": "number",
        "options": []
    };
    render(<Parameter item={item}
                      isMetricSystem={false}
                      handleChange={(value) => console.log(value)}
                      onError={(error) => console.error(error)}
                      averageHappiness={0}/>);
    expect(screen.getByTestId(`${item.key}-select`)).toBeDefined();
});
