import React from 'react';
import MyMarkdown from '../../base-component/mymarkdown';
import styles from './mdpreview.module.css';

type Props = {
  MDtext: string;
  images: Map<string, File>;
};

const MDPreview: React.FC<Props> = ({ MDtext, images }) => {
  var localImageURLs = new Map<string, string>();
  images.forEach((file, key) => {
    localImageURLs.set(key, URL.createObjectURL(file));
  });

  return (
    <div className={styles.preview}>
      <MyMarkdown localImageURLs={localImageURLs}>{MDtext}</MyMarkdown>
    </div>
  );
};

export default MDPreview;
