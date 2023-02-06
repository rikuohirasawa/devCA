import { Wrapper } from "./homepageStyles"

import { ChoroplethMap } from "../dataVisual/ChoroplethMap"
import { useEffect, useContext, useRef } from "react"

import { PageContext } from "../states/PageContext"
import { DataMap } from "../dataVisual/DataMap"
import { SimpleMap } from "../dataVisual/SimpleMap"
import { RegionModal } from "../dataVisual/modal/RegionModal"
import { LeafletMap } from "../dataVisual/map/LeafletMap"
import { decodeDate } from "../utils"
import { ErrorScreen } from "../errorScreen/ErrorScreen"
import { RegionData } from "../states/pageReducer"

export const Homepage: React.FC = () => {
    const { state, dispatch } = useContext(PageContext),
    { isError } = state
    useEffect(()=>{
      const onResize = () => {
        dispatch({type: 'WINDOW_DIMENSIONS', windowDimensions: window})
        dispatch({type: 'WINDOW_WIDTH', windowWidth: window.innerWidth})
      }
      window.addEventListener('resize', onResize)
      return ()=> window.removeEventListener('resize', onResize)
      }, [])
    useEffect(()=>{
      fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=region_data`)
      .then((res: Response)=>{
        if (res['status'] > 400) {
          throw new Error(`${res['status']}, ${res['statusText']}`)
        }
        return res.json()})
      .then((data: RegionData[])=>{
        const datesArray = Object.keys(data[0]).filter((e:string) => e !== 'region'),
        sumJobs = data.slice(-1)[0]['sum_jobs'];
        dispatch({type: 'VIEW_DATE', viewDate: datesArray.slice(-1)[0]})
        dispatch({type: 'SCRAPED_DATES', scrapedDates: datesArray});
        dispatch({type: 'SUM_JOBS', payload: sumJobs});
        dispatch({type: 'REGION_DATA', payload: data.slice(0, -1)});
      })
      .catch((err: Error)=>{
        dispatch({type: 'IS_ERROR', isError: {isError: true, message: err['message']}})
      })
      return dispatch({type: 'IS_ERROR', isError: {isError: false}})
    }, [])

    useEffect(()=>{
      fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=technology_data`)
      .then((res: Response)=>{
        if (res['status'] > 400) {
          throw new Error(`${res['status']}, ${res['statusText']}`)
        }
        return res.json()
      })
      .then((data: RegionData[])=>{
        dispatch({type: 'TECHNOLOGY_DATA', payload: data});
        })
      .catch((err: Error)=>{
        dispatch({type: 'IS_ERROR', isError: {isError: true, message: err['message']}})
        })
      return dispatch({type: 'IS_ERROR', isError: {isError: false}})
    }, [])
    if (isError['isError']) {
      return (
        <ErrorScreen/>
      )
    } else {
      return (
        <Wrapper>
          <RegionModal/>
          <LeafletMap/>
        </Wrapper>
        )
    }

}