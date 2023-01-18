import { MapContainer, TileLayer, useMap, GeoJSON, Popup, Marker, Polygon, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css';
import './leafletmap.css'

import { useContext, useRef, useEffect, useState } from "react";
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


const CANADA_TOPO_JSON = require('../Canada.topo.json')

const Map = () => {
    const map = useMap()
    console.log('map center:', map.getCenter())
    return null
}



interface Features {
    [key: string]: string | {},
    geometry: {
        coordinates: [][],
        type: string
    },
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

interface Feature {
    geometry: {
        type: string,
        coordinates: [][]
    }, id: string,
    properties: {
        [key:string] : null | number
    }, type: string
}

interface FeatureCollection {
    type: string,
    features: Feature[]
}

export interface ToolTipState {
    display: boolean,
    name?: string,
    data?: {
        technologies: {[key:string]: number},
        total_job_count: number
    }

}

export const LeafletMap: React.FC = () => {

    const [toolTipData, setToolTipData] = useState<ToolTipState>();
    const { state, dispatch } = useContext(PageContext),
    { regionDataAll, viewDate, viewTechnology, technologyDataAll, viewByFormat } = state
    const [canadaGeo, setCanadaGeo] = useState(data as unknown as FeatureCollection)
    const mapStyle = {
        background: 'var(--bg-color)',
        height: '100%',
        width: '100%',
        margin: '0 auto',
        overflow: 'hidden'
    };
    if (canadaGeo && regionDataAll) {
        const geoFeatures = canadaGeo.features
        geoFeatures.forEach((feature:any)=>{
            if (feature.id !== '-99') {
                regionDataAll.forEach(region=>{
                    if (region.region === feature.id) {
                        feature.properties.data = region[viewDate]
                    }
                })
            }
        })
    
    const highlightFeature = ((e:any) => {
        const layer = e.target
        setToolTipData(Object.assign(layer.feature.properties, {...layer.feature.properties, display: true}))
        layer.setStyle({
            weight: 1,
            color: 'black',
            fillOpacity: 1
        })
    })

    const resetHighlight = ((e:any) => {
        setToolTipData({display: false})
    })

    const clickFeature = ((e: any) => {
        const id = e['target']['feature']['id']
        const regionData = regionDataAll.filter(e=>e.region === id && e.region)[0]
        console.log(e)
        dispatch({type: 'SELECT_REGION', payload: regionData});
        dispatch({type: 'SELECT_REGION_ID', id: id});
        dispatch({type: 'TOGGLE_MODAL'});
        // dispatch({type: 'SELECT_REGION', payload: {
        //     [id]: {
        //         [viewDate]:{
        //             technologies: regionData[viewDate]['technologies']
        //         },
        //     }
        // }})
        // e.target.setStyle(style(e.target.feature));
    })

    const onEachFeature = (feature: any, layer: any)=> {
        layer.on({
            click: clickFeature,
            mouseover: highlightFeature,
            mouseout: resetHighlight,
        });
    }

    interface SingleTechnology {    
        [key: string]: {
            regions: {
                [key: string]: number
            },
            total_job_count: number
        } & {
            technology: string
        }

    }
    const singleCountTechnology: any = technologyDataAll && technologyDataAll.filter((e: any)=>{
        if (e['technology'] === viewTechnology && viewDate) {
            return e
        }
    })

    const rankList: {[key: string]: number} = {}
    const countArray = regionDataAll.map(e=>{
        const technologies: any = e[viewDate]['technologies'];
        const name: any = e['region']
        return {name: name, count: technologies[viewTechnology]}
    })
    const sortByRank = countArray.sort((a, b)=>{
        return (a['count'] - b['count'])
    })
    console.log(sortByRank)
    sortByRank.forEach((e, index)=>{
        Object.assign(rankList, {[e['name']]: index})
    })
    console.log(rankList)
    geoFeatures.forEach(feature=>{
        feature['properties']['rank'] = rankList[feature['id']]
    })
        //     regionDataAll.forEach(e=>{
        //         const technologies: any = e[viewDate]['technologies'];
        //         const name: any = e['region']
        //         Object.assign(rankList, {[name] : technologies[viewTechnology]})
        //     })
        //     console.log(rankList)
        // geoFeatures.forEach(feature=>{


    interface Feat {
        geometry: {};
        id: string;
        properties: {
            name: string | null;
            data?: {
                technologies: {};
                total_job_count: number
            }
        };
        type: string;
    }
    const style = ((feature: any) => {
        // try {
            if (feature.id !== '-99' && feature['properties']['data']['technologies'][viewTechnology] >= 0) {
                // console.log(feature.id, feature['properties']['data']['technologies'][viewTechnology])
                // console.log(feature['properties']['data']['technologies'][viewTechnology])
                console.log(feature['properties']['rank'])
                return ({
            
                    fillColor: getFillColor(
                        feature['properties']['data']['technologies'][viewTechnology] ?? 0, 
                        viewByFormat,
                        viewByFormat === 'Percent' && singleCountTechnology && viewDate && singleCountTechnology[0][viewDate]['total_job_count'],
                        viewByFormat === 'Ranking' && feature['properties']['rank']
                        ),
                    weight: 1,
                    opacity: 1,
                    color: 'rgba(255, 255, 255, 0.1)',
                    dashArray: '0',
                    fillOpacity: 0.8,
                })
            } else {
                return ({
                    fillcolor: '#fff',
                    weight: 1,
                    opacity: 1,
                    color: 'rgba(255, 255, 255, 0.1)',
                    dashArray: '0',
                    fillOpacity: 0.5,
                })
            }
        // } catch (err) {
        //     console.log(err)
        //     return ({
        //         fillcolor: '#fff',
        //         weight: 1,
        //         opacity: 1,
        //         color: 'rgba(255, 255, 255, 0.1)',
        //         dashArray: '0',
        //         fillOpacity: 0.5,
        //     })
        // }
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
                {/* {canadaGeo.features.map(e=>{
                    console.log(e)
                        return (
                        <Polygon positions={multiPolygon as unknown as LatLngExpression[][] }
                        pathOptions={{color: 'purple'}}>
                            <Tooltip>Sticky tooltip</Tooltip>
                        </Polygon>)
                    })} */}
                    </>
                )}
                <SettingDisplay/>
                {/* <MapLegend/> */}
            </MapContainer>
    )
                } else {
                    return <div>loading</div>
                }
}

