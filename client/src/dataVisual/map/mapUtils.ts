const fillColors: string[] = [
    '#E4F7D1',
    '#C8F2C2',
    '#A4E9A7',
    '#89DD9C',
    '#70CE98',
    '#59BE96',
    '#44AC96',
    '#319795',
    '#24879B',
    '#1B759E',
    '#12609F',
    '#0A47A1',
    '#032DA1'
];
export const getFillColor = (count: number, viewByFormat: string, totalCount?: number, rank?: number) => {
    let fillColor: string = ''
    const sliceFillColors = fillColors.slice(0, 11)
    if (count === 0 ) {
        return 'rgba(0, 0, 0, 0.3)'
    } if (viewByFormat === 'Percent' && totalCount) {
            for (let i = 0; i <= sliceFillColors.length - 1; i++) {
                if ((count/totalCount * 100) < i * 10) {
                    fillColor = sliceFillColors[i]
                    break
                } else if (i === sliceFillColors.length - 1) {
                    fillColor = sliceFillColors[i]
                    break
                }
            }
    } else if (viewByFormat === 'Count') {
            for (let i = 0; i <= sliceFillColors.length - 1; i++) {
                if (count < i * 100) {
                    fillColor = sliceFillColors[i]
                    break
                } else if (i === sliceFillColors.length - 1) {
                    fillColor = sliceFillColors[i]
                    break
                }
            }
    } else if (viewByFormat === 'Ranking') {
        if (rank === 0) {
            fillColor = fillColors[0]
        } else if (rank) {
            fillColor = fillColors[rank]
        }
    }
    return fillColor
}

