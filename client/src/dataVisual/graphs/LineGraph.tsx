import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer } from "recharts"
import { LineGraphContainer } from "./graphStyles"
import { useState, useContext } from 'react'
import { PageContext } from '../../states/PageContext'
import { decodeTechnologyName, decodeDate, convertNames } from '../../utils'
import { CustomToolTipLineGraph } from "./CustomToolTip"

import { Flex, Heading, Text } from '@chakra-ui/react'

import { SelectedRegionData } from '../../states/pageReducer'

import {ParagraphText} from '../../themes/chakraComponents'

interface LineGraphData {
    date: string,
    count: number,
    fill?: string,
    stroke?: string
}

export const LineGraph: React.FC = () => {

    const { state } = useContext(PageContext),
    { selectedRegion, selectedRegionID, viewTechnology, viewDate, sumJobs, scrapedDates } = state,
    lineGraphData: LineGraphData[] = [],
    lineGraphRange: number[] = []
    for (let key in selectedRegion) {
        if (key === 'region') {
            continue
        }
        const count = (selectedRegion as unknown as SelectedRegionData)[key]['technologies'][viewTechnology];
        lineGraphRange.push(count)
        console.log(lineGraphRange)
        lineGraphData.push(Object.assign({}, {
            date: key, 
            count: count,
            fill: 'var(--teal)',
            stroke: 'var(--teal)'
        }))
    }
    // divide the absolute value of the difference between two nums by the avg of those two nums * 100
    const getPercentageDifference = (a: number, b: number) => {
        const percent = (a - b)/((a + b)/2) * 100
        return `difference of ${(Math.abs(percent)).toFixed(2)}%`
        }
    
    const getPercentageIncreaseDecrease = (a: number, b: number) => {
        const percent: number = (a - b)/a
        if (percent === Infinity) {
            return '100% decrease'
        } else if (Number.isNaN(percent)) {
            return '0% change'
        }
        return percent < 0 ? `${(percent * 100).toFixed(2).slice(1)}% increase ` : `${(percent * 100).toFixed(2)}% decrease `
    }
    const lastTwoDataPoints: LineGraphData[] = lineGraphData.slice(-2),
    firstAndLast: LineGraphData[] = [lineGraphData[0], lineGraphData[lineGraphData.length -1]]
    if (scrapedDates && selectedRegion && selectedRegionID) {
        return (
            <LineGraphContainer>
            <ResponsiveContainer width='95%' height={400}>
            <LineChart data={lineGraphData}>
                <XAxis 
                stroke='var(--teal-med)'
                dataKey='date'/>
                <YAxis
                domain={[Math.min(...lineGraphRange), Math.max(...lineGraphRange)]}
                stroke='var(--teal-med)'/>
                <Tooltip content={<CustomToolTipLineGraph/>}/>
                <CartesianGrid 
                    stroke="var(--teal)" 
                    strokeDasharray="2"
                    style={{opacity: '0.3'}}/>
                <Line 
                type='monotone' 
                dataKey='count' 
                stroke='var(--teal-med)'
                dot={{
                    stroke: 'var(--teal)',
                    fill: 'var(--teal)'
                }}/>
            </LineChart>
            </ResponsiveContainer>
            <Flex
            direction='column'
            width='80%'
            textAlign='left'
            gap='16px'>
                <Heading
                    paddingBottom='10px'
                    borderBottom='1px solid var(--teal-med)'
                    >Most Recent</Heading>
                <Text 
                fontSize='xl'
                >
                    In the second most recent scrape on {decodeDate(lastTwoDataPoints[0]['date'])}, the Python query returned a count of {lastTwoDataPoints[0]['count']}, with the most recent scrape on {decodeDate(lastTwoDataPoints[1]['date'])} returning   {lastTwoDataPoints[1]['count']}. This indicates a(n) {getPercentageIncreaseDecrease(lastTwoDataPoints[0]['count'], lastTwoDataPoints[1]['count'])} ({getPercentageDifference(lastTwoDataPoints[0]['count'], lastTwoDataPoints[1]['count'])}) of {viewTechnology} listings in {convertNames[selectedRegionID]}.
                    </Text>
                    <Heading
                    paddingBottom='10px'
                    borderBottom='1px solid var(--teal-med)'>Since Inception</Heading>
                    <Text
                    fontSize='xl'>
                        When first scraped on {decodeDate(firstAndLast[0]['date'])}, the {viewTechnology} query returned {firstAndLast[0]['count']} jobs in {convertNames[selectedRegionID]}. The most recent scrape on {decodeDate(firstAndLast[1]['date'])} returned {firstAndLast[1]['count']} jobs, indicating a(n) {getPercentageIncreaseDecrease(firstAndLast[0]['count'], firstAndLast[1]['count'])} in popularity ({getPercentageDifference(firstAndLast[0]['count'], firstAndLast[1]['count'])}).
                    </Text>
                </Flex>
            </LineGraphContainer>
        )
    } else {
        return <div>loading</div>
    }

}