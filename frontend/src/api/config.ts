export const APIURL = 'http://localhost:3111/api';

export function EndpointURL(endpoint: string): string {
  return APIURL + endpoint;
}
