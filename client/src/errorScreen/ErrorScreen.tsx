import React from 'react'
import { FaBomb } from 'react-icons/fa'
import { Box, BoxProps, Icon, Heading, Text, Button} from '@chakra-ui/react'
import { useContext } from 'react'
import { PageContext } from '../states/PageContext'
const ErrorContainer = (props: BoxProps) => {
    return (
        <Box 
        position='absolute'
        top='50%'
        left='50%'
        width='200px'
        height='200px'
        transform='translate(-50%, -50%)' 
        {...props}
        />
    )
}
export const ErrorScreen = () => {
    const { state } = useContext(PageContext),
    { isError } = state
    return (
        <Box
        display='flex'
        flexDirection='column'
        alignItems='center'
        gap='20px'
        position='absolute'
        top='50%'
        left='50%'
        width='100%'
        transform='translate(-50%, -50%)'>
            <Icon 
            opacity='0.75'
            height='200px'
            width='200px'
            as={FaBomb}/>
            <Heading as={'h2'}>
                {isError['message'] ? 
                isError['message']
                :
                'An unknown error occured'
                }
            </Heading>
            <Text><Button onClick={()=>{
                window['location'].reload();
            }}>Please try again</Button></Text>
        </Box>
    )
}