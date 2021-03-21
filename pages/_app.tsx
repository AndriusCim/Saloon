import React from 'react';
import { AppProps } from 'next/app';
import Router from 'next/router';
import NProgress from 'nprogress';

import { UserContext } from '../api/users';
import { useUserData } from '../hooks/useUserData';
import Navbar from '../components/Navbar';
import AuthCheck from '../components/AuthCheck';

import 'nprogress/nprogress.css';
Router.events.on('routeChangeStart', () => NProgress.start());
Router.events.on('routeChangeComplete', () => NProgress.done());
Router.events.on('routeChangeError', () => NProgress.done());

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <AuthCheck>
        <Navbar />
        <Component {...pageProps} />
      </AuthCheck>
    </UserContext.Provider>
  );
};

export default MyApp;
