import Datamap from 'datamaps'
import d3 from 'd3'

import { useContext, useRef, useEffect, useState } from "react";
import { PageContext } from "../states/PageContext";

const CANADA_TOPO_JSON = require('./Canada.topo.json')

export const ChoroplethMap = () => {
    
    const { state, dispatch } = useContext(PageContext),
    { regionDataAll, viewDate, viewTechnology } = state;

    if (regionDataAll && document.readyState === 'complete') {
        const dataset = {},
        // get total job count - stored as last value in array
        totalJobCount = regionDataAll[-1],
        // slice new array that contains only regional information, removing total sum
        removeSumJobsArray = regionDataAll.slice(0, -1)
        const onlyValues = removeSumJobsArray.map(e=>e[viewDate]['technologies'][viewTechnology]),
        minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);

        const paletteScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range(['#E5CCEE', '#990011'])

        removeSumJobsArray.forEach(e=>{
            const iso = e.region,
            value = e[viewDate]['technologies'][viewTechnology];
            dataset[iso] = {number: value, fillColor: paletteScale(value)}
        })
        // this is a ROUGH solution I've implemented to handle a bug where the maps is being rerendered up to 5 times...
        // I've tried a few different solutions with useRef and tinkering with states but nothing worked... so far. I'll come back
        // this at a later date
        if (document.querySelectorAll('#map-container svg').length < 1) {
            const map = new Datamap({
                element: document.getElementById('map-container'),
                scope: 'canada',
                responsive: true,
                geographyConfig: {
                    popupOnHover: true,
                    highlightOnHover: true,
                    highlightFillColor: '#FCF6F5',
                    borderColor: '#444',
                    highlightBorderWidth: 1,
                    borderWidth: 0.5,
                    dataJson: CANADA_TOPO_JSON,
                    popupTemplate: (geo, data) => {
                        // don't show tooltip if country don't present in dataset
                        if (!regionDataAll) { return; }
                        // tooltip
                        return ['<div class="hover-info">',
                            '<strong>', geo.properties.name, '</strong>',
                            '<br>Count: <strong>', data.number, '</strong>',
                            '</div>'].join('');
                    }
                },
                fills: {
                    HIGH: '#990011FF',
                    LOW: '#123456',
                    MEDIUM: 'blue',
                    UNKNOWN: 'rgb(0,0,0)',
                    defaultFill: '#123456'
                },
                data: dataset,
                setProjection: (element) => {
                    const projection = d3.geo.mercator()
                        .center([-106.3468, 68.1304]) //[East Latitude, North Longitude]
                        .scale(400)
                        .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
                    const path = d3.geo.path().projection(projection);
                    return { path: path, projection: projection };
                },      
            })
            d3.select(window).on('resize', function() {
                map.resize();
            });

        }

        

        d3.selectAll('.datamaps-subunit').style('cursor', 'pointer')
        d3.selectAll('.datamaps-subunit').on('click', (geo)=>{

            const selectedRegion = document.getElementsByClassName(geo.id);
            console.log(selectedRegion)
            // const numJobs = JSON.parse(selectedRegion[0].getAttribute('data-info'))['number'];
            const regionData = (regionDataAll.filter(e=>e.region === geo.id && e.region)[0]),
            regionDataInterface = {
                [geo.id]: {
                    [viewDate]: {
                        technologies: [regionData[viewDate]['technologies']],
                        totalCount: regionData[viewDate]['total_job_count']
                    },
                }
            }
            console.log(regionDataInterface)
            // console.log(regionData)
            dispatch({type: 'SELECT_REGION', payload: regionDataInterface})
            dispatch({type: 'SELECT_REGION_ID', id: geo.id})
            dispatch({type: 'TOGGLE_MODAL'});
            // d3.select(`.${geo.id}`).transition().duration(750).attr('style', 'position: absolute;top:50%;left:50%;transform:translate(-50%,-50%')
            // d3.select(`.${geo.id}`).style('position', 'absolute')
        })
    }
    return (
        <div id='map-container'
        style={{height: '100%', width: '100%'}}>
        </div>
    )
}