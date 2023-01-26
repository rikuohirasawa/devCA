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
            <AboutHeading as={'h2'} size='md'>Maybe you have a few questions (?), so I've written a bit here to try to answer some, as well as talk about a few limitations of the application etc.</AboutHeading>
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
                    Most popular technologies from the <ExternalLink href="https://survey.stackoverflow.co/2022/#technology-most-popular-technologies" target='_blank'>StackOverflow 2022 developer survey</ExternalLink>
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
                                <p>Certain technologies were not verbose enough in their search and returned a disproportionate amount of hits compared to the amount of relevant listings.</p>
                                <p>e.g. the first scrape returned R as having 875 listings in Alberta, more than JavaScript (257) and Python (371) combined.</p>
                                <p>As as result, Assembly, R, Go, C were appended 'developer'/'language' to their query, as I did not find they were accurately represented</p>
                                <p>Swift, APL, VBA and Crystal were omitted entirely as their names were not verbose enough for the search engine to accurately represent their data - the solution of appending 'developer' or 'language' to the query proved was not effective </p>
                                <p>This does mean that the data could be misrepresented, if you have any suggestions please feel free to contact me.
                                </p>
                                <Heading>2.</Heading>
                                <Heading>3.</Heading>
                        </AccordionPanel>
                        </AccordionItem>
                    </AccordionPanel>
                </AccordionItem>
            
            </Accordion>

            <QAContainer>
                <Question>Where did you scrape the data?</Question>
                <Answer>Data was scraped from Adzuna, a job search engine.</Answer>
                <Question>How did you pick the technologies to scrape for?</Question>
                <Answer as={'div'}>
                    <p>Top technologies from StackOverflow 2022 survey.</p>
                </Answer>
                <Question>Limitations</Question>
                <Answer as={'div'}>
                    <p>Certain technologies were not verbose enough in their search and returned a disproportionate amount of hits compared to the amount of relevant listings.</p>
                    <p>e.g. the first scrape returned R as having 875 listings in Alberta, more than JavaScript (257) and Python (371) combined.</p>
                    <p>As as result, Assembly, R, Go, C were appended 'developer'/'language' to their query, as I did not find they were accurately represented</p>
                    <p>Swift, APL, VBA and Crystal were omitted entirely as their names were not verbose enough for the search engine to accurately represent their data - the solution of appending 'developer' or 'language' to the query proved was not effective </p>
                    <p>This does mean that the data could be misrepresented, if you have any suggestions please feel free to contact me.</p>
                </Answer>
            </QAContainer>

        </AboutContainer>
    )
}