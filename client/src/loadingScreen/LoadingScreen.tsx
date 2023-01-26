import { Box, Spinner, BoxProps, ChakraComponent } from "@chakra-ui/react"
type DivComponent = ChakraComponent<'div', {}>


const BoxContainer = (props: BoxProps) => {
    return (
        <Box 
        position='absolute'
        top='50%'
        left='50%'
        width='200px'
        height='200px'
        transform='translate(-50%, -50%)' 
        {...props}/>
    )
}
export const LoadingScreen = (props: {[key:string]: string}) => {
    return (
        <BoxContainer {...props}>
            <Spinner 
            // color='darkMode.lightBlueSlate'
            width='100%'
            height='100%'
            speed='0.65s'/>
        </BoxContainer>
    )
}