import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './article.module.css';
import { GetArticle } from '../api/article';

const Article: React.FC = () => {
  const { id } = useParams();
  const article = GetArticle(id as string);

  if (!article) {
    return <div>Loading content</div>;
  }

  return (
    <div className={styles.article}>
      <h2>{article.title}</h2>
      <div>{article.content}</div>
    </div>
  );
};

export default Article;
