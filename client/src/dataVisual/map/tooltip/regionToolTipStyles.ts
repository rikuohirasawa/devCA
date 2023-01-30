import styled from 'styled-components'

export const TooltipWrapper = styled.div<{$display:string}>`
    position: absolute;
    display: ${props=>props.$display};
    flex-direction: column;
    width: fit-content;
    z-index: 999999999999;
    
    background: var(--black);
    color: var(--teal);
    border: 1px solid var(--teal-light);
    padding: 12px 18px;
    border-radius: 8px;

    top: 50%;
    left: 50%;
    font-size: 1.15rem;
    
    .region-tooltip-header {
        font-size: 1.5rem;
        font-weight: 700;
    }

    .font-bold {
        font-weight: 700;
    }
    `