
import { BsGithub } from 'react-icons/bs'
import { Link as RRLink, type LinkProps as RRLinkProps, useLocation } from 'react-router-dom'

import { Sidebar } from '../sidebar/Sidebar'

import { useContext } from 'react'
import { PageContext } from '../states/PageContext'
import { decodeDate } from '../utils'
import { Button } from '@chakra-ui/react'

import { IoMdSettings } from 'react-icons/io'
import { Logo } from '../logo/Logo'
import { ChakraBtn } from '../themes/ChakraCustom'
import { Link, LinkProps, Icon, Box, BoxProps, useMediaQuery } from '@chakra-ui/react'


const HeaderWrapper = (props: BoxProps) => {
    return (
        <Box 
        as='header'
        width='100%'
        position='absolute'
        top={0}
        zIndex={999}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
        padding='6px 24px'
        background='darkMode.black'
        {...props}
        />
    )
}
const HeaderLink = (props: LinkProps & RRLinkProps) => {
    return (
        <Link 
        _hover={{
            textDecoration: 'none',
            color: 'darkMode.lightestBlueSlate'
        }}
        as={RRLink}
        {...props}
        />
    )
}

const NavContainer = (props: BoxProps) => {
    return (
        <Box
        display='flex'
        alignItems='center'
        width='100%'
        padding='0 24px'
        gap='36px'
        justifyContent='flex-start'
        {...props}/>
    )
}



export const Header: React.FC = () => {
    const { state, dispatch } = useContext(PageContext),
    { viewTechnology, viewByFormat, viewDate, sidebarOpen } = state,
    location = useLocation();
    const [isSmallerThan450] = useMediaQuery('(max-width: 450px)')
    return (
        <>
        <HeaderWrapper
        padding={isSmallerThan450 ? '16px 12px': '16px 24px'}>
        {/* <HeaderLink to='/'><Logo/></HeaderLink> */}
            <NavContainer 
            gap={isSmallerThan450 ? '12px': '36px'}
            padding={isSmallerThan450 ? '0px': '0 24px'}>
                <HeaderLink to='/' borderBottom={location['pathname'] === '/' ? '1px solid' : 'none'}>Home</HeaderLink>
                <HeaderLink to='/dashboard' borderBottom={location['pathname'] === '/dashboard' ? '1px solid': 'none'}>Dashboard</HeaderLink>
                <HeaderLink to='/about' borderBottom={location['pathname'] === '/about' ? '1px solid': 'none'}>About</HeaderLink>
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