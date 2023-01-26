import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Label } from "recharts"
import { BarGraphContainer, StickyWrapper } from "./graphStyles"
import { CustomToolTipBarGraph } from "./CustomToolTip"

import { useContext } from "react"
import { PageContext } from "../../states/PageContext"

import { getBarGraphData } from "./graphUtils"
export interface GraphProps {
    data : {
        [key:string] : number
    } 
}

export interface BarGraphData {
    name: string,
    count: number,
    fill: string
}
export const BarGraph: React.FC<GraphProps> = ()  => {

    const { state } = useContext(PageContext),
    { selectedRegion, viewDate, viewTechnology, windowWidth } = state

    if (selectedRegion) {
    const data: {[technology: string]: number} = selectedRegion[viewDate]['technologies'],
    sortData: BarGraphData[] = getBarGraphData(data, viewTechnology);
    return (
        <BarGraphContainer>
            <ResponsiveContainer 
            height={1000}
            width='95%'
            >
                <BarChart
                margin={{
                    top: 20,
                    bottom: 35
                }}
                layout='vertical'
                barCategoryGap={0}
                data={sortData}
                >
                    <XAxis 
                    type='number'
                    stroke='var(--teal-med)'
                    >
                        <Label 
                        value='Count'
                        position='bottom'
                        fill='var(--teal-med)'
                        
                        />
                    </XAxis>
                    <XAxis 
                    id='axis-pos-top'
                    allowDuplicatedCategory
                    type='number'/>
                    <YAxis 
                    width={120}
                    dataKey='name' 
                    type='category'
                    stroke='var(--teal-med)'
                    interval={0}
                    label={{
                        value: 'Technology',
                        angle: -90,
                        position: 'insideLeft',
                        fill: 'var(--teal-med)'
                        }}/>
                    <Tooltip
                    content={<CustomToolTipBarGraph/>}
                    cursor={false}/>
                    <CartesianGrid 
                    stroke="var(--teal)" 
                    strokeDasharray="2 4"
                    style={{opacity: '0.3'}}/>
                    <Bar 
                        dataKey='count' 
                        fill="#319795"/>
                </BarChart>
           </ResponsiveContainer>
        </BarGraphContainer>
    )} else {
        return <div>loading</div>
    }
}