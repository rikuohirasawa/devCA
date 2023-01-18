import styled from "styled-components";

export const BackDrop = styled.div<{modalOpen: boolean}>`
    background: transparent;
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: ${(props)=>!props.modalOpen && 'none'};
`

export const Wrapper = styled.div`
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
        color: var(--soft-white);
        border: 1px solid var(--cherry-red);
     }
`

export const Content = styled.div`
    height: 100%;
    .modal-heading {
        font-size: 24px;
    }
    `
