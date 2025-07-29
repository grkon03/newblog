import React, { useState, useEffect } from 'react';
import MyMarkdown from '../../base-component/mymarkdown';
import styles from './mdpreview.module.css';

type Props = {
  MDtext: string;
  images: Map<string, File>;
};

const MDPreview: React.FC<Props> = ({ MDtext, images }) => {
  const [localImageURLs, setLocalImageURLs] = useState(
    new Map<string, string>()
  );

  useEffect(() => {
    const newURLs = new Map<string, string>();
    images.forEach((file, key) => {
      newURLs.set(key, URL.createObjectURL(file));
    });
    setLocalImageURLs(newURLs);

    return () => newURLs.forEach((file) => URL.revokeObjectURL(file));
  }, [images]);

  return (
    <div className={styles.preview}>
      <MyMarkdown localImageURLs={localImageURLs}>{MDtext}</MyMarkdown>
    </div>
  );
};

export default MDPreview;
