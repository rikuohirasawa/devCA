import { MdComputer } from 'react-icons/md'

import { LogoWrapper, LogoText, Icon } from './logoStyles'

export const Logo: React.FC = () => {
    return (
    <LogoWrapper>
        <Icon>
            <MdComputer size={20}/>
        </Icon>
        <LogoText>devCA</LogoText>
    </LogoWrapper>
    )
}