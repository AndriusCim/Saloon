import React from 'react';
import { Pane, Button, Spinner } from 'evergreen-ui';

import { Post } from '../api/posts';
import PostItem from './PostItem';

interface Props {
  admin?: boolean;
  loading: boolean;
  postsEnd: boolean;
  posts: Post[];
  onLoadMore?: () => Promise<void>;
}

const PostFeed: React.FC<Props> = ({ posts, loading, postsEnd, admin, onLoadMore }) => {
  return posts ? (
    <Pane flexDirection="column" display="flex" alignItems="center">
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))}

      {!loading && !postsEnd && (
        <Button marginTop={20} appearance="primary" intent="warning" onClick={onLoadMore}>
          Load more
        </Button>
      )}

      {loading && <Spinner marginY={20} />}
    </Pane>
  ) : null;
};

export default PostFeed;
