import { DashboardWrapper } from "./dashboardStyles"

import { Heading, Text, Spinner, Flex, Icon, Button } from "@chakra-ui/react"

import { ScraperStats } from "./scraperStats/ScraperStats"
import { useState, useEffect, useContext } from "react"
import { PageContext } from "../states/PageContext"
import { decodeDate } from "../utils"

import { IoCloudOutline, IoCloudOfflineOutline } from 'react-icons/io5'

import { ChakraBtn, ChakraDashboardHeading } from "../themes/ChakraCustom"
import { LoadingScreen } from "../loadingScreen/LoadingScreen"
import { ErrorScreen } from "../errorScreen/ErrorScreen"

export interface ScrapedData {
    [date: string]: {
        [region: string] : {},
        time_elapsed: number,
        total_error_count: number
    }
}

export const Dashboard: React.FC = () => {
    const { state, dispatch } = useContext(PageContext),
    { isError } = state;
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
            // this became really difficult really fast, I wanted to return a tuple at first, but there were issues with that, when attempting to set the state to the values, specfically: 
            // Argument of type '[ScrapedData[], { is_live: boolean; }]' is not assignable to parameter of type 'SetStateAction<ScrapedData[] | null>'.
            // syntax was: Promise.all<[ScrapedData[], {'is_live': boolean}]>(responsesJSON)
            // this solution is admittedly a hack for the time being
            return Promise.all<ScrapedData[] & {'is_live': boolean}>(responsesJSON)
            
        }).then(([stats , status])=>{
            setScraperStats(stats)
            setScraperStatus(status)
        })
        .catch((err: Error) => {
            dispatch({type: 'IS_ERROR', isError: {isError: true, message: err['message']}})
        })
    }, [])

    // useEffect(()=>{
    //     fetch(`http://localhost:8000/scraper-stats`)
    //     .then((res: Response)=>{
    //         if (res['status'] > 400) {
    //             throw new Error(`${res['status']}, ${res['statusText']}`)
    //         }

    //         return res.json()
    //     })
    //     .then((data: ScrapedData[])=>{
    //         setScraperStats(data)
    //         })
    //     .catch((err: Error)=>{
    //         dispatch({type: 'IS_ERROR', isError: {isError: true, message: err['message']}})
    //         })
    //     return dispatch({type: 'IS_ERROR', isError: {isError: false}})
    // },
    // [])

    // useEffect(()=>{
    //     fetch(`http://localhost:8000/scraper-status`)
    //     .then((res: Response)=>{
    //         if (res['status'] > 400) {
    //             throw new Error(`${res['status']}, ${res['statusText']}`)
    //         }
    //         return res.json()
    //     })
    //     .then((data: {'is_live': boolean})=>{
    //         setScraperStatus(data)}
    //         ).catch((err: Error)=>{
    //             dispatch({type: 'IS_ERROR', isError: {isError: true, message: err['message']}})
    //         })
    //     return dispatch({type: 'IS_ERROR', isError: {isError: false}})
    // },
    // [])


    const [scraperStats, setScraperStats] = useState<ScrapedData[] | null>(null)
    const [scraperStatus, setScraperStatus] = useState<{'is_live': boolean} | null>(null)
    const loading = false;
    if (isError['isError']) {
        return ( 
        <DashboardWrapper>
            <ChakraDashboardHeading 
                as={'h1'}
                size='2xl'
                >Scraper Status 
                </ChakraDashboardHeading>
                <ErrorScreen/>
       </DashboardWrapper> 
       )
    } else if (scraperStats && scraperStatus !== null) {
        const scrapedDates = Object.keys(scraperStats),
        mostRecentScrape = scraperStats[scraperStats.length - 1]   
        const nextScheduledScrape = () => {
            const lastScrapeDate = new Date(Object.keys(mostRecentScrape).toString())
            return decodeDate((new Date(lastScrapeDate.setDate(lastScrapeDate.getDate() + 7))).toString())
        }
        return (
            <DashboardWrapper>
                <ChakraDashboardHeading 
                    as={'h1'}
                    size='2xl'
                    >Scraper Status 
                </ChakraDashboardHeading>
                {scraperStatus['is_live'] ? 
                <Text    
                color='darkMode.lightestBlueSlate'
                fontSize='4xl'
                fontWeight='700'     
                display='flex'
                alignItems='center'
                gap='12px'>
                    <Icon w={20} height={20} as={IoCloudOutline}/> ONLINE ONLINE ONLINE
                </Text>
                : 
                <Text
                display='flex'
                alignItems='center'
                gap='12px'
                fontSize='3xl'>
                    <Icon as={IoCloudOfflineOutline}/> Offline
                </Text>}
                <ChakraDashboardHeading
                    >Next scheduled scrape:
                </ChakraDashboardHeading>
                <Text
                    fontSize='3xl'>{nextScheduledScrape()}</Text>
                <ChakraDashboardHeading>Last scrape: </ChakraDashboardHeading>
                <Text 
                    fontSize='3xl'>{decodeDate(Object.keys(mostRecentScrape).toString())}
                </Text>
                <ScraperStats data={scraperStats}/>
                <ChakraBtn 
                width='200px'
                    onClick={()=>{
                        window.alert('WOAH WOAH woah woah woah relax there buddy')
                    }}>
                        Run Scraper
                </ChakraBtn>
            </DashboardWrapper>
        )
    } else {
        return (
           <>
           <DashboardWrapper>
            <ChakraDashboardHeading 
                as={'h1'}
                size='2xl'
                >Scraper Status 
                </ChakraDashboardHeading>
                <LoadingScreen/>
           </DashboardWrapper>
           </>
        )
    }

}