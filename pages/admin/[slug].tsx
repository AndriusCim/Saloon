import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore';
import { useForm } from 'react-hook-form';
import ReactMarkdown from 'react-markdown';
import toast from 'react-hot-toast';

import { Post } from '../../api/posts';
import { firestore, auth, serverTimestamp, PostRef } from '../../api/firebase';
import ImageUploader from '../../components/ImageUploader';
import AuthCheck from '../../components/AuthCheck';

const PostManager = () => {
  const [preview, setPreview] = useState(false);
  const router = useRouter();
  const { slug } = router.query;
  const postRef = firestore
    .collection('users')
    .doc(auth.currentUser.uid)
    .collection('posts')
    .doc(slug as string);
  const [post] = useDocumentDataOnce<Post>(postRef);

  return (
    <main>
      {post && (
        <>
          <section>
            <h1>{post.title}</h1>
            <p>ID: {post.slug}</p>

            <PostForm postRef={postRef} defaultValues={post} preview={preview} />
          </section>

          <aside>
            <h3>Tools</h3>
            <button onClick={() => setPreview(!preview)}>{preview ? 'Edit' : 'Preview'}</button>
            <Link href={`/${post.username}/${post.slug}`}>
              <button>Live view</button>
            </Link>
            <DeletePostButton postRef={postRef} />
          </aside>
        </>
      )}
    </main>
  );
};

function PostForm({ defaultValues, postRef, preview }) {
  const { register, errors, handleSubmit, formState, reset, watch } = useForm({ defaultValues, mode: 'onChange' });

  const { isValid, isDirty } = formState;

  const updatePost = async ({ content, published }) => {
    await postRef.update({
      content,
      published,
      updatedAt: serverTimestamp()
    });

    reset({ content, published });

    toast.success('Post updated successfully!');
  };

  return (
    <form onSubmit={handleSubmit(updatePost)}>
      {preview && (
        <div>
          <ReactMarkdown>{watch('content')}</ReactMarkdown>
        </div>
      )}

      <div>
        <ImageUploader />

        <textarea
          name="content"
          ref={register({
            maxLength: { value: 20000, message: 'content is too long' },
            minLength: { value: 10, message: 'content is too short' },
            required: { value: true, message: 'content is required' }
          })}
        ></textarea>

        {errors.content && <p>{errors.content.message}</p>}

        <fieldset>
          <input name="published" type="checkbox" ref={register} />
          <label>Published</label>
        </fieldset>

        <button type="submit" disabled={!isDirty || !isValid}>
          Save Changes
        </button>
      </div>
    </form>
  );
}

const DeletePostButton: React.FC<{ postRef: PostRef }> = ({ postRef }) => {
  const router = useRouter();

  const deletePost = async () => {
    const doIt = confirm('are you sure!');
    if (doIt) {
      await postRef.delete();
      router.push('/admin');
      toast('post annihilated ', { icon: '🗑️' });
    }
  };

  return (
    <button onClick={deletePost}>
      Delete
    </button>
  );
};

const AdminPostEdit: React.FC = () => {
  return (
    <AuthCheck>
      <PostManager />
    </AuthCheck>
  );
};

export default AdminPostEdit;
