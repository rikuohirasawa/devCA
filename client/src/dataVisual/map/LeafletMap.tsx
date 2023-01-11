import { MapContainer, TileLayer, useMap, GeoJSON, Popup, Marker, } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import './leafletmap.css'

import { useContext, useRef, useEffect, useState } from "react";
import { PageContext } from '../../states/PageContext';
import data from '../geojson.json';
import { GeoJsonObject } from 'geojson';
import { style } from 'd3';

const CANADA_TOPO_JSON = require('../Canada.topo.json')

const Map = () => {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
}

interface Features {
    [key: string]: string | {},
    geometry: {},
    id: string,
    properties: {
        [key:string]: null | number
    },
    type: string,
}
interface GeoJSON {
    type: string,
    features: Features[]
}

export const LeafletMap: React.FC = () => {
    const [canadaGeo, setCanadaGeo] = useState(data as GeoJSON)
    const mapStyle = {
        background: 'var(--bg-color)',
        height: '100vh',
        width: '100%',
        margin: '0 auto',
    };

    if (canadaGeo) {
        const geoFeatures = canadaGeo.features
        geoFeatures.forEach(e=>{
            if (e.id !== '-99') {
                e.properties.count = 30
            }
        })
    }


    interface HighlightData {
        count: number,
    }
    const [onSelect, setOnSelect] = useState<HighlightData | any>()
    // custom interface
    const highlightFeature = ((e:any) => {
        const layer = e.target;
        console.log(layer)
        const { count } = e.target.feature.properties;
        setOnSelect({
            count: count
        });
        layer.setStyle({
            weight: 1,
            color: 'white',
            fillOpacity: 1
        })
    })

    const resetHighlight = ((e:any) => {
        console.log('YO')
    })

    const clickFeature = ((e: any) => {
        console.log('hi')
    })

    const onEachFeature = (feature: any, layer: any)=> {
        layer.on({
            click: clickFeature,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }

    const style = ((feature: any) => {
        return ({
            fillColor: '#319795',
            weight: 1,
            opacity: 1,
            color: 'rgba(255, 255, 255, 0.1)',
            dashArray: '0',
            fillOpacity: 0.5,
        })
    })

    const getFillColorByPercentage = (count: number) => {
        switch (true) {
            case (count <= 10):
               return '#B8DFBA'
            case (count <= 20):
                return '#9CD2A8'
            case (count <= 30):
                return '#80C49D'
            case (count <= 40):
                return '#65B596'
            case (count <= 50):
                return '#4BA694'
            case (count <= 60):
                return '#319795'
            case (count <= 70):
                return '#297486'
            case (count <= 80): 
                return '#225374'
            case (count <= 90): 
                return '#1B3662'
            case (count <= 100): 
                return '#151F4F'
        }   
    }

    return (
            <MapContainer center={[67.614190, -99.718438]}
            id='map-container'
            zoom={3}
            maxZoom={8} 
            minZoom={2}
            scrollWheelZoom={true}
            style={mapStyle}
            >
                <TileLayer
                    id='tile-layer'
                    attribution="Map tiles by Carto, under CC BY 3.0. Data by OpenStreetMap, under ODbL."
                    url="https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png"
                />
                {data && (
                <GeoJSON
                style={style}
                data={canadaGeo as GeoJsonObject}
                onEachFeature={onEachFeature}/>
                )}

            </MapContainer>
    )
}