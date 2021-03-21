import 'dayjs';
import React from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { Pane, Avatar, Text } from 'evergreen-ui';

import { Comment } from '../api/posts';

interface Props {
  comment: Comment;
}

const SingleComment: React.FC<Props> = ({ comment }) => {
  dayjs.extend(relativeTime);
  const date = new Date(comment.createdAt);

  return (
    <Pane marginTop={12} elevation={1} width="100%" padding={10} display="flex" border="muted" alignItems="center">
      <Avatar hashValue={comment.createdBy} name={comment.createdBy} size={40} />
      <Pane paddingX={20}>
        <Text>
          <ReactMarkdown>{comment.content}</ReactMarkdown>
        </Text>

        <Text>{dayjs(date).fromNow()} • From </Text>

        <Link href={`/${comment.createdBy}`}>
          <Text cursor="pointer">
            <strong>@{comment.createdBy}</strong>
          </Text>
        </Link>
      </Pane>
    </Pane>
  );
};

export default SingleComment;
