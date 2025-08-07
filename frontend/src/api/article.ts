import Result from './result';
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
  is_published: boolean;
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
    is_published: false,
    writer_id: 0,
    writer: NewUserTemplate(),
    thumbnail_id: 0,
    thumbnail: NewImageTemplate(),
  };
}

export async function GetArticle(id: string): Promise<Result<ArticleInfo>> {
  return API.GET<ArticleInfo>('/article/' + id);
}

export async function GetArticles(
  from: number,
  count: number
): Promise<Result<ArticleInfo[]>> {
  return API.GET<ArticleInfo[]>(
    '/articles?from=' + from.toString() + '&count=' + count.toString()
  );
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
): Promise<Result<ArticleInfo>> {
  if (req.publish && req.thumbnail === undefined)
    return Result.InternalBadRequestError(
      'Cannot publish without any thumbnails.'
    );

  const request = ToFormData(req);
  const res = await API.POST<ArticleInfo>(
    '/auth/article',
    request,
    ContentTypeForm
  );

  return res;
}

export async function GetMyArticles(
  from: number,
  count: number
): Promise<Result<ArticleInfo[]>> {
  const res = await API.GET<ArticleInfo[]>(
    '/auth/myarticles?from=' + from.toString() + '&count=' + count.toString()
  );

  return res;
}

export async function PutArticle(
  id: number,
  req: EditArticleRequest
): Promise<Result<null>> {
  const request = ToFormData(req);

  const res = await API.PUT<null>(
    '/auth/article/' + id.toString(),
    request,
    ContentTypeForm
  );

  return res;
}

export async function DeleteArticle(id: number): Promise<Result> {
  const res = await API.DELETE('/auth/article/' + id.toString());

  return res;
}
