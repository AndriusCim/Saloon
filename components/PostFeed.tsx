import 'dayjs';
import React from 'react';
import Link from 'next/link';
import { Pane, Avatar, Text, Heading } from 'evergreen-ui';
import { Post } from '../api/posts';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
  admin?: boolean;
  posts: Post[];
}

interface PostItem {
  post: Post;
  admin: boolean;
}

const PostItem: React.FC<PostItem> = ({ post, admin = false }) => {
  const date = new Date(post.createdAt);
  dayjs.extend(relativeTime);

  return (
    <Pane
      marginTop={12}
      elevation={1}
      width="60%"
      minWidth={400}
      padding={10}
      display="flex"
      border="muted"
      alignItems="center"
    >
      <Avatar hashValue={post.uid} name=" " size={40} />
      <Text marginX={20}>👍 {post.heartCount || 0} Hearts</Text>

      <Pane>
        <Link href={`/${post.username}/${post.slug}`}>
          <Heading>
            <a>{post.title}</a>
          </Heading>
        </Link>

        <Text>{dayjs(date).fromNow()} • From {' '}</Text>

        <Link href={`/${post.username}`}>
          <Text cursor="pointer">
            <strong>@{post.username}</strong>
          </Text>
        </Link>
      </Pane>

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
    <Pane flexDirection="column" display="flex" alignItems="center">
      {posts.map((post) => (
        <PostItem post={post} key={post.slug} admin={admin} />
      ))}
    </Pane>
  ) : null;
};

export default PostFeed;
