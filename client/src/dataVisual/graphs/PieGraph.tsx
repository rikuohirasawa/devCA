import { PieChart,Pie, ResponsiveContainer, LabelList, Label } from 'recharts'

import { GraphProps } from './BarGraph'

import { getPieGraphData } from './graphUtils'
import { getPercentage, decodeTechnologyName, convertNames } from '../../utils'

import { useState, useContext } from 'react'
import { PageContext } from '../../states/PageContext'

import { PieGraphContainer, FlexContainer } from './graphStyles'
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
    { selectedRegion, selectedRegionID, viewTechnology, viewDate, sumJobs, windowWidth } = state

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
            console.log(e)
            const name: string = e['payload']['payload']['name']
            if (name === 'Other') {
                return (
                    <text
                    stroke={'var(--teal)'}
                    x={e['x']}
                    y={e['y']}
                    textAnchor='middle'
                    fontWeight={100}>
                        {`Other (< 3%) (${getPercentage(e['count'], totalCountInRegion)}%)`}
                    </text>
                )
            }
            return (
            <text
            x={e['x']}
            y={e['y']}
            textAnchor='middle'
            stroke={name === viewTechnology ? 'rgba(255, 255, 255, 0.7)' : 'var(--teal)'}
            fontWeight={100}>{
            `${decodeTechnologyName(name)} (${getPercentage(e['count'], totalCountInRegion)}%)`
            }
            </text>
            )
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

        console.log(windowWidth)
         return (
            <PieGraphContainer>
                <ResponsiveContainer 
                width={windowWidth < 900 ? '90%' : windowWidth < 1200 ? '80%' : '70%'}
                height={700}
                >
                <PieChart>
                    <Pie 
                    data={pieData} 
                    dataKey='count' 
                    nameKey='name' 
                    label={renderLabel}
                    animationDuration={700}>
                    </Pie>
                </PieChart>
                </ResponsiveContainer>
                <FlexContainer>
                    <Heading
                    size='xl'
                    width='100%'
                    borderBottom='1px solid var(--teal-med)'
                    paddingBottom='16px'
                    >{convertNames[selectedRegionID]}</Heading>
                    {/* <h1
                    style={{fontSize: '2.25rem',
                    fontWeight: '700'}}>Test</h1> */}
                    <Text 
                    fontSize='xl'
                    width='100%'
                    >
                        {viewTechnology} is represented in <span className='font-700'>{percentInRegion}%</span> of the parsed job listings in {convertNames[selectedRegionID]}, with mention in <span className='font-700'>{count}</span> of the <span className='font-700'>{totalCountInRegion}</span> returned queries.
                    </Text>
                    <Text 
                    fontSize='xl'
                    width='100%'
                    textAlign='left'>
                        This makes {viewTechnology} the <span className='font-700'>{getRankingInRegion()}</span> most popular technology in {convertNames[selectedRegionID]} at the time of data collection.
                    </Text>
                    <Heading
                    size='xl'
                    width='100%'
                    borderBottom='1px solid var(--teal-med)'
                    paddingBottom='16px'
                    >Nationwide</Heading>
                    <Text
                    fontSize='xl'
                    width='100%'
                    textAlign='left'>
                        {viewTechnology} in {convertNames[selectedRegionID]} represents <span className='font-700'>{percentInCanada}%</span> of the parsed job listings across Canada (total count of <span className='font-700'>{sumJobs}</span>).
                    </Text>
                </FlexContainer>
            </PieGraphContainer>
        )
    } else {
        return (
            <div>loading</div>
        )
    }
}