import React, {useState, useEffect} from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseApp } from '../../utils/Firebase';
import Base from '../../components/base';
import { Input } from '@chakra-ui/react'
import { Center, Button, Stack, Heading } from '@chakra-ui/react';
import { Card, CardBody, Spinner } from '@chakra-ui/react';
import { validateEmail } from '../../utils/Validation';
import { isEmpty } from "lodash";
import { useToast } from '@chakra-ui/react';
import { useNavigate } from "react-router-dom";
import {
    FormControl,
    FormLabel,
    InputRightElement,
    InputGroup,
    FormHelperText
  } from '@chakra-ui/react';


function Login() {

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
      
    const goHome = () => navigate("/main");
    
    const onHandleSubmit= async()=>{
        setError({});
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
        } else{
          setLoading(true);
         const auth = getAuth(FirebaseApp);
         await signInWithEmailAndPassword(auth, formData.email, formData.password)
          .then( res =>{
              setLoading(false);
              toast({
                title: 'Sesión iniciada',
                description: "¡Bienvenido!",
                status: 'success',
                duration: 3000,
                isClosable: false,
              });
              console.log({res});
              goHome();
          }).catch(error => {
            setLoading(false);
            if(error.code === "auth/wrong-password"){ 
                toast({
                    title: 'Usuario o contraseña incorrectos',
                    description: "Verifica e intenta de nuevo",
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                  });
            }
            else if(error.code === "auth/user-not-found"){
                toast({
                    title: 'Correo no se encuentra registrado',
                    description: "Verifica e intenta de nuevo",
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                  });
            }
            else{
                toast({
                    title: 'Ocurrió un error',
                    description: "Una disculpa, intenta de nuevo más tarde",
                    status: 'error',
                    duration: 5000,
                    isClosable: false,
                  });
                console.log(error);
            } 
          });
        }  
      };

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
              <Heading as='h2' size='2xl' textColor={'#4B0082'}>Inicio de Sesión</Heading>
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
                        placeholder='Ingresa contraseña'
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
            <Center mt={4}>                
                <Button variant='solid' bg={'#4B0082'} color="#FFFF00" onClick={()=>{onHandleSubmit()}}>
                    Iniciar Sesión
                </Button>    
            </Center>
            </CardBody> : <Spinner color='purple' />}
          </Stack>
        </Card>
      </Center>
    </Base>
  </>         
  );
};

export default Login;
