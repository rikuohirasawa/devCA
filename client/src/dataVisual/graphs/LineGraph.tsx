import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, ResponsiveContainer } from "recharts"
import { LineGraphContainer } from "./graphStyles"
import { useState, useContext } from 'react'
import { PageContext } from '../../states/PageContext'
import { decodeTechnologyName, decodeDate, convertNames } from '../../utils'
import { CustomToolTipLineGraph } from "./CustomToolTip"

import { Heading, Text } from '@chakra-ui/react'

import { SelectedRegionData } from '../../states/pageReducer'

interface LineGraphData {
    date: string,
    count: number,
    fill?: string,
    stroke?: string
}

export const LineGraph: React.FC = () => {

    const { state } = useContext(PageContext),
    { selectedRegion, selectedRegionID, viewTechnology, viewDate, sumJobs, scrapedDates } = state,
    lineGraphData: LineGraphData[] = []
    for (let key in selectedRegion) {
        if (key === 'region') {
            continue
        }
        const count = (selectedRegion as unknown as SelectedRegionData)[key]['technologies'][viewTechnology]
        console.log(count)
        lineGraphData.push(Object.assign({}, {
            date: key, 
            count: count,
            fill: 'var(--teal)',
            stroke: 'var(--teal)'
        }))
    }
    const data = [{
        date: '1',
        count: 1,
        fill: 'var(--teal)',
        stroke: 'var(--teal)'
    }, 
    {
        date: '2',
        count: 2
    }, {
        date: '3',
        count: 8
    }, {
        date: '4',
        count: 4
    }]
    // divide the absolute value of the difference between two nums by the avg of those two nums * 100
    const getPercentageDifference = (a: number, b: number) => {
        const percent = (a - b)/((a + b)/2) * 100
        return `difference of ${(Math.abs(percent)).toFixed(2)}%`
        }
    
    const getPercentageIncreaseDecrease = (a: number, b: number) => {
        const percent: number = (a - b)/a
        console.log(0/0)
        if (percent === Infinity) {
            return '100% decrease'
        } else if (Number.isNaN(percent)) {
            return '0% change'
        }
        return percent < 0 ? `${percent.toFixed(2).slice(1)}% increase `: `${percent.toFixed(2)}% decrease `
    }
    const lastTwoDataPoints:LineGraphData[] = lineGraphData.slice(-2),
    firstAndLast:LineGraphData[] = [lineGraphData[0], lineGraphData[lineGraphData.length -1]]
    if (scrapedDates && selectedRegion && selectedRegionID) {
        return (
            <LineGraphContainer>
            <ResponsiveContainer width='95%' height={400}>
            <LineChart data={data}>
                <XAxis 
                stroke='var(--teal-med)'
                dataKey='date'/>
                <YAxis
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
                    <Text 
                    fontSize='xl'
                    textAlign='left'>
                        Between the last two scrapes, {viewTechnology} saw a(n) {getPercentageIncreaseDecrease(lastTwoDataPoints[0]['count'], lastTwoDataPoints[1]['count'])}
                        in popularity in {convertNames[selectedRegionID]}.
                    </Text>
                    <Text
                    fontSize='xl'
                    textAlign='left'>
                        Since first scraped on {decodeDate(firstAndLast[0]['date'])}, {viewTechnology} has seen a(n) {getPercentageIncreaseDecrease(firstAndLast[0]['count'], firstAndLast[1]['count'])} in popularity.
                    </Text>
            </LineGraphContainer>
        )
    } else {
        return <div>loading</div>
    }

}