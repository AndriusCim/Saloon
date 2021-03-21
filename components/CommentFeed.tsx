import React, { useContext } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Textarea, toaster, FormField, Button, Pane } from 'evergreen-ui';

import { PostRef, serverTimestamp } from '../api/firebase';
import { Comment } from '../api/posts';
import { UserContext } from '../api/users';
import SingleComment from './SingleComment';

interface Props {
  comments: Comment[];
  postRef: PostRef;
}

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
    <Pane width="100%">
      {comments.sort((a, b) => b.createdAt - a.createdAt).map((x, i) => (
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

        <FormField marginTop="10">
          <Button type="submit" appearance="primary" intent="success">
            Submit
          </Button>
        </FormField>
      </form>
    </Pane>
  );
};

export default CommentFeed;
