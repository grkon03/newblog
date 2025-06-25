import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './article.module.css';
import { EndpointURL } from '../api/config';

type ArticleInfo = {
  title: string;
  content: string;
};

const Article: React.FC = () => {
  const [article, setArticle] = useState<ArticleInfo | null>(null);
  const { id } = useParams();
  useEffect(() => {
    const url = EndpointURL('/article/' + id);
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((r) => {
        return r.json();
      })
      .then((r: ArticleInfo) => setArticle(r))
      .catch((err) => console.log(err));
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
