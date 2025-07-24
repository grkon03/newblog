import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styles from './article.module.css';
import { ArticleInfo, GetArticle } from '../api/article';
import { ConvertDateToJST } from '../util/date';
import { GetImageSrc } from '../api/image';
import {
  CleanMarkdown,
  rehypePlugins,
  remarkPlugins,
  ComponentsDefault,
} from '../util/markdown';

const Article: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [article, setArticle] = useState<ArticleInfo>();
  const CD = ComponentsDefault(navigate);

  useEffect(() => {
    if (id !== undefined) {
      GetArticle(id)
        .then((res) => setArticle(res))
        .catch((err) => console.error(err));
    }
  }, [id]);

  if (!article) {
    return <div>Loading content</div>;
  }
  const thumbnailsrc = GetImageSrc(article.thumbnail_id);

  return (
    <div className={styles.article}>
      <div className={styles.articleHeader}>
        <div className={styles.thumbnail}>
          <img src={thumbnailsrc} alt="サムネイル" />
        </div>
        <div className={styles.headerText}>
          <h2>{article.title}</h2>
          <div>{article.description}</div>
          <br />
          <div>投稿者: {article.writer.username}</div>
          <div>投稿日: {ConvertDateToJST(article.created_at)}</div>
          <div>更新日: {ConvertDateToJST(article.updated_at)}</div>
        </div>
      </div>
      <div className={styles.articleContent}>
        <ReactMarkdown
          components={CD}
          rehypePlugins={rehypePlugins}
          remarkPlugins={remarkPlugins}
        >
          {CleanMarkdown(article.content)}
        </ReactMarkdown>
      </div>
    </div>
  );
};

export default Article;
