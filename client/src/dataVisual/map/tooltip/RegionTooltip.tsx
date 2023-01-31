import { TooltipWrapper } from './regionToolTipStyles'
import React, { useContext } from 'react'
import { PageContext } from '../../../states/PageContext';
import { ToolTipState } from '../LeafletMap'
import { decodeTechnologyName } from '../../../utils';
import { TechnologyData } from '../../../states/pageReducer';

export const RegionTooltip: React.FC<ToolTipState> = (props: ToolTipState) => {
    const { display, name, data } = props,
    { state } = useContext(PageContext),
    { viewTechnology, sumJobs, technologyDataAll, viewDate } = state,
    tooltipNode = document.querySelector('.region-tooltip') as HTMLElement

    if (technologyDataAll && viewDate) {
        const singleCountTechnology: TechnologyData[] = technologyDataAll.filter((e: TechnologyData)=>{
            if (e['technology'].toString() === viewTechnology && viewDate) {
                return e
            }
        })
    document.addEventListener('mousemove', (e)=>{
        if (tooltipNode) {
            tooltipNode.style.left = e.pageX + 'px'
            tooltipNode.style.top = e.pageY + 'px'
        }})
    return (
    <TooltipWrapper className='region-tooltip'
    $display={display}>
        {name && data && sumJobs &&
        <>
            <h3 className='region-tooltip-header'>{name} - {decodeTechnologyName(viewTechnology)}</h3>
            <p>Count: <span className='font-bold'>{data.technologies[viewTechnology]}</span></p>
            <p>Percent of total jobs (in region): <span className='font-bold'>{((data.technologies[viewTechnology] / data.total_job_count) * 100).toFixed(2)}%</span></p>
            <p>Percent of total jobs (in Canada): <span className='font-bold'>{((data.technologies[viewTechnology] / sumJobs) * 100).toFixed(2)}%</span></p>
            <p>Percent of all {viewTechnology} jobs (in Canada): <span className='font-bold'>{(data.technologies[viewTechnology]/singleCountTechnology[0][viewDate]['total_job_count'] * 100).toFixed(2)}%</span> </p>
        </>}
    </TooltipWrapper>
    )
    } else {
        return <div>loading</div>
    }
}