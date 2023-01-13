import styled from 'styled-components'

export const TooltipWrapper = styled.div<{display?:boolean}>`
    position: absolute;
    display: ${props=>props.display ? 'flex' : 'none'};
    flex-direction: column;
    width: fit-content;

    background: var(--bg-black);
    border: 1px solid var(--teal);
    padding: 12px 18px;
    border-radius: 8px;
    z-index: 400;
    top: 50%;
    left: 50%`