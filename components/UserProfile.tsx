import { User } from '../api/posts';

interface Props {
  user: User;
}

const UserProfile: React.FC<Props> = ({ user }) => {
  return (
    <div className="box-center">
      <img src={user.user.photoURL || '/hacker.png'} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.user.displayName || 'Anonymous User'}</h1>
    </div>
  );
};

export default UserProfile;
