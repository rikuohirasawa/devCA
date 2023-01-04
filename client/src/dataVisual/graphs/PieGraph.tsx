import { PieChart,Pie, ResponsiveContainer } from 'recharts'

import { GraphProps } from './BarGraph'
import { getGraphData } from './utils'

import { useContext } from 'react'
import { PageContext } from '../../states/PageContext'

import { GraphContainer } from './graphStyles'
import { Heading } from '@chakra-ui/react'


export const PieGraph: React.FC<GraphProps> = ({data}) => {

    const sortData = getGraphData(data);

    const { state } = useContext(PageContext),
    { selectedRegion, selectedRegionID, viewTechnology, regionDataAll, viewDate } = state

    if (selectedRegion && selectedRegionID) {
        console.log(selectedRegion['totalCountAll'])
        const totalCountNation = selectedRegion['totalCountAll'],
        totalCountInRegion = selectedRegion[selectedRegionID][viewDate]['totalCount'],
        count = selectedRegion[selectedRegionID][viewDate]['technologies'][viewTechnology],
        pieData: {name: string, count: number}[] = 
            [{  name: viewTechnology,
                count: selectedRegion[selectedRegionID][viewDate]['technologies'][viewTechnology],
            }, {
                name: `other`,
                count: totalCountInRegion - selectedRegion[selectedRegionID][viewDate]['technologies'][viewTechnology]
            }
            ]

         return (
            <GraphContainer>
                <PieChart 
                width={730} 
                height={250}>
                    <Pie 
                    data={pieData} 
                    dataKey='count' 
                    nameKey='name' 
                    fill='#7a0177' 
                    label 
                    animationDuration={700}/>
                </PieChart>
                <Heading as='h3' size='md'>
                    {count} of the of {totalCountInRegion} parsed listings contained mention of {viewTechnology}
                </Heading>
            </GraphContainer>


        )
    } else {
        return (
            <div>loading</div>
        )
    }

}