import { PieGraph } from '../graphs/PieGraph'
import { BarGraph } from '../graphs/BarGraph'
import { LineGraph } from '../graphs/LineGraph'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export interface GraphProps {
    data : {
        [key:string] : number
    } 
}
export const GraphTabs: React.FC<GraphProps> = ({data}) => {
    if (data) {
        return (
            <Tabs 
            isLazy
            isFitted
            size='lg' 
            align='center'
            variant='enclosed'
            colorScheme='teal'
           >
                <TabList>
                    <Tab _selected={{border: '1px solid teal'}} borderBottom='1px solid teal'>Popular Technologies</Tab>
                    <Tab _selected={{border: '1px solid teal'}} borderBottom='1px solid teal'>All Technologies</Tab>
                    <Tab _selected={{border: '1px solid teal'}} borderBottom='1px solid teal'>Technology Trends</Tab>
                </TabList>
                <TabPanels color='teal'>
                    <TabPanel height='100%'>
                        <PieGraph data={data}/>
                    </TabPanel>
                    <TabPanel height='100%'>
                        <BarGraph data={data}/>
                    </TabPanel>
                    <TabPanel height='100%'>
                        <LineGraph/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
    } else {
        return <></>
    }
 
}