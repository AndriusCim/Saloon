import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Post } from '../api/posts';
import { Heading, Pane, Text, Strong, Badge, Button } from 'evergreen-ui';

interface Props {
  post: Post;
  isOwn: boolean;
}

const PostContent: React.FC<Props> = ({ post, isOwn }) => {
  return (
    <Pane marginTop={12} elevation={1} width="100%" padding={20} display="flex" border="muted" alignItems="center">
      <div>
        <Heading marginBottom={20} size={700}>
          {post?.title}
        </Heading>
        <Badge color="yellow" isSolid marginRight={8}>
          {post.heartCount || 0} Likes
        </Badge>
        <Strong>
          Written by{' '}
          <Link href={`/${post.username}/`}>
            <a>@{post.username}</a>
          </Link>{' '}
        </Strong>

        <Text>
          <ReactMarkdown>{post?.content}</ReactMarkdown>
        </Text>

        {isOwn && (
          <Link href={`/admin/${post.slug}`}>
            <Button marginRight={16} appearance="primary" intent="warning">
              Edit post
            </Button>
          </Link>
        )}
      </div>
    </Pane>
  );
};

export default PostContent;
