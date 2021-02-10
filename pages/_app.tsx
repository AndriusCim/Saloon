import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';

import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';
import LoginForm from '../components/LoginForm';

const MyApp = ({ Component, pageProps }) => {
  const userData = useUserData();

  if(userData.loading) {
    return <h1>LOPADO</h1>
  }

  if (!userData && userData.user) {
    return <LoginForm />;
  }

  return (
    <UserContext.Provider value={userData}>
      {userData.user && <Navbar user={userData.user} username={userData.username} />}
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
};

export default MyApp;
