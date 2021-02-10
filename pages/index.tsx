import { useContext } from 'react';
import Head from 'next/head';
import toast from 'react-hot-toast';
import { UserContext } from '../lib/context';

const Home: React.FC = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <button onClick={() => toast.success('hello toast!')}>Toast Me</button>
      LABAS
    </div>
  );
};

export default Home;
