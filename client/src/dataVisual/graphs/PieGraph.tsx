import { PieChart,Pie, ResponsiveContainer, LabelList, Label } from 'recharts'

import { GraphProps } from './BarGraph'

import { getPieGraphData } from './utils'
import { getPercentage, decodeTechnologyName } from '../../utils'

import { useState, useContext } from 'react'
import { PageContext } from '../../states/PageContext'

import { PieGraphContainer } from './graphStyles'
import { Heading, Text, Flex } from '@chakra-ui/react'

import { SelectedRegionData } from '../../states/pageReducer'

interface PieData {
    name: string,
    count: number,
    fill: string,
    stroke: string
}
export const PieGraph: React.FC<GraphProps> = ({data}) => {

    const { state } = useContext(PageContext),
    { selectedRegion, selectedRegionID, viewTechnology, viewDate } = state

    if (selectedRegion && selectedRegionID) {
        const technologyList = (selectedRegion as unknown as SelectedRegionData)[viewDate]['technologies'],      
        regionByDate: any = selectedRegion[viewDate],
        totalCountInRegion = regionByDate['total_job_count'],
        count: any = regionByDate['technologies'][viewTechnology],
        pieData: PieData[] = getPieGraphData(technologyList, viewTechnology, totalCountInRegion)
        const renderLabel = (e: any) => {
            const name: string = e['payload']['payload']['name']
            if (name === 'Other') {
                return `Other (< 3%) (${getPercentage(e['count'], totalCountInRegion)}%)`
            }
            return `${decodeTechnologyName(name)} (${getPercentage(e['count'], totalCountInRegion)}%)`
        }
        // get ranking within region
        const getRankingInRegion = () => {
            let rank: string = ''
            const regionRankingList = pieData.filter((e: PieData)=> e['name'] !== 'Other' && e).sort((a, b)=> b['count'] - a['count']);
            regionRankingList.forEach((e: PieData, index: number)=> {
                if (e['name'] === viewTechnology) {
                    const num: number = index + 1
                    rank = num === 1 ? num + 'st' : num === 2 ? num + 'nd' : num === 3 ? num + 'rd' : num + 'th'
                }
            })
            return rank
        }
         return (
            <PieGraphContainer>
                <PieChart 
                style={{ marginRight: 'auto'}}
                width={780} 
                height={650}>
                    <Pie 
                    data={pieData} 
                    dataKey='count' 
                    nameKey='name' 
                    label={renderLabel}
                    animationDuration={700}>
                    </Pie>
                </PieChart>
                <Flex
                flexDirection='column'
                gap='16px'
                alignItems='center'>
                    <Text 
                    fontSize='xl'
                    maxW='80%'
                    textAlign='left'>
                        <span className='font-700'>{count}</span> of the of <span className='font-700'>{totalCountInRegion}</span> parsed listings contained mention of {viewTechnology}
                    </Text>
                    <Text 
                    fontSize='xl'
                    maxW='80%'
                    textAlign='left'>
                        This makes {viewTechnology} the <span className='font-700'>{getRankingInRegion()}</span> most popular technology of the list at the time of data collection
                    </Text>
                </Flex>
            </PieGraphContainer>
        )
    } else {
        return (
            <div>loading</div>
        )
    }
}