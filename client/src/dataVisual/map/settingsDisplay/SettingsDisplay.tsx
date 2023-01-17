import { MapLegend } from "../legend/MapLegend"

import { SettingsDisplayWrapper, TextContainer, SettingsDisplayHeader, MinimizeIcon } from "./settingsDisplayStyles"
import { Heading, Button, Icon, Accordion, AccordionButton, AccordionItem, AccordionPanel, Flex, Spacer } from "@chakra-ui/react"

import { IoMdSettings } from 'react-icons/io'

import { useContext, useState  } from 'react';
import { PageContext } from "../../../states/PageContext";

import { decodeDate } from "../../../utils";

export const SettingDisplay: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, viewByFormat, viewDate } = state

    const [minimized, setMinimized] = useState<boolean>(false)
    return (
        <>
        <SettingsDisplayWrapper minimize={minimized}>
        <Accordion 
        // default index sets accordion to be open by default
        defaultIndex={0}
        allowToggle
        border='none'
        >
            <AccordionItem
            defaultChecked
            border='none'>
                <AccordionButton
                onClick={()=>{setMinimized(!minimized)}}>   
                    <Heading 
                    width='100%'>
                        <MinimizeIcon minimize={minimized}/>
                    </Heading>
                </AccordionButton>
                <AccordionPanel
               >
                    <Flex
                    justify='center'
                    gap='40px'
                    align='flex-end'
                    >
                    <TextContainer>
                        <div>
                            <Heading size='xs'>Technology:</Heading>
                            <Heading size='xl'>{viewTechnology}</Heading>
                            </div>
                        <div>
                            <Heading size='xs'>Sort by:</Heading>
                            <Heading size='lg'>{viewByFormat}</Heading>
                            </div>
                        <div>
                            <Heading size='xs'>Date:</Heading>
                            <Heading size='lg'>{decodeDate(viewDate)}</Heading>
                        </div>
                        <Button 
                            bgColor='var(--black)'
                            border='1px solid teal'
                            fontWeight='400'
                            marginTop='10px'
                            _hover={{
                            bg: 'teal', 
                            color: 'var(--bg-black)',
                            border: '1px solid var(--bg-black)'}}
                            leftIcon={<Icon as={IoMdSettings}/>}
                            onClick={()=>{dispatch({type: 'TOGGLE_SIDEBAR'})}}>
                                Set Filter
                        </Button>
                    </TextContainer>
                    <MapLegend/>
                </Flex>
        </AccordionPanel>

            </AccordionItem>

        </Accordion>
        </SettingsDisplayWrapper>

        {/* <SettingsDisplayWrapper>
        <SettingsDisplayHeader>minimize</SettingsDisplayHeader>
            <TextContainer>
                <div>
                <div>Technology:</div>
                <Heading>{viewTechnology}</Heading>
                </div>
                <div>
                <div>Sort by:</div>
                <Heading size='lg'>{viewByFormat}</Heading>
                </div>
                <div>
                <div>Date:</div>
                <Heading size='lg'>{decodeDate(viewDate)}</Heading>
                </div>
                <Button 
        bgColor='var(--black)'
        border='1px solid teal'
        fontWeight='400'
        _hover={{
        bg: 'teal', 
        color: 'var(--bg-black)',
        border: '1px solid var(--bg-black)'}}
        leftIcon={<Icon as={IoMdSettings}/>}
        onClick={()=>{dispatch({type: 'TOGGLE_SIDEBAR'})}}>Set Filter</Button>
            </TextContainer>


        </SettingsDisplayWrapper> */}
        </>
    )
}