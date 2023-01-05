


// data structure conversion, so can be used by recharts library
export const getGraphData = (data: {[key:string]: number}) => {
    const graphData: {name: string, count: number}[] = []
    for (let key in data) {
        // switch(key) {
        //     case 'c%23':
        //         key = 'C#'
        //         break;
        //     case 'c%2B%2B':
        //         key = 'C++'
        //         break;
        //     case 'F%23':
        //         key = 'F#'
        //         break;
        //     default: 
        //         break;
        // } 
        graphData.push(Object.assign({}, {name: key, count: data[key]}))
    }
    return graphData.sort((a, b) => b.count - a.count)
}