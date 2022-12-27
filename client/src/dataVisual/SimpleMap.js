import { ComposableMap, Geographies, Geography } from "react-simple-maps"
import { geoAlbers } from "d3-geo"
import d3 from "d3"

const CANADA_TOPO_JSON = require('./Canada.topo.json')

const projection = d3.geo.mercator()
    .center([-106.3468,70.1304])

const albers = d3.geo.albers()
    .center([-106.3468, 68.1304])
    // .rotate([115, 0])

    // .translate([element.offsetWidth / 2, element.offsetHeight / 2]);
export const SimpleMap = () => {
    return (
        <ComposableMap projection={projection}>
            <Geographies geography={CANADA_TOPO_JSON}>
                {({geographies}) => {
                    return geographies.map((geo)=>{
                        return <Geography key={geo.rsmKey} geography={geo}/>
                    })
                }}
            </Geographies>
        </ComposableMap>
    )
}