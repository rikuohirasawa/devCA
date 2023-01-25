import { ScraperStatsWrapper } from "./scraperStatsStyles"
import { ScrapedData } from '../Dashboard'

import { Accordion, AccordionItem, Heading, Text } from "@chakra-ui/react"
import { ChakraDashboardHeading } from "../../themes/ChakraCustom"

import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
  } from '@chakra-ui/react'
import { decodeDate } from "../../utils"
interface DataProps {
    data: ScrapedData[]
}
export const ScraperStats: React.FC<DataProps> = ({data}: DataProps) => {
    return (
        <ScraperStatsWrapper>
            <ChakraDashboardHeading as='h2' padding='16px'>History</ChakraDashboardHeading>
            <TableContainer>
                <Table variant='unstyled'>
                    <TableCaption>Scrapes are scheduled every seven days</TableCaption>
                    <Thead>
                        <Tr>
                            <Th>Date</Th>
                            <Th>Time Elapsed (seconds)</Th>
                            <Th>Error Count</Th>
                            <Th>Success Rate</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {data.map(e=>{
                            const dateKey = Object.keys(e)[0],
                            runTimeSeconds = (e[dateKey]['time_elapsed']).toFixed(2),
                            errorCount = e[dateKey]['total_error_count']
                            // 36 languages
                            // 13 provinces/territories
                            return (
                                <Tr>
                                    <Td>{decodeDate(dateKey)}</Td>
                                    <Td>{runTimeSeconds}</Td>
                                    <Td>{errorCount}</Td>
                                    <Td>{(((36 * 13 - errorCount)/(36 * 13)) * 100).toFixed(2)}%</Td>
                                </Tr>
                            )
                        })}   
                    </Tbody>
                </Table>
            </TableContainer>
        </ScraperStatsWrapper>
    )
}