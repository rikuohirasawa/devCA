import moment from 'moment'
import React, { useContext } from 'react'
import { decodeTechnologyName } from '../../utils';
import { PageContext } from "../../states/PageContext";
import { GraphTabs } from '../graphTabs/GraphTabs';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, Heading, useDisclosure, ModalCloseButton } from '@chakra-ui/react'
import { LoadingScreen } from '../../loadingScreen/LoadingScreen';
export const RegionModal: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { modalOpen, selectedRegion, viewDate, viewTechnology, regionDataAll, selectedRegionID, sumJobs, windowWidth } = state,
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

    const {isOpen, onOpen, onClose} = useDisclosure();
    const loading = false;
    if (selectedRegion && regionDataAll && selectedRegionID && sumJobs) {
        const regionByDate: any = selectedRegion[viewDate],
        regionName = convertNames[selectedRegionID],
        percentageInRegion = (regionByDate['technologies'][viewTechnology]/Number(regionByDate['total_job_count']) *100).toFixed(2),
        percentageInCanada = (regionByDate['technologies'][viewTechnology]/Number(sumJobs) * 100).toFixed(2)     
        return (
            <Modal
            size={windowWidth < 550 ? 'full' : 'lg'}
            closeOnOverlayClick
            isCentered
            isOpen={modalOpen}
            onClose={toggleModal}>
                <ModalOverlay/>
                {selectedRegion && regionDataAll && selectedRegionID ? 
                <ModalContent 
                zIndex=''
                bg='var(--black)'
                maxW={windowWidth < 550 ? '100%' : windowWidth < 900 ? '90%': '80%'}
                h={windowWidth < 550 ? '100%': windowWidth < 900 ? '90%' : 'auto'}
                maxH='80%'
                padding={windowWidth < 900 ? '12px 0' : '12px'}>
                    <ModalHeader><Heading as='h1' size='xl'>{regionName} - {decodeTechnologyName(viewTechnology)}</Heading>
                    <Heading as='h3' size='lg' marginTop='8px'>{getMonth + ' ' + getDay + ', ' + getYear}</Heading></ModalHeader>
                    <ModalCloseButton onClick={onClose}/>
                        <ModalBody
                        paddingInlineStart={windowWidth < 900 ? '0' : '1.5rem'}
                        paddingInlineEnd={windowWidth < 900 ? '0' : '1.5rem'}>
                        <GraphTabs data={regionByDate['technologies']}/>
                    </ModalBody>
                </ModalContent>
                :
                <LoadingScreen/>}
            </Modal>
        )
    } else {
        return (
            <Modal
            size={windowWidth < 550 ? 'full' : 'lg'}
            closeOnOverlayClick
            isCentered
            isOpen={modalOpen}
            onClose={toggleModal}>
                <ModalOverlay/>
                <ModalContent 
                opacity='0'
                bg='transparent'>
                    <LoadingScreen/>
                </ModalContent>

            </Modal>
        )
    }
}