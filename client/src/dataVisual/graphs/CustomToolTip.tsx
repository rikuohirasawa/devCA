import { TooltipProps } from "recharts"
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent"
import { TooltipWrapper } from "./graphStyles"

import { useContext } from 'react'
import { PageContext } from "../../states/PageContext"
import { decodeTechnologyName, decodeDate } from '../../utils'

import { Text } from "@chakra-ui/layout"

export const CustomToolTipBarGraph = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
    const { state } = useContext(PageContext),
    { selectedRegion, viewDate } = state
    if (active && selectedRegion) {
        return (
            <TooltipWrapper>
                {active && payload && payload.length ? 
                <p className="label">{`${label}: ${payload?.[0].value} (${
                    (
                        Number(payload?.[0].value)/Number(selectedRegion[viewDate]['total_job_count']) * 100
                    ).toFixed(2)})%`}</p>
                : 
                <div>loading</div>
                }     
            </TooltipWrapper>
        )
    }
    return null
}

export const CustomToolTipLineGraph = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
    if (active) {
        return (
            <TooltipWrapper>
                {active && payload && payload.length ? 
                <>
                <Text
                color='var(--teal)'
                textAlign='left'>{decodeDate(label)}</Text>
                <Text
                color='var(--teal)'
                textAlign='left'>Count: {payload[0]['value']}</Text>
                </>
                : <div>loading</div>}
            </TooltipWrapper>
        )
    }
    return null
}