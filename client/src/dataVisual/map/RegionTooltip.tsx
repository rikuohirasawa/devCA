import { TooltipWrapper } from './regionToolTipStyles'
import { useState, useContext } from 'react'
import { PageContext } from '../../states/PageContext';
import { ToolTipState } from './LeafletMap';

interface TooltipProps {
    display: boolean,
    name?: string,
    data?: {
        technologies: {
            [technology: string]: number,

        }
        total_job_count: number
    },
}
export const RegionTooltip: React.FC<ToolTipState> = (props: ToolTipState) => {
    const regionNodeList = document.querySelectorAll('.leaflet-interactive')
    console.log(props)
    const {display, name, data} = props
    const { state } = useContext(PageContext),
    { viewTechnology, sumJobs } = state

    const tooltipNode = document.querySelector('.region-tooltip') as HTMLElement
    document.addEventListener('mousemove', (e)=>{
        if (tooltipNode) {
            tooltipNode.style.left = e.pageX + 'px'
            tooltipNode.style.top = e.pageY + 'px'
        }
        })

    return (
    <TooltipWrapper className='region-tooltip'
    display={display}>
        {name && data && sumJobs &&
        <>
            <h3>{name} - {viewTechnology}</h3>
            <p>Count: {data.technologies[viewTechnology]}</p>
            <p>Percent (in region): {((data.technologies[viewTechnology] / data.total_job_count) * 100).toFixed(2)}%</p>
            <p>Percent (in Canada): {((data.technologies[viewTechnology] / sumJobs) * 100).toFixed(2)}%</p>
        </>}

    </TooltipWrapper>
    )
}