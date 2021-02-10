import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';

import 'antd/dist/antd.css';
import 'tailwindcss/tailwind.css';

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Navbar user={null} username={null} />
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
}

export default MyApp;
