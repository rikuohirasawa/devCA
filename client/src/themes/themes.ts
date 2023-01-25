import { extendTheme, Button } from "@chakra-ui/react";
import { ParagraphText } from "./chakraComponents";
export const theme = extendTheme({
    colors: {
        darkMode: {
            100: '#ccd6f6',
            black: '#262626',
            teal: '#319795',
            blueSlate:'#8892b0',
            lightBlueSlate: '#a8b2d1',
            lightestBlueSlate: '#ccd6f6'
        }
    },
    styles: {
        global: {
            body: {
                bg: 'darkMode.black',
                color: 'darkMode.blueSlate'
            }
        }

    },
})

