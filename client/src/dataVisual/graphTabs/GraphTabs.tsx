import React from 'react'
import { PieGraph } from '../graphs/PieGraph'
import { BarGraph } from '../graphs/BarGraph'
import { LineGraph } from '../graphs/LineGraph'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

import { useContext } from "react"
import { PageContext } from "../../states/PageContext"

export interface GraphProps {
    data : {
        [key:string] : number
    } 
}
export const GraphTabs: React.FC<GraphProps> = ({data}) => {

    const { state } = useContext(PageContext),
    { windowWidth, windowDimensions } = state,
    windowHeight = windowDimensions['innerHeight']
    if (data) {
        return (
            <Tabs 
            isLazy
            isFitted
            size={windowWidth < 380 ? 'sm' : windowWidth < 450 ? 'md' : 'lg'}
            align='center'
            variant='enclosed'
            colorScheme='teal'
            padding='0'
           >
                <TabList>
                    <Tab _selected={{border: '1px solid'}} borderBottom='1px solid'>Popular Technologies</Tab>
                    <Tab _selected={{border: '1px solid'}} borderBottom='1px solid'>All Technologies</Tab>
                    <Tab _selected={{border: '1px solid'}} borderBottom='1px solid'>Technology Trends</Tab>
                </TabList>
                <TabPanels color='teal'>
                    <TabPanel
                    overflow='hidden'
                    height={windowHeight < 950 && windowWidth > 550 ? '500px' : '100%'}
                    padding='0'>
                        <PieGraph data={data}/>
                    </TabPanel>
                    <TabPanel 
                    overflow='hidden'
                    padding='0'
                    height={windowHeight < 950 && windowWidth > 550 ? '500px' : '100%'}
                    >
                        <BarGraph data={data}/>
                    </TabPanel>
                    <TabPanel 
                    overflow='hidden'
                    padding='0'
                    height={windowHeight < 950 && windowWidth > 550 ? '500px' : '100%'}>
                        <LineGraph/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
    } else {
        return <></>
    }
 
}