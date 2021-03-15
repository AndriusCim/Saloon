import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Post } from '../api/posts';
import { Pane } from 'evergreen-ui';

interface Props {
  post: Post;
}

const PostContent: React.FC<Props> = ({ post }) => {
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
      <div>
        <h1>{post?.title}</h1>
        <span>
          Written by{' '}
          <Link href={`/${post.username}/`}>
            <a>@{post.username}</a>
          </Link>{' '}
        </span>
        <ReactMarkdown>{post?.content}</ReactMarkdown>
      </div>
    </Pane>
  );
};

export default PostContent;
