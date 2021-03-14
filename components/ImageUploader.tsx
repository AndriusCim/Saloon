import { FilePicker, Spinner } from 'evergreen-ui';
import React, { useState } from 'react';
import { auth, storage, STATE_CHANGED } from '../api/firebase';

const ImageUploader: React.FC = () => {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadURL, setDownloadURL] = useState(null);

  const uploadFile = async (fileList: FileList) => {
    const file = Array.from(fileList)[0];
    const extension = file.type.split('/')[1];
    const ref = storage.ref(`uploads/${auth.currentUser.uid}/${Date.now()}.${extension}`);
    setUploading(true);

    const task = ref.put(file);

    task.on(STATE_CHANGED, (snapshot) => {
      const pct = ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toFixed(0);
      setProgress(parseInt(pct));
    });

    task
      .then(() => ref.getDownloadURL())
      .then((url) => {
        setDownloadURL(url);
        setUploading(false);
      });
  };

  return (
    <div className="box">
      {uploading && (
        <>
          <Spinner />
          <h3>{progress}%</h3>
        </>
      )}

      {!uploading && (
            <FilePicker
              onChange={uploadFile}
              accept="image/x-png,image/gif,image/jpeg"
              width={350}
              height={24}
            />
      )}

      {downloadURL && <code>{`![alt](${downloadURL})`}</code>}
    </div>
  );
};

export default ImageUploader;
