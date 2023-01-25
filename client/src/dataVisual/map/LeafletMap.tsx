import { MapContainer, TileLayer, useMap, GeoJSON, Popup, Marker, Polygon, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import './leafletmap.css'

import React, { useContext, useRef, useEffect, useState } from "react";
import { PageContext } from '../../states/PageContext';
import data from '../geojson.json';
import { GeoJsonObject } from 'geojson';
import { style } from 'd3';
import { LatLngExpression } from 'leaflet';
import { RegionTooltip } from './tooltip/RegionTooltip';

import { SelectedRegion } from '../../states/pageReducer';

import { getFillColor } from './mapUtils';

import { MapLegend } from './legend/MapLegend';
import { SettingDisplay } from './settingsDisplay/SettingsDisplay';

import { TechnologyData } from '../../states/pageReducer';


const CANADA_TOPO_JSON = require('../Canada.topo.json')

const Map = () => {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
}

interface GeoFeature {
    geometry: {
        type: string,
        coordinates: [][]
    }, 
    id: string,
    properties: {
        data: {
            technologies: {
                [key: string]: number,
            }, total_job_count: number
        }, name: string | null,
        rank: number | undefined
    }, 
    type: string
}

interface FeatureCollection {
    type: string,
    features: GeoFeature[]
}

export interface ToolTipState {
    display: string,
    name?: string,
    data?: {
        technologies: {[key:string]: number},
        total_job_count: number
    },
    totalCountTechnology?: number
}

export const LeafletMap: React.FC = () => {
    const [toolTipData, setToolTipData] = useState<ToolTipState>(),
    { state, dispatch } = useContext(PageContext),
    { regionDataAll, viewDate, viewTechnology, technologyDataAll, viewByFormat } = state,
    [canadaGeo, setCanadaGeo] = useState(data as FeatureCollection),
    mapStyle = {
        background: 'var(--black)',
        height: '100%',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden'
    };

    if (canadaGeo && regionDataAll && technologyDataAll) {
        const geoFeatures: GeoFeature[] = canadaGeo['features']
        geoFeatures.forEach((feature: GeoFeature)=>{
            if (feature.id !== '-99') {
                regionDataAll.forEach(region=>{
                    if (region['region'].toString() === feature['id']) {      
                        feature['properties']['data'] = region[viewDate]
                    }
                })
            }
        })
    
    const singleCountTechnology: TechnologyData[] | undefined = technologyDataAll && technologyDataAll.filter((e: TechnologyData)=>{
        if (e['technology'].toString() === viewTechnology && viewDate) {
            return e
        }
    })

    const highlightFeature = ((e: any) => {
        const layer = e.target
        viewDate && singleCountTechnology && setToolTipData(Object.assign(layer['feature']['properties'], {...layer['feature']['properties'], display: 'flex'}))
        layer.setStyle({
            weight: 1,
            fillColor: 'black',
            fillOpacity: 1
        })
    })

    const resetHighlight = ((e: React.MouseEvent<HTMLElement>) => {
        setToolTipData({display: 'none'})
    })

    const clickFeature = ((e: any) => {
        const id = e['target']['feature']['id']
        const regionData = regionDataAll.filter(e=>e['region'] === id && e['region'])[0]
        dispatch({type: 'SELECT_REGION', payload: regionData});
        dispatch({type: 'SELECT_REGION_ID', id: id});
        dispatch({type: 'TOGGLE_MODAL'});
    })

    const onEachFeature = (feature: any, layer: any)=> {
        layer.on({
            click: clickFeature,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }

    const rankList: {[key: string]: number} = {}
    
    interface RegionCount {
        name: string,
        count: number
    }
    const countArray = regionDataAll.map(e=>{
        const technologyCount: number = e[viewDate]['technologies'][viewTechnology];
        const name = e['region']
        const countObj: RegionCount = {name: name.toString(), count: technologyCount}
        return countObj
    })

    const sortByRank: RegionCount[] = countArray.sort((a, b)=>{
        return (a['count'] - b['count'])
    }) 
    sortByRank.forEach((e, index)=>{
        Object.assign(rankList, {[e['name']]: index})
    })
    geoFeatures.forEach((feature: GeoFeature)=>{
        feature['properties']['rank'] = rankList[feature['id']]
    })

    // this needs to be refactored badly, i was conditionally passing arguments before but it got messy pretty quickly, so there is some overlap in conditions when calling the fillcolor fx
    // will return later to fix
    const style = ((feature: any) => {
            if (feature['id'] !== '-99' && feature['properties']['data']['technologies'][viewTechnology] >= 0) {
                if (viewByFormat === 'Percent' && singleCountTechnology !== undefined) {
                    return ({
                        fillColor: getFillColor(
                            feature['properties']['data']['technologies'][viewTechnology], 
                            viewByFormat,
                            singleCountTechnology[0][viewDate]['total_job_count'],
                            ),
                        weight: 1,
                        opacity: 1,
                        color: 'rgba(208, 209, 213, 0.4)',
                        dashArray: '1',
                        fillOpacity: 0.6,
                    })
                } else if (viewByFormat === 'Ranking') {
                    return ({
                        fillColor: getFillColor(
                            feature['properties']['data']['technologies'][viewTechnology], 
                            viewByFormat,
                            0,
                            feature['properties']['rank']
                            ),
                        weight: 1,
                        opacity: 1,
                        color: 'rgba(208, 209, 213, 0.4)',
                        dashArray: '1',
                        fillOpacity: 0.6,
                    })
                } else if (viewByFormat === 'Count') {
                    return ({
                        fillColor: getFillColor(
                            feature['properties']['data']['technologies'][viewTechnology], 
                            viewByFormat,
                        ),
                        weight: 1,
                        opacity: 1,
                        color: 'rgba(208, 209, 213, 0.4)',
                        dashArray: '1',
                        fillOpacity: 0.6,
                    })
                }} 
                return ({
                    fillcolor: '#fff',
                    weight: 1,
                    opacity: 1,
                    color: 'rgba(255, 255, 255, 0.1)',
                    dashArray: '0',
                    fillOpacity: 0.5,
                })
            
    })
    return (
        <MapContainer center={[71.614190, -99.718438]}
        id='map-container'
        zoom={4}
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
            {canadaGeo && (
            <>
                <GeoJSON
                style={style}
                data={canadaGeo as GeoJsonObject}
                onEachFeature={onEachFeature}/>
                {toolTipData && (
                    <RegionTooltip 
                    display={toolTipData.display}
                    name={toolTipData.name}
                    data={toolTipData.data}/>
                )} 
            </>
            )}
            <SettingDisplay/>
        </MapContainer>
    )
    } else {
        return <div>loading</div>
    }
}

