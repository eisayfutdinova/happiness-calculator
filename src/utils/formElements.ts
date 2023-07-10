export interface FormInterface {
    key: string,
    name: string,
    weight: number,
    elementType: 'select' | 'input',
    type: string,
    options: {
        name: string,
        value: number,
    }[],
    isTransformed: boolean,
    transform: (v: number) => number
}

export const formElements: FormInterface[] = [
    {
        key: 'sex',
        name: 'Sex',
        weight: 0.13,
        elementType: 'select',
        type: 'number',
        options: [
            {
                name: 'male',
                value: 1,
            },
            {
                name: 'female',
                value: 150,
            }
        ],
        isTransformed: false,
        transform: (v) => {
            return v
        }
    },
    {
        key: 'weight',
        name: 'Weight',
        weight: 0.013,
        elementType: 'input',
        type: 'number',
        options: [],
        isTransformed: true,
        transform: (v) => {
            return v * 0.454
        }
    },
    {
        key: 'age',
        name: 'Age',
        weight: 13,
        elementType: 'input',
        type: 'number',
        options: [],
        isTransformed: false,
        transform: (v) => {
            return v
        }
    },
    {
        key: 'height',
        name: 'Height',
        weight: 1.3,
        elementType: 'input',
        type: 'number',
        options: [],
        isTransformed: true,
        transform: (v) => {
            return v * 30.48
        }
    },
]