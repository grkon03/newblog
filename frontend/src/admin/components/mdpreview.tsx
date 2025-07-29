import React from 'react';
import MyMarkdown from '../../base-component/mymarkdown';
import styles from './mdpreview.module.css';

type Props = {
  MDtext: string;
  images: Map<string, File>;
};

const MDPreview: React.FC<Props> = ({ MDtext, images }) => {
  return (
    <div className={styles.preview}>
      <MyMarkdown>{MDtext}</MyMarkdown>
    </div>
  );
};

export default MDPreview;
