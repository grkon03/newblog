import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './article.module.css';
import { ArticleInfo, GetArticle } from '../api/article';

const Article: React.FC = () => {
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleInfo>();

  useEffect(() => {
    if (id !== undefined) {
      GetArticle(id)
        .then((res) => setArticle(res))
        .catch((err) => console.error(err));
    }
  });

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
