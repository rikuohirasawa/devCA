import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const HeaderWrapper = styled.header`
  /* font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace; */
    position: absolute;
    top: 0;
    z-index: 99999999999;
`

export const HeaderLink = styled(Link)`
    text-decoration: none;
    color: inherit;
`

export const ExternalLink = styled.a`
`