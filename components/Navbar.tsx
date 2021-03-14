import { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pane, Heading, Avatar, IconButton, MenuIcon, Popover, Menu } from 'evergreen-ui';

import { auth } from '../api/firebase';
import { UserContext } from '../api/users';

const Navbar: React.FC = () => {
  const { user, username } = useContext(UserContext);
  const router = useRouter();
  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  return (
    <Pane display="flex" borderBottom padding={16}>
      <Pane flex={1} alignItems="center" display="flex">
        <Link href="/">
          <Heading cursor="pointer" size={700}>
            🍺
          </Heading>
        </Link>
      </Pane>

      <Pane alignItems="center" display="flex" borderRight paddingRight={20}>
        <Link href={`/${username}`}>
          <Avatar cursor="pointer" isSolid hashValue={user.uid} name={username} size={40} />
        </Link>
      </Pane>

      <Pane alignItems="center" display="flex" paddingLeft={20}>
        <Popover
          position="bottom-right"
          content={
            <Menu>
              <Menu.Group>
                <Link href="/admin">
                  <Menu.Item>Write post</Menu.Item>
                </Link>
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group>
                <Menu.Item onClick={() => signOut()} intent="danger">
                  Sign out
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <IconButton appearance="minimal" icon={MenuIcon} iconSize={18} />
        </Popover>
      </Pane>
    </Pane>
  );
};

export default Navbar;
