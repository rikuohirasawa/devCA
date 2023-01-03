import Modal from 'react-modal'
import moment from 'moment'
import { GrClose } from 'react-icons/gr'
import { MdClose } from 'react-icons/md'

import React, { useState, useContext, useEffect, useRef, MutableRefObject } from 'react'

import { BackDrop, Wrapper, CloseButton, Content } from './modalStyles';

import { PageContext } from "../../states/PageContext";
import { BarGraph } from '../graphs/BarGraph'
import { PieGraph } from '../graphs/PieGraph'

export const RegionModal: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { modalOpen, selectedRegion, viewDate, viewTechnology, regionDataAll, selectedRegionID } = state,
    toggleModal = () => dispatch({type: 'TOGGLE_MODAL'});

    const convertNames: {[region: string ]: string} = {
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

    const styles: {[key:string]: {[key: string]: {}}} = {
        modalStyles :{
            content: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                padding: '0',
                border: '1px solid'
            }
        }, iconStyles: {

        },
    };

    const getYear = moment(viewDate).format('YYYY'),
    getMonth = moment(viewDate).format('MMMM'),
    getDay = moment(viewDate).format('DD');



    if (selectedRegion && regionDataAll && selectedRegionID) {
        const regionByDate = selectedRegion[selectedRegionID][viewDate],
        regionName = convertNames[selectedRegionID],
        percentageInRegion = (regionByDate['technologies'][viewTechnology]/Number(regionByDate['totalCount']) *100).toFixed(2),
        percentageInCanada = (regionByDate['technologies'][viewTechnology]/Number(selectedRegion['totalCountAll']) * 100).toFixed(2);
        return (
            <BackDrop 
            onClick={toggleModal}
            modalOpen={modalOpen}
           >
                <Modal
                isOpen={modalOpen}
                // closeTimeoutMS={2000}
                style={styles.modalStyles}>
                    <Wrapper onClick={(e)=>e.stopPropagation()}>
                    <CloseButton onClick={toggleModal}><MdClose size={18}style={styles.iconStyles}/></CloseButton>
                    {selectedRegion && regionDataAll && selectedRegionID ? 
                        <Content>
                            <h1 className='modal-heading'>{regionName} - {viewTechnology}</h1>
                            <div>{getMonth + ' ' + getDay + ', ' + getYear}</div>
                            <div>
                                <div>{`Represents ${percentageInRegion}% of jobs parsed in ${regionName}, and ${percentageInCanada}% of jobs in all of Canada`}</div>
                            </div>
                            {/* <BarGraph data={regionByDate['technologies']}/> */}
                            <PieGraph data={regionByDate['technologies']}/>
                        </Content> 
                        :
                        <div>loading</div>}
                    </Wrapper>
                </Modal>
            </BackDrop>
        )
    } else {
        return (
            <>
            </>
        )
    }
}