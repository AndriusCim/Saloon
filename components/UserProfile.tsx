import React from 'react';
import { User } from '../api/posts';

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div className="box-center">
      <img src="/hacker.png" />
      <p>
        <i>@{user.username}</i>
      </p>
    </div>
  );
};

export default UserProfile;
