import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { GraphContainer, BarGraphWrapper, StickyWrapper } from "./graphStyles"
import { CustomToolTip } from "./CustomToolTip"

import { getGraphData } from "./utils"
export interface GraphProps {
    data : {
        [key:string] : number
    } 
}

export const BarGraph: React.FC<GraphProps> = ({data})  => {
    if (data) {const sortData = getGraphData(data);
    console.log(sortData.slice(0,14))
    return (
        <BarGraphWrapper>
            <ResponsiveContainer height={700}
            width='65%'
            >
                <BarChart
                width={500}
                height={1000}
                layout='vertical'
                barCategoryGap={0
                }
                data={sortData}
                >
                    <XAxis 
                    type='number'/>
                    <XAxis 
                    id='axis-pos-top'
                    allowDuplicatedCategory
                    type='number'/>
                    <YAxis 
                    width={120}
                        dataKey='name' 
                        type='category'
                        interval={0}/>
                        <Tooltip
                        content={<CustomToolTip/>}
                        cursor={false}/>
                    <CartesianGrid stroke="#d3d3d3" strokeDasharray="2 2"/>
                    <Bar 
                        dataKey='count' 
                        fill="#7a0177"/>
                </BarChart>
           </ResponsiveContainer>
           <StickyWrapper>
            
           </StickyWrapper>
        </BarGraphWrapper>
    )} else {
        return <div>loading</div>
    }
}