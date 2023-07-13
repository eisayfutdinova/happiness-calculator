import { render, screen } from '@testing-library/react';
import App from '../App';
import {expect, test} from '@jest/globals';

test('renders the main page', () => {
    render(<App />);
});

test('renders the main page with button', () => {
    render(<App />);
    expect(screen.getByTestId(`countButton`)).toBeDefined();
});