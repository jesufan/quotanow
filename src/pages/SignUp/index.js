import React, {useState, useEffect} from 'react';
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { FirebaseApp } from '../../utils/Firebase';
import Base from '../../components/base';
import { Input } from '@chakra-ui/react'
import { Center, Button, Stack, Heading, Text } from '@chakra-ui/react';
import { Card, CardBody, Spinner } from '@chakra-ui/react';
import { validateEmail } from '../../utils/Validation';
import {size, isEmpty} from "lodash";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    InputRightElement,
    InputGroup,
    FormHelperText
  } from '@chakra-ui/react';


function SignUp() {

    const [show, setShow] = useState(false);
    const [error, setError] = useState({});
    const handleClick = () => setShow(!show);
    const [showLoading, setLoading] = useState(false);
    const toast = useToast();
    const navigate = useNavigate(); 

    function defaultFormValue(){
        return{
          email: "",
          password: "",
          repeatPassword: ""
        };
      };

    const [formData, setFormData] = useState(defaultFormValue());
    const onChanging = (value, type) =>{setFormData({...formData, [type]: value})};

    useEffect(() => { 
        return () => {
          setShow(false);
          setError({});
          setFormData(defaultFormValue());
          setLoading(false);
          setError({});
        }
      }, []);
    const goHome = () => navigate("/");
    
    const onHandleSubmit= async()=>{
        console.log(formData);
        if(isEmpty(formData.email)){
          setError({
            email: "Ingrese su correo"
          });
        } else if(!validateEmail(formData.email)){
          setError({
            email: "El correo ingresado no es válido"
          });
        }
         else if(isEmpty(formData.password)){
          setError({
            password: "Ingrese su contraseña"
          });
        }else if(isEmpty(formData.repeatPassword)){
          setError({
            repeatPassword: "Confirme su contraseña"
          });
        }else if(formData.repeatPassword !== formData.password){
          setError({
            repeatPassword: "Las contraseñas no coinciden",
            password: "Las contraseñas no coinciden"
          });
        }else if(size(formData.password)<6){
          setError({
            repeatPassword: "La contraseña debe tener por lo menos 6 caracteres"
          });
        } else{
          setLoading(true);
         const auth = getAuth(FirebaseApp);
          createUserWithEmailAndPassword(auth, formData.email, formData.password)
          .then( res =>{
              setLoading(false);
              toast({
                title: 'Finalizando proceso',
                description: "Ya casi acabamos...",
                status: 'info',
                duration: 3000,
                isClosable: false,
              });
              sendEmailVerification(auth.currentUser).then(()=>{
                toast({
                  title: 'Registro exitoso',
                  description: "Verifica tu correo electrónico para Iniciar Sesión",
                  status: 'success',
                  duration: 9000,
                  isClosable: true,
                });
                goHome();
              }).catch(()=>{
                setLoading(false);
                toast({
                  title: 'Registro fallido',
                  description: "Ocurrió un error enviando el correo de verificación",
                  status: 'error',
                  duration: 9000,
                  isClosable: true,
                });
              })
          })
          .catch(error => {
            setLoading(false);
            if(error.code === "auth/email-already-in-use"){
              toast({
                title: 'Ya estas registrado',
                description: "Parece que ya te has registrado con este correo",
                status: 'warning',
                duration: 9000,
                isClosable: true,
              });
            } else{
              alert("Error: "+error.message);
            }      
          });
        }
    
      }

  return (
  <>
    <Base>
      <Center>
        <Card
          direction={{ base: 'column', sm: 'row' }}
          variant={'elevated'}
          mt={20}
        >
          <Stack>
            <CardBody>
              <Heading as='h2' size='2xl' textColor={'#4B0082'}>Registro de Usuario</Heading>
              <Text size='2xl' textColor={'#4B0082'}>¡Estás a un paso de realizar tu avance!</Text>
            </CardBody>
            {!showLoading ? <CardBody boxShadow={'xl'}> 
                <FormControl mb={1} isRequired>
                    <FormLabel>Correo electrónico</FormLabel>
                    <Input placeholder='ingresa@tucorreo.com' onChange={e => onChanging(e.target.value, "email")}/>           
                    <FormHelperText color={'red'}>{error.email ? error.email : null}</FormHelperText>
                </FormControl>
                <FormControl mb={1} isRequired>
                    <FormLabel>Contraseña</FormLabel>
                    <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Ingresa una contraseña segura'
                        onChange={e => onChanging(e.target.value, "password")}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Ocultar' : 'Ver'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormHelperText color={'red'}>{error.password ? error.password : null}</FormHelperText>           
                </FormControl>
                <FormControl mb={1} isRequired>
                    <FormLabel>Confirmar Contraseña</FormLabel>
                    <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        type={show ? 'text' : 'password'}
                        placeholder='Ingresa una contraseña segura'
                        onChange={e => onChanging(e.target.value, "repeatPassword")}
                    />
                    <InputRightElement width='4.5rem'>
                        <Button h='1.75rem' size='sm' onClick={handleClick}>
                        {show ? 'Ocultar' : 'Ver'}
                        </Button>
                    </InputRightElement>
                    </InputGroup>
                    <FormHelperText color={'red'}>{error.repeatPassword ? error.repeatPassword : null}</FormHelperText>            
                </FormControl>                      
            <Center mt={4}>                
                <Button variant='solid' bg={'#4B0082'} color="#FFFF00" onClick={()=>{onHandleSubmit()}}>
                    Registrarme
                </Button>    
            </Center>
            </CardBody> : <Spinner color='purple' />}
          </Stack>
        </Card>
      </Center>
    </Base>
  </>         
  );
}

export default SignUp;
