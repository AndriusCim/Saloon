import React, { useContext } from 'react';

import Enter from '../pages/enter';
import { UserContext } from '../lib/context';

interface Props {
  fallback?: React.ReactNode;
}

const AuthCheck: React.FC<Props> = ({ fallback, children }) => {
  const { username } = useContext(UserContext);

  return <>{username ? children : fallback || <Enter />}</>;
};

export default AuthCheck;
