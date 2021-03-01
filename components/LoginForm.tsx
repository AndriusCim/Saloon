import { useForm } from 'react-hook-form';

interface LoginData {
  email: string;
  password: string;
}
const LoginForm: React.FC = () => {
  const { register, errors, handleSubmit } = useForm();
  const onSubmit = (data: LoginData) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="rounded-md">
        <label htmlFor="email" className="block text-sm font-medium leading-5 text-gray-700">
          Email address
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="email"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="email"
            name="email"
            ref={register({
              required: 'Please enter an email',
              pattern: {
                value: /^\S+@\S+$/i,
                message: 'Not a valid email'
              }
            })}
          />
          {errors.email && <div className="mt-2 text-xs text-red-600">{errors.email.message}</div>}
        </div>
      </div>
      <div className="mt-4">
        <label htmlFor="password" className="block text-sm font-medium leading-5 text-gray-700">
          Password
        </label>
        <div className="mt-1 rounded-md">
          <input
            id="password"
            className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 transition duration-150 ease-in-out sm:text-sm sm:leading-5 shadow-sm"
            type="password"
            name="password"
            ref={register({
              required: 'Please enter a password',
              minLength: {
                value: 6,
                message: 'Should have at least 6 characters'
              }
            })}
          />
          {errors.password && <div className="mt-2 text-xs text-red-600">{errors.password.message}</div>}
        </div>
      </div>
      <div className="mt-4">
        <span className="block w-full rounded-md shadow-sm">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out"
          >
            Log in
          </button>
        </span>
      </div>
    </form>
  );
};
export default LoginForm;
