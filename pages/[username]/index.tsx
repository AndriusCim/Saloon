import React from 'react';
import { GetServerSideProps } from 'next';

import { getUserWithUsername } from '../../api/firebase';
import { Post, mapPostDtoToModel } from '../../api/posts';
import { User } from '../../api/users';
import Metatags from '../../components/Metatags';
import PostFeed from '../../components/PostFeed';
import UserProfile from '../../components/UserProfile';

interface Props {
  user: User;
  posts: Post[];
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { username } = query;

  const userDoc = await getUserWithUsername(username as string);

  if (!userDoc) {
    return {
      notFound: true
    };
  }

  let user = null;
  let posts = null;

  if (userDoc) {
    user = userDoc.data();
    const postsQuery = userDoc.ref
      .collection('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .limit(5);
    posts = (await postsQuery.get()).docs.map(mapPostDtoToModel);
  }

  return {
    props: { user, posts }
  };
};

const UserProfilePage: React.FC<Props> = ({ user, posts }) => {
  return (
    <main>
      <Metatags title={user.username} description={`${user.username}'s public profile`} />

      <UserProfile user={user} />
      
      <PostFeed loading={false} postsEnd={true} admin={false} posts={posts} />
    </main>
  );
};

export default UserProfilePage;
