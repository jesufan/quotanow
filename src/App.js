import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { extendTheme } from '@chakra-ui/react';
// import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Routes } from './Routes/Routes';
import { RouterProvider } from 'react-router-dom';



const theme = extendTheme({
  fonts: {
    heading: `'roboto', sans-serif-bold`,
    body: `'roboto', sans-serif`,
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
          {/* <ColorModeSwitcher justifySelf="flex-end" /> */}
          <RouterProvider router={Routes}/>
    </ChakraProvider>
  );
}

export default App;
