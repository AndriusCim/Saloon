import React, { useContext } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Pane, IconButton, MenuIcon, Popover, Menu } from 'evergreen-ui';

import { auth } from '../api/firebase';
import { UserContext } from '../api/users';

const Navbar: React.FC = () => {
  const { username } = useContext(UserContext);
  const router = useRouter();
  const signOut = () => {
    auth.signOut();
    router.reload();
  };

  const popoverContent = (
    <Menu>
      <Menu.Group>
        <Link href={`/${username}`}>
          <Menu.Item>Go to profile</Menu.Item>
        </Link>
      </Menu.Group>
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
  );

  return (
    <Pane display="flex" backgroundColor="white" justifyContent="space-between" padding={16}>
      <Pane alignItems="center" display="flex">
        <Popover position="bottom-right" content={popoverContent}>
          <IconButton appearance="minimal" icon={MenuIcon} iconSize={18} />
        </Popover>
      </Pane>

      <Pane alignItems="center" display="flex">
        <Link href="/">
          <img style={{ height: 35 }} src="/saloon-logo.png" alt="" />
        </Link>
      </Pane>

      <div />
    </Pane>
  );
};

export default Navbar;
