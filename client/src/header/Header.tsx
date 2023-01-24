import { HeaderWrapper, HeaderLink, ExternalLink, FilterSettings, SidebarBtn, SidebarBtnIcon } from './headerStyles'
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
export const Header: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, viewByFormat, viewDate, sidebarOpen } = state
    return (
        <>
        <HeaderWrapper>
            <Link to='/'><Logo/></Link>
            <Link to='/dashboard'>Dashboard</Link>
            <ChakraBtn 
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