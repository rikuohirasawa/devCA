import styled from "styled-components"

export const RadioScrollColumn = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    max-height: 35vh;
    padding: 8px;
    overflow-y: scroll;
    scroll-behavior: smooth;
    scroll-snap-type: y mandatory;
    border: 1px solid rgba(49, 151, 149, 0.3);
    margin: 8px 0;
    `

export const Typewriter = styled.div`
    max-width: fit-content;


    @keyframes typing {
        from {width: 0}
        to {width: 100%}
    }
    @keyframes blink-caret {
    from, to { border-color: transparent }
    50% { border-color: #fff }
}
    p {
        /* overflow: hidden;
        border-right: .15rem solid #fff;
        white-space: nowrap;
        margin: 0 auto;
        letter-spacing: 0.15rem;
        animation: typing .5s steps(100, end),
        blink-caret .75s step-end infinite */
    }
    `

export const ContentColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
`