import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Posts } from '../interfaces/interfaces';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/home';
import Single from './pages/single';
import Write from './pages/write';
import Register from './pages/register';
import Login from './pages/login';

import './style.scss';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      // layout only for  these 3 children
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/:id',
        element: <Single />,
      },
      {
        path: '/write',
        element: <Write />,
      },
    ],
  },
  {
    // not these
    path: '/register',
    element: <Register />,
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

function App() {
  return (
    <div className='app smoke-gradient'>
      <div className='container'>
        <RouterProvider router={router} />
      </div>
    </div>
  );
}

export default App;
