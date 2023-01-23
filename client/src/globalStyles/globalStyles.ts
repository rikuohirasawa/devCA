import { createGlobalStyle } from 'styled-components'
import "@fontsource/open-sans"


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
        --mint: #B5FED9;


        --bg-black: #262626;
        --teal: #319795;
        --black: #262626;
        --dark-teal: #24879B;
        --teal-light: rgba(49, 151, 149, 0.3);
        --teal-med: rgba(49, 151, 149, 0.6);
    }
    html,
    body {
        background: var(--black);
        max-height: 100vh;
        overflow: none !important;
        /* font-family: 'Cousine', monospace; */
        /* font-family: "Open Sans", sans-serif !important; */
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
    background: inherit;
    }

    ::-webkit-scrollbar-thumb {
    background: #319795;

    &:hover {
        background: #4BA694
    }
    }


    .css-wl0d9u {
        overflow: none !important;
    }



    `
