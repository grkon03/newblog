import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetImageSrc } from '../../api/image';
import { ArticleInfo } from '../../api/article';
import { ConvertDateToJST } from '../../util/date';
import styles from './dbarticlecards.module.css';

type Props = {
  articles: ArticleInfo[];
};

const DBArticleCards: React.FC<Props> = ({ articles }) => {
  const navigate = useNavigate();
  const DisplayArticleCard = (article: ArticleInfo): React.JSX.Element => {
    const ImageURL = GetImageSrc(article.thumbnail_id);

    return (
      <div
        key={article.id}
        className={styles.articlecard}
        onClick={() => {
          navigate('/admin/editarticle', { state: { id: article.id } });
        }}
      >
        <div className={styles.thumbnail}>
          <img src={ImageURL} alt="サムネイル" />
        </div>
        <div className={styles.textdetail}>
          <h3 className={styles.title}>{article.title}</h3>
          <div>
            <div className={styles.description}>{article.description}</div>
            <div>投稿者: {article.writer.username}</div>
            <div className={styles.uploaded}>
              投稿日: {ConvertDateToJST(article.created_at)}
            </div>
            <div className={styles.updated}>
              更新日: {ConvertDateToJST(article.updated_at)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return <div>{articles.map((a) => DisplayArticleCard(a))}</div>;
};

export default DBArticleCards;
