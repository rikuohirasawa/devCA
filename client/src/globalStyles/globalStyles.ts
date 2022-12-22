import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    :root {
        --cherry-red: #990011FF;
        --off-white: #FCF6F5FF;
    }
    body {
        background-color: var(--off-white);
        color: var(--cherry-red);
        font-family: 'Courier Prime', monospace;
    }`
