import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button, DrawerHeader, Input,
 DrawerFooter, Flex, Icon, Box } from '@chakra-ui/react'

import { useContext, useRef } from 'react';
import { PageContext } from '../states/PageContext';
import { FilterMenu } from './FilterMenu';
import { ContentColumn, LinkContainer, LinkBtn } from './siderbarStyles';

import { BsGithub, BsFillQuestionCircleFill } from 'react-icons/bs'
import {AiOutlineQuestionCircle} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';

export const Sidebar: React.FC = () => {
    const { state, dispatch } = useContext(PageContext),
    { sidebarOpen } = state,
    toggleSidebar = () => {
        dispatch({type: 'TOGGLE_SIDEBAR'})
    },
    {isOpen, onOpen, onClose } = useDisclosure(),
    navigate = useNavigate();
    return (
        <Drawer
        placement='right'
        size='sm'
        isOpen={sidebarOpen}
        onClose={toggleSidebar}
        >
            <DrawerOverlay>
                <DrawerContent
                bg='var(--bg-black)'>
                    <DrawerCloseButton onClick={onClose}/>
                    <DrawerBody w=''>
                        <ContentColumn>
                            <FilterMenu/>
                            <LinkContainer>
                                <Box
                                cursor='pointer'
                                _hover={{
                                    opacity: 0.7,
                                    transform: 'scale(1.08)',
                                    transition: 'all 0.2s ease'
                                }}>
                                    <a href='https://github.com/rikuohirasawa' target='_blank'>
                                    <Icon 
                                    as={BsGithub} 
                                    boxSize={7}
                                    />
                                    </a>
                                </Box>
                                <Box
                                cursor='pointer'
                                _hover={{
                                    opacity: 0.7,
                                    transform: 'scale(1.08)',
                                    transition: 'all 0.2s ease'
                                }}
                                onClick={()=>{navigate('/about')}}>
                                <Icon 
                                    as={BsFillQuestionCircleFill} 
                                    boxSize={7}/>
                                </Box>
                            </LinkContainer>
                        </ContentColumn>
                    </DrawerBody>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    )
}