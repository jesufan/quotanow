import React from 'react';
import { Box, Flex, Center, Heading, Button, ButtonGroup, Spacer, Image, Text} from '@chakra-ui/react'
import logo from '../../assets/images/logo/small-logo.svg';
function Footer() {
  return (
  <>
      <Box boxShadow='xs' p={2} bg='linear-gradient(to right, #720e9e, #4B0082);' height='140px' position="absolute" bottom={-400} width="100%">
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Center p='0'>
                <Box><Image src={logo} alt='QuotaNow Logo'/></Box>
            </Center>
            <Spacer />
            <Box>
                <Heading size={'md'} boxShadow='xs' textColor={'#FFFF00'}>QuotaNow!</Heading>
                <Text fontSize={12} textColor={'#FFFF00'}>¡Avanza tu cupo ya!</Text>
            </Box>
            <Spacer />
            <ButtonGroup gap='2'>
                <Button bg='#FFFF00' textColor={'#2B033D'} boxShadow='dark-lg' _hover={{background: "#4B0082",color: "#FFFF00"}}>Ayuda</Button>
            </ButtonGroup>
        </Flex>
      </Box>
  </>
           
  );
};

export default Footer;
