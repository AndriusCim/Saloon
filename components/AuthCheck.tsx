import Link from 'next/link';
import React, { useContext } from 'react';
import { UserContext } from '../lib/context';
import Enter from '../pages/enter'
interface Props {
  fallback?: React.ReactNode;
}

// Component's children only shown to logged-in users
const AuthCheck: React.FC<Props> = ({ fallback, children }) => {
  const { username } = useContext(UserContext);

  return <>{username ? children : fallback || <Enter />}</>;
};

export default AuthCheck;
