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
  export const FilterMenu: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, technologyDataAll, viewDate } = state,
    [language, setLanguage] = useState(viewTechnology),
    [date, setDate] = useState(viewDate)
    return (
        <>
        <FormControl>
            <Heading>{language}</Heading>
        {/* <Typewriter>
            <p key={language}>{language}</p>
        </Typewriter> */}

        <RadioGroup onChange={setLanguage} value={language}>
                <RadioScrollColumn>
                {technologyDataAll && technologyDataAll.map(e=>{
                    return (
                    <Radio 
                    value={decodeTechnologyName(e.technology)}
                    colorScheme='teal'
                    defaultChecked={viewTechnology === e.technology ? true : false}
                    >
                        {decodeTechnologyName(e.technology)}
                    </Radio>
                    )
                })}
                </RadioScrollColumn>
        </RadioGroup>
        <RadioGroup onChange={setDate} value={date}>
            <RadioScrollColumn>
                
            </RadioScrollColumn>
        </RadioGroup>
        </FormControl>

        </>
    )
}