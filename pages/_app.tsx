import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
import Navbar from '../components/Navbar';

import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import AuthCheck from '../components/AuthCheck';

const MyApp = ({ Component, pageProps }) => {
  const userData = useUserData();

  return (
    <UserContext.Provider value={userData}>
      <AuthCheck>
          <Navbar />
          <Component {...pageProps} />
          <Toaster />
      </AuthCheck>
    </UserContext.Provider>
  );
};

export default MyApp;
