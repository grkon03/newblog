import React, { useState, useEffect } from 'react';
import { MainAreaProps, InitSideArea } from '../types';
import { AdminSA } from '../base-component/sidearea/admin';
import DBArticleCards from './db-components/dbarticlecards';
import { ArticleInfo, GetMyArticles } from '../api/article';

type Props = {
  mainareaprops?: MainAreaProps;
};

const Dashboard: React.FC<Props> = ({ mainareaprops }) => {
  InitSideArea(mainareaprops, AdminSA);

  const onestep = 10;
  const [articles, setArticles] = useState<ArticleInfo[]>([]);
  const [nextToLoad, setNextToLoad] = useState<number>(0);

  const handleClickPrevPage = () => {
    setNextToLoad((prev) => prev - onestep);
  };

  const handleClickNextPage = () => {
    setNextToLoad((prev) => prev + onestep);
  };

  useEffect(() => {
    GetMyArticles(nextToLoad, onestep).then((res) => {
      setArticles(res);
    });
  }, [nextToLoad]);

  return (
    <div>
      <h2>ダッシュボード</h2>
      <div>
        <h3>記事を管理する</h3>
        <DBArticleCards articles={articles} />
        <div>
          <div onClick={handleClickPrevPage}>前の{onestep}件</div>
          <div onClick={handleClickNextPage}>次の{onestep}件</div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
