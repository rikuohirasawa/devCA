import { defineStyleConfig } from "@chakra-ui/react";

export const ParagraphText = defineStyleConfig({
    baseStyle: {},

    variants: {
        lineGraph: {
            fontSize: 'xl',
            textAlign: 'left',
            borderBottom: '1px solid var(--teal)'
        }
    }
})