import React, { useContext } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useDocumentData, useCollectionData } from 'react-firebase-hooks/firestore';
import { Pane } from 'evergreen-ui';

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
    const postsQuery = firestore.collectionGroup('comments').orderBy('createdAt', 'desc');

    const commentList = (await postsQuery.get()).docs.map(mapCommentDtoToModel);
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
    <Pane display="flex" justifyContent="center">
      <Metatags title={post.title} description={post.title} />
      <Pane width="60%" minWidth={400} flexDirection="column" display="flex" alignItems="center">
        <PostContent isOwn={currentUser?.uid === post.uid} post={post} />

        <Pane alignSelf="flex-start" marginY={10}>
          <HeartButton postRef={postRef} />
        </Pane>

        <CommentFeed comments={comments} postRef={postRef} />
      </Pane>
    </Pane>
  );
};

export default SinglePost;
