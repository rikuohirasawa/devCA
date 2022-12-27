import { Wrapper } from "./homepageStyles"

import { ChoroplethMap } from "../dataVisual/ChoroplethMap"
import { DataMap } from "../dataVisual/DataMap"
import { SimpleMap } from "../dataVisual/SimpleMap"
export const Homepage: React.FC = () => {
    const data = [["MB", 75], ["SK", 43], ["AB", 50], ["BC", 88], ["NU", 21], ["NT", 43],
    ["YT", 21], ["ON", 19], ["QC", 60], ["NB", 4], ["NS", 44], ["NF", 38],
    ["PE", 67]]
    return (
    
    <Wrapper>
        <ChoroplethMap data={data}/>
        {/* <SimpleMap/> */}
        {/* <DataMap/> */}
    </Wrapper>
    )
}