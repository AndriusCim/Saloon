import React, { useState } from 'react';
import { GetStaticProps } from 'next';
import { Spinner, Button } from 'evergreen-ui';

import { mapPostDtoToModel, Post } from '../api/posts';
import { firestore, fromMillis } from '../api/firebase';
import PostFeed from '../components/PostFeed';
import Metatags from '../components/Metatags';

interface Props {
  posts: Post[];
}

const LIMIT = 10;

export const getServerSideProps: GetStaticProps = async () => {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts = (await postsQuery.get()).docs.map(mapPostDtoToModel);

  return {
    props: { posts }
  };
};

const Home: React.FC<Props> = ({ posts: props }) => {
  const [posts, setPosts] = useState(props);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(false);

  // Get next page in pagination query
  const getMorePosts = async () => {
    setLoading(true);
    const last = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts((prevState) => [...prevState, ...(newPosts as Post[])]);
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags title="Home Page" description="Get the latest posts on our site" />
      <PostFeed posts={posts} loading={loading} postsEnd={postsEnd} onLoadMore={getMorePosts} />
    </main>
  );
};

export default Home;
