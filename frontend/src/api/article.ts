import { API } from './api';
import { User } from './user';
import { useState, useEffect } from 'react';

export type ArticleInfo = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  writer_id: number;
  writer: User;
};

export function GetArticle(id: string): ArticleInfo | null {
  const [article, setArticle] = useState<ArticleInfo | null>(null);
  API.GET<ArticleInfo>('/article/' + id)
    .then((res) => setArticle(res))
    .catch((err) => console.error(err));

  return article;
}
