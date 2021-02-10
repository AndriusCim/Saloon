import { auth, firestore } from '../lib/firebase';
import { useEffect, useState } from 'react';
import { useAuthState, AuthStateHook } from 'react-firebase-hooks/auth';

interface State {
  loading: boolean;
  errors: any | null;
}

export const useUserLogin = () => {
  const [state, setState] = useState<State>({ loading: false, errors: null });

  const login = async (email: string, password: string) => {
    setState((prevState) => ({ ...prevState, loading: true }));
    try {
      await auth.signInWithEmailAndPassword(email, password);
      setState((prevState) => ({ ...prevState, loading: false }));
    } catch (error) {
      setState({ loading: false, errors: error.message });
    }
  };

  return {
    ...state,
    login
  };
};

export const useUserData = () => {
  const [user, loading] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, loading, username };
};
