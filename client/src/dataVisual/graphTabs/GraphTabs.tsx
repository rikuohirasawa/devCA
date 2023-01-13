import { PieGraph } from '../graphs/PieGraph'
import { BarGraph } from '../graphs/BarGraph'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

export interface GraphProps {
    data : {
        [key:string] : number
    } 
}
export const GraphTabs: React.FC<GraphProps> = ({data}) => {

    console.log(PieGraph)
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
                    <Tab _selected={{border: '1px solid teal'}} borderBottom='1px solid teal'>Technologies</Tab>
                    <Tab _selected={{border: '1px solid teal'}} borderBottom='1px solid teal'>Region</Tab>
                </TabList>
                <TabPanels color='teal'>
                    <TabPanel height='100%'>
                        <BarGraph data={data}/>
                    </TabPanel>
                    <TabPanel>
                        <PieGraph data={data}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        )
    } else {
        return <></>
    }
 
}