import { EndpointURL } from './config';
import { useState, useEffect } from 'react';

export type ArticleInfo = {
  title: string;
  content: string;
};

export function GetArticle(id: string): ArticleInfo | null {
  const [article, setArticle] = useState<ArticleInfo | null>(null);
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

  return article;
}
