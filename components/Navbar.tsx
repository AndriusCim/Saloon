import { useState } from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

interface User {
  photoURL: string | null;
}

interface Props {
  user: User | null;
  username: string | null;
}

const Navbar: React.FC<Props> = ({ user, username }) => {
  const [selectedKeys, setSelectedKeys] = useState<React.Key>('');

  return (
    <Menu
      className="shadow-lg"
      onClick={(e) => setSelectedKeys(e.key)}
      selectedKeys={[selectedKeys.toString()]}
      mode="horizontal"
    >
      <Menu.Item key="feed">
        <Link href="/">
          <button>FEED</button>
        </Link>
      </Menu.Item>

      {username && (
        <>
          <Menu.Item key="admin">
            <Link href="/admin">
              <button className="btn-blue">Write Posts</button>
            </Link>
          </Menu.Item>
          <Menu.Item key="user">
            <Link href={`/${username}`}>
              <img src={user?.photoURL} />
            </Link>
          </Menu.Item>
        </>
      )}

      {!username && (
        <Menu.Item key="enter">
          <Link href="/enter">
            <button className="btn-blue">Log in</button>
          </Link>
        </Menu.Item>
      )}
    </Menu>
  );
};

export default Navbar;
