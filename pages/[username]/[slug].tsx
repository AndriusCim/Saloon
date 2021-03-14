import React, { useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useDocumentData } from 'react-firebase-hooks/firestore';

import { Post, mapPostDtoToModel } from '../../api/posts';
import { UserContext } from '../../api/users';
import { firestore, getUserWithUsername } from '../../api/firebase';
import AuthCheck from '../../components/AuthCheck';
import HeartButton from '../../components/HeartButton';
import Metatags from '../../components/Metatags';
import PostContent from '../../components/PostContent';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username as string);
  let post;
  let path;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug as string);
    post = mapPostDtoToModel(await postRef.get());

    path = postRef.path;
  }

  return {
    props: { post, path },
    revalidate: 100
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const snapshot = await firestore.collectionGroup('posts').get();
  const paths = snapshot.docs.map((doc) => {
    const { slug, username } = doc.data();
    return {
      params: { username, slug }
    };
  });

  return {
    paths,
    fallback: 'blocking'
  };
};

interface Props {
  path: string;
  post: Post;
}

const SinglePost: React.FC<Props> = (props) => {
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData<Post>(postRef);

  const post = realtimePost || props.post;

  const { user: currentUser } = useContext(UserContext);

  return (
    <main>
      <Metatags title={post.title} description={post.title} />

      <section>
        <PostContent post={post} />
      </section>

      <aside>
        <p>
          <strong>{post.heartCount || 0} 🤍</strong>
        </p>

        <AuthCheck
          fallback={
            <Link href="/enter">
              <button>💗 Sign Up</button>
            </Link>
          }
        >
          <HeartButton postRef={postRef} />
        </AuthCheck>

        {currentUser?.uid === post.uid && (
          <Link href={`/admin/${post.slug}`}>
            <button>Edit Post</button>
          </Link>
        )}
      </aside>
    </main>
  );
};

export default SinglePost;
