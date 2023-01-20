import styled from "styled-components"

export const MapLegendWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    font-size: 1rem;
    font-weight: 700;
    height: 325px;
    width: 28%;
    
    @media only screen and (max-width: 370px) {
            margin-right: 16px;     
        }
`
export const FlexRow = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`
export const LegendColor= styled.div<{bgColor: string}> `
    background: ${props=>props.bgColor};

    width: 40px;
    height: 20px;
    color: var(--teal)`
