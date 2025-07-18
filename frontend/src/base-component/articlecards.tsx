import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleInfo } from '../api/article';
import styles from './articlecards.module.css';

type Params = {
  articles: ArticleInfo[];
};

const ArticleCards: React.FC<Params> = ({ articles }) => {
  const navigate = useNavigate();
  const DisplayArticleCard = (article: ArticleInfo): React.JSX.Element => {
    return (
      <div
        key={article.id}
        className={styles.articlecard}
        onClick={() => {
          navigate('/article/' + article.id.toString());
        }}
      >
        <h3 className={styles.title}>{article.title}</h3>
        <div>
          <div className={styles.description}>{article.description}</div>
          <div>投稿日: {article.created_at}</div>
          <div>更新日: {article.updated_at}</div>
        </div>
      </div>
    );
  };

  return <div>{articles.map((a) => DisplayArticleCard(a))}</div>;
};

export default ArticleCards;
