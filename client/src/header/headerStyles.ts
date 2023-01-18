import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const HeaderWrapper = styled.header`
  /* font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace; */
    width: 100%;
    border: 1px solid white;
    position: absolute;
    top: 0;
    z-index: 999;
    background: var(--bg-black);
    display: flex;
`

export const HeaderLink = styled.div`
    text-decoration: none;
    color: inherit;
    font-weight: 600;
`

export const ExternalLink = styled.a`
`

export const FilterSettings = styled.div`
  display: flex;
`