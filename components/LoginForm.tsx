import { useState } from 'react';
import { useUserLogin } from '../lib/hooks';
import { Spin } from 'antd';

interface Credentials {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [creds, setCreds] = useState<Credentials>({ email: '', password: '' });
  const { errors, loading, login } = useUserLogin();

  const handleForm = (e) => {
    e.preventDefault();
    login(creds.email, creds.password);
  };

  return (
    <div
      style={{ backgroundImage: 'linear-gradient(19deg, #21D4FD 0%, #B721FF 100%)' }}
      className="h-screen font-sans py-20 login bg-cover"
    >
      <div className="bg-white lg:w-4/12 md:6/12 w-10/12 m-auto  shadow-2xl">
        <Spin spinning={loading}>
          <div className="py-8 px-8 rounded-xl">
            <h1 className="font-medium text-2xl mt-3 text-center">Login</h1>
            <form onSubmit={(e) => handleForm(e)}>
              <div className="my-5 text-sm">
                <label className="block text-black">Email</label>
                <input
                  value={creds.email}
                  type="text"
                  id="email"
                  className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                  placeholder="Email"
                  onChange={(e) => setCreds((prevState) => ({ ...prevState, email: e.target.value }))}
                />
              </div>
              <div className="my-5 text-sm">
                <label className="block text-black">Password</label>
                <input
                  value={creds.password}
                  type="password"
                  id="password"
                  className="rounded-sm px-4 py-3 mt-3 focus:outline-none bg-gray-100 w-full"
                  placeholder="Password"
                  onChange={(e) => setCreds((prevState) => ({ ...prevState, password: e.target.value }))}
                />
                <span className="flex items-center font-medium tracking-wide text-red-500 text-xs my-2 ml-1">
                  {errors}
                </span>
              </div>

              <button
                type="submit"
                className="block text-center text-white bg-gray-800 p-3 duration-300 rounded-sm hover:bg-black w-full"
              >
                Login
              </button>
              <div className="flex md:justify-between justify-center items-center mt-10">
                <div style={{ height: 1 }} className="bg-gray-300 md:block hidden w-4/12"></div>
                <p className="md:mx-2 text-sm font-light text-gray-400"> Beer Me! </p>
                <div style={{ height: 1 }} className="bg-gray-300 md:block hidden w-4/12"></div>
              </div>

              <p className="mt-12 text-xs text-center font-light text-gray-400">
                {' '}
                Don't have an account?{' '}
                <a href="../auth/register.html" className="text-black font-medium">
                  {' '}
                  Ask for one{' '}
                </a>{' '}
              </p>
            </form>
          </div>
        </Spin>
      </div>
    </div>
  );
};

export default LoginForm;
