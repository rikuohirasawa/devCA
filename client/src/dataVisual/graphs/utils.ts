
// data structure conversion, so can be used by recharts library
export const getGraphData = (data: {[key:string]: number}) => {
    console.log(data)
    const graphData: {name: string, count: number}[] = []
    for (let key in data) {
        // decode keys such as 'c%23' 'c%2B%2B' etc
        let decodedKey: string = decodeURIComponent(key);
        if (decodedKey.toLowerCase().includes('developer')) {
            decodedKey = decodedKey.replace('developer', '')
        } else if (decodedKey.toLowerCase().includes('language')){
            decodedKey = decodedKey.replace('language', '')
        }
        graphData.push(Object.assign({}, {name: decodedKey.charAt(0).toUpperCase() + decodedKey.slice(1), count: data[key]}))
    }
    return graphData.sort((a, b) => b.count - a.count)
}