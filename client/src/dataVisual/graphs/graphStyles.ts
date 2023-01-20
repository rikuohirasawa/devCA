import styled from "styled-components";

import { ChakraComponent, TextProps, Text, color } from "@chakra-ui/react";

export const PieGraphContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    width: 100%;

    .font-700 {
        font-weight: 700;
    }

    @media only screen and (max-width: 900px) {
        height: 900px;
    }
    @media only screen and (max-width: 550px) {
        height: 1000px;
    }
    .recharts-responsive-container {
        @media only screen and (max-width: 1400px) {
            margin-top: 250px;
    }
    }
    @media only screen and (max-width: 1400px) {
        flex-direction: column;
        overflow-y: scroll;
        gap: 8px;
        min-width: 100%;

        padding: 16px 0;
    }

    @media only screen and (min-width: 900px) {
        max-height: 750px;

    }


`
export const BarGraphContainer = styled.div`
    display: flex;
    height: 700px;
    overflow-y: scroll;

    @media only screen and (max-width: 900px) {
        height: 900px;
    }
    @media only screen and (max-width: 550px) {
        height: 1000px;
    }
`

export const LineGraphContainer = styled.div`
    padding: 16px 0;
    display: flex;
    height: 750px;
    flex-direction: column;
    max-width: 100%;
    align-items: center;
    overflow-y: scroll;
    
    @media only screen and (max-width: 900px) {
        height: 900px;
    }
    
    @media only screen and (max-width: 550px) {
        height: 1000px;
    }`

export const StickyWrapper = styled.div``

export const TooltipWrapper = styled.div`
    background: var(--bg-black);
    border: 1px solid rgba(49, 151, 149, 0.3);
    border-radius: 4px;
    padding: 4px 8px;`


export const FlexContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    text-align: left;
    width: 50%;
    
    @media only screen and (max-width: 1400px) {
        width: 95%;
    }
    @media only screen and (max-width: 900px) {
        padding: 0 1.5rem;
    }`