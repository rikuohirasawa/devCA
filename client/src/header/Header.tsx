import { HeaderWrapper, HeaderLink, ExternalLink, FilterSettings } from './headerStyles'
import { Switch, Icon } from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs'
import { Link } from 'react-router-dom'

import { Sidebar } from '../sidebar/Sidebar'

import { useContext } from 'react'
import { PageContext } from '../states/PageContext'
import { decodeDate } from '../utils'
import { Button } from '@chakra-ui/react'

import { IoMdSettings } from 'react-icons/io'
import { Logo } from '../logo/Logo'
export const Header: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, viewByFormat, viewDate } = state
    return (
        <>
        <HeaderWrapper>
            <Logo/>
            <ExternalLink href='https://github.com/rikuohirasawa' target='_blank'>
                <Icon as={BsGithub}/>
            </ExternalLink>
            <Button 
            bg='inherit'
            border='1px solid'
            _hover={{
                bg: 'teal',
                color: 'var(--black)',
                border: '1px solid'
            }}
            onClick={()=>{dispatch({type: 'TOGGLE_SIDEBAR'})}}>
                <Icon as={IoMdSettings} boxSize={6}/>
            </Button>
        </HeaderWrapper>
        <Sidebar/>
        </>
    )
}