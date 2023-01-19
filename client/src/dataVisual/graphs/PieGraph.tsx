import { PieChart,Pie, ResponsiveContainer, LabelList, Label } from 'recharts'

import { GraphProps } from './BarGraph'

import { getPieGraphData } from './graphUtils'
import { getPercentage, decodeTechnologyName, convertNames } from '../../utils'

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
    { selectedRegion, selectedRegionID, viewTechnology, viewDate, sumJobs } = state



    if (selectedRegion && selectedRegionID && sumJobs) {
        const totalCountRegion = (selectedRegion as unknown as SelectedRegionData)[viewDate]['total_job_count']
        const technologyList = (selectedRegion as unknown as SelectedRegionData)[viewDate]['technologies'],      
        regionByDate: any = selectedRegion[viewDate],
        totalCountInRegion = regionByDate['total_job_count'],
        count: any = regionByDate['technologies'][viewTechnology],
        percentInRegion = (count/totalCountInRegion * 100).toFixed(2),
        percentInCanada = (count/sumJobs * 100).toFixed(2),
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
                    rank = num === 1 ? '' : num === 2 ? num + 'nd' : num === 3 ? num + 'rd' : num + 'th'
                }
            })
            return rank
        }
         return (
            <PieGraphContainer>
                <PieChart 
                style={{ marginRight: 'auto'}}
                width={700} 
                height={500}>
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
                alignItems='center'
                textAlign='left'>
                    <Heading
                    size='xl'
                    width='80%'
                    borderBottom='1px solid var(--teal-med)'
                    paddingBottom='16px'
                    >{convertNames[selectedRegionID]}</Heading>
                    <Text 
                    fontSize='xl'
                    width='80%'
                    >
                        {viewTechnology} is represented in {percentInRegion}% of the parsed job listings in {convertNames[selectedRegionID]}, with mention in <span className='font-700'>{count}</span> of the <span className='font-700'>{totalCountInRegion}</span> returned queries.
                    </Text>
                    <Text 
                    fontSize='xl'
                    width='80%'
                    textAlign='left'>
                        This makes {viewTechnology} the <span className='font-700'>{getRankingInRegion()}</span> most popular technology in {convertNames[selectedRegionID]} at the time of data collection.
                    </Text>
                    <Heading
                    size='xl'
                    width='80%'
                    borderBottom='1px solid var(--teal-med)'
                    paddingBottom='16px'
                    >Nationwide</Heading>
                    <Text
                    fontSize='xl'
                    width='80%'
                    textAlign='left'>
                        {viewTechnology} represents {percentInCanada}% of the parsed job listings across Canada (total count of {sumJobs}).
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