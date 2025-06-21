import React from 'react';
import styles from './article.module.css';

const Article: React.FC = () => {
  return (
    <div className={styles.article}>
      <h2>タイトル</h2>
      <div>コンテンツ</div>
    </div>
  );
};

export default Article;
