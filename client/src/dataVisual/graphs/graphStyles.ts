import styled from "styled-components";

export const GraphContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 70%;
    gap: 16px;
`

export const BarGraphWrapper = styled.div`
display: flex;
height: 450px;
overflow-y: scroll;
`

export const StickyWrapper = styled.div``

export const TooltipWrapper = styled.div`
    background: var(--bg-black);
    border: 1px solid rgba(49, 151, 149, 0.3);
    border-radius: 4px;
    padding: 4px 8px;`