import React, { useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import Link from 'next/link';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';

import {
  Post,
  mapPostDtoToModel,
  mapCommentDtoToModel,
  mapCommentDocDtoToModel,
  Comment,
  CommentDto
} from '../../api/posts';
import { UserContext } from '../../api/users';
import { firestore, getUserWithUsername } from '../../api/firebase';
import AuthCheck from '../../components/AuthCheck';
import HeartButton from '../../components/HeartButton';
import Metatags from '../../components/Metatags';
import PostContent from '../../components/PostContent';
import CommentFeed from '../../components/CommentFeed';

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { username, slug } = params;
  const userDoc = await getUserWithUsername(username as string);

  let post;
  let path;
  let comments;

  if (userDoc) {
    const postRef = userDoc.ref.collection('posts').doc(slug as string);
    const commentList = (await postRef.collection('comments').get()).docs.map(mapCommentDtoToModel);
    post = mapPostDtoToModel(await postRef.get());
    path = postRef.path;
    comments = commentList;
  }

  return {
    props: { post, path, comments },
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
  comments: Comment[];
}

const SinglePost: React.FC<Props> = (props) => {
  const { user: currentUser } = useContext(UserContext);
  const postRef = firestore.doc(props.path);
  const [realtimePost] = useDocumentData<Post>(postRef);
  const [realtimeComments] = useCollectionData<CommentDto>(postRef.collection('comments'));

  const comments = realtimeComments?.map(mapCommentDocDtoToModel) || props.comments;
  const post = realtimePost || props.post;

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

        <CommentFeed comments={comments} postRef={postRef} />

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
