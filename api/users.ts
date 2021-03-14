import { createContext } from 'react';
import { UserInfo } from './firebase';

export interface User {
  user: UserInfo;
  username: string | null;
}

export const UserContext = createContext<User>({ user: null, username: null });
