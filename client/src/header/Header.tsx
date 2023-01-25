import { HeaderWrapper, HeaderLink, ExternalLink, FilterSettings, SidebarBtn, SidebarBtnIcon, NavContainer } from './headerStyles'
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
import { ChakraBtn } from '../themes/ChakraCustom'

import { useLocation } from 'react-router-dom'
export const Header: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, viewByFormat, viewDate, sidebarOpen } = state,
    location = useLocation();
    return (
        <>
        <HeaderWrapper>
            <Link to='/'><Logo/></Link>
            <NavContainer>
                <Link to='/dashboard'>Dashboard</Link>
                <Link to='/about'>About</Link>
            </NavContainer>

            <ChakraBtn 
            visibility={location['pathname'] !== '/' ? 'hidden': 'visible'}
            width='auto'
            rightIcon={<Icon as={IoMdSettings} boxSize={6}/>}
            onClick={()=>{dispatch({type: 'TOGGLE_SIDEBAR'})}}>
                Filter 
            </ChakraBtn>
        </HeaderWrapper>
        <Sidebar/>
        </>
    )
}