import styled from "styled-components"

export const MapLegendWrapper = styled.div`
display: flex;
flex-direction: column;
position: absolute;
z-index: 9999999999;
bottom: 2%;
left: 2%;
font-size: 1rem;
font-weight: 700;
`
export const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
export const LegendColor= styled.div<{bgColor: string}> `
    background: ${props=>props.bgColor};

    width: 40px;
    height: 40px;
    color: var(--teal)`
