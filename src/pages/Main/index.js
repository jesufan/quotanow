import React, {useState} from 'react';
import Base from '../../components/auth/base';
import { 
  Box, Button, Stack, Heading, Text, CardHeader, Input, FormControl,
  FormLabel, InputGroup, InputLeftElement } from '@chakra-ui/react';
  import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react'
import numeral from "numeral";

import { useToast } from '@chakra-ui/react';


function Main() {
  const [realValue, setRealValue] = useState("");
  const [value, setValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const toast = useToast();

const onChangeMoney = (value) =>{
  if(value > 1000000){
    value = 1000000;
  };
  setRealValue(value);
  const formattedValue = numeral(value).format("0,0");
  setValue(formattedValue);
  let finalValue = value*0.89;
  let finalValueString = numeral(finalValue).format("0,0");
  setFinalValue(finalValueString);
};



  return (
  <>
    <Base>
      <Box>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          variant={'elevated'}
          mt={20}
        >
          <Stack>
            <CardBody>
              <Heading as='h2' size='2xl' textColor={'#4B0082'}>Cambio de Cupo por Efectivo Online</Heading>

              <Text mt={5} maxW={800} py='2' textAlign={'justify'}>
                QuotaNow le ofrece el avance SEGURO del cupo asignado para compras de su Tarjeta de Crédito. Recibirá el dinero en su cuenta bancaria, sin salir de casa y 100% online.
              </Text>
              
              <Text py='2' fontWeight={'bold'} mb={10}>
                Todas las transacciones realizadas en este sitio están protegidas y garantizadas por MercadoPago.
              </Text>
              <Box pb={2} >
                <Text pb={5}>Simula tu avance y conoce el dinero que recibirás en tu cuenta: </Text>
                <Card maxW={400} pl={3}>
                  <CardHeader>
                    <Heading textColor={'purple'}>Simulador de Avance</Heading>
                  </CardHeader>
                  <CardBody>
                    <FormControl>
                      <FormLabel>Cupo a Retirar: </FormLabel>
                      <FormLabel  fontSize={14}>(Mínimo $300.000 - máximo $1.000.000)</FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          color='purple.200'
                          fontSize='1.4em'
                          children='$'
                        />
                          <NumberInput
                            onChange={(valueString) => onChangeMoney(valueString)}
                            value={value}
                            ml={8}
                            maxW={250}
                          >
                            <NumberInputField placeholder='Ingrese valor del Avance' />
                          </NumberInput>
                      </InputGroup>
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Recibirá en su cuenta: </FormLabel>
                      <InputGroup>
                        <InputLeftElement
                          pointerEvents='none'
                          color='green.400'
                          fontSize='1.8em'
                          children='$'
                        />
                        <Input maxW={270} isReadOnly={true} value={finalValue} size={'lg'} fontWeight={'extrabold'} borderColor={'purple.200'} textColor={'purple'} placeholder='Dinero que recibe'/>
                      </InputGroup>
                    </FormControl>

                    <Accordion allowToggle mt={3}>
                      <AccordionItem>
                        <h2>
                          <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                            <Box as="span" flex='1' textAlign='left'>
                              Detalles
                            </Box>
                            <AccordionIcon />
                          </AccordionButton>
                        </h2>
                        <AccordionPanel pb={4} textAlign={'justify'}>
                          QuotaNow se encargará de que reciba su dinero entre <b>24 y 48</b> horas a partir de realizar el pago.
                          <br/>
                          <br/>
                          MercadoPago cobrará el <b>5%</b> del valor de la transacción para asegurar su dinero y QuotaNow cobrará el <b>6%</b> por el uso de la plataforma.
                        </AccordionPanel>
                      </AccordionItem>
                    </Accordion>

                  </CardBody>
                  <CardFooter>
                    <Button
                     variant='solid'
                     onClick={()=>{
                            if(realValue < 300000){
                              toast({
                              title: 'Mínimo $300.000',
                              description: "Cupo mínimo requerido",
                              status: 'error',
                              duration: 1500,
                              isClosable: false,
                          });
                          }else{
                            toast({
                            title: 'Pronto podrás realizarlo',
                            description: "Ya casi acabamos...",
                            status: 'info',
                            duration: 9000,
                            isClosable: false,
                          });
                        }
                     }}
                     bg={'purple'} color="#FFFFF0" _hover={{background: "#FFFF00",color:"#4B0082"}}>
                      Realizar Avance
                    </Button>
                  </CardFooter>
                </Card>
              </Box>
            </CardBody>
          </Stack>
        </Card>
      </Box>
    </Base>
  </>         
  );
}

export default Main;
