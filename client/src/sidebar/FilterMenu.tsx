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

import { ChakraBtn } from '../themes/ChakraCustom';
import moment from 'moment';
  export const FilterMenu: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, technologyDataAll, viewByFormat, viewDate, regionDataAll, selectedRegionID, scrapedDates } = state,
    [technologyFilter, setTechnologyFilter] = useState<string>(viewTechnology),
    [dateFilter, setDateFilter] = useState<string>(viewDate),
    [sortByFilter, setSortByFilter] = useState<string>(viewByFormat),
    [region, setRegion] = useState('Region (optional)')
    const onSubmit = (e: React.FormEvent) =>{ 
        e.preventDefault();
        // pass form data to context api
        dispatch({type: 'VIEW_DATE', viewDate: dateFilter});
        dispatch({type: 'VIEW_BY_FORMAT', viewByFormat: sortByFilter});
        dispatch({type: 'VIEW_TECHNOLOGY', viewTechnology: technologyFilter});
        dispatch({type: 'TOGGLE_SIDEBAR'})

    }
    return (
        <>
        <form onSubmit={(e: React.FormEvent)=>{onSubmit(e)}}>
            <FormControl>
                <Heading>{decodeTechnologyName(technologyFilter)}</Heading>
            {/* <Typewriter>
                <p key={technologyFilter}>{technologyFilter}</p>
            </Typewriter> */}

                <RadioGroup 
                onChange={(e:string)=>{
                setTechnologyFilter(e)
                }} 
                value={technologyFilter}>
                    <RadioScrollColumn>
                    {technologyDataAll && technologyDataAll.map((e, index)=>{
                        return (
                            <Radio 
                            _focus={{opacity: '1'}}
                            opacity='0.8'
                            isRequired
                            key={`technology-${index}`}
                            value={e.technology.toString()}
                            colorScheme='teal'
                            defaultChecked={viewTechnology === e['technology'].toString()}
                            >
                                {decodeTechnologyName(e['technology'].toString())}
                            </Radio>
                        )
                    })}
                    </RadioScrollColumn>
                    </RadioGroup>
                    <Heading>{decodeDate(viewDate)}</Heading>
                    <RadioGroup onChange={(e:string)=>{setDateFilter(e)}} value={dateFilter}>
                        <RadioScrollColumn>
                            {scrapedDates && scrapedDates.map((e, index)=>{
                                return (
                                    <Radio
                                    _focus={{opacity: '1'}}
                                    opacity='0.8'
                                    isRequired
                                    colorScheme='teal'
                                    key={`date-${index}`}
                                    value={e}>
                                        {decodeDate(e)}
                                    </Radio>
                                )
                            })}   
                        </RadioScrollColumn>
                    </RadioGroup>
                <Heading>Sort by: {sortByFilter}</Heading>
                <RadioGroup value={sortByFilter} onChange={(e:string)=>{
                    setSortByFilter(e)
                    // dispatch({type: 'VIEW_BY_FORMAT', viewByFormat: e})
                    }}>
                    <RadioScrollColumn>
                        <Radio                         
                        _focus={{opacity: '1'}}
                        opacity='0.8' value='Count' colorScheme='teal'>Count</Radio>
                        <Radio 
                        _focus={{opacity: '1'}}
                        opacity='0.8'
                        value='Percent' colorScheme='teal'>Percent</Radio>
                        <Radio
                        _focus={{opacity: '1'}} 
                        opacity='0.8'
                        value='Ranking' colorScheme='teal'>Ranking</Radio>
                    </RadioScrollColumn>
                </RadioGroup>
                <ChakraBtn 
                leftIcon={<Icon as={IoFilterOutline}/>}
                type='submit'>
                    Filter
                </ChakraBtn>
            </FormControl>
        </form>
        </>
    )
}