import React, { useState, useEffect } from 'react';
import { ArticleInfo, GetArticles } from '../api/article';
import styles from './home.module.css';
import ArticleCards from '../base-component/articlecards';

const Home: React.FC = () => {
  const onestep = 10;
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [nextToLoad, setNextToLoad] = useState<number>(0);

  const onClickMoreArticleCards = () => {
    setNextToLoad((prev) => prev + onestep);
  };

  useEffect(() => {
    GetArticles(nextToLoad, onestep).then((res) => {
      setArticles((prev) => [
        ...prev,
        ...res.filter((a) => !prev.some((b) => b.id === a.id)),
      ]);
    });
  }, [nextToLoad]);

  return (
    <div className={styles.home}>
      <h2>最新記事</h2>
      <div className={styles.articles}>
        <ArticleCards articles={articles} />
        <br />
        <button
          className={styles.moreArticleButton}
          onClick={onClickMoreArticleCards}
        >
          もっと記事を読み込む
        </button>
      </div>
    </div>
  );
};

export default Home;
