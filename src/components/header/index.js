import React from 'react';
import { Box, Flex, Button, ButtonGroup, Spacer, Image } from '@chakra-ui/react'
import logo from '../../assets/images/logo/small-logo.svg';
import { useNavigate } from "react-router-dom";

function Header() {
  
  const navigate = useNavigate();

  const home = () => navigate("/home");
  const signup = () => navigate("/signup");
  const login = () => navigate("/login");

  return (
  <>
      <Box boxShadow='2xl' p={2} bg='linear-gradient(to right, #720e9e, #4B0082);' height='70px'>
        <Flex minWidth='max-content' alignItems='center' gap='2'>
            <Box p='0'>
                <Box><Image src={logo} alt='QuotaNow Logo' onClick={()=>{home()}}/></Box>
            </Box>
            <Spacer />
            <ButtonGroup gap='1' mr={3}>
                <Button onClick={()=>{signup()}} bg='#FFFF00' textColor={'#4B0082'} boxShadow='2xl' _hover={{background: "#4B0082",color: "#FFFF00"}}>Regístrate</Button>
                <Button onClick={()=>{login()}} bg='#FFFF00' textColor={'#2B033D'} boxShadow='dark-lg' _hover={{background: "#4B0082",color: "#FFFF00"}}>Ingresa</Button>
            </ButtonGroup>
        </Flex>
      </Box>
  </>
           
  );
};

export default Header;
