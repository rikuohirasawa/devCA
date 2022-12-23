import React from 'react'
import Datamap from 'datamaps'


export const GeoMap = () => {
    return (
        <>
    <script src="//cdnjs.cloudflare.com/ajax/libs/d3/3.5.3/d3.min.js"></script>
    <script src="//cdnjs.cloudflare.com/ajax/libs/topojson/1.6.9/topojson.min.js"></script>
    <script src="node_modules/datamaps/dist/datamaps.world.min.js"></script>
    <div id="container" style={{position:"relative", width: "500px", height: "300px"}}></div>
    <script>

    </script>
        </>
    )
}

var map = new Datamap({element: document.getElementById('container')});

window.addEventListener('resize', ()=>map.resize())
