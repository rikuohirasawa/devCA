import styled from "styled-components";

export const LogoWrapper = styled.div`
    position: relative;
    width: 50px;
    height: 50px;
    border: 1px solid var(--teal);
`

export const Icon = styled.div`
    position: absolute;
    right: 0;
    bottom: 38%;
    border-bottom: 1px solid var(--teal);
    padding: 0 0 0 6px;
    `

export const LogoText = styled.div`
    margin: 2px 0 0 0;
    font-weight: 600;
    font-size: 0.85rem;
    position: absolute;
    bottom: -1%;
    right: 2%;
    /* border-top: 1px solid var(--teal); */
`