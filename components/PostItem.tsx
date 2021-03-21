import React from 'react';
import 'dayjs';
import dayjs from 'dayjs';
import Link from 'next/link';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Pane, Avatar, Text, Heading, Strong, Button } from 'evergreen-ui';

import { Post } from '../api/posts';

interface Props {
  post: Post;
  admin: boolean;
}

const PostItem: React.FC<Props> = ({ post, admin }) => {
  const date = new Date(post.createdAt);
  dayjs.extend(relativeTime);

  return (
    <Link href={`/${post.username}/${post.slug}`}>
      <Pane
        cursor="pointer"
        backgroundColor="white"
        marginTop={15}
        elevation={2}
        width="60%"
        minWidth={400}
        padding={10}
        display="flex"
        border="muted"
        alignItems="center"
      >
        <Avatar hashValue={post.slug} name=" " size={40} />

        <Pane marginX={20}>
          <Heading size={500} marginBottom={15}>
            <a>{post.title}</a>
          </Heading>
          <Strong size={400}>👍 {post.heartCount || 0} • </Strong>

          <Text>{dayjs(date).fromNow()} • From </Text>

          <Link href={`/${post.username}`}>
            <Text cursor="pointer">
              <strong>@{post.username}</strong>
            </Text>
          </Link>

          {admin && (
            <Link href={`/admin/${post.slug}`}>
              <Button marginLeft={16} intent="warning">
                Edit
              </Button>
            </Link>
          )}

          {admin && <Text> • {post.published ? 'Live' : 'Unpublished'} </Text>}
        </Pane>
      </Pane>
    </Link>
  );
};

export default PostItem;
