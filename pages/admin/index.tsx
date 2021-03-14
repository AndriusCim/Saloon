import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import { firestore, auth, serverTimestamp } from '../../api/firebase';
import { Post } from '../../api/posts';
import { UserContext } from '../../api/users';
import AuthCheck from '../../components/AuthCheck';
import PostFeed from '../../components/PostFeed';

const PostList = () => {
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);
  const posts = querySnapshot?.docs?.map((doc) => doc.data());

  return (
    <>
      <h1>Manage your Posts</h1>
      <PostFeed posts={posts as Post[]} admin />
    </>
  );
};

const CreateNewPost = () => {
  const router = useRouter();
  const { username } = useContext(UserContext);
  const [title, setTitle] = useState('');

  const slug = encodeURI(kebabCase(title));
  const isValid = title.length > 3 && title.length < 100;
  const createPost = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);

    const data = {
      title,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0
    };

    await ref.set(data);
    toast.success('Post created!');
    router.push(`/admin/${slug}`);
  };

  return (
    <form onSubmit={createPost}>
      <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="My Awesome Article!" />
      <p>
        <strong>Slug:</strong> {slug}
      </p>
      <button type="submit" disabled={!isValid}>
        Create New Post
      </button>
    </form>
  );
};

const AdminPostsPage: React.FC = () => {
  return (
    <main>
      <AuthCheck>
        <PostList />
        <CreateNewPost />
      </AuthCheck>
    </main>
  );
};

export default AdminPostsPage;
