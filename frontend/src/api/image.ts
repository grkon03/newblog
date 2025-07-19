import { API } from './api';

export type Image = {
  id: number;
  created_at: string;
  updated_at: string;
  path: string;
  keywords: string;
};

export function GetImageSrc(id: number): string {
  return API.EndpointURL('/image/' + id.toString());
}
