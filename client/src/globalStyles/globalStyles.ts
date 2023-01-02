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
        --blend-cr-ow: #FCF6F5;
        --lime-green-tint: rgba(100,255,218,0.1);
        --lime-green: #64ffda;
        --navy: #0a192f;
        --slate: #8892b0;
        --burgundy: #7a0177;
    }
    body {
        background-color: #fff;
        color: var(--burgundy);
        font-family: 'Cousine', monospace;
    }

    .hover-info {
        /* color: var(--lime-green); */
        background-color: var(--off-white);
        border: 1px solid;
        padding: 18px;
        font-family: 'Courier Prime', monospace;
        border-radius: 8px;
    }
    `
