import { Wrapper } from "./homepageStyles"

import { ChoroplethMap } from "../dataVisual/ChoroplethMap"
import { useEffect, useContext, useRef } from "react"

import { PageContext } from "../states/PageContext"
import { DataMap } from "../dataVisual/DataMap"
import { SimpleMap } from "../dataVisual/SimpleMap"
import { RegionModal } from "../dataVisual/modal/RegionModal"
import { LeafletMap } from "../dataVisual/map/LeafletMap"
export const Homepage: React.FC = () => {

    const { state, dispatch } = useContext(PageContext);
    useEffect(()=>{
        fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=region_data`)
        .then(res=>res.json())
        .then(data=>{
          console.log(data)
          const sumJobs = data.slice(-1)[0]['sum_jobs']
          dispatch({type: 'SUM_JOBS', payload: sumJobs})
          dispatch({type: 'REGION_DATA', payload: data.slice(0, -1)})
        })
      }, [])

    useEffect(()=>{
      fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=technology_data`)
      .then(res=>res.json())
      .then(data=>{
        console.log(data)
        dispatch({type: 'TECHNOLOGY_DATA', payload: data})
      })
    }, [])
    return (
    <Wrapper>
      <RegionModal/>
      <LeafletMap/>
        {/* <ChoroplethMap/> */}
        {/* <SimpleMap/> */}
        {/* <DataMap/> */}
    </Wrapper>
    )
}