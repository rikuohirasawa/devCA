import { Box, Spinner, BoxProps } from "@chakra-ui/react"

export const LoadingScreen: React.FC = () => {
    return (
        <Box>
            <Spinner color='darkMode.lightBlueSlate'/>
        </Box>
    )
}