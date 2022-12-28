import { geoPatterson } from "d3-geo-projection";
import { useEffect } from "react";
import Datamap from 'datamaps'
import d3 from 'd3'

import { useContext } from "react";
import { PageContext } from "../states/PageContext";

const CANADA_TOPO_JSON = require('./Canada.topo.json')

window.addEventListener('load', (event)=>{
    console.log(event)
})
export const ChoroplethMap = ({data}) => {

    const { state, dispatch } = useContext(PageContext),
    { regionDataAll, viewDate, viewTechnology } = state;
    


    // console.log(state.regionDataAll[0][viewDate]['total_job_count'])
    
    if (regionDataAll && document.readyState === 'complete') {
        const dataset = {},
        totalJobCount = regionDataAll.pop().sum_jobs,
        onlyValues = regionDataAll.map((e, index)=>{
                return e[viewDate]['technologies'][viewTechnology]
        })
        const minValue = Math.min.apply(null, onlyValues),
        maxValue = Math.max.apply(null, onlyValues);

        const paletteScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range(['#E5CCEE', '#990011'])

        regionDataAll.forEach((e, index)=>{
            console.log(e)
            const iso = e.region,
            value = e[viewDate]['technologies'][viewTechnology];
            dataset[iso] = {number: value, fillColor: paletteScale(value)}
        })

        let map = new Datamap({
            element: document.getElementById('map-container'),
            scope: 'canada',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                highlightFillColor: '#FCF6F5',
                borderColor: '#444',
                highlightBorderWidth: 1,
                borderWidth: 0.5,
                dataJson: CANADA_TOPO_JSON,
                popupTemplate: function (geo, data) {
                    // don't show tooltip if country don't present in dataset
                    if (!regionDataAll) { return; }
                    // tooltip content
                    return ['<div class="hoverinfo">',
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
            setProjection: function (element) {
                const projection = d3.geo.mercator()
                    .center([-106.3468, 68.1304]) // always in [East Latitude, North Longitude]
                    .scale(400)
                    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    
                const path = d3.geo.path().projection(projection);
                return { path: path, projection: projection };
            }
        })

    }





    // const huh = state.regionDataAll.map(e=>e[state.viewDate]['technologies'][state.viewTechnology])
    // console.log(...state)


    useEffect(()=>{
        
    })
    
    return (
        <div id='map-container'
        style={{height: '100%', width: '100%'}}>
            

        </div>
        // <div>
        // <ComposableMap
        // projectionConfig={MAP_CONFIG}
        // // geoPatterson flattens the map, it is sligned with the globe by default
        // projection={geoPatterson()}>
        //     <Geographies geography={CANADA_TOPO_JSON}>
        //         {({geographies}) => {
        //             return geographies.map((geography, index)=>{
        //                 return (
        //                 <Geography
        //                 key={index}
        //                 geography={geography}
        //                 />
        //                 )
        //             })
        //         }}
        //     </Geographies>
        // </ComposableMap>
        // </div>
  

    )
}