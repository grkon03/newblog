import React from 'react';
import ReactMarkdown from 'react-markdown';
import MyMarkdown from '../../base-component/mymarkdown';
import styles from './mdpreview.module.css';

type Props = {
  MDtext: string;
};

const MDPreview: React.FC<Props> = ({ MDtext }) => {
  return (
    <div className={styles.preview}>
      <MyMarkdown>{MDtext}</MyMarkdown>
    </div>
  );
};

export default MDPreview;
