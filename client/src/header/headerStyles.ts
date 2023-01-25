import styled from 'styled-components';
import { Link } from 'react-router-dom'

export const HeaderWrapper = styled.header`
  /* font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace; */
    width: 100%;
    position: absolute;
    top: 0;
    z-index: 999;
    background: var(--bg-black);
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 24px;
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

export const SidebarBtn = styled.div`
    width: 36px;
    height: 36px;
    position: absolute;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: inherit;
    transition: all .5s ease-in-out;
    cursor: pointer;
    z-index: 9999999;`

export const SidebarBtnIcon = styled.div<{open: boolean}>`
    width: 30px;
    height: 2px;
    background: ${props=>props.open === true ? 'transparent': 'var(--teal)'};
    transform: ${props=>props.open === true && 'transform: translateX(-50px)'};
    transition: all .5s ease-in-out;   
    &:before,
    &:after {
        width: 30px;
        content: '';
        position: absolute;
        height: 2px;
        background: var(--teal);
        transition: all .5s ease-in-out;
    }  
    &:before {
        transform: ${props=>props.open === true ? 'rotate(45deg) translate(0px, 0px)' : 'translateY(-10px)'}
    }    
    &:after {
        transform: ${props=>props.open === true ? 'rotate(-45deg) translate(0px, 0px)' : 'translateY(10px)'}
    }`

export const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    width: 100%
`