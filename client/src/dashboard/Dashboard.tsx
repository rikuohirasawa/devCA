
import { Heading, Text, Spinner, Flex, Icon, Button, HeadingProps, Box, BoxProps, ButtonProps, Grid, GridProps, GridItem, GridItemProps, useMediaQuery } from "@chakra-ui/react"
import { ChakraBtn } from "../themes/ChakraCustom"
import { ScraperStats } from "./scraperStats/ScraperStats"
import { useState, useEffect, useContext } from "react"
import { PageContext } from "../states/PageContext"
import { decodeDate } from "../utils"

import { IoCloudOutline, IoCloudOfflineOutline } from 'react-icons/io5'

import { LoadingScreen } from "../loadingScreen/LoadingScreen"
import { ErrorScreen } from "../errorScreen/ErrorScreen"
import { ErrorGraph } from "./errorGraph/ErrorGraph"


const DashboardWrapper = (props: BoxProps) =>{
    return (
        <Box
        as={'section'}
        height='100vh'
        padding='80px'
        gap='8px'
        {...props}
        />
    )
}

export const DashboardHeading = (props: HeadingProps) => {
    return (
        <Heading 
        borderBottom='1px solid'
        paddingBottom='8px'
        size='xl'
        {...props}/>
    )
}

export const DashboardCard = (props: GridItemProps) => {
    return (
        <GridItem
        width='auto'
        padding='50px'
        borderRadius='8px'
        border='1px solid'
        {...props}/>
    )
}

export interface ScrapedData {
    [date: string]: {
        [region: string] : {},
        time_elapsed: number,
        total_error_count: number
    }
}

export interface ErrorStats {
    date: string,
    count: number,
    fill?: string,
    stroke?: string
}

export const Dashboard: React.FC = () => {
    const { state, dispatch } = useContext(PageContext),
    { isError } = state,
    [isSmallerThan1150] = useMediaQuery('(max-width: 1150px)')
    useEffect(()=>{
        Promise.all([
            fetch(`http://localhost:8000/scraper-stats`),
            fetch(`http://localhost:8000/scraper-status`)
        ]).then((responses: Response[])=>{
            const responsesJSON = (responses.map(res=>{
                if (res['status'] > 400) {
                    throw new Error(`${res['status']}, ${res['statusText']}`);
                }
                return res.json()
            })
            )
            // this became really messy really fast, I wanted to return a tuple at first, but there were issues with that, when attempting to set the state to the values, specfically: 
            // Argument of type '[ScrapedData[], { is_live: boolean; }]' is not assignable to parameter of type 'SetStateAction<ScrapedData[] | null>'.
            // syntax was: Promise.all<[ScrapedData[], {'is_live': boolean}]>(responsesJSON)
            // this solution is admittedly a hack for the time being
            return Promise.all<ScrapedData[] & {'is_live': boolean}>(responsesJSON)
            
        }).then(([stats , status])=>{
            setScraperStats(stats)
            setScraperStatus(status)
            const errorCount: ErrorStats[] = []
            stats.forEach((stat: ScrapedData)=>{
                const date: string = Object.keys(stat)[0]
                errorCount.push(Object.assign({}, {
                    'date': date,
                    'count': stat[date]['total_error_count']
                }))
                setErrorStats(errorCount)
                console.log('array', errorStats)
            })
        })
        .catch((err: Error) => {
            dispatch({type: 'IS_ERROR', isError: {isError: true, message: err['message']}})
        })
    }, [])

    const [scraperStats, setScraperStats] = useState<ScrapedData[] | null>(null)
    const [scraperStatus, setScraperStatus] = useState<{'is_live': boolean} | null>(null)
    const [errorStats, setErrorStats] = useState<ErrorStats[]>([])
    const loading = false;
    if (isError['isError']) {
        return ( 
        <DashboardWrapper>
            <DashboardHeading 
                as={'h1'}
                size='2xl'
                >Scraper Dashboard 
                </DashboardHeading>
                <ErrorScreen
                transform='translate(-50%, -50%)'
                />
       </DashboardWrapper> 
       )
    } else if (scraperStats && scraperStatus !== null && errorStats.length > 0) {
        const scrapedDates = Object.keys(scraperStats),
        mostRecentScrape = scraperStats[scraperStats.length - 1]   
        const nextScheduledScrape = () => {
            const lastScrapeDate = new Date(Object.keys(mostRecentScrape).toString())
            return decodeDate((new Date(lastScrapeDate.setDate(lastScrapeDate.getDate() + 7))).toString())
        }
        return (
            <DashboardWrapper
            padding={isSmallerThan1150 ? '80px 24px' : '80px'}>
                <DashboardHeading as={'h1'} size='2xl'>Scraper Dashboard</DashboardHeading>
                <Grid
                padding='16px 0'
    
                templateColumns={'repeat(4, 25%)'}
                display={isSmallerThan1150 ? 'flex' : 'grid'}
                flexDirection='column'
                justifyContent='space-evenly'
                gap='16px'>
                    <ErrorGraph data={errorStats}/>
                    <DashboardCard>
                        <DashboardHeading 
                            >Scraper Status 
                        </DashboardHeading>
                        {scraperStatus['is_live'] ? 
                        <Text    
                        fontSize='3xl'
                        fontWeight='700'     
                        display='flex'
                        alignItems='center'
                        gap='12px'>
                            <Icon as={IoCloudOutline}/> Online
                        </Text>
                        : 
                        <Text
                        display='flex'
                        alignItems='center'
                        gap='12px'
                        fontSize='3xl'>
                            <Icon as={IoCloudOfflineOutline}/> Offline
                        </Text>}
                    </DashboardCard>

                    <DashboardCard colSpan={isSmallerThan1150 ? 1 : 2}>
                        <DashboardHeading
                            >Next scheduled scrape:
                        </DashboardHeading>
                        <Text
                            fontSize='3xl'>{nextScheduledScrape()}
                        </Text>
                    </DashboardCard>
                    <DashboardCard colSpan={isSmallerThan1150 ? 1 : 2}>
                        <DashboardHeading>Last scrape: </DashboardHeading>
                        <Text 
                            fontSize='3xl'>{decodeDate(Object.keys(mostRecentScrape).toString())}
                        </Text>
                    </DashboardCard>
                    <ScraperStats data={scraperStats}/>
                </Grid>
                <ChakraBtn 
                width='200px'
                padding='16px'
                    onClick={()=>{
                        window.alert('WOAH WOAH woah woah woah relax there buddy.')
                    }}>
                        Run Scraper
                </ChakraBtn>
            </DashboardWrapper>
        )
    } else {
        return (
           <>
           <DashboardWrapper>
            <DashboardHeading 
                as={'h1'}
                size='2xl'
                >Scraper Dashboard 
                </DashboardHeading>
                <LoadingScreen/>
           </DashboardWrapper>
           </>
        )
    }

}