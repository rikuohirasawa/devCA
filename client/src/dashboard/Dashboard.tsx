import { DashboardWrapper } from "./dashboardStyles"

import { Heading, Text } from "@chakra-ui/react"

import { ScraperStats } from "./scraperStats/ScraperStats"
import { useState, useEffect } from "react"

import { decodeDate } from "../utils"

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
            console.log(data[0])
            setScraperStats(data)})
    },[])


    const [scraperStats, setScraperStats] = useState<ScrapedData[] | null>(null)
    if (scraperStats) {
        const scrapedDates = Object.keys(scraperStats),
        mostRecentScrape = scraperStats[scraperStats.length - 1]
        console.log(mostRecentScrape)
        scraperStats.forEach(e=>{
            console.log(e)
        })


        return (
            <DashboardWrapper>
                <Heading size='3xl' as={'h1'}
                borderBottom='1px solid'>Scraper Status</Heading>
                <Heading>Next scheduled scrape:</Heading>
                <Heading>Last scrape: {decodeDate(Object.keys(mostRecentScrape).toString())}</Heading>
                <ScraperStats data={scraperStats}/>
            </DashboardWrapper>
        )
    } else {
        return (
            <div>loading</div>
        )
    }

}