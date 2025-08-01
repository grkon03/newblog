import React, { useState, useEffect } from 'react';
import Tabs from './components/tabs';
import SubmitButtons from './components/submitbuttons';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';
import { PostArticle } from '../api/article';
import styles from './createarticle.module.css';

type Props = {
  mainareaprops?: MainAreaProps;
};

const CreateArticle: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [description, setDescription] = useState('');
  const [MDtext, setMDtext] = useState('');
  const [uploadedImages, setUploadedImages] = useState<Map<string, File>>(
    new Map<string, File>()
  );

  useEffect(() => {
    if (thumbnail === undefined) return;
    const newURL = URL.createObjectURL(thumbnail);
    setThumbnailURL(newURL);

    return () => URL.revokeObjectURL(newURL);
  }, [thumbnail]);

  const handleSaveClick = () => {};
  const handlePublishClick = () => {
    if (!thumbnail) return;
    PostArticle(
      title,
      MDtext,
      description,
      thumbnail,
      Array.from(uploadedImages.values())
    );
  };

  return (
    <div className={styles.createarticle}>
      <h2>記事を作成する</h2>
      <div className={styles.thumbnailinput}>
        <h3>サムネイル</h3>
        {thumbnailURL !== '' && (
          <img src={thumbnailURL} alt="画像読み込みエラー" />
        )}
        <input
          type="file"
          accept="image/*"
          onChange={(e) =>
            e.target.files !== null && setThumbnail(e.target.files[0])
          }
        />
      </div>
      <div className={styles.titleinput}>
        <h3>タイトル</h3>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className={styles.description}>
        <h3>記事の簡単な説明</h3>
        <textarea
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
      </div>
      <div className={styles.content}>
        <h3>記事本文</h3>
        <Tabs setMDtext={setMDtext} setUploadedImages={setUploadedImages} />
      </div>
      <SubmitButtons
        onSaveClick={handleSaveClick}
        onPublishClick={handlePublishClick}
      />
    </div>
  );
};

export default CreateArticle;
