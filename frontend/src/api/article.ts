import { API, ContentTypeForm } from './api';
import { User, NewUserTemplate } from './user';
import { Image, NewImageTemplate } from './image';

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

export function NewArticleInfoTemplate(): ArticleInfo {
  return {
    id: 0,
    created_at: '2006-01-02T15:04:05+09:00',
    updated_at: '2006-01-02T15:04:05+09:00',
    title: '',
    content: '',
    description: '',
    writer_id: 0,
    writer: NewUserTemplate(),
    thumbnail_id: 0,
    thumbnail: NewImageTemplate(),
  };
}

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

export async function PostArticle(
  title: string,
  content: string,
  description: string,
  thumbnail: File,
  images: File[]
): Promise<boolean> {
  const article: ArticleInfo = NewArticleInfoTemplate();
  article.title = title;
  article.content = content;
  article.description = description;

  const request = new FormData();
  request.append('article', JSON.stringify(article));
  request.append('thumbnail', thumbnail);
  images.forEach((image) => request.append('images', image));
  return API.POST('/auth/article', request, ContentTypeForm);
}
