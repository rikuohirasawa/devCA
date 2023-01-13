import {
    FormControl,
    RadioGroup,
    Radio,
    Stack,
    Heading,
    Button,
    Icon
  } from '@chakra-ui/react'

import { IoFilterOutline } from 'react-icons/io5'


import { RadioScrollColumn, Typewriter } from './siderbarStyles';

import React, { useState, useContext } from 'react'
import { PageContext } from '../states/PageContext';

import { decodeTechnologyName, decodeDate } from './utils';
import { convertNames } from '../utils';

import moment from 'moment';
  export const FilterMenu: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, technologyDataAll, viewDate, regionDataAll, selectedRegionID } = state,
    [language, setLanguage] = useState(viewTechnology),
    [date, setDate] = useState(viewDate),
    [technology, setTechnology] = useState('Region (optional)')
    // setTechnology = (technology: string) => {
    //     dispatch({type: 'VIEW_TECHNOLOGY', payload: technology})
    // }

    const onSubmit = (e: React.FormEvent) =>{ 
        e.preventDefault();
        console.log('submit')
    }
    return (
        <>
        <form onSubmit={(e)=>{onSubmit(e)}}>
        <FormControl
        >
            <Heading>{language}</Heading>
        {/* <Typewriter>
            <p key={language}>{language}</p>
        </Typewriter> */}

        <RadioGroup onChange={setLanguage} value={language}>
                <RadioScrollColumn>
                {technologyDataAll && technologyDataAll.map((e, index)=>{
                    return (
                    <Radio 
                    isRequired
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
        <Heading>{decodeDate(viewDate)}</Heading>
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
                        isRequired={false}
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
        <Button 
        bgColor='var(--bg-black)'
        border='1px solid teal'
        _hover={{
        bg: 'teal', 
        color: 'var(--bg-black)',
        border: '1px solid var(--bg-black)'}}
        leftIcon={<Icon as={IoFilterOutline}/>}
        type='submit'>Filter</Button>
        </FormControl>
        </form>
        </>
    )
}