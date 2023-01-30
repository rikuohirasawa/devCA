import { Heading, HeadingProps, Text, TextProps, Box, BoxProps,
Accordion, AccordionItem, AccordionButton, AccordionPanel, Link, LinkProps, Button, Flex, Icon } from "@chakra-ui/react"

import { ChakraBtn } from "../themes/ChakraCustom"

import { useState } from "react"

import { BsGithub } from 'react-icons/bs'

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
        fontSize='2xl'
        fontWeight='700'
        {...props}
        />
    )
}

const Answer = (props: TextProps) => {
    return (
        <Text
        padding='0px 0'
        fontSize='lg'
        lineHeight='1.6'
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
        size={'lg'}
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
    const [btnClick, setBtnClick] = useState(false);
    return (
        <AboutContainer>
            {/* <AboutHeading as={'h1'} size='2xl' 
            // borderBottom='1px solid var(--teal-med)'
            padding='8px 0'>Hi, thanks for checking out my project :)</AboutHeading> */}
            <AboutHeading 
            as={'h2'} 
            size='lg'>Maybe you have a few questions (?), so I've written a bit here to try to answer some, as well as talk about a few limitations of the application etc.</AboutHeading>

                <Question>1. From where was the data scraped?</Question>
                <Answer>Data was scraped from <ExternalLink href='https://www.adzuna.com/' target='_blank'>Adzuna, a job search engine.</ExternalLink></Answer>
                <Question>2. How did you pick the technologies to scrape for?</Question>
                <Answer>Most popular technologies from the <ExternalLink href="https://survey.stackoverflow.co/2022/#technology-most-popular-technologies" target='_blank'>StackOverflow 2022 developer survey.</ExternalLink> Certain technologies were omitted, see limitations below for explanation.</Answer>
               
                <Question>3. There is a technology that I wanted to see on here but it is not here.</Question>
                <Answer>my bad (you can make a pull request if you want)</Answer>
                <Question>4. If I zoom out and navigate sideways the map will duplicate itself but there is no tile layer on the duplicates. Also if I navigate upwards it is just endless blank space.</Question>
                <Answer>my bad</Answer>
                <Question>5. I moved to Ontario/BC/Quebec because of this website and my life is worse can you take some accountability for your actions?</Question>
                <Answer>my bad</Answer>
                <Question>6. This website is not responsive to my Apple watch.</Question>
                <Answer>my bad</Answer>
                <Question>7. This teal color is like not bad but when the entire page is this color it is too much, do you have difficulty finding color combinations for websites?</Question>
                <Answer color='blue'>yes</Answer>
                <Question>8. Limitations</Question>
                <Accordion 
                    allowToggle
                    border='none'>
                    <AccordionItem border='none'>
                        <AccordionButton padding='0'
                        onClick={()=>{setBtnClick(!btnClick)}}>
                        <Flex
                            alignItems='center'
                            justifyContent='space-between'
                            width='100%'>
                            <Answer>there are none lol</Answer>
                            <ChakraBtn 
                            width='auto'>
                                {btnClick ? 'ok buddy' : "view more (do NOT click)"}
                        </ChakraBtn>
                        </Flex>
                        </AccordionButton>
                        <AccordionPanel 
                        display='flex'
                        flexDirection='column'
                        gap='16px'>
                                <Answer>1. Certain technologies were not verbose enough in their search and returned a disproportionate amount of hits compared to the amount of relevant listings. e.g. the first scrape returned R as having 875 listings in Alberta, more than JavaScript (257) and Python (371) combined. As as result, Assembly, R, Go, C were appended 'developer'/'language' to their query, as I did not find they were accurately represented. Swift, APL, VBA and Crystal were omitted entirely as their names were not verbose enough to accurately query the search engine - the solution of appending 'developer' or 'language' to these technologies proved ineffective. This does mean that the data could be misrepresented, as certain technologies are more likely than others to return unrelated listings.</Answer>                 
                                <Answer>2. Only one job search engine/board was scraped, scraping a variety of websites would give more insights. Initially I had looked into scraping both LinkedIn and Indeed, however Indeed blocks scraping via Cloudflare, as well as deprecating certain features of their API, and LinkedIn is generally not fond of web scraping. In the future I may return to look into alternatives such as CareerBeacon, UpWork etc.</Answer>
                                <Answer>3. Data is scraped in a way that makes it representative of a very specific point in time. I would like to aggregrate the data in some way, e.g. getting ALL jobs for a given week.</Answer>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>
                <Link 
                display='flex'
                alignItems='center'
                gap='8px'
                fontSize='1.25rem'
                href='https://github.com/rikuohirasawa' target='_blank'> <Icon
                boxSize={6} 
                as={BsGithub}/> Github</Link>
        </AboutContainer>
    )
}