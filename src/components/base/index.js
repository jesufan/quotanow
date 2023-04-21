import React from 'react';
import Header from '../header';
import Footer from '../footer';
import { SimpleGrid } from '@chakra-ui/react';

function Base({children}) {
  return (
  <>
    <SimpleGrid minChildWidth='250px' spacing='15px'>
        <Header/>
    </SimpleGrid>
    <SimpleGrid minChildWidth='250px' spacing='15px'>
        {children}
    </SimpleGrid>
    <SimpleGrid minChildWidth='250px' spacing='15px'>
        <Footer/>
    </SimpleGrid>
  </>
           
  );
};

export default Base;
