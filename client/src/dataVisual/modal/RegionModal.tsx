import Modal from 'react-modal'
import moment from 'moment'
import { GrClose } from 'react-icons/gr'
import { MdClose } from 'react-icons/md'

import React, { useState, useContext, useEffect, useRef, MutableRefObject } from 'react'

import { BackDrop, Wrapper, CloseButton, Content } from './modalStyles';

import { PageContext } from "../../states/PageContext";
import { useLinkClickHandler } from 'react-router-dom';

export const RegionModal: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { modalOpen, selectedRegion, viewDate, viewTechnology, regionDataAll, selectedRegionID } = state,
    toggleModal = () => dispatch({type: 'TOGGLE_MODAL'})

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
    }

    const styles = {
        modalStyles :{
            content: {
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                padding: '0'
            }
        }, iconStyles: {
        }
    }

    const getYear = moment(viewDate).format('YYYY'),
    getMonth = moment(viewDate).format('MMMM'),
    getDay = moment(viewDate).format('DD')
    if (selectedRegion && selectedRegionID) {
        console.log(selectedRegion)
        const x = (selectedRegion[selectedRegionID][viewDate]['totalCount']) / 10
        console.log( x/ 10)
    }

    return (
        <BackDrop 
        onClick={toggleModal}
        modalOpen={modalOpen}>
            <Modal
            isOpen={modalOpen}
            style={styles.modalStyles}>
                <Wrapper onClick={(e)=>e.stopPropagation()}>
                <CloseButton onClick={toggleModal}><MdClose size={18}style={styles.iconStyles}/></CloseButton>
                {selectedRegion && regionDataAll && selectedRegionID ? 
                    <Content>
                        <h1 className='modal-heading'>{convertNames[selectedRegionID]} - {viewTechnology}</h1>
                        <div>{getMonth + ' ' + getDay + ', ' + getYear}</div>
                        <div>
                            {/* <div>{`${selectedRegion[viewDate]}`} ${viewTechnology} jobs in ${selectedRegion.region}</div> */}
                            <div>{`Represents ${(selectedRegion[selectedRegionID][viewDate]['totalCount'])}`} </div>
                        </div>
                    </Content> 
                    :
                    <div>loading</div>}


                </Wrapper>
            </Modal>
        </BackDrop>
    )
}