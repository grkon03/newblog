import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './article.module.css';

const Article: React.FC = () => {
  const { id } = useParams();
  return (
    <div className={styles.article}>
      <h2>タイトル</h2>
      <div>コンテンツ {id}</div>
    </div>
  );
};

export default Article;
