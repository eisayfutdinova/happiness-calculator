export enum ImpericalKoef {
    kg = 0.454,
    cm = 30.48,
}

export const imperialToMetric = ({value, type}: {value: number, type: "kg" | "cm" | undefined}) => {
    if (!type) {
        return value;
    }
    return value * ImpericalKoef[type];
};

export const metricToImperial = ({value, type}: {value: number, type: "kg" | "cm" | undefined}) => {
    if (!type) {
        return value;
    }
    return value / ImpericalKoef[type];
};