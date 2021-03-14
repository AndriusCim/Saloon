import React from 'react';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Post } from '../api/posts';

interface Props {
  post: Post;
}

const PostContent: React.FC<Props> = ({ post }) => {
  return (
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
  );
};

export default PostContent;
