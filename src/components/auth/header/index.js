import React, {useRef} from 'react';
import { StackDivider, VStack, Box, Flex, Button, ButtonGroup, Spacer, Image, Icon, Heading, Text } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import { MdMenu, MdQuestionAnswer, MdChromeReaderMode, MdAccountBalanceWallet, MdSecurity, MdAssignmentLate, MdMarkunreadMailbox } from "react-icons/md";
import logo from '../../../assets/images/logo/small-logo.svg';
import { useNavigate } from "react-router-dom";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react';

function Header() {
  
  const navigate = useNavigate();

  const home = () => navigate("/main");
  const signOut = () => navigate("/home");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
  <>
      <Box boxShadow='2xl' p={2} bg='linear-gradient(to right, #720e9e, #4B0082);' height='70px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='0'>
                <Box><Image src={logo} alt='QuotaNow Logo' onClick={()=>{home()}}/></Box>
            </Box>
            <Spacer />
            <ButtonGroup gap='1' mr={3}>
                <Button onClick={onOpen} bg='#FFFF00' textColor={'#2B033D'} boxShadow='dark-lg' _hover={{background: "#4B0082",color: "#FFFF00"}}><Icon boxSize={6} as={MdMenu}/></Button>
            </ButtonGroup>
        </Flex>
        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader bg={'yellow'}>
            <Heading size={'md'} color={'#6C0FA1'}>QuotaNow</Heading>
            <Text fontSize={12}>¡Avanza tu cupo ya!</Text>
          </DrawerHeader>
            <DrawerBody>
                <VStack
                divider={<StackDivider borderColor='gray.200' />}
                spacing={4}
                align='stretch'
                mt={5}
                >
                    <Box h='35px'>
                       <Button bg={'white'} leftIcon={<Icon boxSize={6} as={MdAccountBalanceWallet}/>}>Solicitar Avance</Button>
                    </Box>
                    <Box h='35px'>
                        <Button bg={'white'} leftIcon={<Icon boxSize={6} as={MdChromeReaderMode}/>}>Historial de Avances</Button>
                    </Box>
                    <Box h='35px'>
                        <Button bg={'white'} leftIcon={<Icon boxSize={6} as={MdSecurity}/>}>Configuración de Cuenta</Button>
                    </Box>
                    <Box h='35px'>
                        <Button bg={'white'} leftIcon={<Icon boxSize={6} as={MdAssignmentLate}/>}>Preguntas Frecuentes</Button>
                    </Box>
                    <Box h='35px'>
                        <Button colorScheme='whatsapp' leftIcon={<Icon boxSize={6} as={MdQuestionAnswer}/>}>Whatsapp</Button>
                    </Box>
                    <Box h='35px'>
                        <Button bg={'white'} leftIcon={<Icon boxSize={6} as={MdMarkunreadMailbox}/>}>Buzón de sugerencias</Button>
                    </Box>
                    <Box h='35px'>
                    </Box>
                </VStack>
            </DrawerBody>
          <DrawerFooter bg={'#440966'}>
            <Button bg={'#6C0FA1'} color={'white'} onClick={()=>{signOut()}}>Salir</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      </Box>
  </>
           
  );
};

export default Header;
