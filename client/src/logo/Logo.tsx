import { MdComputer } from 'react-icons/md'
import React from 'react'
import { LogoWrapper, LogoText, Icon } from './logoStyles'

export const Logo: React.FC = () => {
    return (
    <LogoWrapper>
        <Icon>
            <MdComputer size={22}/>
        </Icon>
        <LogoText>dev</LogoText>
    </LogoWrapper>
    )
}