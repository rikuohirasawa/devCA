import { MapContainer, TileLayer, useMap, GeoJSON, Popup, Marker, } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';

import { useContext, useRef, useEffect, useState } from "react";
import { PageContext } from '../../states/PageContext';
const CANADA_TOPO_JSON = require('../Canada.topo.json')
const Map = () => {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
}
export const LeafletMap: React.FC = () => {


    const mapStyle: { [key: string]: string }  = {
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    }
    return (
            <MapContainer center={[56.130366, -106.346771]}
            zoom={6} scrollWheelZoom={true} style={mapStyle}>
                <TileLayer
                    attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                {/* <GeoJSON
                data={CANADA_TOPO_JSON}/> */}
            </MapContainer>
    )
}