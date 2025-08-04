import { API, ContentTypeForm } from './api';
import { User, NewUserTemplate } from './user';
import { Image, NewImageTemplate } from './image';
import { ToFormData } from './util';

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
  const [res] = await API.GET<ArticleInfo>('/article/' + id);
  return res;
}

export async function GetArticles(
  from: number,
  count: number
): Promise<ArticleInfo[]> {
  const [res] = await API.GET<ArticleInfo[]>(
    '/articles?from=' + from.toString() + '&count=' + count.toString()
  );

  return res;
}

export type EditArticleRequest = {
  title: string;
  content: string;
  description: string;
  publish: boolean;
  thumbnail?: File;
  images?: File[];
};

export async function PostArticle(
  req: EditArticleRequest
): Promise<ArticleInfo | undefined> {
  if (req.publish && req.thumbnail === undefined) return undefined;

  const request = ToFormData(req);
  const [res, status] = await API.POST<ArticleInfo>(
    '/auth/article',
    request,
    ContentTypeForm
  );

  if (API.IsOK(status)) return res;
  else return undefined;
}

export async function GetMyArticles(
  from: number,
  count: number
): Promise<ArticleInfo[]> {
  const [res] = await API.GET<ArticleInfo[]>(
    '/auth/myarticles?from=' + from.toString() + '&count=' + count.toString()
  );

  return res;
}

export async function PutArticle(
  id: number,
  req: EditArticleRequest
): Promise<boolean> {
  const request = ToFormData(req);

  const [, status] = await API.PUT(
    '/auth/article/' + id.toString(),
    request,
    ContentTypeForm
  );

  return API.IsOK(status);
}

export async function DeleteArticle(id: number): Promise<boolean> {
  const status = await API.DELETE('/auth/article/' + id.toString());

  return API.IsOK(status);
}
