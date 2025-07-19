import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArticleInfo } from '../api/article';
import { GetImageSrc } from '../api/image';
import { ConvertDateToJST } from '../util/date';
import styles from './articlecards.module.css';

type Params = {
  articles: ArticleInfo[];
};

const ArticleCards: React.FC<Params> = ({ articles }) => {
  const navigate = useNavigate();
  const DisplayArticleCard = (article: ArticleInfo): React.JSX.Element => {
    const ImageURL = GetImageSrc(article.thumbnail_id);

    return (
      <div
        key={article.id}
        className={styles.articlecard}
        onClick={() => {
          navigate('/article/' + article.id.toString());
        }}
      >
        <div className={styles.thumbnail}>
          <img src={ImageURL} alt="サムネイル" />
        </div>
        <div className={styles.textdetail}>
          <h3 className={styles.title}>{article.title}</h3>
          <div>
            <div className={styles.description}>{article.description}</div>
            <div>投稿日: {ConvertDateToJST(article.created_at)}</div>
            <div>更新日: {ConvertDateToJST(article.updated_at)}</div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{articles.map((a) => DisplayArticleCard(a))}</div>;
};

export default ArticleCards;
