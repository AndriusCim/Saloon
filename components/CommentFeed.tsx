import 'dayjs';
import dayjs from 'dayjs';
import ReactMarkdown from 'react-markdown';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import React, { useContext } from 'react';
import { Pane, Avatar, Text, Heading, Textarea, toaster, FormField, Button } from 'evergreen-ui';
import { PostRef, serverTimestamp } from '../api/firebase';
import { UserContext } from '../api/users';

import { Comment } from '../api/posts';
import relativeTime from 'dayjs/plugin/relativeTime';

interface Props {
  comments: Comment[];
  postRef: PostRef;
}

const SingleComment: React.FC<{ comment: Comment }> = ({ comment }) => {
  dayjs.extend(relativeTime);
  const date = new Date(comment.createdAt);

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
      <Avatar hashValue={comment.createdBy} name={comment.createdBy} size={40} />
      <Pane>
        <ReactMarkdown>{comment.content}</ReactMarkdown>

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

interface SignInValues {
  comment: string;
}

const CommentFeed: React.FC<Props> = ({ comments, postRef }) => {
  const { register, handleSubmit, errors } = useForm<SignInValues>();
  const { username } = useContext(UserContext);

  const onSubmit: SubmitHandler<SignInValues> = async (data: SignInValues) => {
    const commentRef = postRef.collection('comments');
    await commentRef
      .add({
        content: data.comment,
        createdBy: username,
        createdAt: serverTimestamp()
      })
      .catch((e) => {
        toaster.danger(e.message);
      });
  };

  return (
    <>
      {comments.map((x, i) => (
        <SingleComment key={i} comment={x} />
      ))}
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField validationMessage={errors && errors.comment?.message} marginTop={20}>
          <Textarea
            isInvalid={errors && !!errors.comment}
            name="comment"
            ref={register({
              required: 'Enter your comment'
            })}
            placeholder="Enter comment"
          />
        </FormField>

        <FormField marginTop="20" display="flex" justifyContent="center">
          <Button type="submit" appearance="primary" intent="success">
            Submit
          </Button>
        </FormField>
      </form>
    </>
  );
};

export default CommentFeed;
