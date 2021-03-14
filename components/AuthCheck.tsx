import React, { useContext } from 'react';

import { UserContext } from '../api/users';
import Enter from '../pages/enter';

interface Props {
  fallback?: React.ReactNode;
}

const AuthCheck: React.FC<Props> = ({ fallback, children }) => {
  const { username } = useContext(UserContext);

  return <>{username ? children : fallback || <Enter />}</>;
};

export default AuthCheck;
