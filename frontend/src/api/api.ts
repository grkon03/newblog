const APIURL = 'http://localhost:3111/api';

export type LoginRequest = {
  username: string;
  password: string;
};

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

  MakeRequest<BodyType>(
    method: string,
    body?: BodyType,
    contentType?: string
  ): RequestInit {
    var headers = new Headers();
    var token = localStorage.getItem('token');
    headers.append('Authorization', `Bearer ${token}`);
    headers.append('Content-Type', contentType ?? ContentTypeJSON);

    var req: RequestInit = {
      method: method,
      headers: headers,
    };

    if (body !== undefined) {
      req.body = JSON.stringify(body);
    }

    return req;
  }

  async GET<ResultType>(endpoint: string): Promise<ResultType> {
    const res = await fetch(
      this.EndpointURL(endpoint),
      this.MakeRequest('GET')
    );

    return await res.json();
  }

  async POST<ResultType>(
    endpoint: string,
    request: any,
    contentType?: string
  ): Promise<ResultType> {
    const res = await fetch(
      this.EndpointURL(endpoint),
      this.MakeRequest('POST', request, contentType)
    );
    return await res.json();
  }

  async LOGIN(req: LoginRequest): Promise<boolean> {
    const res = await fetch(
      this.EndpointURL('/login'),
      this.MakeRequest('POST', req)
    );

    if (res.ok) {
      localStorage.setItem('token', await res.text());
    }

    return res.ok;
  }
}

export const API = new APIHandler(APIURL);
