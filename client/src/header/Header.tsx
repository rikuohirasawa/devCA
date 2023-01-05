import { HeaderWrapper, HeaderLink, ExternalLink } from './headerStyles'
import { Switch, Icon } from '@chakra-ui/react'
import { BsGithub } from 'react-icons/bs'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <HeaderLink to='/'>dev</HeaderLink>
            <ExternalLink href='https://github.com/rikuohirasawa' target='_blank'>
                <Icon as={BsGithub}/>
            </ExternalLink>
            <Switch size='md' colorScheme='teal'
            onChange={()=>{
                console.log('switch')
            }}/>
        </HeaderWrapper>
    )
}