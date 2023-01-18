// import Modal from 'react-modal'
import moment from 'moment'
import { GrClose } from 'react-icons/gr'
import { MdClose } from 'react-icons/md'

import React, { useState, useContext, useEffect, useRef, MutableRefObject } from 'react'

import { BackDrop, Wrapper, CloseButton, Content } from './modalStyles';

import { decodeTechnologyName, decodeDate } from '../../utils';

import { PageContext } from "../../states/PageContext";
import { BarGraph } from '../graphs/BarGraph'
import { PieGraph } from '../graphs/PieGraph'
import { GraphTabs } from '../graphTabs/GraphTabs';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Heading, useDisclosure, ModalCloseButton } from '@chakra-ui/react'

export const RegionModal: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { modalOpen, selectedRegion, viewDate, viewTechnology, regionDataAll, selectedRegionID, sumJobs } = state,
    toggleModal = () => dispatch({type: 'TOGGLE_MODAL'});

    const convertNames: {[ region: string ]: string} = {
        'AB': 'Alberta',
        'BC': 'British Columbia',
        'MB': 'Manitoba',
        'NB': 'New Brunswick',
        'NF': 'Newfoundland and Labrador',
        'NT': 'Northwest Territories',
        'NS': 'Nova Scotia',
        'NU': 'Nunavut',
        'ON': 'Ontario',
        'PE': 'Prince Edward Island',
        'QC': 'Quebec',
        'SK': 'Saskatchewan',
        'YT': 'Yukon'
    };
    const getYear = moment(viewDate).format('YYYY'),
    getMonth = moment(viewDate).format('MMMM'),
    getDay = moment(viewDate).format('DD');

    const {isOpen, onOpen, onClose} = useDisclosure()

    if (selectedRegion && regionDataAll && selectedRegionID && sumJobs) {
        const regionByDate: any = selectedRegion[viewDate],
        regionName = convertNames[selectedRegionID],
        percentageInRegion = (regionByDate['technologies'][viewTechnology]/Number(regionByDate['total_job_count']) *100).toFixed(2),
        percentageInCanada = (regionByDate['technologies'][viewTechnology]/Number(sumJobs) * 100).toFixed(2)     
        return (
            <Modal
            closeOnOverlayClick
            isCentered
            isOpen={modalOpen}
            onClose={toggleModal}>
                <ModalOverlay/>
                {selectedRegion && regionDataAll && selectedRegionID ? 
                <ModalContent 
                zIndex='9999'
                bg='darkMode.bg'
                maxW='80%'
                h='80%'
                padding='12px'>
                    <ModalHeader><Heading as='h1' size='xl'>{regionName} - {decodeTechnologyName(viewTechnology)}</Heading></ModalHeader>
                    <ModalCloseButton onClick={onClose}/>
                        <ModalBody>
                        <Heading as='h3' size='lg'>{getMonth + ' ' + getDay + ', ' + getYear}</Heading>
                        <div>
                            <div>{`Represents ${percentageInRegion}% of jobs parsed in ${regionName}, and ${percentageInCanada}% of jobs in all of Canada`}</div>
                        </div>
                        <GraphTabs data={regionByDate['technologies']}/>
                    </ModalBody>
                </ModalContent>
                :
                <div>loading</div>}
            </Modal>
        )
    } else {
        return (
            <>
            </>
        )
    }
}