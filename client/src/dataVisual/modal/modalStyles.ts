import styled from "styled-components";

import { GrClose } from 'react-icons/gr'

export const BackDrop = styled.div<{modalOpen: boolean}>`
    border: 1px solid red;
    background: transparent;
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: ${(props)=>!props.modalOpen && 'none'};
    /* z-index: -1; */
`

export const Wrapper = styled.div`
    border: 1px solid blue;
    height: 100%;
    width: 100%;
    padding: 16px;`

export const CloseButton = styled.button`
    float: right;
    border: 1px solid;
    border-radius: 50%;
    background: inherit;
    padding: 4px;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover {
        /* background: var(--cherry-red); */
        color: var(--soft-white);
        border: 1px solid var(--cherry-red);
     }
`

export const Content = styled.div`
    .modal-heading {
        font-size: 24px;
    }
    `
