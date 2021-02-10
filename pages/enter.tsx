import Head from 'next/head';
import LoginForm from '../components/LoginForm';

const Enter: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Enter</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LoginForm />
    </div>
  );
};

export default Enter;
