import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { GraphContainer } from "./barGraphStyles"
interface GraphProps {
    data : {
        [key:string] : number
    } 
}

export const BarGraph: React.FC<GraphProps> = ({data})  => {
    // data structure conversion, so can be used by recharts library
    const graphData:{ name: string, count : number}[] = []
    for (const key in data) {
        graphData.push(Object.assign({}, {name: key, count: data[key]}))
    }
    const sortData = graphData.sort((a, b) => a.count - b.count)
    
    console.log(sortData)

    return (
        <GraphContainer>
            <ResponsiveContainer
            aspect={3}
            width='99%'
            height='100%'
            >
                <BarChart
                height={100}
                layout='vertical'
                // margin={{top: 5, right: 30, left: 20, bottom: 5}}
                data={sortData}>
                    <XAxis 
                        dataKey='name' 
                        type='category'/>
                    <YAxis 
                        dataKey='count' 
                        type='number'/>
                    <Bar 
                        dataKey='count' 
                        fill="#fb5012"/>
                </BarChart>
            </ResponsiveContainer>
        </GraphContainer>
    )
}