import { TooltipWrapper } from './regionToolTipStyles'
import { useState, useContext } from 'react'
import { PageContext } from '../../../states/PageContext';
import { ToolTipState } from '../LeafletMap'

export const RegionTooltip: React.FC<ToolTipState> = (props: ToolTipState) => {
    const regionNodeList = document.querySelectorAll('.leaflet-interactive')
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
            <h3 className='region-tooltip-header'>{name} - {viewTechnology}</h3>
            <p>Count: <span className='font-bold'>{data.technologies[viewTechnology]}</span></p>
            <p>Percent (in region): <span className='font-bold'>{((data.technologies[viewTechnology] / data.total_job_count) * 100).toFixed(2)}%</span></p>
            <p>Percent (in Canada): <span className='font-bold'>{((data.technologies[viewTechnology] / sumJobs) * 100).toFixed(2)}%</span></p>
        </>}

    </TooltipWrapper>
    )
}