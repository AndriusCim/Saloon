import React from 'react';
import Link from 'next/link';
import { Pane, Avatar, Text } from 'evergreen-ui';
import { Post } from '../api/posts';

interface Props {
  admin?: boolean;
  posts: Post[];
}

interface PostItem {
  post: Post;
  admin: boolean;
}

const PostItem: React.FC<PostItem> = ({ post, admin = false }) => {
  return (
    <Pane padding={20} display="flex" border="muted" alignItems="center">
      <Avatar hashValue={post.uid} name=" " size={40} />

      <Text marginX={20}>👍 {post.heartCount || 0} Hearts</Text>

      <Pane></Pane>
      <Link href={`/${post.username}/${post.slug}`}>
        <h4>
          <a>{post.title}</a>
        </h4>
      </Link>

      <footer>
        <Link href={`/${post.username}`}>
          <a>
            <strong>By @{post.username}</strong>
          </a>
        </Link>
      </footer>

      {admin && (
        <>
          <Link href={`/admin/${post.slug}`}>
            <h3>
              <button>Edit</button>
            </h3>
          </Link>

          {post.published ? <p>Live</p> : <p>Unpublished</p>}
        </>
      )}
    </Pane>
  );
};

const PostFeed: React.FC<Props> = ({ posts, admin }) => {
  return posts ? (
    <Pane display="flex" justifyContent="center">
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))}
    </Pane>
  ) : null;
};

export default PostFeed;
