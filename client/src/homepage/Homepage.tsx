import { Wrapper } from "./homepageStyles"

import { ChoroplethMap } from "../dataVisual/ChoroplethMap"
import { useEffect, useContext, useRef } from "react"

import { PageContext } from "../states/PageContext"
import { DataMap } from "../dataVisual/DataMap"
import { SimpleMap } from "../dataVisual/SimpleMap"
import { RegionModal } from "../dataVisual/modal/RegionModal"
export const Homepage: React.FC = () => {
    // const data = [["MB", 75], ["SK", 43], ["AB", 50], ["BC", 88], ["NU", 21], ["NT", 43],
    // ["YT", 21], ["ON", 19], ["QC", 60], ["NB", 4], ["NS", 44], ["NF", 38],
    // ["PE", 67]]

    const { state, dispatch } = useContext(PageContext);

    // const convertNames: {[region: string]: string} = { 
    //     alberta: 'AB', 
    //     british_columbia: 'BC',
    //     manitoba: 'MB',
    //     new_brunswick: 'NB',
    //     newfoundland_and_labrador: 'NF',
    //     northwest_territories: 'NT',
    //     nova_scotia: 'NS',
    //     nunavut: 'NU',
    //     ontario: 'ON',
    //     prince_edward_island: 'PE',
    //     quebec: 'QC',
    //     saskatchewan: 'SK',
    //     yukon: 'YT'
    // }

    const dataxyz = useRef(null);
    useEffect(()=>{
        console.log('usefxx')
        fetch(`http://localhost:8000/get-region-data?date=${'2022-12-23'}&table=region_data`)
        .then(res=>{
          console.log(res)
          return res.json()})
          .then(data=>{
            dispatch({type: 'REGION_DATA', payload: data})
          })
      }, [])
    return (
    <Wrapper>
      <RegionModal/>
        <ChoroplethMap/>
        {/* <SimpleMap/> */}
        {/* <DataMap/> */}
    </Wrapper>
    )
}