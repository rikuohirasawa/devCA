import { Box, Spinner, BoxProps, ChakraComponent, Icon, Skeleton, Text } from "@chakra-ui/react"

import { IoLogoOctocat } from 'react-icons/io'
type DivComponent = ChakraComponent<'div', {}>


const LoadingScreenWrapper = (props: BoxProps) => {
    return (
        <Box 
        position='absolute'
        height='50vh'
        width='50vw'
        top='50%'
        left='50%'
        display='flex'
        flexDirection='column'
        alignItems='center'
        justifyContent='center'

        transform='translate(-50%, -50%)' 
        // display='flex'
        // flexDirection='column'
        {...props}/>
    )
}
export const LoadingScreen = (props: {[key:string]: string}) => {
    return (
        <LoadingScreenWrapper {...props}>
            <Icon as={IoLogoOctocat}
            opacity='0.6'
            height='30vh'
            width='30vw'/>
            <Text
            opacity='0.6'
            fontWeight='700'
            marginBottom='16px'
            fontSize='xl'>Loading...</Text>
            <Skeleton 
            startColor='darkMode.teal'
            endColor='darkMode.black'
            height='1vh'
            width='50vw'
            fadeDuration={1}/>
            {/* <Spinner 
            // color='darkMode.lightBlueSlate'
            width='100%'
            height='100%'
            speed='0.65s'/> */}
        </LoadingScreenWrapper>
    )
}