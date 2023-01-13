import { TooltipProps } from "recharts"
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent"
import { TooltipWrapper } from "./graphStyles"

export const CustomToolTip = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
        if (active) {
            return (
                <TooltipWrapper>
                    {active && payload && payload.length ? 
                    <p className="label">{`${label}: ${payload?.[0].value}`}</p>
                    : 
                    <div>loading</div>
                    }     
                </TooltipWrapper>
            )
        }
        return null
}