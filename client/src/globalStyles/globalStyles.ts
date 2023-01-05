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
        
        // darkMode colors (?)
        --bg-dark: #011627;
        --purple-kobi: #DD99BB;
        --purple-lavender: #7B506F;
        --light-pink: #EAD7D1;
        --mint: #B5FED9
    }
    body {
        background-color: #fff;
        color: var(--burgundy);
        /* font-family: 'Cousine', monospace; */
    }

    .hover-info {
        /* color: var(--lime-green); */
        font-weight: 400;
        background: #011627;
        border: 1px solid;
        padding: 18px;
        /* font-family: 'Courier Prime', monospace; */
        border-radius: 8px;
    }
    ::-webkit-scrollbar {
    width: 6px;
}

    ::-webkit-scrollbar-track {
    background: #011627;
    }

    ::-webkit-scrollbar-thumb {
    background: #319795;

    &:hover {
        background: #DD99BB
    }
    }
    `
