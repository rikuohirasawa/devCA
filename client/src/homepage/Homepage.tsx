import { Wrapper } from "./homepageStyles"

import { ChoroplethMap } from "../dataVisual/ChoroplethMap"
import { useEffect, useContext, useRef } from "react"

import { PageContext } from "../states/PageContext"
import { DataMap } from "../dataVisual/DataMap"
import { SimpleMap } from "../dataVisual/SimpleMap"
import { RegionModal } from "../dataVisual/modal/RegionModal"
import { LeafletMap } from "../dataVisual/map/LeafletMap"
import { decodeDate } from "../utils"

export const Homepage: React.FC = () => {
    const { state, dispatch } = useContext(PageContext);

    useEffect(()=>{
      const onResize = () => {
        dispatch({type: 'WINDOW_WIDTH', windowWidth: window.innerWidth})
      }
      window.addEventListener('resize', onResize)
      return ()=> window.removeEventListener('resize', onResize)
      }, [])
    useEffect(()=>{
        fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=region_data`)
        .then(res=>res.json())
        .then(data=>{
          const datesArray = Object.keys(data[0]).filter((e:string) => e !== 'region'),
          sumJobs = data.slice(-1)[0]['sum_jobs'];
          dispatch({type: 'VIEW_DATE', viewDate: datesArray.slice(-1)[0]})
          dispatch({type: 'SCRAPED_DATES', scrapedDates: datesArray});
          dispatch({type: 'SUM_JOBS', payload: sumJobs});
          dispatch({type: 'REGION_DATA', payload: data.slice(0, -1)});
        })
      }, [])

    useEffect(()=>{
      fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=technology_data`)
      .then(res=>res.json())
      .then(data=>{
        dispatch({type: 'TECHNOLOGY_DATA', payload: data});
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