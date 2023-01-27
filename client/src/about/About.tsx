import { Heading, HeadingProps, Text, TextProps, Box, BoxProps,
Accordion, AccordionItem, AccordionButton, AccordionPanel, Link, LinkProps, Button, Flex } from "@chakra-ui/react"

const AboutContainer = (props: BoxProps) => {
    return (
        <Box
        display='flex'
        flexDir='column'
        gap='16px'
        padding='120px'
        {...props}
        />
    )
}
const AboutHeading = (props: HeadingProps) => {
    return (
        <Heading

        {...props}/>
    )
}

const QAContainer = (props: BoxProps) => {
    return (
        <Box 
        padding='16px'
        {...props}
        />
    )
}

const Question = (props: TextProps) => {
    return (
        <Text
        padding='8px 0'
        borderBottom='1px solid'
        {...props}
        />
    )
}

const Answer = (props: TextProps) => {
    return (
        <Text
        padding='8px 0'
        {...props}
        />
    )
}

const AccordionTitle = (props: BoxProps) => {
    return (
        <Box 
        padding='16px'
        {...props}
        />
    )
}

const AccordionHeading = (props: HeadingProps) => {
    return (
        <Heading 
        {...props}
        />
    )
}

const ExternalLink = (props: LinkProps) => {
    return (
        <Link
        color='darkMode.lightestBlueSlate'
        as={'a'}
        {...props}
        />
    )
}
export const About: React.FC = () => {
    return (
        <AboutContainer>
            <AboutHeading as={'h1'} size='xl'>Hi, thanks for checking out my project :)</AboutHeading>
            <AboutHeading as={'h2'} size='md'>Maybe you have a few questions (?), so I've written a bit here to try to answer some, as well as talk about a few limitations of the application etc. Click a question to open a response.</AboutHeading>
            <Accordion allowMultiple>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionHeading>Where did you scrape the data?</AccordionHeading>
                    </AccordionButton>
                    <AccordionPanel>
                    Data was scraped from <ExternalLink href='https://www.adzuna.com/' target='_blank'>Adzuna, a job search engine.</ExternalLink>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionHeading>How did you pick the technologies to scrape for?</AccordionHeading>
                    </AccordionButton>
                    <AccordionPanel>
                    Most popular technologies from the <ExternalLink href="https://survey.stackoverflow.co/2022/#technology-most-popular-technologies" target='_blank'>StackOverflow 2022 developer survey.</ExternalLink>
                    </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                    <AccordionButton>
                        <AccordionHeading>Limitations</AccordionHeading>
                    </AccordionButton>
                    <AccordionPanel>
                        <AccordionItem>
                            <AccordionButton>
                                <Flex
                                alignItems='center'
                                justifyContent='space-between'
                                width='100%'>
                                <Text>there are none lol</Text>
                                <Button 
                                onClick={(e)=>{console.log(e)}}
                                colorScheme='teal'>view more (you don't have to click this)</Button>
                                </Flex>
                            </AccordionButton>
                            <AccordionPanel>   
                                <Heading>1.</Heading>
                                <Text>Certain technologies were not verbose enough in their search and returned a disproportionate amount of hits compared to the amount of relevant listings. e.g. the first scrape returned R as having 875 listings in Alberta, more than JavaScript (257) and Python (371) combined. As as result, Assembly, R, Go, C were appended 'developer'/'language' to their query, as I did not find they were accurately represented. Swift, APL, VBA and Crystal were omitted entirely as their names did not query the search engine in a way that accurately represent their data - the solution of appending 'developer' or 'language' to the query proved was not effective. This does mean that the data could be misrepresented</Text>                 
                                <Heading>2.</Heading>
                                <Text>Only one job search engine/board was scraped, scraping a variety of websites would give more insights. Initially I had looked into scraping both LinkedIn and Indeed, however Indeed blocks scraping via Cloudflare, as well as deprecating certain features of their API, and LinkedIn is generally not fond of web scraping. In the future I may return to look into alternatives such as CareerBeacon, UpWork etc.</Text>
                                <Heading>3.</Heading>
                                <Text>Data is scraped in a way that makes it representative of a very specific point in time. I would like to aggregrate the data in some way, e.g. getting ALL jobs for a given week.</Text>
                        </AccordionPanel>
                        </AccordionItem>
                    </AccordionPanel>
                </AccordionItem>
            
            </Accordion>
        </AboutContainer>
    )
}