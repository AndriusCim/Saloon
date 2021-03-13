import React, { useState, useContext } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm, SubmitHandler } from 'react-hook-form';
import Router from 'next/router';

import { Button, FormField, Heading, Pane, Spinner, toaster, TextInput } from 'evergreen-ui';

import { auth, firestore } from '../lib/firebase';
import { UserContext } from '../lib/context';

interface SignInValues {
  email: string;
  password: string;
}

interface UsernameValues {
  username: string;
}

const Enter: React.FC = () => {
  const { user, username } = useContext(UserContext);
  const { register, handleSubmit, errors } = useForm<SignInValues>();
  const {
    register: usernameRegister,
    handleSubmit: handleUsernameSubmit,
    errors: usernameErrors
  } = useForm<UsernameValues>();
  const [_, loading] = useAuthState(auth);

  const onSubmit: SubmitHandler<SignInValues> = async (data: SignInValues) => {
    await auth.signInWithEmailAndPassword(data.email, data.password).catch((e) => {
      toaster.danger(e.message);
    });
    Router.push('/');
  };

  const onSubmitUsername: SubmitHandler<UsernameValues> = async (data: UsernameValues) => {
    const ref = firestore.doc(`usernames/${data.username}`);
    const { exists } = await ref.get();

    if (exists) {
      return toaster.warning('Username already exists');
    }

    const userDoc = firestore.doc(`users/${user.uid}`);
    const usernameDoc = firestore.doc(`usernames/${data.username}`);
    const batch = firestore.batch();

    batch.set(userDoc, { username: data.username, photoURL: user.photoURL, displayName: user.displayName });
    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit().catch((e) => {
      toaster.danger(e.message);
    });
  };

  return (
    <>
      {loading && (
        <Pane
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          height={'auto'}
        >
          <Spinner />
        </Pane>
      )}

      {!loading && (
        <Pane
          elevation={4}
          minWidth={200}
          width={400}
          height={'auto'}
          padding={24}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
        >
          {!user && (
            <>
              <Heading size={800}>Saloon 🍺</Heading>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormField validationMessage={errors && errors.email?.message} label="Email" marginTop={20}>
                  <TextInput
                    isInvalid={errors && !!errors.email}
                    type="email"
                    name="email"
                    ref={register({
                      required: 'Enter your e-mail',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: 'Enter a valid e-mail address'
                      }
                    })}
                    placeholder="Enter e-mail"
                  />
                </FormField>

                <FormField validationMessage={errors && errors.password?.message} label="Password" marginTop={10}>
                  <TextInput
                    isInvalid={errors && !!errors.password}
                    id="password"
                    type="password"
                    name="password"
                    ref={register({
                      required: 'Please enter a password',
                      minLength: {
                        value: 6,
                        message: 'Should have at least 6 characters'
                      }
                    })}
                    placeholder="Enter password"
                  />
                </FormField>

                <FormField marginTop="20" display="flex" justifyContent="center">
                  <Button type="submit" appearance="primary" intent="success">
                    Login 🍻
                  </Button>
                </FormField>
              </form>
            </>
          )}

          {user && !username && (
            <>
              <Heading size={800}>Choose your username 🎭</Heading>
              <form onSubmit={handleUsernameSubmit(onSubmitUsername)}>
                <FormField validationMessage={usernameErrors && usernameErrors.username?.message} marginTop={20}>
                  <TextInput
                    isInvalid={usernameErrors && !!usernameErrors.username}
                    type="username"
                    name="username"
                    ref={usernameRegister({
                      required: 'Enter your username',
                      pattern: {
                        value: /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/,
                        message: 'Username not valid'
                      }
                    })}
                    placeholder="Enter username"
                  />
                </FormField>

                <FormField marginTop="20" display="flex" justifyContent="center">
                  <Button type="submit" appearance="primary" intent="success">
                    Submit 🍻
                  </Button>
                </FormField>
              </form>
            </>
          )}

          {user && username && (
            <>
              <Heading size={800}>You already signed in!</Heading>
              <Button marginTop={40} appearance="primary" intent="danger">
                Sign Out 💤
              </Button>
            </>
          )}
        </Pane>
      )}
    </>
  );
};

export default Enter;
