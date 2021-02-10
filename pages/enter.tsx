import Head from 'next/head';
import { useContext } from 'react';
import LoginForm from '../components/LoginForm';
import { UserContext } from '../lib/context';

import { auth } from '../lib/firebase';



function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
}
const Enter: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Head>
        <title>Enter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        {user ? (
          <SignOutButton />
        ) : (
          <LoginForm  />
        )}
      </main>
    </div>
  );
};

export default Enter;
