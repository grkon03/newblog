import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Tabs from './ea-components/tabs';
import SubmitButtons from './ea-components/submitbuttons';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';
import { GetImageSrc } from '../api/image';
import {
  ArticleInfo,
  GetArticle,
  PostArticle,
  PutArticle,
} from '../api/article';
import styles from './editarticle.module.css';

type Props = {
  mainareaprops?: MainAreaProps;
};

const EditArticle: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);

  const location = useLocation();

  const [isFetched, setIsFetched] = useState(false);

  const [ID, setID] = useState<string | undefined>(location.state?.id);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState<File>();
  const [thumbnailURL, setThumbnailURL] = useState('');
  const [description, setDescription] = useState('');
  const [MDtext, setMDtext] = useState('');
  const [isPublished, setIsPublished] = useState(false);
  const [uploadedImages, setUploadedImages] = useState<Map<string, File>>(
    new Map<string, File>()
  );

  const setArticle = (article: ArticleInfo) => {
    setTitle(article.title);
    setThumbnailURL(GetImageSrc(article.thumbnail_id));
    setDescription(article.description);
    setMDtext(article.content);
    setIsPublished(article.is_published);
  };

  useEffect(() => {
    if (isFetched) return;
    if (ID === undefined) return;

    setIsFetched(true);
    GetArticle(ID).then((article) => setArticle(article));
  }, [ID, isFetched]);

  useEffect(() => {
    if (thumbnail === undefined) return;
    const newURL = URL.createObjectURL(thumbnail);
    setThumbnailURL(newURL);

    return () => URL.revokeObjectURL(newURL);
  }, [thumbnail]);

  const Upload = (publish: boolean) => {
    var req = {
      title: title,
      content: MDtext,
      description: description,
      publish: publish,
      thumbnail: thumbnail,
      images: Array.from(uploadedImages.values()),
    };
    if (ID === undefined) {
      PostArticle(req).then((article) => {
        if (article === undefined) {
          alert('記事をアップロードできませんでした');
          return;
        }

        alert('記事のアップロードに成功しました');

        setID(article.id.toString());
        setArticle(article);
      });
    } else {
      PutArticle(Number(ID), req).then((ok) => {
        if (!ok) {
          alert('記事をアップロードできませんでした');
        } else {
          alert('記事のアップロードに成功しました');
        }
      });
    }
  };

  const handleSaveClick = () => {
    Upload(isPublished);
  };
  const handlePublishClick = () => {
    Upload(true);
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
        <Tabs
          initialText={MDtext}
          setMDtext={setMDtext}
          setUploadedImages={setUploadedImages}
        />
      </div>
      <SubmitButtons
        onSaveClick={handleSaveClick}
        onPublishClick={handlePublishClick}
      />
    </div>
  );
};

export default EditArticle;
