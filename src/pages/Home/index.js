import React, {useState, useRef} from 'react';
import Base from '../../components/base';
import MainBussines from '../../assets/images/logo/main-bussines.svg';
import { 
  Box, Image, Button, Stack, Heading, Text, CardHeader, Input, FormControl,
  FormLabel, InputGroup, InputLeftElement, Center, Container } from '@chakra-ui/react';
  import {
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
  } from '@chakra-ui/react';
import { Card, CardBody, CardFooter } from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/react';
import {
  NumberInput,
  NumberInputField,
} from '@chakra-ui/react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton
} from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import numeral from "numeral";

import { useToast } from '@chakra-ui/react';


function Home() {

  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const navigate = useNavigate(); 

  const [realValue, setRealValue] = useState("");
  const [value, setValue] = useState("");
  const [finalValue, setFinalValue] = useState("");
  const [quotaValue, setQuotaValue] = useState("");
  const toast = useToast();

  const goRegister = () => navigate("/signup");

const onChangeMoney = (value) =>{
  if(value > 1500000){
    value = 1500000;
  };
  setRealValue(value);
  const formattedValue = numeral(value).format("$0,0");
  setValue(formattedValue);
  let finalValue = value*0.895;
  let finalQuotaValue = value*0.105;
  let finalValueString = numeral(finalValue).format("0,0");
  setFinalValue(finalValueString);
  setQuotaValue(finalQuotaValue);
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
          <Image
            maxW={{ base: '100%', sm: '600px' }}
            src={MainBussines}
            alt='Caffe Latte'
          />
          <Stack>
            <CardBody>
              <Heading as='h2' size='2xl' textColor={'#4B0082'} maxW={800}>Cambio de Cupo Tarjetas de Crédito por Efectivo Online</Heading>

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
                    <Heading textColor={'#4B0082'}>Simulador de Avance</Heading>
                  </CardHeader>
                  <CardBody>
                    <FormControl>
                      <FormLabel>Cupo a Retirar: </FormLabel>
                      <FormLabel  fontSize={14}>(Mínimo $300.000 - máximo $1.500.000)</FormLabel>
                      <InputGroup>
                          <NumberInput
                            onChange={(valueString) => onChangeMoney(valueString)}
                            value={value}
                            maxW={250}
                            size={'lg'}
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
                          QuotaNow cobrará el <b>5.5%</b> por el uso de la plataforma y MercadoPago cobrará el <b>5%</b> del valor de la transacción para asegurar su dinero.
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
                          onOpen();
                        }
                     }}
                     bg={'#4B0082'} color="#FFFFF0" _hover={{background: "#FFFF00",color:"#4B0082"}}>
                      Realizar Avance
                    </Button>
                  </CardFooter>
                </Card>
              </Box>
            </CardBody>
          </Stack>
          <Center>
            <Stack mb={10}>
                {finalValue && (<>
                <Heading mt={4} as='h5' size='md' textColor={'black'}>Detalle del avance: </Heading>
                <Heading mt={20} as='h2' size='xl' textColor={'#4B0082'}>Por {value} </Heading>
                <Heading mt={10} as='h2' size='md' textColor={'black'}>Pagas ${quotaValue} y avanzas: </Heading>
                <Heading as='h1' size='2xl' textColor={'#4B0082'}>${finalValue}</Heading>
                <Text mt={10} as='h2' size='md' textColor={'black'}>El dinero llegará a tu cuenta bancaria.</Text>
                </>)}
            </Stack>
          </Center>
        </Card>
        <Stack >
          <Center mt={10}>
            <Heading>Preguntas Frecuentes</Heading>
          </Center>
          <Center>
          <Container p={5}>

              <Accordion allowToggle mt={3} >
              <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿Para qué se usa QuotaNow?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'} bg={'linear-gradient(180deg, rgba(255,255,255,1) 1%, rgba(255,255,255,1) 93%, rgba(253,252,137,0.2721463585434174) 98%, rgba(158,18,251,0.2049194677871149) 99%);'}>
                      Con <b>QuotaNow</b> el usuario podrá realizar avances en efectivo con el <b> cupo de compra asignado para su Tarjeta de Crédito</b>.
                      De este modo, el usuario podra hacer uso de este cupo para disponer de mayor flujo de caja o cubrir alguna eventualidad que se le presente.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿En cuánto tiempo llega el dinero en mi cuenta bancaria?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                      QuotaNow se encargará de que reciba su dinero en la cuenta bancaria ingresada entre <b>24 y 48</b> horas a partir de realizar el pago.        
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿Cuánto pagaré por avanzar con QuotaNow?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                    QuotaNow cobrará el <b>5.5%</b> del valor de la transacción por el uso de la plataforma y MercadoPago cobrará el <b>5%</b> de pasarela de pago para asegurar su dinero.
                    <br/>
                    <br/>
                    De esta manera por un avance con valor de <b>$500.000</b> usted recibirá en su cuenta <b>$447,500</b>.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿Qué documentos debo subir a la plataforma para realizar el cambio de cupo por efectivo?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                    QuotaNow generará automáticamente un comprobante de compra en <b>PDF</b> que deberá <b>firmar fisicamente</b> y luego adjuntarlo
                    en la plataforma junto a fotos de su <b>documento de identidad</b> por ambos lados.
                    <br/>
                    <br/>
                    Si llega a presentar dudas e inconvenientes con este proceso podrá comunicarse con el soporte de QuotaNow vía Whatsapp y correo electrónico, su caso será atentido lo más pronto posible.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿Qué Tarjetas de Crédito puedo usar?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                      QuotaNow acepta tarjetas de crédito: VISA, MasterCard, American Express, Éxito y Alkosto, podra diferir su avance hasta en 36 cuotas.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿Cuál es el cupo de compra máximo que puedo avanzar?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                      Usted podrá avanzar hasta máximo <b>$1.500.000</b> de pesos diarios por Tarjeta de Crédito.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                         ¿Cuál es el cupo de compra mínimo que puedo avanzar?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                      Usted podrá avanzar desde <b>$300.000</b> de pesos diarios por Tarjeta de Crédito.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿Es QuotaNow seguro y confiable?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                      Sí, para mayor tranquilidad de los usuarios en QuotaNow implementamos la pasarela de pagos de <b>MercadoPago</b> que garantiza y asegura el dinero de los usuarios, una vez que el usuario envíe el comprobante de la transacción
                      QuotaNow garantizará que el dinero de su avance llega de manera segura a su cuenta bancaria entre 24 y 48 horas.
                      <br/>
                      <br/>
                      Si llega a presentar dudas e inconvenientes en algún proceso podrá comunicarse con el soporte de QuotaNow vía Whatsapp y correo electrónico, su caso será atentido lo más pronto posible.
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <h1>
                      <AccordionButton _expanded={{ bg: 'purple.600', color: 'white' }}>
                        <Box as="span" flex='1' textAlign='left'>
                          ¿Cómo funciona QuotaNow?
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h1>
                    <AccordionPanel pb={4} textAlign={'justify'}>
                      Para realizar cambio del cupo de compra de su tarjeta de crédito por efectivo en QuotaNow, el usuario estará realizando la compra de Arte Digital,
                      así, una vez ha sido realizado con éxito la transacción se generá un comprobante de compra y recibido del producto que deberá ser posteriormente firmado.
                      <br/>
                      <br/>
                      De esta manera, tanto QuotaNow como el usuario tienen la posibilidad de disponer del dinero de la transacción en el menor tiempo posible para hacer efectivo el avance.
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>      
          </Container>
          </Center>
          <Center mt={5}>
            <Heading>Horario de Atención</Heading>
          </Center>
          <Center>
            <Text> Lunes a Viernes 8 a.m - 8 p.m</Text>
          </Center>
          <Center>
            <Text> Domingos y festivos 11 a.m - 6 p.m</Text>
          </Center>
        </Stack>
      </Box>

      {/*
      Mensaje de invitación a Registro
      */}
  
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent bg={'#4B0082'}>
          <AlertDialogHeader color={'yellow'}>Registro de Usuario</AlertDialogHeader>
          <AlertDialogCloseButton color={'yellow'}/>
          <AlertDialogBody color={'white'} textAlign={'justify'}>
            Con el fin de garantizar la seguridad de su DINERO en las transacciones dentro de la plataforma,
            por favor realice el registro de usuario.
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancelar
            </Button>
            <Button colorScheme='yellow' ml={3} onClick={()=>{goRegister()}}>
              Continuar
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Base>
  </>         
  );
}

export default Home;
