const SEX_COEFFICIENT = 0.13;
const WEIGHT_COEFFICIENT = 0.013;
const HEIGHT_COEFFICIENT = 1.3;
const AGE_COEFFICIENT = 13;

export const countHappiness = ({sex, weight, height, age}:
                                   {sex: 0 | 1, weight: number, height: number, age: number}) => {
    return (sex === 0 ? -75 : 75) * SEX_COEFFICIENT + weight * WEIGHT_COEFFICIENT + AGE_COEFFICIENT * age + HEIGHT_COEFFICIENT * height;
};