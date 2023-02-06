import { Box, BoxProps, Icon, Skeleton, Text } from "@chakra-ui/react"
import React from 'react'
import { IoLogoOctocat } from 'react-icons/io'

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
        </LoadingScreenWrapper>
    )
}