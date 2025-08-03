const APIURL = 'http://localhost:3111/api';

export const ContentTypeJSON = 'application/json';
export const ContentTypeForm = 'multipart/form-data';

class APIHandler {
  APIURL: string;

  constructor(apiurl: string) {
    this.APIURL = apiurl;
  }

  EndpointURL(endpoint: string): string {
    return APIURL + endpoint;
  }

  HeadersDefault(): Headers {
    var headers = new Headers();
    var token = localStorage.getItem('token') ?? '';
    headers.append('Authorization', `Bearer ${token}`);

    return headers;
  }

  MakeRequest(method: string, body?: any, contentType?: string): RequestInit {
    var headers = this.HeadersDefault();
    contentType = contentType ?? ContentTypeJSON;
    if (contentType !== ContentTypeForm)
      headers.append('Content-Type', contentType);

    var req: RequestInit = {
      method: method,
      headers: headers,
    };

    if (body !== undefined) {
      switch (contentType) {
        case ContentTypeJSON:
          req.body = JSON.stringify(body);
          break;
        case ContentTypeForm:
          req.body = body;
          break;
      }
    }

    return req;
  }

  async GET<ResultType>(endpoint: string): Promise<[ResultType, number]> {
    const res = await fetch(
      this.EndpointURL(endpoint),
      this.MakeRequest('GET')
    );

    return [await res.json(), res.status];
  }

  async POST<ResultType>(
    endpoint: string,
    request: any,
    contentType?: string
  ): Promise<[ResultType, number]> {
    const res = await fetch(
      this.EndpointURL(endpoint),
      this.MakeRequest('POST', request, contentType)
    );
    return [await res.json(), res.status];
  }

  async PUT<ResultType>(
    endpoint: string,
    request: any,
    contentType?: string
  ): Promise<[ResultType, number]> {
    const res = await fetch(
      this.EndpointURL(endpoint),
      this.MakeRequest('PUT', request, contentType)
    );

    return [await res.json(), res.status];
  }

  async DELETE(
    endpoint: string,
    request?: any,
    contentType?: string
  ): Promise<number> {
    const res = await fetch(
      this.EndpointURL(endpoint),
      this.MakeRequest('DELETE', request ?? {}, contentType)
    );

    return res.status;
  }

  IsOK(status: number) {
    return 200 <= status && status < 300;
  }
}

export const API = new APIHandler(APIURL);
