import Head from 'next/head';
import toast from 'react-hot-toast';

const Home: React.FC = () => {
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
