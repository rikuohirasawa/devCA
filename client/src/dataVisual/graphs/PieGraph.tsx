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
    { selectedRegion, selectedRegionID, viewTechnology, regionDataAll, viewDate, sumJobs } = state

    if (selectedRegion && selectedRegionID) {
        const regionByDate: any = selectedRegion[viewDate],
        totalCountInRegion = regionByDate['total_job_count'],
        count: any = regionByDate['technologies'][viewTechnology],
        pieData: {name: string, count: number}[] = 
            [{  name: viewTechnology,
                count: count,
            }, {
                name: `other`,
                count: totalCountInRegion - count
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
                    fill='#319795' 
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