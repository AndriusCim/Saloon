import React from 'react';
import { Button } from 'evergreen-ui';
import { useDocument } from 'react-firebase-hooks/firestore';
import { firestore, auth, increment, PostRef } from '../api/firebase';

interface Props {
  postRef: PostRef;
}

const Heart: React.FC<Props> = ({ postRef }) => {
  const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  const removeHeart = async () => {
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return (
    <Button onClick={heartDoc?.exists ? removeHeart : addHeart} appearance="minimal" height={24}>
      {' '}
      {heartDoc?.exists ? '👍' : '👎'}{' '}
    </Button>
  );
};

export default Heart;
