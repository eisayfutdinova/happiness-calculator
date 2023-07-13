export function average(nums: number[]) {
    return (nums?.reduce((total, value) => (total + value), 0)) / nums?.length;
}
