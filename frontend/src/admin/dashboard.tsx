import React, { useState, useEffect } from 'react';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';
import ArticleCards from '../base-component/articlecards';
import { ArticleInfo, GetMyArticles } from '../api/article';

type Props = {
  mainareaprops?: MainAreaProps;
};

const Dashboard: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);

  const onestep = 10;
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [nextToLoad, setNextToLoad] = useState<number>(0);

  const onClickMoreArticleCards = () => {
    setNextToLoad((prev) => prev + onestep);
  };

  useEffect(() => {
    GetMyArticles(nextToLoad, onestep).then((res) => {
      setArticles((prev) => [
        ...prev,
        ...res.filter((a) => !prev.some((b) => b.id === a.id)),
      ]);
    });
  }, [nextToLoad]);

  return (
    <div>
      <h2>ダッシュボード</h2>
      <div>
        <h3>記事を管理する</h3>
        <ArticleCards articles={articles} />
        <div>
          <div onClick={onClickMoreArticleCards}>次のページ</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
