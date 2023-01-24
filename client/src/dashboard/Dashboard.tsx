import { DashboardWrapper } from "./dashboardStyles"

import { Heading, Text, Spinner, Flex, Icon, Button } from "@chakra-ui/react"

import { ScraperStats } from "./scraperStats/ScraperStats"
import { useState, useEffect } from "react"

import { decodeDate } from "../utils"

import { IoCloudOutline, IoCloudOfflineOutline } from 'react-icons/io5'

import { ChakraBtn, ChakraDashboardHeading } from "../themes/ChakraCustom"
export interface ScrapedData {
    [date: string]: {
        [region: string] : {},
        time_elapsed: number,
        total_error_count: number
    }
}

export const Dashboard: React.FC = () => {

    useEffect(()=>{
        fetch(`http://localhost:8000/scraper-stats`)
        .then(res=>res.json())
        .then(data=>{
            setScraperStats(data)})
    },[])

    useEffect(()=>{
        fetch(`http://localhost:8000/scraper-status`)
        .then(res=>res.json())
        .then(data=>{
            setScraperStatus(data)})
    },[])


    const [scraperStats, setScraperStats] = useState<ScrapedData[] | null>(null)
    const [scraperStatus, setScraperStatus] = useState<{'is_live': boolean} | null>(null)
    if (scraperStats && scraperStatus !== null) {
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
            <div>loading</div>
        )
    }

}