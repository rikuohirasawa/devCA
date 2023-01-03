import { PieChart,Pie, ResponsiveContainer } from 'recharts'

import { GraphProps } from './BarGraph'
import { getGraphData } from './utils'

import { useContext } from 'react'
import { PageContext } from '../../states/PageContext'

export const PieGraph: React.FC<GraphProps> = ({data}) => {
    console.log(data)
    const sortData = getGraphData(data);

    const { state } = useContext(PageContext),
    { selectedRegion, selectedRegionID, viewTechnology, regionDataAll, viewDate } = state

    if (selectedRegion && selectedRegionID) {
        console.log(selectedRegion['totalCountAll'])
        const totalCountNation = selectedRegion['totalCountAll']
        const totalCountInRegion = selectedRegion[selectedRegionID][viewDate]['totalCount'],
        pieData = {
            count: selectedRegion[selectedRegionID][viewDate]['technologies'][viewTechnology],
            regionCount: selectedRegion[selectedRegionID][viewDate]['technologies']['totalCount'],
            nationCount: selectedRegion['totalCountAll'],
            // id: selectedRegionID
         }
    }

    // const pieData: {viewTechnology: number, 'totalSum': number} = {
    //     viewTechnology: data[viewTechnology],
    //     'totalSum': selectedRegion[]   
    // }
    console.log(viewTechnology)
    return (
        <ResponsiveContainer>
        <PieChart width={730} height={250}>
            <Pie data={sortData} dataKey='count' nameKey='name' fill='#7a0177'/>
        </PieChart>
        </ResponsiveContainer>
    )
}