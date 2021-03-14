import React from 'react';
import { AppProps } from 'next/app';

import { UserContext } from '../api/users';
import { useUserData } from '../hooks/useUserData';
import Navbar from '../components/Navbar';
import AuthCheck from '../components/AuthCheck';

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
