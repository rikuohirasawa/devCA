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
    const sortData = graphData.sort((a, b) => b.count - a.count)
    
    console.log(sortData)
    return (
        <GraphContainer>
            <ResponsiveContainer
            // aspect={3}
            // width='99%'
            // height='100%'
            >
                <BarChart
                height={80}
                layout='vertical'
                barCategoryGap={1
                }
                // margin={{top: 5, right: 30, left: 20, bottom: 5}}
                data={sortData.slice(0, 14)}
                margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
                    <XAxis 
                        type='number'
                        />
                    <YAxis 
                    width={130}
                        dataKey='name' 
                        type='category'
/>
                    <Bar 
                        dataKey='count' 
                        fill="#7a0177"/>
                </BarChart>
            </ResponsiveContainer>
        </GraphContainer>
    )
}