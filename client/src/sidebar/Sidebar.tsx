import { Drawer, DrawerBody, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, Button, DrawerHeader, Input,
 DrawerFooter, Flex } from '@chakra-ui/react'

import { useContext, useRef } from 'react';
import { PageContext } from '../states/PageContext';
import { FilterMenu } from './FilterMenu';
import { ContentColumn } from './siderbarStyles';


export const Sidebar: React.FC = () => {
    const { state, dispatch } = useContext(PageContext),
    { sidebarOpen } = state,
    toggleSidebar = () => {
        console.log(sidebarOpen)
        dispatch({type: 'TOGGLE_SIDEBAR'})
    },
    {isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef(null);
    return (
    //     <>
    //   <Button ref={btnRef} colorScheme='teal' onClick={onOpen}>
    //     Open
    //   </Button>
    //   <Drawer
    //     isOpen={isOpen}
    //     placement='right'
    //     onClose={onClose}
    //     finalFocusRef={btnRef}
    //   >
    //     <DrawerOverlay />
    //     <DrawerContent>
    //       <DrawerCloseButton />
    //       <DrawerHeader>Create your account</DrawerHeader>

    //       <DrawerBody>
    //         <Input placeholder='Type here...' />
    //       </DrawerBody>

    //       <DrawerFooter>
    //         <Button variant='outline' mr={3} onClick={onClose}>
    //           Cancel
    //         </Button>
    //         <Button colorScheme='blue'>Save</Button>
    //       </DrawerFooter>
    //     </DrawerContent>
    //   </Drawer>
    // </>
        <>
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

                    <DrawerBody w=''
                    >
                        <ContentColumn>
                            <FilterMenu/>
                        </ContentColumn>
                    </DrawerBody>

                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
        </>
    )
}