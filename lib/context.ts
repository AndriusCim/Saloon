import { createContext } from 'react';
import { User } from '../api/posts';

export const UserContext = createContext<User>({ user: null, username: null });
