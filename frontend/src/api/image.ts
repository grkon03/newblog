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
    created_at: '',
    updated_at: '',
    path: '',
  };
}

export function GetImageSrc(id: number): string {
  return API.EndpointURL('/image/' + id.toString());
}
