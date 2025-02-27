import { getPercentage } from "../../utils";
// data structure conversion, so can be used by recharts library
import { BarGraphData } from "./BarGraph";
import { PieGraphData } from "./PieGraph";

export const getBarGraphData = (data: {[key:string]: number}, viewTechnology: string) => {
    const graphData: BarGraphData[] = []
    for (let key in data) {
        // decode keys such as 'c%23' 'c%2B%2B' etc
        let decodedKey: string = decodeURIComponent(key);
        if (decodedKey.toLowerCase().includes('developer')) {
            decodedKey = decodedKey.replace('developer', '')
        } else if (decodedKey.toLowerCase().includes('language')){
            decodedKey = decodedKey.replace('language', '')
        }
        graphData.push(Object.assign({}, {
            name: decodedKey.charAt(0).toUpperCase() + decodedKey.slice(1),
             count: data[key],
             fill: key === viewTechnology ? 'var(--teal)' : 'var(--teal-med)'
            }))
    }
    return graphData.sort((a, b) => b.count - a.count)
}

export const getPieGraphData = (data: { [key: string]: number; }, viewTechnology: string, totalCount: number) => {
    const graphData: PieGraphData[] = []
    // if technology is represented in less than 3% of listings, it is added to 'other' count
    let otherCount: number = 0;
    for (let key in data) {
        if (data[key] === 0 && key !== viewTechnology) {
            // if no count, omitted entirely
            continue
        } else if (Number(getPercentage(data[key], totalCount)) < 3) {
            otherCount += data[key]
        } else {
            let decodedKey: string = decodeURIComponent(key);
            if (decodedKey.toLowerCase().includes('developer')) {
                decodedKey = decodedKey.replace('developer', '')
            } else if (decodedKey.toLowerCase().includes('language')){
                decodedKey = decodedKey.replace('language', '')
            }
            graphData.push(Object.assign({}, {
                name: key,
                count: data[key],
                fill: key === viewTechnology ? '#319795' : 'rgba(136, 146, 176, 0.7)',
                stroke: '#8892b0'
            }))
        }
    } otherCount > 0 && graphData.push(Object.assign({}, {
        name: 'Other',
        count: otherCount,
        fill: 'rgba(136, 146, 176, 0.7)',
        stroke: '#8892b0'
    }))
    return graphData
}
