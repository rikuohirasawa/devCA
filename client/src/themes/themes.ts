import { extendTheme } from "@chakra-ui/react";

export const theme = extendTheme({
    colors: {
        darkMode: {
            bg: '#011627',
            text: '#6200EE',
            mint: '#319795'
        }
    },
    styles: {
        global: {
            body: {
                bg: 'darkMode.bg',
                color: 'darkMode.mint'
            }
        }

    }
})