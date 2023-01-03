import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { GraphContainer } from "./barGraphStyles"
import { CustomToolTip } from "./CustomToolTip"

import { getGraphData } from "./utils"
export interface GraphProps {
    data : {
        [key:string] : number
    } 
}

export const BarGraph: React.FC<GraphProps> = ({data})  => {
    const sortData = getGraphData(data);
    console.log(sortData)
    return (
        <GraphContainer>
            <ResponsiveContainer
            >
                <BarChart
                height={80}
                layout='vertical'
                barCategoryGap={1
                }
                data={sortData.slice(0, 14)}
                margin={{ top: 0, right: 50, left: 0, bottom: 0 }}>
                    <XAxis 
                        type='number'
                        />
                    <YAxis 
                    width={130}
                        dataKey='name' 
                        type='category'/>
                        <Tooltip
                        content={<CustomToolTip/>}
                        cursor={false}/>
                    <Bar 
                        dataKey='count' 
                        fill="#7a0177"/>
                </BarChart>
            </ResponsiveContainer>
        </GraphContainer>
    )
}