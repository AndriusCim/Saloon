import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { UserContext } from '../lib/context';
import { auth } from '../lib/firebase';

const Navbar: React.FC = () => {
  const { user, username } = useContext(UserContext);

  const router = useRouter();

  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <nav className="font-sans flex flex-col text-center sm:flex-row sm:text-left sm:justify-between py-4 px-6 bg-white shadow sm:items-baseline w-full">
      <div className="mb-2 sm:mb-0">
        <Link href="/">
          <button className="text-2xl no-underline text-grey-darkest hover:text-blue-dark">Home</button>
        </Link>
      </div>

      {username && (
        <div>
          <button className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">One</button>
          <Link href="/admin">
            <button className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Write Posts</button>
          </Link>
          <button onClick={signOut} className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
            Sign Out
          </button>
          <Link href={`/${username}`}>
            <button className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">
              <img src={user?.photoURL || '/hacker.png'} style={{ width: 20 }} />
            </button>
          </Link>
        </div>
      )}

      {!username && (
        <li>
          <Link href="/enter">
            <button className="text-lg no-underline text-grey-darkest hover:text-blue-dark ml-2">Log in</button>
          </Link>
        </li>
      )}
    </nav>
  );
};

export default Navbar;
