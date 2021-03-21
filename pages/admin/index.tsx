import React, { useContext, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextInput, FormField, Pane, Button } from 'evergreen-ui';
import { useRouter } from 'next/router';
import { useCollection } from 'react-firebase-hooks/firestore';
import kebabCase from 'lodash.kebabcase';
import toast from 'react-hot-toast';

import PostFeed from '../../components/PostFeed';
import { firestore, auth, serverTimestamp } from '../../api/firebase';
import { Post } from '../../api/posts';
import { UserContext } from '../../api/users';

interface FormValues {
  postTitle: string;
}

const AdminPostsPage: React.FC = () => {
  const { register, handleSubmit, errors } = useForm<FormValues>();
  const ref = firestore.collection('users').doc(auth.currentUser.uid).collection('posts');
  const query = ref.orderBy('createdAt');
  const [querySnapshot] = useCollection(query);
  const posts: Post[] = querySnapshot?.docs?.map((doc) => doc.data());
  const router = useRouter();
  const { username } = useContext(UserContext);

  const onSubmit: SubmitHandler<FormValues> = async (data: FormValues) => {
    const slug = encodeURI(kebabCase(data.postTitle));
    const uid = auth.currentUser.uid;
    const ref = firestore.collection('users').doc(uid).collection('posts').doc(slug);
    const json = {
      title: data.postTitle,
      slug,
      uid,
      username,
      published: false,
      content: '# hello world!',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      heartCount: 0
    };

    await ref.set(json);
    toast.success('Post created!');
    router.push(`/admin/${slug}`);
  };

  return (
    <Pane>
      <PostFeed loading={false} postsEnd={true} posts={posts} admin />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField validationMessage={errors && errors.postTitle?.message} marginTop={20}>
          <TextInput
            isInvalid={errors && !!errors.postTitle}
            name="postTitle"
            ref={register({
              required: 'Needs totle',
              minLength: {
                value: 3,
                message: 'Too short'
              },
              maxLength: {
                value: 100,
                message: 'Too long'
              }
            })}
            placeholder="Enter your new post title"
          />
        </FormField>

        <FormField marginTop="10">
          <Button type="submit" appearance="primary" intent="success">
            Create new post
          </Button>
        </FormField>
      </form>
    </Pane>
  );
};

export default AdminPostsPage;
