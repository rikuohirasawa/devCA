import { HeaderWrapper, HeaderLink } from './headerStyles'
import { Link } from 'react-router-dom'

export const Header: React.FC = () => {
    return (
        <HeaderWrapper>
            <HeaderLink to='/'>devCA</HeaderLink>
        </HeaderWrapper>
    )
}