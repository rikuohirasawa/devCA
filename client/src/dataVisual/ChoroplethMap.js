import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { geoPatterson } from "d3-geo-projection";
import { useEffect } from "react";
import Datamap from 'datamaps'
import d3 from 'd3'

const CANADA_TOPO_JSON = require('./Canada.topo.json')

const mapCoordinates = [-106.3468, 68.1304]
const MAP_CONFIG = {
    scale: 350,
    center: mapCoordinates
}
console.log(geoPatterson())
window.addEventListener('load', (event)=>{
    console.log(event)
})
export const ChoroplethMap = ({data}) => {
    console.log(data)
    let dataset = {},
    onlyValues = data.map((e)=>e[1]),
    minValue = Math.min.apply(null, onlyValues),
    maxValue = Math.max.apply(null, onlyValues);

    const paletteScale = d3.scale.linear()
        .domain([minValue, maxValue])
        .range(['#EFEFFF', '#02386F'])

    data.forEach((e)=>{
        let iso = e[0],
        value = e[1];
        dataset[iso] = {number: value, fillColor: paletteScale(value)}
    })
    useEffect(()=>{
        let map = new Datamap({
            element: document.getElementById('map-container'),
            scope: 'canada',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                highlightFillColor: '#990011FF',
                borderColor: '#444',
                highlightBorderWidth: 1,
                borderWidth: 0.5,
                dataJson: CANADA_TOPO_JSON,
                popupTemplate: function (geo, data) {
                    // don't show tooltip if country don't present in dataset
                    if (!data) { return; }
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
                var projection = d3.geo.mercator()
                    .center([-106.3468, 68.1304]) // always in [East Latitude, North Longitude]
                    .scale(400)
                    .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
    
                var path = d3.geo.path().projection(projection);
                return { path: path, projection: projection };
            }
        })
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