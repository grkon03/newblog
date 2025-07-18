const APIURL = 'http://localhost:3111/api';

class APIHandler {
  APIURL: string;
  RequestTemplate: RequestInit;

  constructor(apiurl: string, template: RequestInit) {
    this.APIURL = apiurl;
    this.RequestTemplate = template;
  }

  EndpointURL(endpoint: string): string {
    return APIURL + endpoint;
  }

  MakeRequest<BodyType>(method: string, body?: BodyType): RequestInit {
    var req = this.RequestTemplate;
    req.method = method;
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

  async POST<ResultType>(endpoint: string, request: any): Promise<ResultType> {
    const res = await fetch(
      this.EndpointURL(endpoint),
      this.MakeRequest('POST', request)
    );
    return await res.json();
  }
}

export const API = new APIHandler(APIURL, {
  headers: {
    'Content-Type': 'application/json',
  },
});
