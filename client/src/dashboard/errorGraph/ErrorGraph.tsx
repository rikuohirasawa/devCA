import React from 'react'
import { LineChart, XAxis, YAxis, CartesianGrid, Line, Tooltip, Label, ResponsiveContainer } from "recharts"
import { Box, BoxProps, useMediaQuery } from '@chakra-ui/react'
import { ErrorStats, DashboardCard } from "../Dashboard"
import { CustomToolTipLineGraph } from "../../dataVisual/graphs/CustomToolTip"

interface ErrorGraphProps {
    data: ErrorStats[]
}

export const ErrorGraph: React.FC<ErrorGraphProps> = ({data}) => {
    return (
        <DashboardCard
        colSpan={3}
        borderRadius='12px'
        padding='24px'>
            <ResponsiveContainer width='100%' height={400}>
                <LineChart data={data}>
                    <XAxis
                    stroke='var(--teal)'
                    dataKey='date'>
                        <Label
                        value='Date'
                        position='insideBottom'
                        fill='var(--teal)'
                        />
                    </XAxis>
                    <YAxis
                    domain={[0, 10]}
                    stroke='var(--teal)'>
                        <Label
                        value='Error Count'
                        position='insideLeft'
                        angle={-90}
                        fill='var(--teal)'/>
                    </YAxis>
                    <Tooltip content={<CustomToolTipLineGraph/>}/>
                    <CartesianGrid
                    stroke='var(--teal)'
                    strokeDasharray='2'
                    style={{opacity: '0.3'}}/>
                    <Line
                    type='monotone'
                    dataKey='count'
                    dot={{
                        stroke: 'var(--teal)',
                        fill: 'var(--teal)'
                    }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </DashboardCard>
    )
}