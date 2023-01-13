import {
    FormControl,
    RadioGroup,
    Radio,
    Stack,
    Heading
  } from '@chakra-ui/react'


import { RadioScrollColumn, Typewriter } from './siderbarStyles';

import { useState, useContext } from 'react'
import { PageContext } from '../states/PageContext';

import { decodeTechnologyName } from './utils';
import { convertNames } from '../utils';
  export const FilterMenu: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, technologyDataAll, viewDate, regionDataAll, selectedRegionID } = state,
    [language, setLanguage] = useState(viewTechnology),
    [date, setDate] = useState(viewDate),
    [technology, setTechnology] = useState(selectedRegionID ? convertNames[selectedRegionID] : 'Region')
    // setTechnology = (technology: string) => {
    //     dispatch({type: 'VIEW_TECHNOLOGY', payload: technology})
    // }

    return (
        <>
        <FormControl>
            <Heading>{language}</Heading>
        {/* <Typewriter>
            <p key={language}>{language}</p>
        </Typewriter> */}

        <RadioGroup onChange={setLanguage} value={language}>
                <RadioScrollColumn>
                {technologyDataAll && technologyDataAll.map((e, index)=>{
                    return (
                    <Radio 
                    key={`technology-${index}`}
                    value={decodeTechnologyName(e.technology.toString())}
                    colorScheme='teal'
                    defaultChecked={viewTechnology === e.technology}
                    >
                        {decodeTechnologyName(e.technology.toString())}
                    </Radio>
                    )
                })}
                </RadioScrollColumn>
        </RadioGroup>
        <RadioGroup onChange={setDate} value={date}>
            <RadioScrollColumn>
                
            </RadioScrollColumn>
        </RadioGroup>

        <Heading>{technology}</Heading>
        <RadioGroup onChange={setTechnology} value={technology}>
            <RadioScrollColumn>
                {regionDataAll && regionDataAll.map((e, index) =>{
                    const regionId = e['region'].toString();
                    return (
                        <Radio
                        key={index}
                        value={convertNames[regionId]}
                        colorScheme='teal'
                        defaultChecked={selectedRegionID === regionId}
                        >
                            {convertNames[regionId]}
                        </Radio>
                    )
                })}
            </RadioScrollColumn>
        </RadioGroup>
        </FormControl>

        </>
    )
}