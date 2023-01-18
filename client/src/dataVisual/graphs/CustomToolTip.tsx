import { TooltipProps } from "recharts"
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent"
import { TooltipWrapper } from "./graphStyles"

import { useContext } from 'react'
import { PageContext } from "../../states/PageContext"

export const CustomToolTip = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
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