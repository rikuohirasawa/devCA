import { 
    Button, 
    ButtonProps,
    Heading,
    HeadingProps,
    Text,
    TextProps,
    Radio,
    RadioProps } from "@chakra-ui/react";


export const ChakraBtn = (props: ButtonProps) => {
    return (
        <Button                 
        width='100%'
        bgColor='var(--black)'
        border='1px solid teal'
        _hover={{
        bg: 'teal', 
        color: 'var(--black)',
        border: '1px solid var(--black)'
        }}
        {...props}/>
    )
}

// dashboard components

export const ChakraDashboardHeading = (props: HeadingProps) => {
    return (
        <Heading 
        borderBottom='1px solid'
        paddingBottom='8px'
        size='xl'
        {...props}/>
    )
}


export const ChakraDashboardText = (props: TextProps) => {
    return (
        <Text 

        fontSize='3xl'
        {...props}/>
    )
}

export const ChakraRadio = (props: RadioProps) => {
    return (
        <Radio
        _focus={{opacity: '1'}}
        opacity='0.8'
        colorScheme='teal'
        {...props}/>
    )
}