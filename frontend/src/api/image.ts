import { API } from './api';

export type Image = {
  id: number;
  created_at: string;
  updated_at: string;
  path: string;
};

export function NewImageTemplate(): Image {
  return {
    id: 0,
    created_at: '2006-01-02T15:04:05+09:00',
    updated_at: '2006-01-02T15:04:05+09:00',
    path: '',
  };
}

export function GetImageSrc(id: number): string {
  return API.EndpointURL('/image/' + id.toString());
}
