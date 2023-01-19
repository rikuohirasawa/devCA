import styled from "styled-components";

export const PieGraphContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: auto;
    gap: 30px;

    .font-700 {
        font-weight: 700;
    }
`
export const BarGraphContainer = styled.div`
    display: flex;
    height: 500px;
    overflow-y: scroll;
`

export const LineGraphContainer = styled.div``

export const StickyWrapper = styled.div``

export const TooltipWrapper = styled.div`
    background: var(--bg-black);
    border: 1px solid rgba(49, 151, 149, 0.3);
    border-radius: 4px;
    padding: 4px 8px;`