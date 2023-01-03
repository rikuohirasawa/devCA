import { TooltipProps } from "recharts"
import { ValueType, NameType } from "recharts/types/component/DefaultTooltipContent"

export const CustomToolTip = ({active, payload, label}: TooltipProps<ValueType, NameType>) => {
        if (active) {
            return (
                <div className="custom-tooltip">
                    {active && payload && payload.length ? 
                    <p className="label">{`${label}: ${payload?.[0].value}`}</p>
                    : 
                    <div>loading</div>
                    }     
                </div>
            )
        }
        return null
}