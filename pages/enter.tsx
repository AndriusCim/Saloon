import { useEffect, useState, useCallback, useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import debounce from 'lodash.debounce';
import Router from 'next/router';

import { auth, firestore } from '../lib/firebase';
import { UserContext } from '../lib/context';

interface FormValues {
  email: string;
  password: string;
}

const Enter: React.FC = () => {
  const { user, username } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    await auth.signInWithEmailAndPassword(data.email, data.password);
    Router.push('/');
  };

  function UsernameForm() {
    const [formValue, setFormValue] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSubmit = async (e) => {
      e.preventDefault();

      // Create refs for both documents
      const userDoc = firestore.doc(`users/${user.uid}`);
      const usernameDoc = firestore.doc(`usernames/${formValue}`);

      // Commit both docs together as a batch write.
      const batch = firestore.batch();
      batch.set(userDoc, { username: formValue, photoURL: user.photoURL, displayName: user.displayName });
      batch.set(usernameDoc, { uid: user.uid });

      await batch.commit();
    };

    const onChange = (e) => {
      // Force form value typed in form to match correct format
      const val = e.target.value.toLowerCase();
      const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

      // Only set form value if length is < 3 OR it passes regex
      if (val.length < 3) {
        setFormValue(val);
        setLoading(false);
        setIsValid(false);
      }

      if (re.test(val)) {
        setFormValue(val);
        setLoading(true);
        setIsValid(false);
      }
    };

    //

    useEffect(() => {
      checkUsername(formValue);
    }, [formValue]);

    // Hit the database for username match after each debounced change
    // useCallback is required for debounce to work
    const checkUsername = useCallback(
      debounce(async (username) => {
        if (username.length >= 3) {
          const ref = firestore.doc(`usernames/${username}`);
          const { exists } = await ref.get();
          console.log('Firestore read executed!');
          setIsValid(!exists);
          setLoading(false);
        }
      }, 500),
      []
    );

    return (
      !username && (
        <section>
          <h3>Choose Username</h3>
          <form onSubmit={onSubmit}>
            <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
            <button type="submit" className="btn-green" disabled={!isValid}>
              Choose
            </button>

            <h3>Debug State</h3>
            <div>
              Username: {formValue}
              <br />
              Loading: {loading.toString()}
              <br />
              Username Valid: {isValid.toString()}
            </div>
          </form>
        </section>
      )
    );
  }

  return (
    <div className="body-bg min-h-screen pt-12 md:pt-20 pb-6 px-2 md:px-0">
      {!user && (
        <main className="bg-white max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
          <section>
            <h3 className="font-bold text-2xl">Welcome to Startup</h3>
            <p className="text-gray-600 pt-2">Sign in to your account.</p>
          </section>

          <section className="mt-10">
            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">Email</label>
                <input
                  type="email"
                  name="email"
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  ref={register({
                    required: 'Enter your e-mail',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: 'Enter a valid e-mail address'
                    }
                  })}
                />
                {errors.email && <p>{errors.email.message}</p>}
              </div>
              <div className="mb-6 pt-3 rounded bg-gray-200">
                <label className="block text-gray-700 text-sm font-bold mb-2 ml-3">Password</label>
                <input
                  className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-purple-600 transition duration-500 px-3 pb-3"
                  name="password"
                  type="password"
                  ref={register({
                    required: 'You must specify a password',
                    minLength: {
                      value: 6,
                      message: 'Password must have at least 6 characters'
                    }
                  })}
                />
                {errors.password && <p>{errors.password.message}</p>}
              </div>

              <button
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"
                type="submit"
              >
                Sign In
              </button>
            </form>
          </section>
        </main>
      )}

      {user && !username && <UsernameForm />}

      {user && username && (
        <button
          onClick={() => {
            auth.signOut();
          }}
        >
          SING OUT
        </button>
      )}
    </div>
  );
};

export default Enter;
