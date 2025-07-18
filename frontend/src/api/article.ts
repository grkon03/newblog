import { API } from './api';
import { User } from './user';

export type ArticleInfo = {
  id: number;
  created_at: string;
  updated_at: string;
  title: string;
  content: string;
  writer_id: number;
  writer: User;
};

export async function GetArticle(id: string): Promise<ArticleInfo> {
  return API.GET<ArticleInfo>('/article/' + id);
}
