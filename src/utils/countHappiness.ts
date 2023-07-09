const SEX_COEFFICIENT = 0.13;
const WEIGHT_COEFFICIENT = 0.013;
const HEIGHT_COEFFICIENT = 1.3;
const AGE_COEFFICIENT = 13;

export const countHappiness = ({sex, weight, height, age, isMetricSystem}:
                                   {sex: 0 | 1, weight: number, height: number, age: number, isMetricSystem: boolean}) => {
    const weightKoef = isMetricSystem ? 1 : 0.454;
    const heightKoef = isMetricSystem ? 1 : 30.48;

    const happiness =
        (sex === 0 ? 1 : 150) * SEX_COEFFICIENT +
        weight * WEIGHT_COEFFICIENT * weightKoef  +
        AGE_COEFFICIENT * age +
        HEIGHT_COEFFICIENT * height * heightKoef;
    return +happiness.toFixed(3);
};