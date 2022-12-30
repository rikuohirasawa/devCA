import Modal from 'react-modal'
import React, { useState, useContext, useEffect, useRef, MutableRefObject } from 'react'
import { BackDrop, Content } from './modalStyles';
import { PageContext } from "../../states/PageContext";
import { useLinkClickHandler } from 'react-router-dom';

export const RegionModal: React.FC = () => {

    const { state, dispatch } = useContext(PageContext),
    { modalOpen } = state,
    toggleModal = () => dispatch({type: 'TOGGLE_MODAL'})

    const modalStyles = {
        content: {
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '50%',
            height: '60%',
            padding: '0'
        }
    }
    return (
        <BackDrop 
        onClick={toggleModal}
        modalOpen={modalOpen}>
            <Modal
            isOpen={modalOpen}
            style={modalStyles}>
                <Content onClick={(e)=>e.stopPropagation()}>
                <button onClick={toggleModal}>close</button>

                </Content>


            </Modal>
        </BackDrop>
    )
}