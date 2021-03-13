import Link from 'next/link';
import ReactMarkdown from 'react-markdown';

import { Post } from '../api/posts';

interface Props {
  post: Post;
}

const PostContent: React.FC<Props> = ({ post }) => {

  return (
    <div className="card">
      <h1>{post?.title}</h1>
      <span className="text-sm">
        Written by{' '}
        <Link href={`/${post.username}/`}>
          <a className="text-info">@{post.username}</a>
        </Link>{' '}
        
      </span>
      <ReactMarkdown>{post?.content}</ReactMarkdown>
    </div>
  );
};

export default PostContent;
