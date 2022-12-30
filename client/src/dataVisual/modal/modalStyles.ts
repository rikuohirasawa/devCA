import styled from "styled-components";

export const BackDrop = styled.div<{modalOpen: boolean}>`
    border: 1px solid red;
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: ${(props)=>!props.modalOpen && 'none'};
    z-index: -1;
`

export const Content = styled.div`
    border: 1px solid blue;
    height: 100%;
    width: 100%;`