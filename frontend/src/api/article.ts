import { API } from './api';
import { User } from './user';
import { Image } from './image';

export type ArticleInfo = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  description: string;
  writer_id: number;
  writer: User;
  thumbnail_id: number;
  thumbnail: Image;
};

export async function GetArticle(id: string): Promise<ArticleInfo> {
  return API.GET<ArticleInfo>('/article/' + id);
}

export async function GetArticles(
  from: number,
  count: number
): Promise<ArticleInfo[]> {
  return API.GET<ArticleInfo[]>(
    '/articles?from=' + from.toString() + '&count=' + count.toString()
  );
}
