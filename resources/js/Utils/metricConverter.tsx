
export type MetricUnit = 'mm' | 'cm' | 'm' | 'km'

export const metricConverter = (value: number, unit: MetricUnit) => {
    switch (unit) {
        case 'mm':
            return value / 1000
        case 'cm':
            return value / 100
        case 'm':
            return value
        case 'km':
            return value * 1000
        default:
            return value
    }
}