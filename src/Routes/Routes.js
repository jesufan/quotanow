import React, {lazy, Suspense} from 'react';
import { Spinner } from '@chakra-ui/react'
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(()=>import('../pages/Home'));
const SignUp = lazy(()=>import('../pages/SignUp'));
const Login = lazy(()=>import('../pages/Login'));
const Main = lazy(()=>import('../pages/Main'));

export const Routes = createBrowserRouter([
    {
        path:'/',
        element: <Suspense fallback={<Spinner color='purple' />}><Home/></Suspense>     
    },
    {
        path:'/home',
        element: <Suspense fallback={<Spinner color='purple' />}><Home/></Suspense>     
    },
    {
        path:'/signup',
        element: <Suspense fallback={<Spinner color='purple' />}><SignUp/></Suspense>     
    },
    {
        path:'/login',
        element: <Suspense fallback={<Spinner color='purple' />}><Login/></Suspense>     
    },
    {
        path:'/main',
        element: <Suspense fallback={<Spinner color='purple' />}><Main/></Suspense>     
    },
]);