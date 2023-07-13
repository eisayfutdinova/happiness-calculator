export interface FormInterface {
    key: string,
    name: string,
    weight: number,
    default?: number,
    min?: number,
    max?: number,
    elementType: 'select' | 'input',
    type: string,
    options?: {
        name: string,
        value: number,
    }[],
    metricMeasure?: 'kg' | 'cm',
}